"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Package, ArrowRight, Mail, MapPin } from "lucide-react";

function getDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function OrderSuccessPage({ orderId }: { orderId: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated checkmark */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="relative w-24 h-24"
          >
            {/* Outer ring */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 animate-neon-pulse"
            />
            {/* Inner circle */}
            <div className="absolute inset-3 rounded-full bg-[#00FF88] flex items-center justify-center" style={{ boxShadow: "0 0 30px rgba(0,255,136,0.5)" }}>
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.25, stiffness: 300, damping: 20 }}
              >
                <Check className="w-9 h-9 text-[#0F1419] stroke-[3]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
          <h1 className="text-4xl font-black text-[#E5E7EB]">
            Order <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>Confirmed!</span>
          </h1>
          <p className="text-[#E5E7EB]/50">Thank you for your purchase. Your laptop is on its way!</p>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-6 space-y-4 text-left"
        >
          {/* Order ID */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#E5E7EB]/35 uppercase tracking-widest">Order ID</span>
            <span className="font-mono font-black text-[#00FF88] text-sm tracking-wide">{orderId}</span>
          </div>

          <div className="border-t border-[#E5E7EB]/5" />

          {/* Delivery */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-[#00FF88]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#E5E7EB]">Estimated Delivery</p>
              <p className="text-sm text-[#FFB800] font-bold">{getDeliveryDate()}</p>
              <p className="text-xs text-[#E5E7EB]/35 mt-0.5">Standard Shipping · 5-7 business days</p>
            </div>
          </div>

          {/* Email notice */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#FFB800]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#E5E7EB]">Confirmation Email Sent</p>
              <p className="text-xs text-[#E5E7EB]/35 mt-0.5">Check your inbox for order details and tracking info.</p>
            </div>
          </div>

          {/* Track notice */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#00CCFF]/10 border border-[#00CCFF]/20 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#00CCFF]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#E5E7EB]">Real-time Tracking</p>
              <p className="text-xs text-[#E5E7EB]/35 mt-0.5">Tracking link will be sent within 24 hours of shipment.</p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/products" className="flex-1">
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(0,255,136,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-3.5 bg-[#00FF88] text-[#0F1419] font-bold rounded-xl text-sm cursor-pointer"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
          <Link href="/" className="flex-1">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-3.5 border border-[#E5E7EB]/10 text-[#E5E7EB]/50 hover:text-[#E5E7EB]/80 font-semibold rounded-xl text-sm cursor-pointer transition-colors"
            >
              Back to Home
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
