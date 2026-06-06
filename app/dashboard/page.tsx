"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Database, 
  Brain, 
  ArrowRight, 
  Briefcase,
  FileText,
  Clock,
  Sparkles
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
  const tabs = ["Overview", "Revenue Analysis", "User Growth", "Model Reports"];

  // Mock revenue chart data
  const revenueData = [
    { month: "Jan", Revenue: 140, Expenses: 90 },
    { month: "Feb", Revenue: 165, Expenses: 95 },
    { month: "Mar", Revenue: 180, Expenses: 105 },
    { month: "Apr", Revenue: 210, Expenses: 110 },
    { month: "May", Revenue: 245, Expenses: 115 },
    { month: "Jun", Revenue: 290, Expenses: 125 }
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
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-blue-400" />
              Executive Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-1">Unified high-level metrics across sales and system intelligence.</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/platform" 
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-1.5 group"
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
                  ? "border-blue-500 text-blue-400 bg-blue-500/5" 
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
                { label: "Quarterly Revenue", value: "$2.4M", change: "+12.5% increase", icon: <TrendingUp className="w-5 h-5 text-blue-400" /> },
                { label: "Active Users", value: "48,392", change: "+8.2% growth", icon: <Users className="w-5 h-5 text-cyan-400" /> },
                { label: "Inferences Swept", value: "1.2B Logs", change: "99.9% availability", icon: <Database className="w-5 h-5 text-indigo-400" /> },
                { label: "Model Recommendations", value: "1,847 Runs", change: "+5.7% accuracy", icon: <Brain className="w-5 h-5 text-purple-400" /> }
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
                  <h3 className="text-white font-bold text-sm">Revenue Inflow vs Expenses ($k)</h3>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Q1-Q2 actuals</span>
                </div>
                <div className="h-64 text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="chartRevD" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                      <Legend />
                      <Area type="monotone" dataKey="Revenue" stroke="#3b82f6" fill="url(#chartRevD)" strokeWidth={2} />
                      <Line type="monotone" dataKey="Expenses" stroke="#06b6d4" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right panel: Launcher callout */}
              <div className="p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent backdrop-blur-xl flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-white font-extrabold text-lg">AutoML Workspace</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Access the interactive sandboxed modeling platform. Connect datasets, adjust loss weights, and deploy API microservices.
                  </p>
                </div>

                <Link 
                  href="/platform" 
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
                >
                  Launch MLOps Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        )}

        {/* ──────── TAB 2: REVENUE ANALYSIS ──────── */}
        {activeTab === "Revenue Analysis" && (
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-6">
            <h3 className="text-white font-bold text-sm">Monthly Inflows vs Operational Costs ($k)</h3>
            
            <div className="h-80 text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expenses" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ──────── TAB 3: USER GROWTH ──────── */}
        {activeTab === "User Growth" && (
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-6">
            <h3 className="text-white font-bold text-sm">Active Customer Accumulation vs New Influx</h3>
            
            <div className="h-80 text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userData}>
                  <defs>
                    <linearGradient id="chartUserD" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                  <Legend />
                  <Area type="monotone" dataKey="Active" stroke="#8b5cf6" fill="url(#chartUserD)" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="New" stroke="#ec4899" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ──────── TAB 4: MODEL REPORTS ──────── */}
        {activeTab === "Model Reports" && (
          <div className="space-y-4">
            {[
              { type: "Executive", title: "Q2 Operations Summary Report", desc: "A comprehensive assessment of distributed cloud data ingestion and pipeline computing efficiencies.", date: "June 2026", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { type: "Predictive", title: "User Attrition Anomaly Sweeps", desc: "XGBoost parameters evaluation tracking 142 outlier enterprise accounts at high attrition risk.", date: "June 2026", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
              { type: "Forecast", title: "Resource Forecasting Projections", desc: "Prophet metrics analysis outlining CPU and memory workloads requirements for Q3 expansion.", date: "June 2026", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" }
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
                  <Link href="/platform" className="text-blue-400 hover:text-blue-300 font-bold text-xs mt-2 inline-block">
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