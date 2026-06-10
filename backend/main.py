import os
import hashlib
import json
import time
import shutil
from pathlib import Path
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Nova AI FIM API",
    description="Local File Integrity Monitoring & Corruption Detection Daemon",
    version="1.0.0"
)

# CORS configurations - Allow local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
WATCH_DIR = PROJECT_DIR / "sandbox_files"
BACKUP_DIR = BASE_DIR / "backup"
BASELINE_FILE = BASE_DIR / "baseline.json"
LOGS_FILE = BASE_DIR / "security_logs.json"

# Seed data to create if not present
SEED_FILES = {
    "config.json": '{\n  "system_port": 8080,\n  "db_connected": true,\n  "encryption_enabled": true,\n  "allowed_nodes": ["Node-East-01", "Node-East-04"],\n  "alert_webhook_endpoint": "http://localhost:8000/api/quarantine"\n}',
    "syslog.log": "[2026-06-08 10:00:00] INFO [Kernel] System initialized successfully.\n[2026-06-08 10:01:22] INFO [Storage] Mounted local filesystem /dev/sda1.\n[2026-06-08 10:05:45] INFO [Sentinel] File Integrity Monitoring agent active.\n",
    "user_database.db": "admin:$2b$12$R9h/cIPz0gi.URrX3tEa.Oq1hXo8lQWfA1XpZ7w3M9l7F/b6hT4yO\noperator:$2b$12$Kj9xO/t1bW4y9u1z8a7o9e2x.F3tEa.Oq1hXo8lQWfA1XpZ7w3M9l7\n"
}

# In-memory transient logs if json fails
security_logs = []

def init_folders():
    # Create watched folder
    WATCH_DIR.mkdir(parents=True, exist_ok=True)
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    # Populate seed files
    for name, content in SEED_FILES.items():
        file_path = WATCH_DIR / name
        backup_path = BACKUP_DIR / name
        
        if not file_path.exists():
            file_path.write_text(content)
        if not backup_path.exists():
            backup_path.write_text(content)

    # Add initial logs
    if not logs_exist():
        add_log("System", "FIM agent initialized. Watched directory ready.")
        add_log("System", "Secure baseline backup copy created.")

def logs_exist():
    return LOGS_FILE.exists() or len(security_logs) > 0

def add_log(event_type: str, message: str):
    timestamp = datetime.now().strftime("%H:%M:%S")
    log_entry = {
        "timestamp": timestamp,
        "type": event_type,
        "message": message
    }
    
    # Update in-memory logs
    security_logs.insert(0, log_entry)
    if len(security_logs) > 50:
        security_logs.pop()
        
    # Persist to file
    try:
        with open(LOGS_FILE, "w") as f:
            json.dump(security_logs, f, indent=2)
    except Exception:
        pass

def get_logs_list():
    if LOGS_FILE.exists():
        try:
            with open(LOGS_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return security_logs
    return security_logs

def calculate_sha256(file_path: Path) -> str:
    if not file_path.exists():
        return ""
    sha256 = hashlib.sha256()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                sha256.update(chunk)
        return sha256.hexdigest()
    except Exception:
        return ""

def load_baseline() -> dict:
    if BASELINE_FILE.exists():
        try:
            with open(BASELINE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_baseline(baseline: dict):
    with open(BASELINE_FILE, "w") as f:
        json.dump(baseline, f, indent=2)

# Initialize files
init_folders()

# Schema for body requests
class CorruptRequest(BaseModel):
    filename: str = None

@app.get("/api/status")
def get_status():
    baseline = load_baseline()
    monitored_files = list(WATCH_DIR.glob("*"))
    return {
        "status": "active",
        "engine": "SHA-256 Checksum Indexer",
        "watched_directory": str(WATCH_DIR),
        "baseline_established": len(baseline) > 0,
        "monitored_files_count": len(monitored_files)
    }

@app.get("/api/files")
def get_files():
    baseline = load_baseline()
    results = []
    
    # Collect files in directory
    current_files = set()
    for item in WATCH_DIR.glob("*"):
        if item.is_file():
            rel_name = item.name
            current_files.add(rel_name)
            
            curr_hash = calculate_sha256(item)
            base_hash = baseline.get(rel_name, "")
            
            size = item.stat().st_size
            mtime = datetime.fromtimestamp(item.stat().st_mtime).strftime("%Y-%m-%d %H:%M:%S")
            
            if not base_hash:
                status = "ADDED"
            elif curr_hash == base_hash:
                status = "SECURE"
            else:
                status = "CORRUPTED"
                
            results.append({
                "filename": rel_name,
                "current_hash": curr_hash[:12] if curr_hash else "error",
                "baseline_hash": base_hash[:12] if base_hash else "N/A",
                "size_bytes": size,
                "last_modified": mtime,
                "status": status
            })
            
    # Check for deleted files (in baseline but not on disk)
    for rel_name, base_hash in baseline.items():
        if rel_name not in current_files:
            results.append({
                "filename": rel_name,
                "current_hash": "missing",
                "baseline_hash": base_hash[:12],
                "size_bytes": 0,
                "last_modified": "N/A",
                "status": "DELETED"
            })
            
    return results

@app.post("/api/scan")
def run_scan():
    t0 = time.time()
    baseline = load_baseline()
    
    if not baseline:
        # Auto-establish baseline if empty
        baseline = {}
        for item in WATCH_DIR.glob("*"):
            if item.is_file():
                baseline[item.name] = calculate_sha256(item)
        save_baseline(baseline)
        add_log("Scan Engine", "Auto-established baseline hashes on empty profile.")

    files_checked = 0
    corrupted = 0
    added = 0
    deleted = 0
    matched = 0
    
    current_files = set()
    for item in WATCH_DIR.glob("*"):
        if item.is_file():
            rel_name = item.name
            current_files.add(rel_name)
            files_checked += 1
            
            curr_hash = calculate_sha256(item)
            base_hash = baseline.get(rel_name, "")
            
            if not base_hash:
                added += 1
            elif curr_hash == base_hash:
                matched += 1
            else:
                corrupted += 1
                
    for rel_name in baseline.keys():
        if rel_name not in current_files:
            deleted += 1
            files_checked += 1
            
    # Calculate integrity percentage
    total_expected = len(baseline)
    if total_expected > 0:
        integrity_score = round((matched / total_expected) * 100, 2)
    else:
        integrity_score = 100.0 if files_checked == 0 else 0.0

    latency_ms = round((time.time() - t0) * 1000, 3)
    
    # Event logs
    if corrupted > 0 or deleted > 0:
        add_log("Integrity Scanner", f"INTEGRITY FAIL: {corrupted} corrupted, {deleted} deleted file(s) detected. Score: {integrity_score}%.")
    else:
        add_log("Integrity Scanner", f"INTEGRITY PASS: Checked {files_checked} sectors. Score: {integrity_score}%.")
        
    return {
        "integrity_score": integrity_score,
        "scan_latency_ms": latency_ms,
        "files_checked": files_checked,
        "corrupted_count": corrupted,
        "added_count": added,
        "deleted_count": deleted,
        "status": "CORRUPTED" if (corrupted > 0 or deleted > 0) else "SECURE",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/baseline")
def initialize_baseline():
    baseline = {}
    
    # Empty existing backup and re-populate
    if BACKUP_DIR.exists():
        shutil.rmtree(BACKUP_DIR)
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    files_count = 0
    for item in WATCH_DIR.glob("*"):
        if item.is_file():
            rel_name = item.name
            curr_hash = calculate_sha256(item)
            baseline[rel_name] = curr_hash
            files_count += 1
            # Copy to backup
            shutil.copy2(item, BACKUP_DIR / rel_name)
            
    save_baseline(baseline)
    add_log("System", f"Trusted baseline database established. Indexed {files_count} files.")
    
    return {
        "message": "Baseline signature database initialized successfully.",
        "files_indexed": files_count
    }

@app.post("/api/corrupt")
def corrupt_file(req: CorruptRequest):
    filename = req.filename
    if not filename:
        # Pick a default file to corrupt
        default_files = ["config.json", "syslog.log", "user_database.db"]
        for f in default_files:
            if (WATCH_DIR / f).exists():
                filename = f
                break
        if not filename:
            raise HTTPException(status_code=404, detail="No files found to corrupt.")
            
    target_path = WATCH_DIR / filename
    if not target_path.exists():
        raise HTTPException(status_code=404, detail=f"File {filename} not found.")
        
    try:
        # Append corruption pattern
        corruption_stamp = f"\n[CORRUPTED_SECTOR_SECTOR_FAIL_0X{os.urandom(4).hex().upper()}]"
        with open(target_path, "a") as f:
            f.write(corruption_stamp)
            
        add_log("Warning Event", f"CRITICAL: System corruption injected into file '{filename}' (unauthorized write detected).")
        return {"message": f"Successfully injected corruption bytes into '{filename}'."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to inject corruption: {str(e)}")

@app.post("/api/restore")
def restore_backup():
    if not BACKUP_DIR.exists() or not any(BACKUP_DIR.glob("*")):
        raise HTTPException(status_code=400, detail="No secure backup copies available.")
        
    restored_count = 0
    # Copy clean replacement files
    for item in BACKUP_DIR.glob("*"):
        if item.is_file():
            shutil.copy2(item, WATCH_DIR / item.name)
            restored_count += 1
            
    # Remove any extra files in watched dir not present in backup
    baseline = load_baseline()
    for item in WATCH_DIR.glob("*"):
        if item.is_file() and item.name not in baseline:
            item.unlink()
            
    add_log("Recovery Agent", f"Rollback trigger armed. Restored {restored_count} files to baseline state. System clean.")
    return {
        "message": "Self-healing recovery completed successfully.",
        "files_restored": restored_count
    }

@app.get("/api/logs")
def get_logs():
    return get_logs_list()