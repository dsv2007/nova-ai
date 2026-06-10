"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter Sandbox",
      price: billingPeriod === "monthly" ? "$0" : "$0",
      period: billingPeriod === "monthly" ? "forever free" : "forever free",
      desc: "Perfect for developers, QA engineers, and hobbyists testing integrity checking tools or small filesystems.",
      features: [
        "Up to 3 active log streams",
        "Basic integrity checks (MD5/SHA-1)",
        "Manual webhook dispatches",
        "Community Discord support",
        "JSON incident reports export"
      ],
      cta: "Launch Sandbox",
      highlight: false,
      color: "border-slate-800 hover:border-slate-700 bg-slate-900/30"
    },
    {
      name: "Sentinel Professional",
      price: billingPeriod === "monthly" ? "$49" : "$39",
      period: billingPeriod === "monthly" ? "per month" : "per month, billed annually",
      desc: "For active DevOps teams and system administrators requiring continuous corruption scanning.",
      features: [
        "Unlimited syslog integrations",
        "Continuous SHA-256 integrity loops",
        "Real-time Slack & Discord alerts",
        "24/7 priority support SLA",
        "Automatic quarantine hooks",
        "Custom incident forensics PDF",
        "API access for alert automation"
      ],
      cta: "Start Pro Trial",
      highlight: true,
      color: "border-red-500/50 hover:border-red-500 bg-gradient-to-b from-red-500/10 to-transparent shadow-xl shadow-red-500/5"
    },
    {
      name: "Enterprise Compliance",
      price: "Custom",
      period: "tailored billing agreements",
      desc: "For large organizations requiring custom retention, high-throughput scanning, and strict SLAs.",
      features: [
        "Dedicated Sentinel indexing clusters",
        "Unlimited syslog history retention",
        "Custom heuristic anomaly models",
        "Dedicated account manager",
        "99.999% scan uptime SLA",
        "SSO/SAML & granular RBAC",
        "SOC2 & ISO27001 audit compliance logs",
        "On-premise docker deployments"
      ],
      cta: "Contact Sales",
      highlight: false,
      color: "border-slate-800 hover:border-slate-700 bg-slate-900/30"
    }
  ];

  const faqs = [
    {
      q: "Can I upgrade or downgrade my monitoring plan?",
      a: "Yes, you can scale your plan based on data throughput. Plan modifications are pro-rated and applied immediately to your active billing cycle."
    },
    {
      q: "What is the scan limit on the Starter plan?",
      a: "The Starter plan allows for basic integrity checks on demand. For continuous real-time daemon-based syslog ingestion and quarantine orchestration, we recommend upgrading to Sentinel Professional."
    },
    {
      q: "Are there any hidden ingestion or alert dispatch fees?",
      a: "No hidden charges whatsoever. The Professional plan covers standard team operations. If your webhook notifications exceed 100k triggers per month, standard low-cost egress rates apply."
    },
    {
      q: "Do you offer discounts for open-source projects or startups?",
      a: "Yes! Startups and open-source infrastructure tools can receive up to 50% discount on the Sentinel Professional plan for their first 12 months. Contact our helpdesk to apply."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-slate-950 bg-grid-dots pt-24 pb-20 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold mb-6">
            <span>Flexible Subscriptions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Simple, Scale-Ready
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-amber-500 block md:inline md:ml-3">
              Integrity Plans
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
            Deploy monitors instantly. Choose a plan tailored to your data throughput. Cancel or adjust anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingPeriod === "monthly" 
                  ? "bg-red-600 text-white shadow" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === "annual" 
                  ? "bg-red-600 text-white shadow" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Annual billing
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${plan.color}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow shadow-red-500/20">
                  Recommended Plan
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{plan.desc}</p>
                </div>

                <div className="border-y border-slate-800/80 py-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-slate-500 text-xs uppercase font-semibold">{plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-slate-300 text-xs">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link 
                  href="/platform" 
                  className={`block w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition-all ${
                    plan.highlight 
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                      : "bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Integrations & Ingestion FAQ</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-800/80 rounded-xl bg-slate-900/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-slate-900/30 transition-all outline-none"
                >
                  <span className="text-sm font-bold">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-400 text-xs leading-relaxed border-t border-slate-900 bg-slate-950/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}