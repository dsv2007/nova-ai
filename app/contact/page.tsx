"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Send, 
  Loader2, 
  Briefcase 
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "AI & Machine Learning",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      interest: "AI & Machine Learning",
      message: ""
    });
    setFormStatus("idle");
  };

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-6">
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Let's Collaborate On
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 block md:inline md:ml-3">
              Your Next Pipeline
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Have questions about model orchestration, cloud integration, or looking to schedule a design demonstration? We reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form Section */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-xl relative overflow-hidden min-h-[500px] flex flex-col justify-center shadow-2xl shadow-black/30">
            <AnimatePresence mode="wait">
              {formStatus === "idle" && (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue-400" />
                    Submit a Project Inquiry
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-1.5">First Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        placeholder="John" 
                        className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-300 text-xs outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-1.5">Last Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Doe" 
                        className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-300 text-xs outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5">Work Email</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com" 
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-300 text-xs outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5">Company Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="Acme MLOps" 
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-300 text-xs outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5">Pipeline Area of Interest</label>
                    <select 
                      value={formData.interest}
                      onChange={e => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-400 text-xs outline-none focus:border-blue-500 transition-colors"
                    >
                      <option>AI & Machine Learning</option>
                      <option>Cloud Analytics</option>
                      <option>Business Intelligence</option>
                      <option>General Infrastructure Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-1.5">Message / Outline</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your dataset, training latency constraints, or timeline..." 
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-4 py-2.5 text-slate-300 text-xs outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    Send Inquiry
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </motion.form>
              )}

              {formStatus === "sending" && (
                <motion.div 
                  key="sending"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 font-mono text-xs"
                >
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                  <p className="text-slate-300 font-bold">TRANSMITTING SECURE DATA...</p>
                  <p className="text-slate-500">Routing payload through secure pipeline endpoint</p>
                </motion.div>
              )}

              {formStatus === "success" && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-6 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl">Inquiry Received Successfully</h3>
                    <p className="text-slate-400 text-xs max-w-sm">
                      Thank you, <strong className="text-white">{formData.firstName}</strong>. Your message has been processed. We will get back to you shortly.
                    </p>
                  </div>
                  <button 
                    onClick={resetForm}
                    className="py-2.5 px-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs transition-colors"
                  >
                    Reset Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Details & Premium Developer Bio Card */}
          <div className="space-y-6">
            
            {/* Santhivarshini D - Premium Portfolio Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-wider font-mono">
                  Active Hiring
                </span>
              </div>

              <div className="flex gap-4 items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/10">
                  SD
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-mono">Lead Architect</span>
                  <h3 className="text-white font-extrabold text-xl">Santhivarshini D</h3>
                  <p className="text-blue-400 text-xs font-semibold">Full Stack & MLOps Developer</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  Specialized in building high-availability data pipelines, React 19 workflows, and client-side visualization playfields for analytics intelligence.
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 py-2">
                  {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "FastAPI / Python", "Data Engineering"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-800/80 pt-4 flex gap-4">
                  <a 
                    href="mailto:santhivarshinidevan@gmail.com" 
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    santhivarshinidevan@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* General Info Cards */}
            <div className="space-y-3">
              {[
                { icon: <Mail className="w-4 h-4 text-blue-400" />, title: "Official Email Address", value: "santhivarshinidevan@gmail.com" },
                { icon: <Phone className="w-4 h-4 text-cyan-400" />, title: "Contact Phone Line", value: "+91 6369083465" },
                { icon: <MapPin className="w-4 h-4 text-indigo-400" />, title: "Development Location", value: "Dharmapuri, Tamil Nadu, India" }
              ].map((info, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-slate-900 bg-slate-900/20 backdrop-blur-md flex items-center gap-4 hover:border-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-900">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{info.title}</h4>
                    <p className="text-white text-xs font-semibold mt-0.5">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiter Callout */}
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <h4 className="text-emerald-400 font-bold">Hiring & Placement Opportunities</h4>
                <p className="text-slate-400 leading-relaxed">
                  Open for **Software Engineering Internships**, **Full-Stack Associate Developer**, and **Junior MLOps positions** worldwide (remote or relocation).
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}