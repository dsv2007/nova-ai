"use client";

import { motion } from "framer-motion";
import { 
  RefreshCw, 
  Activity, 
  ArrowRight,
  Layers,
  Search,
  Lock,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: <ShieldAlert className="w-8 h-8 text-red-400" />,
      title: "Corruption Sandbox",
      desc: "Run active diagnostic scans on filesystem directories. Evaluate file metadata deviations, check integrity ratios, and isolate damaged blocks.",
      features: ["Cryptographic Hash Checks", "Metadata Anomaly Sweeps", "Block Outlier Scans", "Directory Diagnostics", "Corruption Thresholds"],
      color: "border-red-500/20 hover:border-red-500/50"
    },
    {
      icon: <Layers className="w-8 h-8 text-orange-400" />,
      title: "Cryptographic Checksum Indexers",
      desc: "Distributed hash validators tracking directory paths. Compare checksum values against baseline secure signatures in real-time.",
      features: ["SHA-256 Validations", "Target File Registry Sync", "Real-Time Hash Indexing", "Low-Latency Checks", "Event History Log"],
      color: "border-orange-500/20 hover:border-orange-500/50"
    },
    {
      icon: <Search className="w-8 h-8 text-amber-400" />,
      title: "Zero-Day Vulnerability Scans",
      desc: "Automated scan routines analyzing system configs. Detect directory modifications, verify access permissions, and check database variables.",
      features: ["Config Integrity Scans", "Access Control Verifier", "Port Scan Validation", "Safety Rating Logs", "Outlier Flagging"],
      color: "border-amber-500/20 hover:border-amber-500/50"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-purple-400" />,
      title: "Syslog ETL Ingestion",
      desc: "Aggregate logs from across 100+ server clusters. Standardize Unix event structures, auth records, and syslog logs automatically.",
      features: ["100+ Server Connectors", "Regex Log Parsers", "Stream Event Filters", "Syslog Standardizing", "Structured JSON Outputs"],
      color: "border-purple-500/20 hover:border-purple-500/50"
    },
    {
      icon: <Lock className="w-8 h-8 text-emerald-400" />,
      title: "Containment Webhooks",
      desc: "Trigger automated containment dispatches during corruption alerts. Lock accounts, block network paths, and page standby personnel.",
      features: ["Auto-Quarantine Hooks", "Port Block Triggers", "PagerDuty Notifications", "Incident Payload Logs", "Remediation Script Runs"],
      color: "border-emerald-500/20 hover:border-emerald-500/50"
    },
    {
      icon: <Activity className="w-8 h-8 text-rose-400" />,
      title: "Uptime & Alert Monitors",
      desc: "Track monitoring agent uptime, directory check latencies, and alert webhook dispatches inside one central cockpit.",
      features: ["Agent Uptime Scans", "Scan Latency Profiles", "Webhook Alert Audits", "Slack & Discord Hooks", "RPC Status Logs"],
      color: "border-rose-500/20 hover:border-rose-500/50"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold mb-6">
            <span>Our Service Offerings</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            High-Performance Systems for
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 block md:inline md:ml-3">
              Modern DevOps Teams
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Everything your team needs to ingest, analyze, simulate, and automate incidents across distributed infrastructure — inside one premium platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border bg-slate-900/30 backdrop-blur-md flex flex-col justify-between min-h-[360px] transition-all duration-300 group ${service.color}`}
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:shadow-lg group-hover:shadow-red-500/5 transition-all">
                  {service.icon}
                </div>
                <h3 className="text-white font-bold text-xl">{service.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{service.desc}</p>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-6">
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {service.features.slice(0, 4).map((feat, fIdx) => (
                    <li key={fIdx} className="text-slate-300 text-[11px] flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/85" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/5 backdrop-blur-xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-red-500/5"
        >
          {/* Decorative glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 relative z-10">Ready to run your first Integrity Scan?</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 relative z-10">
            Join hundreds of teams running automated directories scans and real-time incident containment on Nova AI.
          </p>
          <div className="relative z-10">
            <Link href="/platform" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all duration-200 shadow-lg shadow-red-500/25 group">
              Launch Platform Workspace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}