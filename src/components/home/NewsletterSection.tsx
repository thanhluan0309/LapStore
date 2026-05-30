"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const perks = ["Weekly Deals", "New Arrivals", "Tech Reviews", "Exclusive Coupons"];

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  }

  return (
    <section className="py-20 bg-[#1A2129] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00FF88] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00FF88]/25 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mx-auto mb-6 bg-[#00FF88]/10 border border-[#00FF88]/25"
          style={{ boxShadow: "0 0 30px rgba(0,255,136,0.2)" }}
        >
          <Mail className="w-7 h-7 text-[#00FF88]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#00FF88] font-semibold text-xs uppercase tracking-[0.2em] mb-3"
        >
          Stay in the Loop
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-4xl font-black text-[#E5E7EB] mb-3"
        >
          Get the{" "}
          <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
            Best Deals
          </span>{" "}
          First
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-[#E5E7EB]/35 text-sm mb-8 leading-relaxed"
        >
          Exclusive deals, new arrivals, and tech insights — delivered directly to your inbox before anyone else.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-[#00FF88]/10 border border-[#00FF88]/25 rounded-2xl py-5 px-8"
                style={{ boxShadow: "0 0 24px rgba(0,255,136,0.15)" }}
              >
                <CheckCircle className="w-6 h-6 text-[#00FF88]" />
                <p className="font-semibold text-[#E5E7EB]">
                  You're in! Check your inbox for a welcome discount.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-[#0F1419] border border-[#E5E7EB]/10 text-[#E5E7EB] placeholder-[#E5E7EB]/25 text-sm focus:outline-none focus:border-[#00FF88]/40 focus:shadow-[0_0_16px_rgba(0,255,136,0.15)] transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(255,184,0,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FFB800] text-[#0F1419] font-black rounded-xl text-sm whitespace-nowrap tracking-wide"
                >
                  <Send className="w-4 h-4" />
                  Subscribe Free
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="text-[#E5E7EB]/20 text-xs mt-4"
        >
          50,000+ subscribers · Unsubscribe anytime · Zero spam
        </motion.p>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-1.5 text-[#E5E7EB]/35 text-xs">
              <Zap className="w-3 h-3 text-[#00FF88]" />
              {perk}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
