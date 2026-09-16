"use client";
import { useEffect, useState } from "react";
export default function LivePulse() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-2xl">
      <div className="relative w-2.5 h-2.5">
        <div className={`absolute inset-0 bg-green-500 rounded-full ${pulse? "animate-ping opacity-75" : "opacity-0"}`}></div>
        <div className={`relative w-2.5 h-2.5 rounded-full bg-green-500 ${pulse? "shadow-[0_0_12px_#22c55e] scale-125" : "shadow-[0_0_6px_#22c55e]"}`}></div>
      </div>
      <span className="text-[11px] font-bold tracking-widest text-white">LIVE</span>
    </div>
  );
}
