"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

function useCountdown(ms: number) {
  const [left, setLeft] = useState(ms);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    hours: Math.floor(left / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
    seconds: Math.floor((left % 60_000) / 1000),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        key={value}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-16 h-16 bg-[#0F1419] border border-[#00FF88]/20 rounded-xl flex items-center justify-center glow-neon-sm"
      >
        <span className="text-2xl font-black text-[#00FF88] font-mono tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-[10px] text-[#E5E7EB]/30 uppercase tracking-widest">{label}</span>
    </div>
  );
}

const deals = [
  { name: "MacBook Air M2", original: 1299, sale: 999,  off: 23, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
  { name: "ASUS ROG G14",   original: 1599, sale: 1099, off: 31, img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
  { name: "Dell Inspiron 15",original: 799, sale: 499,  off: 38, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80" },
  { name: "Lenovo IdeaPad 5",original: 899, sale: 549,  off: 39, img: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&q=80" },
];

export default function PromoSection() {
  const { hours, minutes, seconds } = useCountdown(12 * 3_600_000 + 34 * 60_000 + 56_000);

  return (
    <section className="py-20 bg-[#0F1419] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#FFB800]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
      </div>

      {/* Horizontal neon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00FF88]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — Deal info */}
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-2 h-2 bg-[#FFB800] rounded-full"
              />
              Flash Sale — Limited Time
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl sm:text-5xl font-black text-[#E5E7EB] leading-tight">
                Up to{" "}
                <span className="text-[#FFB800]" style={{ textShadow: "0 0 24px rgba(255,184,0,0.5)" }}>
                  40% OFF
                </span>
                <br />
                <span className="text-[#E5E7EB]/60">on Premium Laptops</span>
              </h2>
              <p className="text-[#E5E7EB]/40 mt-3 text-base max-w-sm leading-relaxed">
                Biggest sale of the year. Top brands at prices you won't find anywhere else.
              </p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#E5E7EB]/30 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
                Deal ends in
              </p>
              <div className="flex items-end gap-3">
                <TimeBlock value={hours}   label="Hrs"  />
                <span className="text-2xl font-black text-[#FFB800]/40 mb-5">:</span>
                <TimeBlock value={minutes} label="Min"  />
                <span className="text-2xl font-black text-[#FFB800]/40 mb-5">:</span>
                <TimeBlock value={seconds} label="Sec"  />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(255,184,0,0.45)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-8 py-4 bg-[#FFB800] text-[#0F1419] font-black rounded-xl text-sm tracking-wide"
            >
              Shop Flash Sale <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right — Deal cards */}
          <div className="grid grid-cols-2 gap-4">
            {deals.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45, ease: "easeOut" }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,184,0,0.25)",
                }}
                className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-4 cursor-pointer group"
              >
                <div className="overflow-hidden rounded-xl mb-3 aspect-4/3">
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-[#E5E7EB] mb-1.5 line-clamp-1 group-hover:text-[#FFB800] transition-colors">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base font-black text-[#FFB800]">{formatPrice(item.sale)}</span>
                  <span className="text-[#E5E7EB]/25 line-through text-xs">{formatPrice(item.original)}</span>
                </div>
                <span className="inline-block bg-[#FFB800]/10 text-[#FFB800] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#FFB800]/20">
                  -{item.off}% OFF
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
