"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Full Specs", "Reviews"] as const;
type Tab = typeof TABS[number];

const mockReviews = [
  { name: "Alex J.", role: "Software Engineer", rating: 5, text: "Absolutely incredible machine. The performance is unmatched and battery life is phenomenal.", date: "Dec 2024" },
  { name: "Sarah C.", role: "Designer", rating: 5, text: "The display is breathtaking — colors are incredibly accurate for my design work.", date: "Nov 2024" },
  { name: "Mike T.", role: "Student", rating: 4, text: "Great laptop overall. Slightly pricey but worth every dollar for what you get.", date: "Nov 2024" },
  { name: "Priya P.", role: "Manager", rating: 5, text: "Fast, reliable, and the build quality is top-tier. Zero complaints after 3 months.", date: "Oct 2024" },
];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Overview");

  const allSpecs = [
    { label: "Processor", value: product.specs.cpu },
    { label: "Memory", value: product.specs.ram },
    { label: "Storage", value: product.specs.storage },
    { label: "Display", value: product.specs.display },
    ...(product.detailedSpecs.gpu ? [{ label: "Graphics", value: product.detailedSpecs.gpu }] : []),
    ...(product.detailedSpecs.battery ? [{ label: "Battery", value: product.detailedSpecs.battery }] : []),
    ...(product.detailedSpecs.weight ? [{ label: "Weight", value: product.detailedSpecs.weight }] : []),
    ...(product.detailedSpecs.os ? [{ label: "Operating System", value: product.detailedSpecs.os }] : []),
    ...(product.detailedSpecs.ports ? [{ label: "Ports", value: product.detailedSpecs.ports }] : []),
    ...(product.detailedSpecs.wifi ? [{ label: "Wireless", value: product.detailedSpecs.wifi }] : []),
    ...(product.detailedSpecs.webcam ? [{ label: "Webcam", value: product.detailedSpecs.webcam }] : []),
    ...(product.detailedSpecs.audio ? [{ label: "Audio", value: product.detailedSpecs.audio }] : []),
  ];

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-1 border-b border-[#E5E7EB]/8 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-5 py-3 text-sm font-semibold transition-colors",
              active === tab ? "text-[#00FF88]" : "text-[#E5E7EB]/40 hover:text-[#E5E7EB]/70"
            )}
          >
            {tab}
            {active === tab && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00FF88] rounded-full"
                style={{ boxShadow: "0 0 8px rgba(0,255,136,0.5)" }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active === "Overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <p className="text-[#E5E7EB]/60 leading-relaxed mb-6">{product.description}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Processor", value: product.specs.cpu },
                { label: "Memory", value: product.specs.ram },
                { label: "Storage", value: product.specs.storage },
                { label: "Display", value: product.specs.display },
              ].map((s) => (
                <div key={s.label} className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-xl p-4">
                  <p className="text-[10px] text-[#00FF88] uppercase tracking-widest font-bold mb-1">{s.label}</p>
                  <p className="text-sm text-[#E5E7EB] font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {active === "Full Specs" && (
          <motion.div key="specs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl overflow-hidden">
              {allSpecs.map((s, i) => (
                <div key={s.label} className={cn("flex items-start px-5 py-3.5 gap-4", i !== 0 && "border-t border-[#E5E7EB]/5")}>
                  <span className="text-xs text-[#E5E7EB]/35 font-medium w-36 shrink-0 pt-0.5">{s.label}</span>
                  <span className="text-sm text-[#E5E7EB]/80 font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {active === "Reviews" && (
          <motion.div key="reviews" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center gap-4 mb-6 p-5 bg-[#1A2129] rounded-2xl border border-[#E5E7EB]/5">
              <div className="text-center">
                <p className="text-5xl font-black text-[#00FF88]">{product.rating}</p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#E5E7EB]/15 fill-[#E5E7EB]/15")} />
                  ))}
                </div>
                <p className="text-xs text-[#E5E7EB]/30 mt-1">{product.reviews.toLocaleString()} reviews</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockReviews.map((r) => (
                <div key={r.name} className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-5">
                  <Quote className="w-5 h-5 text-[#00FF88]/30 mb-2" />
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />)}
                  </div>
                  <p className="text-sm text-[#E5E7EB]/55 leading-relaxed mb-3">{r.text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#E5E7EB]">{r.name}</p>
                      <p className="text-xs text-[#E5E7EB]/30">{r.role}</p>
                    </div>
                    <span className="text-xs text-[#E5E7EB]/25">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
