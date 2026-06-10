"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Database, 
  Brain, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Shield,
  Activity
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar,
  Legend,
  Line
} from "recharts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Corruption Analysis", "Alert Latency", "Audit Post-Mortems"];

  // Mock revenue chart data
  const revenueData = [
    { month: "Jan", Scans: 140, Errors: 2 },
    { month: "Feb", Scans: 165, Errors: 4 },
    { month: "Mar", Scans: 180, Errors: 1 },
    { month: "Apr", Scans: 210, Errors: 12 },
    { month: "May", Scans: 245, Errors: 8 },
    { month: "Jun", Scans: 290, Errors: 3 }
  ];

  // Mock user chart data
  const userData = [
    { month: "Jan", Active: 12000, New: 2200 },
    { month: "Feb", Active: 18000, New: 3400 },
    { month: "Mar", Active: 24000, New: 4100 },
    { month: "Apr", Active: 32000, New: 5800 },
    { month: "May", Active: 40000, New: 6800 },
    { month: "Jun", Active: 48392, New: 8234 }
  ];

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-red-500" />
              Sentinel Command Center
            </h1>
            <p className="text-slate-400 text-xs mt-1">Unified high-level metrics across filesystem checksums and security incident streams.</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/platform" 
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 flex items-center gap-1.5 group"
            >
              Open Platform Cockpit
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-slate-900 overflow-x-auto pb-px">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 outline-none ${
                activeTab === tab 
                  ? "border-red-500 text-red-400 bg-red-500/5" 
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Views */}
        
        {/* ──────── TAB 1: OVERVIEW ──────── */}
        {activeTab === "Overview" && (
          <div className="space-y-8">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Data Integrity SLA", value: "99.982%", change: "SLA Compliant", icon: <Shield className="w-5 h-5 text-red-500" /> },
                { label: "Active Directory Sensors", value: "2,482 Sensors", change: "+12.4% coverage", icon: <Activity className="w-5 h-5 text-orange-400" /> },
                { label: "Daily Log Records", value: "1.2B Logs", change: "99.99% RPC availability", icon: <Database className="w-5 h-5 text-amber-400" /> },
                { label: "Automated Remediation Runs", value: "1,847 Runs", change: "+5.7% accuracy", icon: <Brain className="w-5 h-5 text-purple-400" /> }
              ].map((card, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{card.label}</span>
                    <h3 className="text-2xl font-black text-white font-mono">{card.value}</h3>
                    <p className="text-[10px] text-emerald-400 font-semibold">{card.change}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-900">
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Main overview charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left chart: Revenue trend */}
              <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                  <h3 className="text-white font-bold text-sm">Ingestion Scans vs Sector Corruption Alerts</h3>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Q1-Q2 actuals</span>
                </div>
                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="chartRevD" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                      <Legend />
                      <Area type="monotone" dataKey="Scans" name="Active Integrity Scans" stroke="#ef4444" fill="url(#chartRevD)" strokeWidth={2} />
                      <Line type="monotone" dataKey="Errors" name="Corruption Alerts" stroke="#f97316" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right panel: Launcher callout */}
              <div className="p-6 rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent backdrop-blur-xl flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-white font-extrabold text-lg">Diagnostics Sandbox</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Access the interactive data corruption scanning workspace. Connect server ports, adjust check-sum bounds, and test automated containment webhooks.
                  </p>
                </div>

                <Link 
                  href="/platform" 
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-center text-xs shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 group"
                >
                  Launch Diagnostics Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        )}

        {/* ──────── TAB 2: CORRUPTION ANALYSIS ──────── */}
        {activeTab === "Corruption Analysis" && (
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-6">
            <h3 className="text-white font-bold text-sm">System Scans vs Data Corruption Outliers</h3>
            
            <div className="h-80 text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                  <Legend />
                  <Bar dataKey="Scans" name="Sector Scans" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Errors" name="Corruption Alerts" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ──────── TAB 3: ALERT LATENCY ──────── */}
        {activeTab === "Alert Latency" && (
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-6">
            <h3 className="text-white font-bold text-sm">Incoming Checksum Scans vs Paging Delay (ms)</h3>
            
            <div className="h-80 text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userData}>
                  <defs>
                    <linearGradient id="chartUserD" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                  <Legend />
                  <Area type="monotone" dataKey="Active" name="Active Scans" stroke="#ef4444" fill="url(#chartUserD)" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="New" name="Paging Delay (ms)" stroke="#f97316" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ──────── TAB 4: AUDIT REPORTS ──────── */}
        {activeTab === "Audit Post-Mortems" && (
          <div className="space-y-4">
            {[
              { type: "Corruption", title: "Q2 File Integrity Post-Mortem", desc: "A comprehensive investigation detailing silent sector corruption events on Server-East-04 and the automated containment mitigation timeline.", date: "June 2026", color: "text-red-400 bg-red-500/10 border-red-500/20" },
              { type: "Diagnostics", title: "Cryptographic Checksum Hash Audit", desc: "Syslog scans report tracking directory hash profiles across EVM configurations and system databases.", date: "June 2026", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
              { type: "Recovery", title: "SLA Mitigation Recovery Report", desc: "Analysis outlining the performance of automated self-healing triggers and backups mirror rollbacks.", date: "June 2026", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
            ].map((report, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-2">
                  <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${report.color}`}>
                    {report.type}
                  </span>
                  <h3 className="text-white font-bold text-lg">{report.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">{report.desc}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-slate-500 text-[10px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Generated {report.date}
                  </div>
                  <Link href="/platform" className="text-red-400 hover:text-red-300 font-bold text-xs mt-2 inline-block font-bold">
                    Review In Modeler →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}