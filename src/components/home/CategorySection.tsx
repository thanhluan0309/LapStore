"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/products";

const CARD_COLORS: Record<string, { border: string; glow: string; text: string }> = {
  gaming:    { border: "#FF4444", glow: "rgba(255,68,68,0.15)",   text: "#FF6666" },
  business:  { border: "#00FF88", glow: "rgba(0,255,136,0.12)",   text: "#00FF88" },
  student:   { border: "#00CCFF", glow: "rgba(0,204,255,0.12)",   text: "#00CCFF" },
  creator:   { border: "#CC44FF", glow: "rgba(204,68,255,0.12)",  text: "#CC44FF" },
  ultrabook: { border: "#FFB800", glow: "rgba(255,184,0,0.12)",   text: "#FFB800" },
  budget:    { border: "#00FF88", glow: "rgba(0,255,136,0.08)",   text: "#00FF88" },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function CategorySection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#00FF88] font-semibold text-xs uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-[#00FF88]" />
              Browse by Category
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]"
            >
              Find Your Perfect{" "}
              <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
                Machine
              </span>
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 4 }}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#E5E7EB]/40 hover:text-[#00FF88] transition-colors"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4"
        >
          {categories.map((cat) => {
            const colors = CARD_COLORS[cat.id] || CARD_COLORS.business;
            return (
              <motion.a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 60px ${colors.glow}, 0 0 0 1px ${colors.border}40`,
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden rounded-2xl p-3 sm:p-5 flex flex-col items-center text-center cursor-pointer bg-[#1A2129] border border-[#E5E7EB]/5 group"
                style={{ transition: "box-shadow 0.25s" }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 rounded-bl-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${colors.border}, transparent)` }}
                />

                {/* Icon */}
                <motion.div
                  className="text-3xl sm:text-4xl mb-2 sm:mb-3 leading-none"
                  whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {cat.icon}
                </motion.div>

                <p className="font-bold text-[#E5E7EB] text-sm mb-0.5">{cat.name}</p>
                <p className="text-xs" style={{ color: colors.text }}>{cat.count} models</p>

                {/* Arrow on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: colors.border + "20" }}
                >
                  <ArrowRight className="w-3 h-3" style={{ color: colors.border }} />
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
