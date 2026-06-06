"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Cloud, 
  LineChart, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "AI & Machine Learning",
      desc: "Deploy production-grade ML models instantly. AutoML pipelines, hyperparameter sweeps, and high-performance inference endpoints at scale.",
      features: ["AutoML Ingestion", "Hyperparameter Sweeps", "Sub-second Inference", "Model Monitoring", "Drift Detection"],
      color: "border-blue-500/20 hover:border-blue-500/50"
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      title: "Cloud Analytics",
      desc: "Unified analytics plane across AWS, GCP, and Azure. Query petabytes of logs, metrics, and transaction records with sub-second lag.",
      features: ["Multi-cloud Pipelines", "Petabyte Scale Ingestion", "Sub-second Queries", "Cold/Warm Tier Storage", "Automatic Partitioning"],
      color: "border-cyan-500/20 hover:border-cyan-500/50"
    },
    {
      icon: <LineChart className="w-8 h-8 text-indigo-400" />,
      title: "Business Intelligence",
      desc: "Interactive dashboards, automated daily reporting, and AI summaries delivered to your Slack channels and executive inbox.",
      features: ["Interactive Charts", "AI-Generated Summaries", "Scheduled Reports", "Custom KPI Metrics", "One-click CSV Exports"],
      color: "border-indigo-500/20 hover:border-indigo-500/50"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-purple-400" />,
      title: "Data Pipelines & ETL",
      desc: "Automated ingestion from 200+ database sources. Transform, map, clean, and standardize data without writing complex custom scripts.",
      features: ["200+ Connectors", "No-code Schema Mapping", "Stream & Batch Processing", "Data Quality Validations", "Auto-scaling Buffers"],
      color: "border-purple-500/20 hover:border-purple-500/50"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: "Security & Compliance",
      desc: "Enterprise compliance standards built in from the ground up. Encrypt data in transit and at rest with full role-based access control.",
      features: ["SOC2 Type II Ready", "GDPR & HIPAA Compliance", "AES-256 Encryption", "RBAC & Single Sign-On", "Immutable Audit Logs"],
      color: "border-emerald-500/20 hover:border-emerald-500/50"
    },
    {
      icon: <Activity className="w-8 h-8 text-rose-400" />,
      title: "Real-time Monitoring",
      desc: "Keep absolute track of pipeline health, model throughput, accuracy metrics, and cloud costs. Configure webhooks for alerts.",
      features: ["Dynamic Webhook Alerts", "Anomaly Outlier Detection", "Latency SLA Tracking", "Custom Metric Dashboards", "Slack & Discord Alerts"],
      color: "border-rose-500/20 hover:border-rose-500/50"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-6">
            <span>Our Service Offerings</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            High-Performance Systems for
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 block md:inline md:ml-3">
              Modern AI Teams
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Everything you need to collect, transform, analyze, and deploy models across distributed infrastructure — packaged inside one robust cloud platform.
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
                <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:shadow-lg group-hover:shadow-blue-500/5 transition-all">
                  {service.icon}
                </div>
                <h3 className="text-white font-bold text-xl">{service.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{service.desc}</p>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-6">
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {service.features.slice(0, 4).map((feat, fIdx) => (
                    <li key={fIdx} className="text-slate-300 text-[11px] flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/85" />
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
          className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 backdrop-blur-xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/5"
        >
          {/* Decorative glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 relative z-10">Ready to build your first AutoML Pipeline?</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 relative z-10">
            Join hundreds of teams running automated model training and real-time inference on NovaMind Cloud.
          </p>
          <div className="relative z-10">
            <Link href="/platform" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-200 shadow-lg shadow-blue-500/25 group">
              Launch Platform Workspace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}