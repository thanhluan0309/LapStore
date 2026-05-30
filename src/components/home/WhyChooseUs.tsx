"use client";

import { Shield, Truck, RotateCcw, Headphones, CreditCard, Award } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Free Fast Shipping",
    desc: "Free 2-day shipping on all orders over $999. Express delivery available nationwide.",
    accent: "#00FF88",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "Every laptop ships with an extended 2-year warranty plus accidental damage protection.",
    accent: "#00CCFF",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "Not happy? Return any laptop within 30 days, no questions asked, full refund.",
    accent: "#FFB800",
  },
  {
    icon: Headphones,
    title: "Expert 24/7 Support",
    desc: "Certified tech experts available round the clock via chat, phone, or video call.",
    accent: "#CC44FF",
  },
  {
    icon: CreditCard,
    title: "0% APR Financing",
    desc: "Buy now, pay over 24 months with zero interest. No hidden fees, ever.",
    accent: "#FF6644",
  },
  {
    icon: Award,
    title: "100% Authentic",
    desc: "Every unit sourced directly from official brand distributors. Zero counterfeits.",
    accent: "#00FF88",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#1A2129] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#00FF88] font-semibold text-xs uppercase tracking-[0.2em] mb-3"
          >
            Why LapStore?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]"
          >
            Built for Gamers,{" "}
            <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
              Trusted by All
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-[#E5E7EB]/35 mt-3 max-w-lg mx-auto text-sm leading-relaxed"
          >
            Every decision we make — from sourcing to shipping — is designed around your experience.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${f.accent}25`,
                  transition: { duration: 0.2 },
                }}
                className="bg-[#0F1419] rounded-2xl p-4 sm:p-6 border border-[#E5E7EB]/5 group cursor-default"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.35 }}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                  style={{
                    background: f.accent + "15",
                    border: `1px solid ${f.accent}30`,
                    boxShadow: `0 0 16px ${f.accent}15`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: f.accent }} />
                </motion.div>

                <h3 className="font-bold text-[#E5E7EB] mb-2 group-hover:text-[#00FF88] transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#E5E7EB]/35 text-sm leading-relaxed">{f.desc}</p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-5 h-px origin-left rounded-full"
                  style={{ background: `linear-gradient(to right, ${f.accent}50, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
