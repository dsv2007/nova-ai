# 🚀 Nova AI

> Enterprise Data Integrity & System Corruption Monitoring Platform

![Nova AI](https://img.shields.io/badge/Built%20with-Next.js-000?style=for-the-badge&logo=next.js)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📸 Live Demo
🔗 **[View Live Website](https://novaalert-cloud.vercel.app)** *(Deploy when ready)*

## ✨ Features

- 🎨 **DevOps & Security Aesthetics** — Deep slate backgrounds combined with vibrant red, orange, and amber warning gradient accents
- ✨ **Animated Background** — Interactive floating matrix patterns, warning grid lines, and glowing beacons
- 📊 **Sentinel Command Center** — Real-time analytics tracking system integrity SLA, sensor latency, daily log records, and automated response alerts
- 🤖 **Incident Response Copilot** — Interactive AI support console for debugging syslog anomalies and drafting quarantine scripts
- 🔬 **Corruption Sandbox** — Real-time block corruption simulator with interactive directory diagnostics and check-sum scanning sweeps
- 📱 **Fully Responsive** — Native feel across desktop, tablet, and mobile browsers
- ⚡ **High Performance** — Next.js 16 with React 19 architecture
- 🔗 **Smooth Navigation** — Clean page transitions and layout integration

## 📄 Pages Built

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section + Security features + Sector scanning optimizer sandbox |
| **About** | `/about` | Corporate mission, platform stats, and core engineering board bios |
| **Services** | `/services` | Technical offerings (Corruption Sandbox, Checksum Indexers, Webhooks, Syslog ETL) |
| **Pricing** | `/pricing` | Flexible monitoring subscriptions + Data ingestion and alerts FAQ |
| **Contact** | `/contact` | System support inquiry form + developer DevOps hiring bio |
| **Platform** | `/platform` | Comprehensive workspace dashboard featuring 7 active tools |
| **Dashboard** | `/dashboard` | High-level executive cockpit with tabbed metric views |

## 🛠️ Tech Stack

**Frontend & Logic:**
- Next.js 16 (React Framework)
- Tailwind CSS (Utility Styling)
- Framer Motion (Micro-animations)
- TypeScript

**Analytics & Visualizations:**
- Recharts (Interactive charts & Area maps)
- Lucide React (Systems & security icons)

**Deployment:**
- Vercel (Production ready)

## 🚀 Quick Start

### Clone Repository
```bash
git clone https://github.com/dsv2007/novamind-cloud.git
cd novamind-cloud
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 📊 Project Structure
novamind-cloud/
├── app/
│   ├── page.tsx              # Home landing page
│   ├── about/page.tsx        # Mission and team page
│   ├── services/page.tsx     # Security offerings page
│   ├── pricing/page.tsx      # Pricing plans page
│   ├── contact/page.tsx      # Contact and bio page
│   ├── platform/page.tsx     # Full workspace dashboard (7 tabs)
│   ├── dashboard/page.tsx    # Executive dashboard page
│   ├── layout.tsx            # Global layout & metadata
│   └── globals.css           # Styling configuration
├── components/
│   ├── Navbar.tsx            # Navigation brand bar
│   └── Background.tsx        # Animated background elements
├── public/                   # Static icons & logs
└── package.json              # Dependencies list

## 🎨 Design System

- **Color Scheme:** Slate-950 (Background) + Red-500 (Primary Alert) + Orange-500 (Secondary Alert) + Amber-500 (Warning Accent)
- **Typography:** Inter Font Family
- **Glow Effects:** Backdrop-blur glassmorphic boxes with radial ambient glow circles

---

## 🛠️ Systems & DevOps Portfolio Blueprints

To accompany this dashboard in a professional resume or portfolio, the following backing infrastructure components are planned/architected:

### 1. Nova AI Core Daemon (Go / Rust)
A lightweight agent installed on target server clusters to monitor file directories for unauthorized changes:
- Utilizes OS-native file monitoring APIs (`inotify` on Linux, `FSEvents` on macOS, or `ReadDirectoryChangesW` on Windows).
- Computes cryptographic hashes (SHA-256) of altered blocks asynchronously.
- Interlaces with local Sqlite cache to compare hashes against the authorized system baseline.
- Dispatches alert payloads to the Nova AI central API upon detecting unauthorized modifications.

### 2. High-Throughput Syslog Parsing Gateway (Go)
A concurrent logging server that ingests system streams:
- Opens UDP and TCP sockets to receive standard RFC 5424 syslog streams.
- Employs a worker pool architecture to parse logs concurrently using regex filters.
- Identifies critical error messages, filesystem read/write failures, and hardware interrupts.
- Streamlines alerts into a Redis queue for rapid consumption by the dashboard and webhook dispatchers.

### 3. Quarantine Containment Controller (Python / TypeScript)
An automated orchestration engine responding to containment triggers:
- Listens to verified webhook payloads dispatched by Nova AI.
- Initiates server isolation protocols (e.g., executing `iptables` rules to drop all non-admin connections, pausing docker containers).
- Notifies operational standbys via PagerDuty/Slack alerting API.
- Commits incident forensics logs to an immutable write-once read-many (WORM) audit folder.

---

## 👩‍💻 Developer

**Santhivarshini D**
- 📧 Email: [santhivarshinidevan@gmail.com](mailto:santhivarshinidevan@gmail.com)
- 📱 Phone: +91 6369083465
- 📍 Location: Dharmapuri, Tamil Nadu, India
- 🔗 GitHub: [@dsv2007](https://github.com/dsv2007)

---

⭐ **If you like this project, please give it a star!**

Made with ❤️ by Santhivarshini D
