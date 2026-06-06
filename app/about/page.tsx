"use client";

import { motion } from "framer-motion";
import { Target, Eye, Shield, Users, Trophy, Rocket } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: "Our Mission",
      desc: "Democratize data intelligence so every business — from startups to Fortune 500 — can make decisions backed by actionable AI insights."
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-400" />,
      title: "Our Vision",
      desc: "A world where every business decision is powered by real-time data, predictive analytics, and scalable machine learning pipelines."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      title: "Our Values",
      desc: "Transparency, innovation, and customer obsession. We build trust through robust results, clean compliance, and high availability."
    }
  ];

  const stats = [
    { value: "2020", label: "Founded" },
    { value: "500+", label: "Clients Worldwide" },
    { value: "50+", label: "Team Members" },
    { value: "2.4TB+", label: "Data Processed" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "4.9★", label: "Client Rating" }
  ];

  const team = [
    { name: "Alex Chen", role: "CEO & Co-founder", avatar: "👨‍💼", desc: "Ex-Google Product Lead. Dedicated to making complex MLOps accessible." },
    { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "👩‍💻", desc: "Distributed systems architect. Formerly engineer at AWS Redshift." },
    { name: "Marcus Rivera", role: "Head of AI", avatar: "🧠", desc: "PhD in Machine Learning. Author of 12 publications on neural architecture." },
    { name: "Priya Patel", role: "Head of Design", avatar: "🎨", desc: "Interactive UX evangelist. Crafting beautiful analytics tools." }
  ];

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-6">
            <span>Corporate Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            We Turn Complex Data Into
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 block md:inline md:ml-3">
              Actionable Decisions
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Founded in 2020, NovaMind Cloud was built with one mission — make enterprise-grade AI analytics and pipeline automation accessible to every engineering team.
          </p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between min-h-[260px] hover:border-slate-700/60 transition-all duration-300 group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/5 transition-all">
                  {val.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corporate Metrics Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl p-8 md:p-12 mb-24 text-center shadow-lg shadow-black/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-white font-mono">{stat.value}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Executive Board</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Meet the Innovators</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
            A diverse group of world-class engineers, ML scientists, and product designers dedicated to cloud intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md text-center hover:border-slate-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-3xl mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-blue-400 text-xs font-semibold mb-3">{member.role}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}