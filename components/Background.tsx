"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
}

interface Square {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
}

export default function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      width: 8 + Math.random() * 12,
      height: 8 + Math.random() * 12,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,
    }));
    const newSquares = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      width: 12 + Math.random() * 18,
      height: 12 + Math.random() * 18,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 5,
    }));
    setTimeout(() => {
      setParticles(newParticles);
      setSquares(newSquares);
    }, 0);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 bg-[#020817]">
      {/* Grid */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-[#020817]"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Floating squares */}
      {squares.map((s) => (
        <div
          key={`square-${s.id}`}
          className="absolute border border-blue-400/40 animate-bounce"
          style={{
            width: `${s.width}px`,
            height: `${s.height}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
    </div>
  );
}