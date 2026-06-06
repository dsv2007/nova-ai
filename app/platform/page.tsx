"use client";

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
  FileSpreadsheet
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
import Link from "next/link";

export default function Platform() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const menuItems = [
    { icon: <Boxes className="w-4 h-4" />, label: "Dashboard" },
    { icon: <Brain className="w-4 h-4" />, label: "ML Playground" },
    { icon: <Layers className="w-4 h-4" />, label: "Data Pipelines" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "AI Copilot" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Forecasting" },
    { icon: <Activity className="w-4 h-4" />, label: "API Deployments" },
    { icon: <SettingsIcon className="w-4 h-4" />, label: "Settings" }
  ];

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  // --- PLAYGROUND STATE ---
  const [selectedDataset, setSelectedDataset] = useState("churn");
  const [selectedModel, setSelectedModel] = useState("xgboost");
  const [lr, setLr] = useState(0.05);
  const [depth, setDepth] = useState(6);
  const [trees, setTrees] = useState(100);
  const [epochs, setEpochs] = useState(30);
  
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingMetrics, setTrainingMetrics] = useState<any[]>([]);
  const [featureImportance, setFeatureImportance] = useState<any[]>([]);
  
  const [predictInputs, setPredictInputs] = useState<any>({});
  const [predictOutput, setPredictOutput] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // --- UPLOADED DATASET STATE ---
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
  const [playgroundActiveTab, setPlaygroundActiveTab] = useState<"training" | "features" | "summary">("training");

  // --- PIPELINES STATE ---
  const [pipelineStep, setPipelineStep] = useState(0);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [selectedPipelineNode, setSelectedPipelineNode] = useState<string | null>(null);

  // --- AI COPILOT STATE ---
  const [chatHistory, setChatHistory] = useState<any[]>([
    {
      sender: "ai",
      text: "Hello! I am your NovaMind Analytics Copilot. Select a prompt chip below or ask me any question about your data pipelines, ML weights, or optimization runs."
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- FORECASTING STATE ---
  const [selectedForecastMetric, setSelectedForecastMetric] = useState("mrr");
  const [forecastHorizon, setForecastHorizon] = useState(30);
  const [forecastModel, setForecastModel] = useState("prophet");
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<any[]>([]);

  // --- API DEPLOYMENTS STATE ---
  const [apiTesterEndpoint, setApiTesterEndpoint] = useState("telecom-churn-predictor");
  const [apiTesterInput, setApiTesterInput] = useState(`{\n  "tenure": 12,\n  "monthly_charges": 65.80,\n  "total_charges": 789.60,\n  "contract_type": "One year"\n}`);
  const [apiTesterOutput, setApiTesterOutput] = useState("");
  const [isApiTesting, setIsApiTesting] = useState(false);

  // --- SETTINGS STATE ---
  const [apiKey, setApiKey] = useState("nm_live_9f82d7c041e2a39d88bc71");
  const [generatedKeyMsg, setGeneratedKeyMsg] = useState(false);
  const [rateLimit, setRateLimit] = useState(5000);

  // ==========================================
  // REUSABLE SIMULATIONS
  // ==========================================

  // --- PLAYGROUND FUNCTIONS ---
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
        setSelectedDataset("uploaded");
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

  const handleRunTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingMetrics([]);
    setPredictOutput(null);
    setPlaygroundActiveTab("training");
    
    let currentEpoch = 0;
    const maxEpochs = selectedModel === "mlp" ? epochs : 10;
    const tempMetrics: any[] = [];
    
    const interval = setInterval(() => {
      currentEpoch++;
      const progressPct = Math.round((currentEpoch / maxEpochs) * 100);
      setTrainingProgress(progressPct);

      // Simulate learning curve
      const trainLoss = Number((0.8 * Math.exp(-currentEpoch / (maxEpochs * 0.4)) + 0.05 + Math.random() * 0.02).toFixed(4));
      const valLoss = Number((trainLoss + 0.02 + Math.random() * 0.015).toFixed(4));
      const trainAcc = Number((100 - (trainLoss * 80)).toFixed(1));
      const valAcc = Number((trainAcc - 1.5 - Math.random() * 1).toFixed(1));

      tempMetrics.push({
        epoch: currentEpoch,
        loss: trainLoss,
        valLoss: valLoss,
        accuracy: Math.min(99.9, trainAcc),
        valAccuracy: Math.min(98.8, valAcc)
      });
      setTrainingMetrics([...tempMetrics]);

      if (currentEpoch >= maxEpochs) {
        clearInterval(interval);
        setIsTraining(false);
        // Set simulated feature importances
        if (selectedDataset === "churn") {
          setFeatureImportance([
            { name: "Tenure", importance: 38 },
            { name: "Monthly Charges", importance: 25 },
            { name: "Total Charges", importance: 18 },
            { name: "Contract Type", importance: 12 },
            { name: "Internet Service", importance: 7 }
          ]);
          setPredictInputs({ tenure: 18, monthly_charges: 70, total_charges: 1260 });
        } else if (selectedDataset === "titanic") {
          setFeatureImportance([
            { name: "Sex (Female)", importance: 45 },
            { name: "Passenger Class", importance: 22 },
            { name: "Age", importance: 15 },
            { name: "Fare Paid", importance: 10 },
            { name: "Siblings/Spouses", importance: 8 }
          ]);
          setPredictInputs({ age: 28, fare: 32, pclass: 1 });
        } else if (selectedDataset === "uploaded" && uploadedData) {
          let remainingWeight = 100;
          const importances = selectedFeatures.map((feat, idx) => {
            const weight = idx === selectedFeatures.length - 1 
              ? remainingWeight 
              : Math.max(2, Math.round(remainingWeight * (0.35 + Math.random() * 0.2)));
            remainingWeight = Math.max(0, remainingWeight - weight);
            return { name: feat, importance: weight };
          }).sort((a, b) => b.importance - a.importance);
          setFeatureImportance(importances);

          const defaultInputs: any = {};
          selectedFeatures.forEach(feat => {
            const colStat = uploadedData.stats.find(s => s.column === feat);
            defaultInputs[feat] = colStat?.type === "Numeric" ? colStat.mean ?? 10 : "Sample";
          });
          setPredictInputs(defaultInputs);
        } else {
          setFeatureImportance([
            { name: "Median Income", importance: 52 },
            { name: "House Age", importance: 18 },
            { name: "Average Rooms", importance: 15 },
            { name: "Latitude/Longitude", importance: 10 },
            { name: "Population Density", importance: 5 }
          ]);
          setPredictInputs({ income: 5.5, house_age: 15, rooms: 6 });
        }
      }
    }, 150);
  };

  const handleRunInference = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      if (selectedDataset === "churn") {
        const churnRisk = predictInputs.tenure < 12 && predictInputs.monthly_charges > 60 ? "HIGH CHURN RISK (82%)" : "LOW RISK (15%)";
        setPredictOutput(churnRisk);
      } else if (selectedDataset === "titanic") {
        const survive = predictInputs.pclass === 1 || predictInputs.age < 12 ? "SURVIVED (88% Confidence)" : "DID NOT SURVIVE (74% Confidence)";
        setPredictOutput(survive);
      } else if (selectedDataset === "uploaded" && uploadedData) {
        const targetStat = uploadedData.stats.find(s => s.column === targetColumn);
        if (targetStat?.type === "Numeric") {
          const val = Number(((targetStat.mean ?? 10) * (0.85 + Math.random() * 0.3)).toFixed(2));
          setPredictOutput(`PREDICTED ${targetColumn.toUpperCase()}: ${val}`);
        } else {
          const options = ["TRUE/POSITIVE (83% Probability)", "FALSE/NEGATIVE (79% Probability)"];
          const randOpt = options[Math.floor(Math.random() * options.length)];
          setPredictOutput(`PREDICTED ${targetColumn.toUpperCase()}: ${randOpt}`);
        }
      } else {
        const price = Math.round((predictInputs.income * 62000) + (predictInputs.house_age * 1200) + (predictInputs.rooms * 8000));
        setPredictOutput(`ESTIMATED VALUE: $${price.toLocaleString()}`);
      }
    }, 800);
  };

  // --- PIPELINES FUNCTIONS ---
  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    setPipelineStep(1);
    setPipelineLogs(["[00:01] Initializing visual pipeline environment..."]);

    const timers = [
      setTimeout(() => {
        setPipelineStep(2);
        setPipelineLogs(l => [...l, "[00:03] Connectors validated. Syncing S3 Revenue Data (62,400 rows)..."]);
      }, 1500),
      setTimeout(() => {
        setPipelineStep(3);
        setPipelineLogs(l => [...l, "[00:06] Applying scale normalization & imputing 42 null variables..."]);
      }, 3000),
      setTimeout(() => {
        setPipelineStep(4);
        setPipelineLogs(l => [...l, "[00:09] Training parallel sweeps with hyperparameter XGBoost algorithm..."]);
      }, 4500),
      setTimeout(() => {
        setPipelineStep(5);
        setPipelineLogs(l => [...l, "[00:11] Model testing finalized. Validation score: 96.8% (AUC-ROC)."]);
      }, 6000),
      setTimeout(() => {
        setPipelineStep(6);
        setPipelineLogs(l => [...l, "[00:13] Exported models weights. Deployed REST Endpoint: /api/v1/s3-revenue."]);
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

      if (query.toLowerCase().includes("spend") || query.toLowerCase().includes("conversion")) {
        reply.text = "Here is the campaign analysis showing Marketing Spend vs Conversion Rates. We notice a clear saturation point after $5,000 in monthly ad expenditure.";
        reply.chartType = "bar";
        reply.chartData = [
          { name: "$1K Spend", Conversion: 2.1, Cost: 1000 },
          { name: "$2.5K Spend", Conversion: 4.8, Cost: 2500 },
          { name: "$5K Spend", Conversion: 8.2, Cost: 5000 },
          { name: "$7.5K Spend", Conversion: 8.9, Cost: 7500 },
          { name: "$10K Spend", Conversion: 9.1, Cost: 10000 }
        ];
      } else if (query.toLowerCase().includes("latency") || query.toLowerCase().includes("anomaly")) {
        reply.text = "I've scanned the active S3 pipeline latency logs. I detected one ingestion anomaly at 14:00 where latency peaked at 740ms due to a node reboot. Auto-recovery handled the state.";
        reply.chartType = "line";
        reply.chartData = [
          { time: "10:00", Latency: 120 },
          { time: "12:00", Latency: 140 },
          { time: "14:00", Latency: 740 },
          { time: "16:00", Latency: 130 },
          { time: "18:00", Latency: 110 }
        ];
      } else if (query.toLowerCase().includes("report") || query.toLowerCase().includes("q3")) {
        reply.text = "NovaMind Predictor has generated your Q3 forecast overview. Based on active subscription trajectories, we anticipate MRR to reach $2.84M with 92% confidence.";
        reply.chartType = "area";
        reply.chartData = [
          { month: "May", Revenue: 2.1 },
          { month: "Jun", Revenue: 2.4 },
          { month: "Jul (Est)", Revenue: 2.55 },
          { month: "Aug (Est)", Revenue: 2.70 },
          { month: "Sep (Est)", Revenue: 2.84 }
        ];
      } else {
        reply.text = `I've registered your request regarding: "${query}". On NovaMind Cloud, you can configure hyperparameters, connect data nodes, and run client-side inferences. Try clicking on one of the default prompt chips below for a visual showcase.`;
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
      
      const baseVal = selectedForecastMetric === "mrr" ? 2200000 : selectedForecastMetric === "users" ? 48000 : 1500;
      const multiplier = selectedForecastMetric === "mrr" ? 1.05 : selectedForecastMetric === "users" ? 1.03 : 1.08;
      
      const tempForecast: any[] = [];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      // Historical
      for (let i = 0; i < 6; i++) {
        tempForecast.push({
          name: months[i],
          Historical: Math.round(baseVal * Math.pow(multiplier, i - 5))
        });
      }
      // Forecast
      let lastHist = tempForecast[tempForecast.length - 1].Historical;
      for (let i = 6; i < 12; i++) {
        const val = Math.round(lastHist * Math.pow(multiplier, i - 5));
        const confInterval = Math.round(val * 0.08 * (i - 5));
        tempForecast.push({
          name: months[i],
          Forecast: val,
          Upper: val + confInterval,
          Lower: Math.max(0, val - confInterval)
        });
      }
      
      setForecastResult(tempForecast);
    }, 1500);
  };

  // --- API DEPLOYMENTS FUNCTIONS ---
  const handleTestApi = () => {
    setIsApiTesting(true);
    setApiTesterOutput("");
    
    setTimeout(() => {
      setIsApiTesting(false);
      try {
        const parsed = JSON.parse(apiTesterInput);
        const randRisk = Math.floor(Math.random() * 85) + 10;
        const responseObj = {
          status: "200_OK",
          model: apiTesterEndpoint,
          timestamp: new Date().toISOString(),
          prediction: {
            probability: Number((randRisk / 100).toFixed(4)),
            label: randRisk > 50 ? "CHURN_RISK" : "NO_RISK",
            action: randRisk > 50 ? "Trigger customer retention voucher" : "Standard cycle sync"
          },
          infrastructure: {
            latency_ms: Math.floor(Math.random() * 45) + 12,
            compute_engine: "NVIDIA-T4-Shared-Slot",
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
    setApiKey(`nm_live_${bytes}`);
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
            Cloud Workspace
          </div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveSection(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all outline-none ${
                  activeSection === item.label 
                    ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500" 
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/10">
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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">

          {/* ────────────────────────────────────────────────────────
              SECTION 1: DASHBOARD OVERVIEW 
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-400" />
                  MOCK OPS COCKPIT
                </h1>
                <p className="text-slate-400 text-xs mt-1">Real-time status overview of active models and automated pipelines.</p>
              </div>

              {/* KPI metrics row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Pipelines", value: "6 Deployed", change: "99.9% Success", color: "text-blue-400" },
                  { label: "Daily Inferences", value: "12,482,904", change: "+14.2% Growth", color: "text-cyan-400" },
                  { label: "Avg API Response", value: "32ms", change: "SLA Compliant", color: "text-emerald-400" },
                  { label: "Simulated GPU Cost", value: "$182.40", change: "-8% Saved (Spot)", color: "text-indigo-400" }
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
                  <h3 className="text-white font-bold text-sm">Ingestion Pipeline Load (MB/s)</h3>
                  <div className="h-64 text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { name: "10:00", S3: 45, Postgres: 25 },
                          { name: "11:00", S3: 65, Postgres: 30 },
                          { name: "12:00", S3: 50, Postgres: 22 },
                          { name: "13:00", S3: 90, Postgres: 45 },
                          { name: "14:00", S3: 75, Postgres: 35 },
                          { name: "15:00", S3: 120, Postgres: 55 }
                        ]}
                      >
                        <defs>
                          <linearGradient id="colorS3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                        <Area type="monotone" dataKey="S3" stroke="#3b82f6" fillOpacity={1} fill="url(#colorS3)" />
                        <Line type="monotone" dataKey="Postgres" stroke="#06b6d4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Inference distribution */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl space-y-4">
                  <h3 className="text-white font-bold text-sm">Inference Latency Percentiles (ms)</h3>
                  <div className="h-64 text-xs font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "churn-model", p50: 12, p95: 28, p99: 45 },
                          { name: "fraud-mlp", p50: 22, p95: 42, p99: 90 },
                          { name: "housing-rf", p50: 8, p95: 18, p99: 32 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                        <Bar dataKey="p50" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="p95" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="p99" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Real-time ML suggestions banner */}
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-4">
                <Brain className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="text-white font-bold">🤖 ML Copilot Insight Recommendation</h4>
                  <p className="text-slate-400 leading-relaxed">
                    XGBoost hyperparameter logs indicate high variance. We recommend raising **n_estimators to 150** and adjusting learning_rate to **0.03** to reduce overfitting validation errors.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 2: ML PLAYGROUND & MODELER
              ──────────────────────────────────────────────────────── */}
          {activeSection === "ML Playground" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Brain className="w-6 h-6 text-blue-400" />
                  INTERACTIVE ML PLAYGROUND
                </h1>
                <p className="text-slate-400 text-xs mt-1">Configure models, sweeps, and watch client-side training loops run live.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Modeler hyperparameter cards */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Compute Configuration</h3>
                    <p className="text-slate-500 text-[10px]">Tweak hyperparameter sweep bounds</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Select Dataset</label>
                      <select 
                        value={selectedDataset}
                        onChange={e => {
                          const val = e.target.value;
                          setSelectedDataset(val);
                          setPredictOutput(null);
                          if (val === "uploaded" && uploadedData) {
                            setPlaygroundActiveTab("summary");
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none text-xs font-semibold"
                      >
                        <option value="churn">Customer Churn Logs (Classification)</option>
                        <option value="titanic">Titanic Survival Specs (Binary Class)</option>
                        <option value="housing">California House Prices (Regression)</option>
                        <option value="upload">📁 Upload Custom CSV/JSON...</option>
                        {uploadedData && (
                          <option value="uploaded">📊 Custom: {uploadedData.name}</option>
                        )}
                      </select>
                    </div>

                    {/* Drag-and-drop file upload zone */}
                    {selectedDataset === "upload" && (
                      <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-3 relative">
                        {isParsing ? (
                          <div className="py-6 flex flex-col items-center justify-center space-y-2">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            <span className="text-[10px] text-slate-400 font-mono">PARSING DATASET...</span>
                          </div>
                        ) : (
                          <div className="py-6 flex flex-col items-center justify-center space-y-2 cursor-pointer group">
                            <Upload className="w-8 h-8 text-slate-600 group-hover:text-blue-500 transition-colors mb-1" />
                            <span className="text-xs font-bold text-slate-300 group-hover:text-white">Choose a CSV or JSON file</span>
                            <span className="text-[9px] text-slate-600">Drag & drop or click to browse</span>
                            <input 
                              type="file" 
                              accept=".csv,.json" 
                              onChange={handleFileUpload} 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dynamic config for uploaded data */}
                    {selectedDataset === "uploaded" && uploadedData && (
                      <div className="space-y-4 pt-2 border-t border-slate-900/50">
                        <div>
                          <label className="block text-slate-400 font-medium mb-1.5">Target Label Column</label>
                          <select 
                            value={targetColumn}
                            onChange={e => {
                              const val = e.target.value;
                              setTargetColumn(val);
                              // Remove target from features list
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
                                    className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-0 w-3.5 h-3.5"
                                  />
                                  <span className="font-mono text-[10px] truncate">{h}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDataset !== "upload" && (
                      <>
                        <div>
                          <label className="block text-slate-400 font-medium mb-1.5">Model Algorithm</label>
                          <select 
                            value={selectedModel}
                            onChange={e => {
                              setSelectedModel(e.target.value);
                              setPredictOutput(null);
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 outline-none"
                          >
                            <option value="xgboost">XGBoost Decision Classifier</option>
                            <option value="mlp">Multi-Layer Neural Network (MLP)</option>
                            <option value="rf">Random Forest Regressor</option>
                          </select>
                        </div>

                        {/* Sweeps controllers */}
                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Learning Rate (Alpha)</span>
                            <span className="text-blue-400 font-mono font-bold">{lr}</span>
                          </div>
                          <input 
                            type="range" min="0.01" max="0.3" step="0.01" value={lr} 
                            onChange={e => setLr(Number(e.target.value))}
                            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                          />

                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Max Depth Bounds</span>
                            <span className="text-blue-400 font-mono font-bold">{depth}</span>
                          </div>
                          <input 
                            type="range" min="2" max="12" step="1" value={depth} 
                            onChange={e => setDepth(Number(e.target.value))}
                            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                          />

                          {selectedModel === "xgboost" && (
                            <>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">Num Estimators (Trees)</span>
                                <span className="text-blue-400 font-mono font-bold">{trees}</span>
                              </div>
                              <input 
                                type="range" min="20" max="200" step="10" value={trees} 
                                onChange={e => setTrees(Number(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                              />
                            </>
                          )}

                          {selectedModel === "mlp" && (
                            <>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">Epoch Iterations Limit</span>
                                <span className="text-blue-400 font-mono font-bold">{epochs}</span>
                              </div>
                              <input 
                                type="range" min="10" max="100" step="5" value={epochs} 
                                onChange={e => setEpochs(Number(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                              />
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {selectedDataset !== "upload" && (
                    <button
                      onClick={handleRunTraining}
                      disabled={isTraining}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      {isTraining ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Training Sweep {trainingProgress}%
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Execute Sweep Training
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Training monitor & Output charts */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6 min-h-[420px] flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      Sandbox Output Monitor
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      {isTraining ? "COMPUTING LOSS" : trainingMetrics.length > 0 ? "TRAINING DONE" : "IDLE"}
                    </span>
                  </div>

                  {trainingMetrics.length === 0 && !isTraining ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                      <Cpu className="w-12 h-12 text-slate-700 animate-pulse" />
                      <h4 className="text-slate-400 font-bold text-sm">No Active Sweep Logs</h4>
                      <p className="text-slate-600 text-xs max-w-sm">Select dataset, configure bounds, and click run to watch learning convergence.</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-6">
                      
                      {/* Metric lines chart */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Epoch Loss Decay</h4>
                        <div className="h-44 text-[10px] font-mono">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trainingMetrics}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                              <XAxis dataKey="epoch" stroke="#64748b" />
                              <YAxis stroke="#64748b" />
                              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                              <Legend />
                              <Line type="monotone" dataKey="loss" name="Train Loss" stroke="#3b82f6" dot={false} strokeWidth={2} />
                              <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#f43f5e" dot={false} strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Performance Bar Chart / Importance */}
                      {featureImportance.length > 0 && !isTraining && (
                        <div className="space-y-2 pt-2 border-t border-slate-900">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Feature Importance Weights (%)</h4>
                          <div className="h-36 text-[10px] font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={featureImportance} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                <XAxis type="number" stroke="#64748b" />
                                <YAxis dataKey="name" type="category" stroke="#64748b" width={90} />
                                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                <Bar dataKey="importance" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sandbox Inference Test Block */}
                  {trainingMetrics.length > 0 && !isTraining && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-4"
                    >
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Test Trained Model</h4>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        {selectedDataset === "churn" && (
                          <>
                            <div>
                              <label className="text-[10px] text-slate-500">Tenure (Months)</label>
                              <input 
                                type="number" value={predictInputs.tenure} 
                                onChange={e => setPredictInputs({...predictInputs, tenure: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Monthly Cost ($)</label>
                              <input 
                                type="number" value={predictInputs.monthly_charges}
                                onChange={e => setPredictInputs({...predictInputs, monthly_charges: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div className="flex items-end">
                              <button 
                                onClick={handleRunInference}
                                className="w-full py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 font-bold text-white text-[10px]"
                              >
                                {isPredicting ? "Predicting..." : "Predict"}
                              </button>
                            </div>
                          </>
                        )}
                        {selectedDataset === "titanic" && (
                          <>
                            <div>
                              <label className="text-[10px] text-slate-500">Passenger Class (1-3)</label>
                              <input 
                                type="number" value={predictInputs.pclass} 
                                onChange={e => setPredictInputs({...predictInputs, pclass: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Age</label>
                              <input 
                                type="number" value={predictInputs.age}
                                onChange={e => setPredictInputs({...predictInputs, age: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div className="flex items-end">
                              <button 
                                onClick={handleRunInference}
                                className="w-full py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 font-bold text-white text-[10px]"
                              >
                                {isPredicting ? "Predicting..." : "Predict"}
                              </button>
                            </div>
                          </>
                        )}
                        {selectedDataset === "housing" && (
                          <>
                            <div>
                              <label className="text-[10px] text-slate-500">Median Income</label>
                              <input 
                                type="number" step="0.1" value={predictInputs.income} 
                                onChange={e => setPredictInputs({...predictInputs, income: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">House Age</label>
                              <input 
                                type="number" value={predictInputs.house_age}
                                onChange={e => setPredictInputs({...predictInputs, house_age: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white outline-none mt-1"
                              />
                            </div>
                            <div className="flex items-end">
                              <button 
                                onClick={handleRunInference}
                                className="w-full py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 font-bold text-white text-[10px]"
                              >
                                {isPredicting ? "Predicting..." : "Predict"}
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Prediction response display */}
                      {predictOutput && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="p-3 rounded bg-slate-900 border border-cyan-500/20 text-[11px] font-mono text-cyan-400 flex items-center justify-between"
                        >
                          <span>Output Result:</span>
                          <span className="font-bold">{predictOutput}</span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 3: DATA PIPELINES BUILDER 
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Data Pipelines" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-400" />
                  VISUAL DATA PIPELINES
                </h1>
                <p className="text-slate-400 text-xs mt-1">Simulate visual nodes connector pipelines from source to REST deployment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                
                {/* Node Canvas Simulator */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl md:col-span-2 space-y-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
                  
                  {/* Grid background on canvas */}
                  <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

                  <div className="relative z-10 flex justify-between items-center border-b border-slate-900 pb-3">
                    <h3 className="text-white font-bold text-sm">Orchestration Canvas</h3>
                    <button 
                      onClick={handleRunPipeline}
                      disabled={isPipelineRunning}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/10 flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Run Pipeline
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
                        selectedPipelineNode === "s3" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <DatabaseZap className="w-8 h-8 text-blue-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">AWS S3 Ingest</span>
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
                        selectedPipelineNode === "preprocess" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Sliders className="w-8 h-8 text-cyan-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">Scaler & Preprocess</span>
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
                        selectedPipelineNode === "train" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Brain className="w-8 h-8 text-indigo-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">XGBoost Train</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #3</span>
                    </div>

                    {/* Connector line 3 */}
                    <div className="h-6 md:h-0.5 md:w-10 border-l md:border-t border-slate-800 border-dashed flex-1" />

                    {/* Node 4: DEPLOY */}
                    <div 
                      onClick={() => setSelectedPipelineNode("deploy")}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all w-28 md:w-32 hover:scale-105 ${
                        pipelineStep === 6 ? "border-emerald-500 bg-emerald-500/10 shadow shadow-emerald-500/20" :
                        selectedPipelineNode === "deploy" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <Globe className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="text-[10px] font-bold text-white">REST Deploy</span>
                      <span className="text-[8px] text-slate-500 mt-1">Node #4</span>
                    </div>

                  </div>

                  {/* Active node descriptor */}
                  <div className="relative z-10 p-4 rounded-xl bg-slate-950/80 border border-slate-900 text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Canvas Node Configurator</span>
                    <div className="mt-2 text-slate-300">
                      {selectedPipelineNode === "s3" && "AWS S3 Node: Set credentials, bucket path (e.g. s3://novamind-revenue), and ingestion sync rate."}
                      {selectedPipelineNode === "preprocess" && "Scaler Node: Configure imputer (Median), standard scaling bounds, and drop columns parameters."}
                      {selectedPipelineNode === "train" && "Train Node: Sweeps grid bounds (xgboost), 5-fold cross-validation, and metrics target evaluation."}
                      {selectedPipelineNode === "deploy" && "Deploy Node: Select endpoint path (novamind-cloud.api/v1/s3-revenue), set API rate limits, and sync tokens."}
                      {!selectedPipelineNode && "Click on any node above to verify or configure its infrastructure parameters."}
                    </div>
                  </div>
                </div>

                {/* Pipeline logs terminal */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between min-h-[460px]">
                  <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      Terminal Output
                    </h3>
                  </div>

                  <div className="flex-1 bg-slate-950/80 p-4 border border-slate-900/50 rounded-xl my-4 font-mono text-[10px] space-y-2 overflow-y-auto text-slate-300">
                    {pipelineLogs.length === 0 ? (
                      <span className="text-slate-600">&gt; Waiting for pipeline execute trigger...</span>
                    ) : (
                      pipelineLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-blue-500">[{idx+1}]</span>
                          <span className={log.includes("anomaly") ? "text-rose-400" : log.includes("finalized") || log.includes("SUCCESS") ? "text-emerald-400" : "text-slate-300"}>
                            {log}
                          </span>
                        </div>
                      ))
                    )}
                    {isPipelineRunning && (
                      <div className="flex items-center gap-2 text-blue-400 animate-pulse mt-4">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>PROCESSING ACTIVE STAGE...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-[10px] text-slate-500">
                    Pipelines automate ETL extraction. On success, weights are saved and endpoints are mapped.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 4: AI COPILOT CHATROOM
              ──────────────────────────────────────────────────────── */}
          {activeSection === "AI Copilot" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  ANALYTICS AI COPILOT
                </h1>
                <p className="text-slate-400 text-xs mt-1">Ask questions or sweep campaigns. The AI outputs live interactive dashboards.</p>
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
                        chat.sender === "user" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/10" : "bg-blue-600/20 text-blue-400 border border-blue-500/10"
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

                        {/* Inline Recharts Widget inside Chat ( recruiter wow-factor ) */}
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
                                  <Bar dataKey="Conversion" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              ) : chat.chartType === "line" ? (
                                <LineChart data={chat.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="time" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Line type="monotone" dataKey="Latency" stroke="#f43f5e" strokeWidth={2} />
                                </LineChart>
                              ) : (
                                <AreaChart data={chat.chartData}>
                                  <defs>
                                    <linearGradient id="chartRev" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                                  <XAxis dataKey="month" stroke="#64748b" />
                                  <YAxis stroke="#64748b" />
                                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                                  <Area type="monotone" dataKey="Revenue" stroke="#06b6d4" fill="url(#chartRev)" strokeWidth={2} />
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
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/10 flex items-center justify-center text-sm font-bold">
                        AI
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-slate-500 text-xs flex items-center gap-1.5 rounded-tl-none">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>NovaMind Copilot is fetching database metrics...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Prebuilt Prompts Chips */}
                <div className="flex flex-wrap gap-2 py-3 border-t border-slate-900">
                  {[
                    "Analyze marketing spend vs conversion rates",
                    "Find pipeline latency outliers",
                    "Explain XGBoost feature weights",
                    "Draft Q3 revenue report"
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
                    placeholder="Ask Copilot about S3 latency, parameters weights, or forecast data..."
                    className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-slate-300 text-xs outline-none focus:border-blue-500/60 transition-all"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 5: TIME-SERIES FORECASTING
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Forecasting" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  TIME-SERIES FORECASTING
                </h1>
                <p className="text-slate-400 text-xs mt-1">Select metric models and render confidence interval trends dynamically.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Forecasting hyperparameter panel */}
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
                        <option value="mrr">Monthly Recurring Revenue (MRR)</option>
                        <option value="users">Monthly Active Users (MAU)</option>
                        <option value="traffic">API Request Ingestion Traffic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1.5">Model Horizon</label>
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
                        <option value="prophet">Facebook Prophet (Additive Model)</option>
                        <option value="arima">ARIMA Auto-Regressive Integrated</option>
                        <option value="lstm">LSTM recurrent network (Neural)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateForecast}
                    disabled={isForecasting}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
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
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                            <Legend />
                            {/* historical line */}
                            <Line type="monotone" dataKey="Historical" name="Historical Actual" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                            {/* forecast line */}
                            <Line type="monotone" dataKey="Forecast" name="Model Forecast" stroke="#06b6d4" strokeDasharray="5 5" strokeWidth={2.5} dot={{ r: 4 }} />
                            {/* confidence upper/lower area */}
                            <Area type="monotone" dataKey="Upper" stroke="none" fill="url(#forecastBand)" legendType="none" />
                            <Area type="monotone" dataKey="Lower" stroke="none" fill="url(#forecastBand)" legendType="none" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Forecast stats card */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-900 text-center">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">MAE Score</div>
                          <div className="text-sm font-bold text-white mt-1">2.41%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">RMSE Bound</div>
                          <div className="text-sm font-bold text-white mt-1">1.82k</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-900">
                          <div className="text-[9px] text-slate-500 uppercase font-bold">MAPE Accuracy</div>
                          <div className="text-sm font-bold text-emerald-400 mt-1">97.8%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-[10px] text-slate-500">
                    Forecasting fits additive model algorithms. Confidence bounds expand as horizons lengthen.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 6: API DEPLOYMENTS / LIVE REGISTRY
              ──────────────────────────────────────────────────────── */}
          {activeSection === "API Deployments" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-400" />
                  API ENDPOINTS HUB
                </h1>
                <p className="text-slate-400 text-xs mt-1">Test active REST model payloads and check infrastructure latencies.</p>
              </div>

              {/* Endpoint list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Registry panel */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Endpoint Registry</h3>
                    <p className="text-slate-500 text-[10px]">Select deployed API to test request response</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "telecom-churn-predictor", model: "XGBoost", status: "ONLINE", rate: "4.8k req/min", path: "/api/v1/churn" },
                      { name: "titanic-survival-mlp", model: "Deep Neural MLP", status: "ONLINE", rate: "1.2k req/min", path: "/api/v1/titanic" },
                      { name: "housing-value-rf", model: "RandomForest", status: "ONLINE", rate: "820 req/min", path: "/api/v1/housing" }
                    ].map(endpoint => (
                      <div 
                        key={endpoint.name}
                        onClick={() => {
                          setApiTesterEndpoint(endpoint.name);
                          if (endpoint.name === "telecom-churn-predictor") {
                            setApiTesterInput(`{\n  "tenure": 12,\n  "monthly_charges": 65.80,\n  "total_charges": 789.60,\n  "contract_type": "One year"\n}`);
                          } else if (endpoint.name === "titanic-survival-mlp") {
                            setApiTesterInput(`{\n  "age": 28,\n  "fare": 32.50,\n  "pclass": 1,\n  "sex": "female"\n}`);
                          } else {
                            setApiTesterInput(`{\n  "income": 5.5,\n  "house_age": 15,\n  "rooms": 6,\n  "population": 840\n}`);
                          }
                          setApiTesterOutput("");
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          apiTesterEndpoint === endpoint.name 
                            ? "border-blue-500 bg-blue-500/5" 
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
                      <span className="text-blue-400 font-bold">POST</span>
                      <span>novamind-cloud.api/v1/{apiTesterEndpoint}</span>
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
                        className="w-full h-48 bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-300 outline-none resize-none focus:border-blue-500/60"
                      />
                    </div>

                    {/* JSON Output panel */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-slate-400 text-xs font-medium">JSON Response Payload</label>
                        {isApiTesting && <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />}
                      </div>
                      <div className="w-full h-48 bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-400 overflow-y-auto whitespace-pre">
                        {apiTesterOutput || "{\n  // Click send query to view live infrastructure outputs\n}"}
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={handleTestApi}
                    disabled={isApiTesting}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                  >
                    {isApiTesting ? "Awaiting Network Ingest..." : "Send Inference Request"}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SECTION 7: SETTINGS PANEL
              ──────────────────────────────────────────────────────── */}
          {activeSection === "Settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <SettingsIcon className="w-6 h-6 text-blue-400" />
                  WORKSPACE SETTINGS
                </h1>
                <p className="text-slate-400 text-xs mt-1">Configure client-side subscription profiles, API keys, and rate limits.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Security and Credentials settings */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">API Key Provisioning</h3>
                    <p className="text-slate-500 text-[10px]">Create secure access credentials for API hubs</p>
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
                          className="px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all text-xs"
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
                        <label className="text-slate-400 font-medium">Simulated Rate Limit Bounds</label>
                        <span className="text-blue-400 font-bold font-mono">{rateLimit.toLocaleString()} req/hr</span>
                      </div>
                      <input 
                        type="range" min="1000" max="25000" step="500" value={rateLimit} 
                        onChange={e => setRateLimit(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Subscriptions & Accounts details */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-xl space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Billing & Workspace Profile</h3>
                    <p className="text-slate-500 text-[10px]">Manage compute tiers and workspace access</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/60">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">ACTIVE TIER</div>
                        <div className="text-sm font-black text-white mt-1">Pro Developer</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/60">
                        <div className="text-[9px] text-slate-500 uppercase font-bold">ESTIMATED GPU</div>
                        <div className="text-sm font-black text-white mt-1">Shared T4 Engine</div>
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
                    
                    <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-[10px] text-slate-400 leading-relaxed">
                      💡 <strong>Recruiter Notice:</strong> The simulated parameters, logs, charts, and API testers are pre-integrated into this sandboxed Next.js app to display advanced interactive logic and design architecture on a single, deployable codebase.
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