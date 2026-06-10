"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Background from "@/components/Background";
import { motion } from "framer-motion";
import { 
  Brain, 
  Cpu, 
  Database, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Network
} from "lucide-react";

export default function Home() {
  const [optimizerStep, setOptimizerStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [metrics, setMetrics] = useState({
    accuracy: 78.4,
    latency: 182,
    throughput: 1200
  });

  // Optimize animation sequence
  useEffect(() => {
    if (!isOptimizing) return;
    
    const t0 = setTimeout(() => {
      setOptimizerStep(1); // Ingestion
    }, 0);
    
    const t1 = setTimeout(() => {
      setOptimizerStep(2); // Training
      // Simulate metric changes
      const interval = setInterval(() => {
        setMetrics(m => ({
          accuracy: Math.min(97.8, Number((m.accuracy + 1.2).toFixed(1))),
          latency: Math.max(45, m.latency - 8),
          throughput: Math.min(3500, m.throughput + 140)
        }));
      }, 100);
      
      const t2 = setTimeout(() => {
        clearInterval(interval);
        setOptimizerStep(3); // Deploying
        
        const t3 = setTimeout(() => {
          setOptimizerStep(4); // Finished
          setIsOptimizing(false);
        }, 1500);
        
        return () => clearTimeout(t3);
      }, 2000);
      
      return () => {
        clearTimeout(t2);
        clearInterval(interval);
      };
    }, 1500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [isOptimizing]);

  const handleStartOptimization = () => {
    if (isOptimizing) return;
    setMetrics({ accuracy: 78.4, latency: 182, throughput: 1200 });
    setOptimizerStep(0);
    setIsOptimizing(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots relative overflow-hidden pt-24">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center">
        
        {/* Banner Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold tracking-wide mb-8 shadow-inner shadow-red-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Data Integrity & System Corruption Alert Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 max-w-4xl"
        >
          Detect Data Corruption <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-amber-500">
            & Automate Mitigation
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
Nova AI
Protect Filesystems, Databases, and APIs from Corruption        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 z-20"
        >
          <Link href="/platform" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2 group">
            Launch Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/services" className="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 font-semibold transition-all duration-200">
            Explore Services
          </Link>
        </motion.div>

        {/* Interactive MLOps Optimizer Sandbox ( recruiter wow-factor ) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/80 mb-28 text-left"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-slate-500 text-xs font-semibold font-mono ml-4">Nova AI-sandbox:~/corruption-detector</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase font-mono">
                API ONLINE
              </span>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Control Panel */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-red-500" />
                  Corruption Detector
                </h3>
                <p className="text-slate-500 text-xs">Scan checksums and detect data corruption in real-time</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5">Select Directory / Data Pool</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 text-xs outline-none">
                    <option>Filesystem Metadata Logs (680MB)</option>
                    <option>Database Checksum Hashes (1.2GB)</option>
                    <option>System Configuration Changes (220MB)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5">Detection Engine</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 text-xs outline-none">
                    <option>SHA-256 Checksum Validator</option>
                    <option>Heuristic File Anomaly Scanner</option>
                    <option>Metadata Correlation Engine</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleStartOptimization}
                disabled={isOptimizing}
                className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isOptimizing 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/15"
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${isOptimizing ? "animate-spin" : ""}`} />
                {isOptimizing ? "Scanning Sectors..." : "Execute Integrity Check"}
              </button>
            </div>

            {/* Live Progress Output */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 md:col-span-2 flex flex-col justify-between min-h-[240px] font-mono">
              <div className="space-y-2 text-xs">
                <div className="text-slate-500 flex items-center justify-between border-b border-slate-900 pb-1.5">
                  <span>STEP</span>
                  <span>STATUS</span>
                </div>
                
                {/* Steps logs */}
                <div className="space-y-1.5 overflow-y-auto max-h-[140px] pr-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">&gt; Initialize sandboxed environment</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                  
                  {optimizerStep >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between">
                      <span className="text-slate-300">&gt; Loading filesystem logs & checksum tables...</span>
                      <span className="text-orange-400 animate-pulse">LOADING</span>
                    </motion.div>
                  )}
                  {optimizerStep >= 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between">
                      <span className="text-slate-300">&gt; Performing hash checks against trust signatures...</span>
                      <span className="text-yellow-400 animate-bounce">CHECKING</span>
                    </motion.div>
                  )}
                  {optimizerStep >= 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between">
                      <span className="text-red-400 font-bold animate-pulse">&gt; Warning: Corrupted sector found at /var/lib/data-04...</span>
                      <span className="text-red-500 font-bold">ALERT</span>
                    </motion.div>
                  )}
                  {optimizerStep === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between">
                      <span className="text-emerald-400 font-bold">&gt; Containment successful. Recovery agents armed.</span>
                      <span className="text-emerald-400 font-bold">SECURED</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-4 mt-4 text-center">
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 mb-0.5">INTEGRITY SCORE</div>
                  <div className="text-sm font-bold text-white font-mono">{metrics.accuracy}%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 mb-0.5">SCAN LATENCY</div>
                  <div className="text-sm font-bold text-white font-mono">{metrics.latency}ms</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 mb-0.5">SCAN SPEED</div>
                  <div className="text-sm font-bold text-white font-mono">{metrics.throughput * 10} files/s</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl border-y border-slate-800/80 py-12 mb-28 text-center">
          {[
            { value: "99.99%", label: "Data Integrity SLA", color: "text-red-400" },
            { value: "12ms", label: "Mean Time to Detect (MTTD)", color: "text-orange-400" },
            { value: "2,400+", label: "Active Directory Sensors", color: "text-amber-400" },
            { value: "100+", label: "Automated Incident Triggers", color: "text-purple-400" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className={`text-4xl font-extrabold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Enterprise Core Features</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">Built for System Scale</h3>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mt-4">
            Everything your team needs to monitor directory integrity, analyze logs, and quarantine file corruption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Cpu className="w-6 h-6 text-red-400" />,
              title: "Automated Checksum Scans",
              desc: "Auto-scan directories, verify cryptographic hash logs, detect file changes, and isolate anomalous folder modifications."
            },
            {
              icon: <Database className="w-6 h-6 text-orange-400" />,
              title: "Distributed SIEM Ingestion",
              desc: "Aggregate system dumps and check-sum logs across server clusters, database pools, and multi-region cloud storage buckets."
            },
            {
              icon: <Network className="w-6 h-6 text-amber-400" />,
              title: "Automated Recovery Agents",
              desc: "Deploy real-time containment webhooks. Trigger quarantines, block access paths, send PagerDuty alerts, and pull clean backups instantly."
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
                  {feature.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Background />
    </main>
  );
}