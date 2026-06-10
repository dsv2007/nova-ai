"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const, @typescript-eslint/no-unused-vars */

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  Brain, 
  Cpu, 
  Database, 
  LineChart as LineChartIcon, 
  RefreshCw, 
  Settings as SettingsIcon,
  MessageSquare,
  TrendingUp,
  Terminal,
  Play,
  CheckCircle,
  Plus,
  Send,
  Loader2,
  Sparkles,
  Key,
  Globe,
  Sliders,
  ChevronRight,
  Code,
  Activity,
  Layers,
  ArrowRight,
  DatabaseZap,
  Boxes,
  HelpCircle,
  Upload,
  FileSpreadsheet,
  Shield,
  Lock,
  Wallet,
  AlertTriangle,
  Server
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area 
} from "recharts";

export default function Platform() {
  const [activeSection, setActiveSection] = useState("Incident Dashboard");
  const menuItems = [
    { icon: <Boxes className="w-4 h-4" />, label: "Incident Dashboard" },
    { icon: <Shield className="w-4 h-4" />, label: "Corruption Sandbox" },
    { icon: <Layers className="w-4 h-4" />, label: "Syslog Ingestion" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Incident Response Copilot" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Incident Forecasting" },
    { icon: <Activity className="w-4 h-4" />, label: "Containment Webhooks" },
    { icon: <SettingsIcon className="w-4 h-4" />, label: "Workspace Settings" }
  ];

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  // --- CORRUPTION SANDBOX STATE ---
  const [selectedDirectory, setSelectedDirectory] = useState("etc");
  const [selectedEngine, setSelectedEngine] = useState("sha256");
  const [targetIntegrity, setTargetIntegrity] = useState(99.9);
  const [scanDepth, setScanDepth] = useState(3);
  const [bufferSize, setBufferSize] = useState(50);
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simMetrics, setSimMetrics] = useState<any[]>([]);
  const [corruptionDrivers, setCorruptionDrivers] = useState<any[]>([]);
  
  const [predictInputs, setPredictInputs] = useState<any>({});
  const [predictOutput, setPredictOutput] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // --- UPLOADED EVENT STATE ---
  interface UploadedColumnStat {
    column: string;
    type: "Numeric" | "Categorical";
    nullCount: number;
    nullPct: string;
    mean?: number;
    min?: number;
    max?: number;
    uniqueCount?: number;
  }
  interface UploadedData {
    name: string;
    size: string;
    headers: string[];
    rows: any[][];
    stats: UploadedColumnStat[];
  }
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [targetColumn, setTargetColumn] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [playgroundActiveTab, setPlaygroundActiveTab] = useState<"simulation" | "drivers" | "summary">("simulation");

  // --- PIPELINES STATE ---
  const [pipelineStep, setPipelineStep] = useState(0);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [selectedPipelineNode, setSelectedPipelineNode] = useState<string | null>(null);

  // --- AI COPILOT STATE ---
  const [chatHistory, setChatHistory] = useState<any[]>([
    {
      sender: "ai",
      text: "Hello! I am your Nova AI Incident Response Copilot. Select a prompt chip below or ask me any question about syslog errors, file corruption events, or how to write server quarantine scripts."
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- FORECASTING STATE ---
  const [selectedForecastMetric, setSelectedForecastMetric] = useState("incidents");
  const [forecastHorizon, setForecastHorizon] = useState(30);
  const [forecastModel, setForecastModel] = useState("prophet");
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<any[]>([]);

  // --- WEBHOOKS STATE ---
  const [apiTesterEndpoint, setApiTesterEndpoint] = useState("server-quarantine-webhook");
  const [apiTesterInput, setApiTesterInput] = useState(`{\n  "target_node": "Server-East-04",\n  "incident_id": "err_f839a2d",\n  "quarantine_network": "10.0.4.0/24",\n  "containment_level": "critical"\n}`);
  const [apiTesterOutput, setApiTesterOutput] = useState("");
  const [isApiTesting, setIsApiTesting] = useState(false);

  // --- SETTINGS STATE ---
  const [apiKey, setApiKey] = useState("na_live_9f82c301bd49208a0d927a");
  const [generatedKeyMsg, setGeneratedKeyMsg] = useState(false);
  const [rateLimit, setRateLimit] = useState(5000);

  // --- LIVE BACKEND STATE ---
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [liveStatus, setLiveStatus] = useState<any>(null);
  const [liveFiles, setLiveFiles] = useState<any[]>([]);
  const [liveLogs, setLiveLogs] = useState<any[]>([]);
  const [lastScanResult, setLastScanResult] = useState<any>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/files");
      if (res.ok) {
        const data = await res.json();
        setLiveFiles(data);
      }
    } catch (e) {}
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/logs");
      if (res.ok) {
        const data = await res.json();
        setLiveLogs(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/status");
        if (res.ok) {
          const data = await res.json();
          setLiveStatus(data);
          setIsLiveBackend(true);
          fetchFiles();
          fetchLogs();
          setSelectedDirectory("live_sandbox");
        }
      } catch (err) {
        setIsLiveBackend(false);
      }
    };
    checkBackendStatus();
  }, []);

  // ==========================================
  // REUSABLE SIMULATIONS
  // ==========================================

  // --- SIMULATION FUNCTIONS ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        let headers: string[] = [];
        let rows: any[][] = [];

        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(text);
          const dataArray = Array.isArray(parsed) ? parsed : [parsed];
          if (dataArray.length > 0) {
            headers = Object.keys(dataArray[0]);
            rows = dataArray.map(obj => headers.map(h => obj[h] ?? ""));
          }
        } else {
          // Parse CSV
          const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
          if (lines.length > 0) {
            headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
            rows = lines.slice(1).map(line => {
              return line.split(',').map(val => val.trim().replace(/^["']|["']$/g, ''));
            });
          }
        }

        if (headers.length === 0 || rows.length === 0) {
          throw new Error("Invalid file content: Empty rows or columns.");
        }

        // Analyze columns
        const stats = headers.map((col, colIdx) => {
          let nullCount = 0;
          let numericVals: number[] = [];
          const uniqueVals = new Set<string>();

          rows.forEach(row => {
            const val = row[colIdx];
            if (val === undefined || val === null || val === "") {
              nullCount++;
            } else {
              uniqueVals.add(val);
              const num = Number(val);
              if (!isNaN(num)) {
                numericVals.push(num);
              }
            }
          });

          const nonNullCount = rows.length - nullCount;
          const isNumeric = nonNullCount > 0 && (numericVals.length / nonNullCount) >= 0.8;

          if (isNumeric) {
            const sum = numericVals.reduce((a, b) => a + b, 0);
            const mean = numericVals.length > 0 ? Number((sum / numericVals.length).toFixed(2)) : 0;
            const min = numericVals.length > 0 ? Math.min(...numericVals) : 0;
            const max = numericVals.length > 0 ? Math.max(...numericVals) : 0;
            return {
              column: col,
              type: "Numeric" as const,
              nullCount,
              nullPct: `${((nullCount / rows.length) * 100).toFixed(1)}%`,
              mean,
              min,
              max
            };
          } else {
            return {
              column: col,
              type: "Categorical" as const,
              nullCount,
              nullPct: `${((nullCount / rows.length) * 100).toFixed(1)}%`,
              uniqueCount: uniqueVals.size
            };
          }
        });

        const formattedSize = file.size > 1024 * 1024 
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
          : `${(file.size / 1024).toFixed(1)} KB`;

        setUploadedData({
          name: file.name,
          size: formattedSize,
          headers,
          rows,
          stats
        });

        // Set default target & features
        setTargetColumn(headers[headers.length - 1]);
        setSelectedFeatures(headers.slice(0, headers.length - 1));
        setSelectedDirectory("uploaded");
        setPlaygroundActiveTab("summary");
        setPredictOutput(null);

      } catch (err: any) {
        alert(`Failed to parse file: ${err.message}`);
      } finally {
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      alert("Error reading file.");
      setIsParsing(false);
    };

    reader.readAsText(file);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    setSimMetrics([]);
    setPredictOutput(null);
    setPlaygroundActiveTab("simulation");
    
    let currentStep = 0;
    const maxSteps = selectedEngine === "lstm" ? bufferSize : 15;
    const tempMetrics: any[] = [];
    
    const interval = setInterval(() => {
      currentStep++;
      const progressPct = Math.round((currentStep / maxSteps) * 100);
      setSimProgress(progressPct);

      // Simulate drift curve
      const integrity = Number((targetIntegrity * (1 - 0.05 * Math.exp(-currentStep / (maxSteps * 0.4))) + (Math.random() * 0.1 - 0.05)).toFixed(3));
      const scanLatency = Number(Math.max(2, 45 - currentStep * 1.5 + Math.random() * 3).toFixed(1));
      const errorRate = Number(Math.max(0.01, 2.5 - currentStep * 0.15 + Math.random() * 0.5).toFixed(3));

      tempMetrics.push({
        step: currentStep,
        integrity: Math.min(100, integrity),
        latency: scanLatency,
        errorRate: errorRate
      });
      setSimMetrics([...tempMetrics]);

      if (currentStep >= maxSteps) {
        clearInterval(interval);
        if (isLiveBackend) {
          fetch("http://localhost:8000/api/scan", { method: "POST" })
            .then(res => res.json())
            .then(data => {
              setLastScanResult(data);
              setIsSimulating(false);
              const finalIntegrity = data.integrity_score;
              const finalLatency = data.scan_latency_ms;
              const finalErrorRate = data.corrupted_count > 0 ? (data.corrupted_count / data.files_checked) * 100 : 0;
              const realMetrics = Array.from({ length: maxSteps }, (_, idx) => {
                const step = idx + 1;
                const ratio = step / maxSteps;
                return {
                  step: step,
                  integrity: Math.min(100, Number((100 - (100 - finalIntegrity) * ratio).toFixed(2))),
                  latency: Number((finalLatency + (maxSteps - step) * 2).toFixed(2)),
                  errorRate: Number((finalErrorRate * ratio).toFixed(2))
                };
              });
              setSimMetrics(realMetrics);
              fetchFiles();
              fetchLogs();
              setPlaygroundActiveTab("live_files" as any);
            })
            .catch(() => {
              setIsSimulating(false);
            });
        } else {
          setIsSimulating(false);
          // Set yield drivers importance
          if (selectedDirectory === "etc") {
            setCorruptionDrivers([
              { name: "Disk Write Load", weight: 38 },
              { name: "Hardware Aging", weight: 26 },
              { name: "Kernel Interrupts", weight: 18 },
              { name: "File Size", weight: 12 },
              { name: "Packet Drops", weight: 6 }
            ]);
            setPredictInputs({ file_path: "/etc/hosts", current_checksum: "a492b9", expected_checksum: "a492b9" });
          } else if (selectedDirectory === "var") {
            setCorruptionDrivers([
              { name: "Buffer Allocations", weight: 45 },
              { name: "Database Locks", weight: 22 },
              { name: "Transaction Vol", weight: 15 },
              { name: "Disk Sector Heat", weight: 10 },
              { name: "User Access Rate", weight: 8 }
            ]);
            setPredictInputs({ file_path: "/var/lib/mysql", current_checksum: "bf82d0", expected_checksum: "bf82d3" });
          } else if (selectedDirectory === "uploaded" && uploadedData) {
            let remainingWeight = 100;
            const importances = selectedFeatures.map((feat, idx) => {
              const weight = idx === selectedFeatures.length - 1 
                ? remainingWeight 
                : Math.max(2, Math.round(remainingWeight * (0.35 + Math.random() * 0.2)));
              remainingWeight = Math.max(0, remainingWeight - weight);
              return { name: feat, weight: weight };
            }).sort((a, b) => b.weight - a.weight);
            setCorruptionDrivers(importances);

            const defaultInputs: any = {};
            selectedFeatures.forEach(feat => {
              const colStat = uploadedData.stats.find(s => s.column === feat);
              defaultInputs[feat] = colStat?.type === "Numeric" ? colStat.mean ?? 10 : "Sample";
            });
            setPredictInputs(defaultInputs);
          } else {
            setCorruptionDrivers([
              { name: "Library Mismatch", weight: 41 },
              { name: "Dynamic Linker Fail", weight: 28 },
              { name: "Bad Block Sector", weight: 16 },
              { name: "Unclean Shutdown", weight: 9 },
              { name: "IPFS Sync Delay", weight: 6 }
            ]);
            setPredictInputs({ file_path: "/usr/bin/bash", current_checksum: "2f8a91", expected_checksum: "2f8a91" });
          }
        }
      }
    }, 150);
  };

  const handleRunInference = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      if (predictInputs.current_checksum === predictInputs.expected_checksum) {
        setPredictOutput("SECURE - Cryptographic Checksums Match.");
      } else {
        setPredictOutput("ALERT - Checksum Mismatch! Data Corrupted.");
      }
    }, 800);
  };

  // --- PIPELINES FUNCTIONS ---
  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    setPipelineStep(1);
    setPipelineLogs(["[00:01] Initializing syslog ingestion pipeline..."]);

    const timers = [
      setTimeout(() => {
        setPipelineStep(2);
        setPipelineLogs(l => [...l, "[00:03] Pipeline validated. Ingesting syslog records from Node-East (14,200 events)..."]);
      }, 1500),
      setTimeout(() => {
        setPipelineStep(3);
        setPipelineLogs(l => [...l, "[00:06] Applying regex parsing & scanning indicators of compromise (IOC)..."]);
      }, 3000),
      setTimeout(() => {
        setPipelineStep(4);
        setPipelineLogs(l => [...l, "[00:09] Running data integrity validations & checksum hash matching..."]);
      }, 4500),
      setTimeout(() => {
        setPipelineStep(5);
        setPipelineLogs(l => [...l, "[00:11] Syslog check finalized. Ingestion sync latency: 12ms."]);
      }, 6000),
      setTimeout(() => {
        setPipelineStep(6);
        setPipelineLogs(l => [...l, "[00:13] Containment webhook active. Target Alert Endpoint: /api/v1/containment."]);
        setIsPipelineRunning(false);
      }, 7500)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  };

  // --- COPILOT FUNCTIONS ---
  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newHistory = [...chatHistory, { sender: "user", text: query }];
    setChatHistory(newHistory);
    setChatInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      let reply: any = { sender: "ai", text: "" };

      if (query.toLowerCase().includes("incident") || query.toLowerCase().includes("corruption") || query.toLowerCase().includes("report")) {
        reply.text = "Here is the monthly log of data corruption incidents across active servers. Checksum failures peaked in Server-East-04 due to disk sector degradation.";
        reply.chartType = "bar";
        reply.chartData = [
          { name: "Server-East-01", Conversion: 1 },
          { name: "Server-East-04", Conversion: 12 },
          { name: "DB-Pool-Main", Conversion: 0 },
          { name: "Cache-Node-01", Conversion: 3 },
          { name: "Static-Storage", Conversion: 2 }
        ];
      } else if (query.toLowerCase().includes("latency") || query.toLowerCase().includes("scan") || query.toLowerCase().includes("performance")) {
        reply.text = "I've scanned the active directory check latencies. Scans spiked to 120ms at 14:00 during file system indexing but recovered immediately.";
        reply.chartType = "line";
        reply.chartData = [
          { time: "10:00", Latency: 12 },
          { time: "12:00", Latency: 15 },
          { time: "14:00", Latency: 120 },
          { time: "16:00", Latency: 22 },
          { time: "18:00", Latency: 11 }
        ];
      } else if (query.toLowerCase().includes("integrity") || query.toLowerCase().includes("uptime")) {
        reply.text = "Here is the projected data integrity SLA score for the upcoming quarter. We forecast maintaining a 99.99% integrity level.";
        reply.chartType = "area";
        reply.chartData = [
          { month: "May", Revenue: 99.85 },
          { month: "Jun", Revenue: 99.91 },
          { month: "Jul (Est)", Revenue: 99.95 },
          { month: "Aug (Est)", Revenue: 99.98 },
          { month: "Sep (Est)", Revenue: 99.99 }
        ];
      } else {
        reply.text = `I've registered your request regarding: "${query}". On Nova AI, you can configure directory scans, simulate data corruption sweeps, and test containment webhooks. Try using one of the pre-built prompt chips below.`;
      }

      setChatHistory(c => [...c, reply]);
      setIsAiTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isAiTyping]);

  // --- FORECASTING FUNCTIONS ---
  const handleGenerateForecast = () => {
    setIsForecasting(true);
    setForecastResult([]);
    
    setTimeout(() => {
      setIsForecasting(false);
      
      const baseVal = selectedForecastMetric === "incidents" ? 1.5 : selectedForecastMetric === "users" ? 99.9 : 12;
      const multiplier = selectedForecastMetric === "incidents" ? 1.05 : selectedForecastMetric === "users" ? 0.999 : 1.08;
      
      const tempForecast: any[] = [];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      // Historical
      for (let i = 0; i < 6; i++) {
        tempForecast.push({
          name: months[i],
          Historical: Math.round(baseVal * Math.pow(multiplier, i - 5) * 100) / 100
        });
      }
      // Forecast
      let lastHist = tempForecast[tempForecast.length - 1].Historical;
      for (let i = 6; i < 12; i++) {
        const val = Math.round(lastHist * Math.pow(multiplier, i - 5) * 100) / 100;
        const confInterval = Math.round(val * 0.08 * (i - 5) * 100) / 100;
        tempForecast.push({
          name: months[i],
          Forecast: val,
          Upper: Math.round((val + confInterval) * 100) / 100,
          Lower: Math.max(0, Math.round((val - confInterval) * 100) / 100)
        });
      }
      
      setForecastResult(tempForecast);
    }, 1500);
  };

  // --- ORACLE WEBHOOKS FUNCTIONS ---
  const handleTestApi = () => {
    setIsApiTesting(true);
    setApiTesterOutput("");
    
    setTimeout(() => {
      setIsApiTesting(false);
      try {
        const parsed = JSON.parse(apiTesterInput);
        const randVal = Math.floor(Math.random() * 85) + 10;
        const responseObj = {
          status: "200_OK",
          webhook: apiTesterEndpoint,
          timestamp: new Date().toISOString(),
          containment_details: {
            node_quarantined: parsed.target_node ? parsed.target_node : "Default-East-01",
            network_rule_applied: parsed.quarantine_network ? "Block route from " + parsed.quarantine_network : "No rule applied",
            remediation_state: randVal > 50 ? "ISOLATION_COMPLETE" : "MONITOR_ONLY",
            action: randVal > 50 ? "Dispatched quarantine alert to PagerDuty" : "Logged diagnostic details"
          },
          infrastructure: {
            latency_ms: Math.floor(Math.random() * 20) + 5,
            broker_node: "Local-Gateway-WAF",
            rate_limit_remaining: rateLimit - 1
          }
        };
        setApiTesterOutput(JSON.stringify(responseObj, null, 2));
      } catch (err: any) {
        setApiTesterOutput(`Error Parsing JSON Input:\n${err.message}`);
      }
    }, 1200);
  };

  // --- SETTINGS KEY GENERATOR ---
  const handleGenerateApiKey = () => {
    const bytes = Array.from({ length: 22 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setApiKey(`na_live_${bytes}`);
    setGeneratedKeyMsg(true);
    setTimeout(() => setGeneratedKeyMsg(false), 3000);
  };

  // ==========================================
  // RENDER SECTIONS
  // ==========================================

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex pt-16">
      
      {/* Sidebar Layout */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col justify-between fixed h-[calc(100vh-64px)] z-20">
        <div className="p-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
            Incident Workspace
          </div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveSection(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all outline-none ${
                  activeSection === item.label 
                    ? "bg-red-600/10 text-red-400 border-l-2 border-red-500" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile capsule in sidebar */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-sm border border-red-500/10">
            SD
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">Santhivarshini D</div>
            <div className="text-[10px] text-slate-500 truncate">santhivarshinidevan@gmail.com</div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 ml-64 min-h-[calc(100vh-64px)] bg-grid-dots p-8 relative overflow-x-hidden">
        
        {/* Breathing ambient glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">

          {/* ────────────────────────────────────────────────────────
              SECTION 1: DASHBOARD OVERVIEW 
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Incident Dashboard" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <Activity className="w-6 h-6 text-red-400" />
                    INCIDENT COCKPIT
                  </h1>
                  <p className="text-slate-400 text-xs mt-1">Real-time status overview of directory scanning agents, integrity ratios, and alerts.</p>
                </div>
                {isLiveBackend && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live FIM Daemon Active
                  </span>
                )}
              </div>

              {/* KPI metrics row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Sensors", value: "2,482 Sensors", change: "99.99% Uptime", color: "text-red-400" },
                  { label: "Data Integrity Rate", value: "99.982%", change: "+0.004% Change", color: "text-orange-400" },
                  { label: "Mean Time to Detect", value: "12ms", change: "SLA Compliant", color: "text-emerald-400" },
                  { label: "Active Outage Alerts", value: "4 Incidents", change: "3 Quarantined", color: "text-indigo-400" }
                ].map((kpi, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{kpi.label}</div>
                    <div className="text-xl font-extrabold text-white mt-2 font-mono">{kpi.value}</div>
                    <div className={`text-[10px] font-semibold mt-1.5 ${kpi.color}`}>{kpi.change}</div>
                  </div>
                ))}
              </div>

              {/* Performance charts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart 1: Ingestion throughput */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-4">
                  <h3 className="text-white font-bold text-sm">System Ingestion & Checksum Volumes (kB/s)</h3>
                  <div className="h-64 text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { name: "10:00", Scans: 45, Errors: 2 },
                          { name: "11:00", Scans: 65, Errors: 4 },
                          { name: "12:00", Scans: 50, Errors: 1 },
                          { name: "13:00", Scans: 90, Errors: 12 },
                          { name: "14:00", Scans: 75, Errors: 8 },
                          { name: "15:00", Scans: 120, Errors: 3 }
                        ]}
                      >
                        <defs>
                          <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                        <Area type="monotone" dataKey="Scans" stroke="#f43f5e" fillOpacity={1} fill="url(#colorScans)" />
                        <Line type="monotone" dataKey="Errors" stroke="#fb923c" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Inference distribution */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-4">
                  <h3 className="text-white font-bold text-sm">Integrity Scan Latencies (ms)</h3>
                  <div className="h-64 text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "/etc Configs", p50: 8, p95: 14, p99: 25 },
                          { name: "/var/lib DBs", p50: 22, p95: 45, p99: 98 },
                          { name: "/usr Binaries", p50: 10, p95: 18, p99: 30 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                        <Bar dataKey="p50" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="p95" fill="#f97316" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="p99" fill="#eab308" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Live Security logs terminal */}
              {isLiveBackend && (
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/80 backdrop-blur-xl space-y-3 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sentinel Alert Registry Logs</span>
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      LIVE SECURE FEED
                    </span>
                  </div>
                  <div className="space-y-1 text-[10px] max-h-40 overflow-y-auto scrollbar-thin">
                    {liveLogs.map((log: any, lIdx: number) => (
                      <div key={lIdx} className="flex gap-2">
                        <span className="text-slate-500">[{log.timestamp}]</span>
                        <span className={`font-bold ${
                          log.type === "Warning Event" ? "text-red-400" :
                          log.type === "Integrity Scanner" ? "text-orange-400" :
                          "text-slate-400"
                        }`}>{log.type}:</span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    ))}
                    {liveLogs.length === 0 && (
                      <div className="text-slate-600 text-center py-4">No audit logs recorded yet. Run a baseline or scan.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Real-time ML suggestions banner */}
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-start gap-4">
                <Brain className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="text-white font-bold">🤖 Incident Copilot Diagnostics Recommendation</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Check-sum scans for directory `/var/lib/mysql` indicate continuous file system warnings. We recommend migrating transaction log buffers to `/var/backup-node-02` and executing an automated rollback repair sweep.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 2: CORRUPTION DIAGNOSTICS SANDBOX
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Corruption Sandbox" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-500" />
                  CORRUPTION SANDBOX
                </h1>
                <p className="text-slate-400 text-xs mt-1">Configure scan boundaries, adjust depth sizes, and watch cryptographic checksum validation loops run live.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Configuration panel */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Scan Configuration</h3>
                    <p className="text-slate-500 text-[10px]">Tweak hash validations & buffer limits</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Select Server Directory</label>
                      <select 
                        value={selectedDirectory}
                        onChange={e => {
                          const val = e.target.value;
                          setSelectedDirectory(val);
                          setPredictOutput(null);
                          if (val === "uploaded" && uploadedData) {
                            setPlaygroundActiveTab("summary");
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none text-xs font-semibold"
                      >
                        {isLiveBackend && (
                          <option value="live_sandbox">🔍 sandbox_files/ (Real Checksums)</option>
                        )}
                        <option value="etc">/etc (System Configuration Files)</option>
                        <option value="var">/var/lib (Database Storage Files)</option>
                        <option value="usr">/usr/bin (Core System Binaries)</option>
                        <option value="upload">📁 Upload Custom Syslog CSV/JSON...</option>
                        {uploadedData && (
                          <option value="uploaded">📊 Custom: {uploadedData.name}</option>
                        )}
                      </select>
                    </div>

                    {/* Drag-and-drop file upload zone */}
                    {selectedDirectory === "upload" && (
                      <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-3 relative">
                        {isParsing ? (
                          <div className="py-6 flex flex-col items-center justify-center space-y-2">
                            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                            <span className="text-[10px] text-slate-400 font-mono">PARSING CHECKSUM LOG...</span>
                          </div>
                        ) : (
                          <div className="py-6 flex flex-col items-center justify-center space-y-2 cursor-pointer group">
                            <Upload className="w-8 h-8 text-slate-600 group-hover:text-red-500 transition-colors mb-1" />
                            <span className="text-xs font-bold text-slate-300 group-hover:text-white">Choose a CSV or JSON file</span>
                            <span className="text-[9px] text-slate-600">Drag & drop or click to browse</span>
                            <input 
                              type="file" 
                              required
                              accept=".csv,.json" 
                              onChange={handleFileUpload} 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dynamic config for uploaded data */}
                    {selectedDirectory === "uploaded" && uploadedData && (
                      <div className="space-y-4 pt-2 border-t border-slate-900/50">
                        <div>
                          <label className="block text-slate-400 font-medium mb-1.5">Target Label Column</label>
                          <select 
                            value={targetColumn}
                            onChange={e => {
                              const val = e.target.value;
                              setTargetColumn(val);
                              setSelectedFeatures(uploadedData.headers.filter(h => h !== val));
                              setPredictOutput(null);
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none font-mono text-[10px]"
                          >
                            {uploadedData.headers.map(h => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-medium mb-1.5">Feature Column Set</label>
                          <div className="max-h-40 overflow-y-auto border border-slate-900 bg-slate-950/60 rounded-lg p-2.5 space-y-1.5 scrollbar-thin">
                            {uploadedData.headers.map(h => {
                              if (h === targetColumn) return null;
                              const isChecked = selectedFeatures.includes(h);
                              return (
                                <label key={h} className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                                  <input 
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      if (isChecked) {
                                        setSelectedFeatures(selectedFeatures.filter(f => f !== h));
                                      } else {
                                        setSelectedFeatures([...selectedFeatures, h]);
                                      }
                                      setPredictOutput(null);
                                    }}
                                    className="rounded border-slate-800 bg-slate-900 text-red-600 focus:ring-0 w-3.5 h-3.5"
                                  />
                                  <span className="font-mono text-[10px] truncate">{h}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDirectory !== "upload" && (
                      <>
                        <div>
                          <label className="block text-slate-400 font-medium mb-1.5">Detection Engine</label>
                          <select 
                            value={selectedEngine}
                            onChange={e => {
                              setSelectedEngine(e.target.value);
                              setPredictOutput(null);
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none"
                          >
                            <option value="sha256">SHA-256 Checksum Validator</option>
                            <option value="lstm">Heuristic File Anomaly Scanner</option>
                            <option value="kelly">Metadata Correlation Engine</option>
                          </select>
                        </div>

                        {/* Sweeps controllers */}
                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Target Integrity Rating (%)</span>
                            <span className="text-red-400 font-mono font-bold">{targetIntegrity}%</span>
                          </div>
                          <input 
                            type="range" min="90.0" max="100.0" step="0.1" value={targetIntegrity} 
                            onChange={e => setTargetIntegrity(Number(e.target.value))}
                            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500" 
                          />

                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Scan Directory Depth</span>
                            <span className="text-red-400 font-mono font-bold">{scanDepth} levels</span>
                          </div>
                          <input 
                            type="range" min="1" max="6" step="1" value={scanDepth} 
                            onChange={e => setScanDepth(Number(e.target.value))}
                            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500" 
                          />

                          {selectedEngine === "sha256" && (
                            <>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">File Ingestion Buffer Limit</span>
                                <span className="text-red-400 font-mono font-bold">{bufferSize} files</span>
                              </div>
                              <input 
                                type="range" min="10" max="200" step="10" value={bufferSize} 
                                onChange={e => setBufferSize(Number(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500" 
                              />
                            </>
                          )}

                          {selectedEngine === "lstm" && (
                            <>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">Epoch Iterations Limit</span>
                                <span className="text-red-400 font-mono font-bold">{bufferSize} epochs</span>
                              </div>
                              <input 
                                type="range" min="10" max="100" step="5" value={bufferSize} 
                                onChange={e => setBufferSize(Number(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500" 
                              />
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {selectedDirectory !== "upload" && (
                    <button
                      onClick={handleRunSimulation}
                      disabled={isSimulating}
                      className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      {isSimulating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Scanning Sectors {simProgress}%
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Execute Integrity Scan
                        </>
                      )}
                    </button>
                  )}

                  {isLiveBackend && (
                    <div className="pt-4 border-t border-slate-900 space-y-2.5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live FIM Daemon Controls
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch("http://localhost:8000/api/baseline", { method: "POST" });
                              if (res.ok) {
                                alert("Baseline successfully initialized and backed up.");
                                fetchFiles();
                                fetchLogs();
                              }
                            } catch (e) {
                              alert("API communications offline.");
                            }
                          }}
                          className="py-2 px-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white text-[9px] font-bold font-mono transition-colors"
                          title="Generate trusted baseline of sandbox folder"
                        >
                          Init Baseline
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch("http://localhost:8000/api/corrupt", { 
                                method: "POST", 
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({}) 
                              });
                              if (res.ok) {
                                alert("Simulated corruption injected successfully.");
                                fetchFiles();
                                fetchLogs();
                              }
                            } catch (e) {
                              alert("API communications offline.");
                            }
                          }}
                          className="py-2 px-1 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 hover:text-red-300 text-[9px] font-bold font-mono transition-colors"
                          title="Artificially modify files to trigger integrity failure"
                        >
                          Corrupt File
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch("http://localhost:8000/api/restore", { method: "POST" });
                              if (res.ok) {
                                alert("Rollback triggered. Baseline files restored.");
                                fetchFiles();
                                fetchLogs();
                              }
                            } catch (e) {
                              alert("API communications offline.");
                            }
                          }}
                          className="py-2 px-1 rounded-lg border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 text-[9px] font-bold font-mono transition-colors"
                          title="Rollback all changes from backup copies"
                        >
                          Self Heal
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Training monitor & Output charts */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6 min-h-[420px] flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-900">
                    <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                      <button
                        onClick={() => setPlaygroundActiveTab("simulation")}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          playgroundActiveTab === "simulation"
                            ? "bg-red-600/10 text-red-400 border border-red-500/20"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Sector Diagnostics
                      </button>
                      <button
                        onClick={() => setPlaygroundActiveTab("drivers")}
                        disabled={corruptionDrivers.length === 0}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          corruptionDrivers.length === 0 ? "opacity-30 cursor-not-allowed" : ""
                        } ${
                          playgroundActiveTab === "drivers"
                            ? "bg-red-600/10 text-red-400 border border-red-500/20"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Corruption Drivers
                      </button>
                      {uploadedData && (
                        <button
                          onClick={() => setPlaygroundActiveTab("summary")}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            playgroundActiveTab === "summary"
                              ? "bg-red-600/10 text-red-400 border border-red-500/20"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          Data Summary
                        </button>
                      )}
                      {isLiveBackend && (
                        <button
                          onClick={() => setPlaygroundActiveTab("live_files" as any)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            playgroundActiveTab === ("live_files" as any)
                              ? "bg-red-600/10 text-red-400 border border-red-500/20"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          Watch Directory (Live)
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      {isSimulating ? "RUNNING CHECK-SUM CHECK" : simMetrics.length > 0 ? "SECTOR SCAN COMPLETE" : "IDLE"}
                    </span>
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-1 flex flex-col justify-center">
                    
                    {/* Tab 1: SIMULATION GRAPH */}
                    {playgroundActiveTab === "simulation" && (
                      <div className="flex-1 flex flex-col justify-center">
                        {simMetrics.length === 0 && !isSimulating ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                            <Cpu className="w-12 h-12 text-slate-700 animate-pulse" />
                            <h4 className="text-slate-400 font-bold text-sm">No Active Diagnostic Scans</h4>
                            <p className="text-slate-600 text-xs max-w-sm">Select directory, configure targets, and execute sweeps to view real-time sector logs.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Data Integrity & Outage Risk</h4>
                            <div className="h-44 text-[10px] font-mono">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={simMetrics}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="step" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Legend />
                                  <Line type="monotone" dataKey="integrity" name="System Integrity (%)" stroke="#f43f5e" dot={false} strokeWidth={2} />
                                  <Line type="monotone" dataKey="errorRate" name="Corruption Rate (%)" stroke="#eab308" dot={false} strokeWidth={2} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 2: DRIVERS WEIGHT */}
                    {playgroundActiveTab === "drivers" && (
                      <div className="flex-1 flex flex-col justify-center">
                        {corruptionDrivers.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                            <Sliders className="w-12 h-12 text-slate-700 animate-pulse" />
                            <h4 className="text-slate-400 font-bold text-sm">No Drivers Evaluated</h4>
                            <p className="text-slate-600 text-xs max-w-sm">Execute an integrity scan to map primary corruption factors.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Corruption Factors Weights (%)</h4>
                            <div className="h-44 text-[10px] font-mono">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={corruptionDrivers} layout="vertical">
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis type="number" stroke="#64748b" />
                                  <YAxis dataKey="name" type="category" stroke="#64748b" width={90} />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Bar dataKey="weight" fill="#f97316" radius={[0, 4, 4, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 3: SUMMARY */}
                    {playgroundActiveTab === "summary" && uploadedData && (
                      <div className="space-y-4 overflow-y-auto max-h-[300px] scrollbar-thin pr-1 text-xs">
                        <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/80 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                              <FileSpreadsheet className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                              <div className="text-white font-bold truncate max-w-[200px]">{uploadedData.name}</div>
                              <div className="text-[10px] text-slate-500">{uploadedData.size}</div>
                            </div>
                          </div>
                          <div className="flex gap-4 text-center font-mono">
                            <div>
                              <div className="text-slate-500 text-[9px] uppercase font-bold">Rows</div>
                              <div className="text-white font-bold">{uploadedData.rows.length.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-[9px] uppercase font-bold">Columns</div>
                              <div className="text-white font-bold">{uploadedData.headers.length}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {playgroundActiveTab === ("live_files" as any) && (
                      <div className="space-y-4 overflow-y-auto max-h-[300px] scrollbar-thin pr-1 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-900 font-mono">
                          <span className="text-[10px] text-slate-500">MONITOR PATH: sandbox_files/</span>
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            LIVE DAEMON SYNC
                          </span>
                        </div>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-slate-900 text-left text-slate-500 font-bold text-[9px] uppercase tracking-wider font-mono">
                              <th className="pb-2">Filename</th>
                              <th className="pb-2">Size</th>
                              <th className="pb-2">Baseline SHA-256</th>
                              <th className="pb-2">Current SHA-256</th>
                              <th className="pb-2 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900 font-mono text-[10px]">
                            {liveFiles.map((file: any, fIdx: number) => (
                              <tr key={fIdx} className="hover:bg-slate-900/30">
                                <td className="py-2.5 text-white font-bold">{file.filename}</td>
                                <td className="py-2.5 text-slate-400">{file.size_bytes} B</td>
                                <td className="py-2.5 text-slate-500">{file.baseline_hash}</td>
                                <td className="py-2.5 text-slate-400">{file.current_hash}</td>
                                <td className="py-2.5 text-right">
                                  <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold ${
                                    file.status === "SECURE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                    file.status === "CORRUPTED" ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse" :
                                    "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  }`}>
                                    {file.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                </div>

                {/* Sandbox Checksum Test Block */}
                {simMetrics.length > 0 && !isSimulating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Test Cryptographic Hash Integrity</h4>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-500">Target Path</label>
                        <input 
                          type="text" value={predictInputs.file_path} 
                          onChange={e => setPredictInputs({...predictInputs, file_path: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1 font-mono text-[9px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Current Checksum</label>
                        <input 
                          type="text" value={predictInputs.current_checksum}
                          onChange={e => setPredictInputs({...predictInputs, current_checksum: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1 font-mono text-[9px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Expected Checksum</label>
                        <input 
                          type="text" value={predictInputs.expected_checksum}
                          onChange={e => setPredictInputs({...predictInputs, expected_checksum: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1 font-mono text-[9px]"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleRunInference}
                      className="w-full py-2 rounded bg-red-600 hover:bg-red-500 font-bold text-white text-[10px]"
                    >
                      {isPredicting ? "Calculating hashes..." : "Verify Cryptographic Hashes"}
                    </button>

                    {/* Output display */}
                    {predictOutput && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className={`p-3 rounded border text-[11px] font-mono flex items-center justify-between ${
                          predictOutput.includes("ALERT") 
                            ? "bg-red-500/10 border-red-500/20 text-red-400" 
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        <span>Integrity Result:</span>
                        <span className="font-bold">{predictOutput}</span>
                      </motion.div>
                    )}
                  </motion.div>
                )}

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 3: SYSLOG INGESTION
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Syslog Ingestion" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-red-400" />
                  SYSLOG INGESTION PIPELINES
                </h1>
                <p className="text-slate-400 text-xs mt-1">Simulate visual nodes connector pipelines parsing Unix logs and auth syslog streams.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                
                {/* Node Canvas Simulator */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
                  
                  {/* Grid background on canvas */}
                  <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

                  <div className="relative z-10 flex justify-between items-center border-b border-slate-900 pb-3">
                    <h3 className="text-white font-bold text-sm">System Ingestion Canvas</h3>
                    <button 
                      onClick={handleRunPipeline}
                      disabled={isPipelineRunning}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-500/10 flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Run Ingest
                    </button>
                  </div>

                  {/* Canvas nodes */}
                  <div className="relative z-10 flex-1 py-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                    
                    {/* Node 1: INGESTION */}
                    <div 
                      onClick={() => setSelectedPipelineNode("s3")}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all w-28 md:w-32 hover:scale-105 ${
                        pipelineStep === 2 ? "border-yellow-500 bg-yellow-500/10 animate-pulse" :
                        pipelineStep > 2 ? "border-emerald-500 bg-emerald-500/10" :
                        selectedPipelineNode === "s3" ? "border-red-500 bg-red-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <DatabaseZap className="w-8 h-8 text-red-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">Syslog Ingest</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #1</span>
                    </div>

                    {/* Connector line 1 */}
                    <div className="h-6 md:h-0.5 md:w-10 border-l md:border-t border-slate-800 border-dashed flex-1" />

                    {/* Node 2: PREPROCESS */}
                    <div 
                      onClick={() => setSelectedPipelineNode("preprocess")}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all w-28 md:w-32 hover:scale-105 ${
                        pipelineStep === 3 ? "border-yellow-500 bg-yellow-500/10 animate-pulse" :
                        pipelineStep > 3 ? "border-emerald-500 bg-emerald-500/10" :
                        selectedPipelineNode === "preprocess" ? "border-red-500 bg-red-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Sliders className="w-8 h-8 text-orange-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">Log Parser</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #2</span>
                    </div>

                    {/* Connector line 2 */}
                    <div className="h-6 md:h-0.5 md:w-10 border-l md:border-t border-slate-800 border-dashed flex-1" />

                    {/* Node 3: TRAIN */}
                    <div 
                      onClick={() => setSelectedPipelineNode("train")}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all w-28 md:w-32 hover:scale-105 ${
                        pipelineStep === 4 || pipelineStep === 5 ? "border-yellow-500 bg-yellow-500/10 animate-pulse" :
                        pipelineStep > 5 ? "border-emerald-500 bg-emerald-500/10" :
                        selectedPipelineNode === "train" ? "border-red-500 bg-red-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Brain className="w-8 h-8 text-yellow-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">Anomaly Scanner</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #3</span>
                    </div>

                    {/* Connector line 3 */}
                    <div className="h-6 md:h-0.5 md:w-10 border-l md:border-t border-slate-800 border-dashed flex-1" />

                    {/* Node 4: DEPLOY */}
                    <div 
                      onClick={() => setSelectedPipelineNode("deploy")}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all w-28 md:w-32 hover:scale-105 ${
                        pipelineStep === 6 ? "border-emerald-500 bg-emerald-500/10 shadow shadow-emerald-500/20" :
                        selectedPipelineNode === "deploy" ? "border-red-500 bg-red-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Globe className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">Alert Webhook</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #4</span>
                    </div>

                  </div>

                  {/* Active node descriptor */}
                  <div className="relative z-10 p-4 rounded-xl bg-slate-950/80 border border-slate-900 text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Canvas Node Configurator</span>
                    <div className="mt-2 text-slate-300 font-mono text-[11px]">
                      {selectedPipelineNode === "s3" && "Syslog Node: Set log directory targets, parse filters (auth, errors, warnings), and sync ingestion frequency."}
                      {selectedPipelineNode === "preprocess" && "Log Parser Node: Apply regex filters, auto-extract variables (IP address, PID, error code), and decode messages."}
                      {selectedPipelineNode === "train" && "Anomaly Scanner Node: Fits real-time log records to heuristic checksum detectors."}
                      {selectedPipelineNode === "deploy" && "Alert Webhook Node: Deploy JSON webhook dispatches to alert channels (Slack/PagerDuty) on error limits."}
                      {!selectedPipelineNode && "Click on any node above to verify or configure its system parameters."}
                    </div>
                  </div>
                </div>

                {/* Pipeline logs terminal */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
                  <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-red-500" />
                      Live syslog streams
                    </h3>
                  </div>

                  <div className="flex-1 bg-slate-950/80 p-4 border border-slate-900/50 rounded-xl my-4 font-mono text-[10px] space-y-2 overflow-y-auto text-slate-300">
                    {pipelineLogs.length === 0 ? (
                      <span className="text-slate-600">&gt; Awaiting pipeline execute trigger...</span>
                    ) : (
                      pipelineLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-red-500">[{idx+1}]</span>
                          <span className={log.includes("SLA") || log.includes("finalized") || log.includes("SUCCESS") || log.includes("Endpoint") ? "text-emerald-400" : "text-slate-300"}>
                            {log}
                          </span>
                        </div>
                      ))
                    )}
                    {isPipelineRunning && (
                      <div className="flex items-center gap-2 text-red-400 animate-pulse mt-4">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>SCANNING LOG METADATA...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-[10px] text-slate-500">
                    Syslog pipelines auto-parse Unix event logs. Webhooks trigger incident pages on error matches.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 4: AI COPILOT CHATROOM
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Incident Response Copilot" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-red-400" />
                  INCIDENT RESPONSE COPILOT
                </h1>
                <p className="text-slate-400 text-xs mt-1">Ask questions about checksum logs, data corruption events, or how to isolate broken servers.</p>
              </div>

              {/* Chat panel */}
              <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl h-[560px] flex flex-col justify-between">
                
                {/* Chat messages viewport */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-thin">
                  {chatHistory.map((chat, idx) => (
                    <div 
                      key={idx}
                      className={`flex gap-3 max-w-[80%] ${
                        chat.sender === "user" ? "ml-auto flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        chat.sender === "user" ? "bg-orange-500/20 text-orange-400 border border-orange-500/10" : "bg-red-600/20 text-red-400 border border-red-500/10"
                      }`}>
                        {chat.sender === "user" ? "U" : "AI"}
                      </div>
                      
                      <div className="space-y-4">
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed border ${
                          chat.sender === "user" 
                            ? "bg-slate-900 border-slate-800 text-slate-200 rounded-tr-none" 
                            : "bg-slate-950/80 border-slate-900 text-slate-300 rounded-tl-none"
                        }`}>
                          {chat.text}
                        </div>

                        {/* Inline Recharts Widget inside Chat */}
                        {chat.chartData && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 rounded-xl border border-slate-900 bg-slate-950/90 h-52 text-[10px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              {chat.chartType === "bar" ? (
                                <BarChart data={chat.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="name" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Bar dataKey="Conversion" name="Incidents Count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              ) : chat.chartType === "line" ? (
                                <LineChart data={chat.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="time" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Line type="monotone" dataKey="Latency" name="Scan Latency (ms)" stroke="#fb923c" strokeWidth={2} />
                                </LineChart>
                              ) : (
                                <AreaChart data={chat.chartData}>
                                  <defs>
                                    <linearGradient id="chartRev" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="month" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Area type="monotone" dataKey="Revenue" name="Integrity score (%)" stroke="#f43f5e" fill="url(#chartRev)" strokeWidth={2} />
                                </AreaChart>
                              )}
                            </ResponsiveContainer>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 border border-red-500/10 flex items-center justify-center text-sm font-bold">
                        AI
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-slate-500 text-xs flex items-center gap-1.5 rounded-tl-none">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Nova AI Copilot is querying active directory structures...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Prebuilt Prompts Chips */}
                <div className="flex flex-wrap gap-2 py-3 border-t border-slate-900">
                  {[
                    "Show active server data corruption logs",
                    "Check system check-sum latency spikes",
                    "Draft server quarantine shell script"
                  ].map(chip => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-[10px] font-semibold transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask Copilot about filesystem logs, checksum status, or incident mitigations..."
                    className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-slate-300 text-xs outline-none focus:border-red-500/60 transition-all"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 5: INCIDENT FORECASTING
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Incident Forecasting" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-red-400" />
                  INCIDENT & OUTAGE FORECASTING
                </h1>
                <p className="text-slate-400 text-xs mt-1">Select metric models and render warning spikes or hardware failure forecasts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Forecasting controls */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Forecast Controls</h3>
                    <p className="text-slate-500 text-[10px]">Select metric & timeline bounds</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Target Metric</label>
                      <select 
                        value={selectedForecastMetric}
                        onChange={e => {
                          setSelectedForecastMetric(e.target.value);
                          setForecastResult([]);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none"
                      >
                        <option value="incidents">Data Corruption Incidents Count</option>
                        <option value="users">System Integrity Score (%)</option>
                        <option value="traffic">Alert Webhook Volume (requests/hr)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Forecast Horizon</label>
                      <select 
                        value={forecastHorizon}
                        onChange={e => {
                          setForecastHorizon(Number(e.target.value));
                          setForecastResult([]);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none"
                      >
                        <option value={30}>30 Days Horizon</option>
                        <option value={90}>90 Days Horizon</option>
                        <option value={180}>180 Days Horizon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Algorithm Engine</label>
                      <select 
                        value={forecastModel}
                        onChange={e => {
                          setForecastModel(e.target.value);
                          setForecastResult([]);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none"
                      >
                        <option value="prophet">Facebook Prophet (Additive Curve)</option>
                        <option value="arima">ARIMA Auto-Regressive Drift</option>
                        <option value="lstm">LSTM Neural Network</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateForecast}
                    disabled={isForecasting}
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    {isForecasting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Fitting Curve...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-3.5 h-3.5" />
                        Generate Forecast
                      </>
                    )}
                  </button>
                </div>

                {/* Forecast chart display */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6 min-h-[400px] flex flex-col justify-between">
                  <div className="border-b border-slate-900 pb-3">
                    <h3 className="text-white font-bold text-sm">Forecast Horizon Chart</h3>
                  </div>

                  {forecastResult.length === 0 && !isForecasting ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                      <TrendingUp className="w-12 h-12 text-slate-700 animate-pulse" />
                      <h4 className="text-slate-400 font-bold text-sm">Waiting for Model Run</h4>
                      <p className="text-slate-600 text-xs max-w-sm">Select metrics, adjust forecast algorithms, and launch training projection.</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-4">
                      
                      {/* Metric lines chart */}
                      <div className="h-64 text-[10px] font-mono">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={forecastResult}>
                            <defs>
                              <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                            <Legend />
                            <Line type="monotone" dataKey="Historical" name="Historical Actual" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="Forecast" name="Model Forecast" stroke="#f97316" strokeDasharray="5 5" strokeWidth={2.5} dot={{ r: 4 }} />
                            <Area type="monotone" dataKey="Upper" stroke="none" fill="url(#forecastBand)" legendType="none" />
                            <Area type="monotone" dataKey="Lower" stroke="none" fill="url(#forecastBand)" legendType="none" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Forecast stats card */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-900 text-center">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">MAE Drift</div>
                          <div className="text-sm font-bold text-white mt-1">2.12%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">RMSE Margin</div>
                          <div className="text-sm font-bold text-white mt-1">1.42</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">Fit Accuracy</div>
                          <div className="text-sm font-bold text-emerald-400 mt-1">98.4%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-[10px] text-slate-500 font-mono">
                    projections fit additive ARIMA parameters. Incident thresholds expand as horizons lengthen.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 6: CONTAINMENT WEBHOOKS (API TESTING)
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Containment Webhooks" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-red-400" />
                  CONTAINMENT WEBHOOKS
                </h1>
                <p className="text-slate-400 text-xs mt-1">Test active incident containment webhooks and verify payload dispatches.</p>
              </div>

              {/* Endpoint list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Registry panel */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Containment Registry</h3>
                    <p className="text-slate-500 text-[10px]">Select active webhook to test server response</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "server-quarantine-webhook", model: "WAF isolation rule", status: "ONLINE", rate: "4.2 dispatches/min", path: "/api/v1/quarantine" },
                      { name: "database-rollback-trigger", model: "Automated state rollback", status: "ONLINE", rate: "1.2 dispatches/min", path: "/api/v1/rollback" },
                      { name: "pagerduty-incident-alert", model: "PagerDuty Pager Trigger", status: "ONLINE", rate: "820 dispatches/min", path: "/api/v1/pagerduty" }
                    ].map(endpoint => (
                      <div 
                        key={endpoint.name}
                        onClick={() => {
                          setApiTesterEndpoint(endpoint.name);
                          if (endpoint.name === "server-quarantine-webhook") {
                            setApiTesterInput(`{\n  "target_node": "Server-East-04",\n  "incident_id": "err_f839a2d",\n  "quarantine_network": "10.0.4.0/24",\n  "containment_level": "critical"\n}`);
                          } else if (endpoint.name === "database-rollback-trigger") {
                            setApiTesterInput(`{\n  "db_pool": "MySQL-Pool-01",\n  "target_timestamp": "${new Date(Date.now() - 3600000).toISOString()}",\n  "rollback_checksum": "cf82d0"\n}`);
                          } else {
                            setApiTesterInput(`{\n  "service_key": "pd_active_keys",\n  "alert_summary": "Critical: Directory /var/lib/mysql integrity check failed!",\n  "severity": "CRITICAL"\n}`);
                          }
                          setApiTesterOutput("");
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          apiTesterEndpoint === endpoint.name 
                            ? "border-red-500 bg-red-500/5" 
                            : "border-slate-800 hover:border-slate-700 bg-slate-950/60"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white truncate">{endpoint.name}</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold">
                            {endpoint.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>{endpoint.model}</span>
                          <span>{endpoint.rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Request Tester */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h3 className="text-white font-bold text-sm">HTTP Request Poster</h3>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-slate-950 px-3 py-1 rounded border border-slate-900">
                      <span className="text-red-400 font-bold">POST</span>
                      <span>novaalert.api/v1/{apiTesterEndpoint}</span>
                    </div>
                  </div>

                  {/* Body inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* JSON Input panel */}
                    <div className="space-y-2">
                      <label className="block text-slate-400 text-xs font-medium">JSON Request Body</label>
                      <textarea
                        value={apiTesterInput}
                        onChange={e => setApiTesterInput(e.target.value)}
                        className="w-full h-48 bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-300 outline-none resize-none focus:border-red-500/60"
                      />
                    </div>

                    {/* JSON Output panel */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-slate-400 text-xs font-medium">JSON Response Payload</label>
                        {isApiTesting && <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />}
                      </div>
                      <div className="w-full h-48 bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-400 overflow-y-auto whitespace-pre">
                        {apiTesterOutput || "{\n  // Click trigger below to verify automated containment responses\n}"}
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={handleTestApi}
                    disabled={isApiTesting}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
                  >
                    {isApiTesting ? "Awaiting network dispatch..." : "Trigger Containment Action"}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 7: SETTINGS PANEL
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Workspace Settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <SettingsIcon className="w-6 h-6 text-red-400" />
                  WORKSPACE SETTINGS
                </h1>
                <p className="text-slate-400 text-xs mt-1">Configure workspace credentials, webhook integrations, and scan limits.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Security settings */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">API Key Provisioning</h3>
                    <p className="text-slate-500 text-[10px]">Create secure access credentials for external syslog streams</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <label className="block text-slate-400 font-medium">Developer Active API Key</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-lg px-3 py-2.5 font-mono text-[10px] text-slate-300 flex items-center justify-between">
                          <span className="truncate">{apiKey}</span>
                          <Key className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        </div>
                        <button
                          onClick={handleGenerateApiKey}
                          className="px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all text-xs"
                        >
                          Generate New
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {generatedKeyMsg && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono font-bold"
                        >
                          SUCCESS: Key randomized. Remember to copy the token!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <label className="text-slate-400 font-medium">Hourly Scan Limit</label>
                        <span className="text-red-400 font-bold font-mono">{rateLimit.toLocaleString()} scans/hr</span>
                      </div>
                      <input 
                        type="range" min="1000" max="25000" step="500" value={rateLimit} 
                        onChange={e => setRateLimit(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Subscriptions */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Billing & Team Profile</h3>
                    <p className="text-slate-500 text-[10px]">Manage compute tiers and team access credentials</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/60">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">ACTIVE TIER</div>
                        <div className="text-sm font-black text-white mt-1">Sentinel Professional</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/60">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">INTEGRATED WEBHOOKS</div>
                        <div className="text-sm font-black text-white mt-1">Slack & PagerDuty</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-slate-400 font-medium">Associated Github Profile</label>
                      <input
                        type="text"
                        disabled
                        value="@dsv2007 (Santhivarshini D)"
                        className="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2.5 text-slate-500 font-semibold"
                      />
                    </div>
                    
                    <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-[10px] text-slate-400 leading-relaxed font-mono">
                      💡 Recruiter Notice: The simulated parameters, logs, charts, and API testers are pre-integrated into this sandboxed Next.js app to display advanced interactive logic and design architecture on a single, deployable codebase.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}