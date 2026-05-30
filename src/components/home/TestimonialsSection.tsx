"use client";

import { Star, Quote } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    text: "Got my MacBook Pro delivered in 2 days. Best price I found anywhere online. The whole experience was seamless — will definitely shop here again!",
    product: "MacBook Pro M3",
    accent: "#00FF88",
  },
  {
    name: "Sarah Chen",
    role: "Graphic Designer",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "The expert support team helped me pick the perfect creative workstation. Amazing service and the ASUS ROG is absolutely a beast for my workflow.",
    product: "ASUS ROG Zephyrus",
    accent: "#CC44FF",
  },
  {
    name: "Mike Torres",
    role: "University Student",
    avatar: "https://i.pravatar.cc/80?img=8",
    rating: 5,
    text: "0% APR financing made it possible to get a high-end machine without killing my budget. Delivery was fast and packaging was super secure.",
    product: "Dell XPS 15",
    accent: "#FFB800",
  },
  {
    name: "Priya Patel",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/80?img=9",
    rating: 5,
    text: "Had to return a laptop for personal reasons. The 30-day policy was completely hassle-free and my refund arrived in under 48 hours. Outstanding!",
    product: "HP Spectre x360",
    accent: "#00CCFF",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1419] relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-[#00FF88]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-[#CC44FF]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#00FF88] font-semibold text-xs uppercase tracking-[0.2em] mb-3"
          >
            Customer Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]"
          >
            Loved by{" "}
            <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
              50,000+
            </span>{" "}
            Customers
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="flex items-center justify-center gap-1.5 mt-3"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
            ))}
            <span className="text-[#E5E7EB]/35 text-sm ml-1">4.9 / 5 average</span>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${t.accent}25`,
                transition: { duration: 0.2 },
              }}
              className="bg-[#1A2129] rounded-2xl p-4 sm:p-5 border border-[#E5E7EB]/5 group flex flex-col"
            >
              {/* Quote icon */}
              <Quote
                className="w-6 h-6 mb-3 transition-colors duration-300"
                style={{ color: t.accent + "40" }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#E5E7EB]/50 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1A2129]"
                    style={{ background: t.accent }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#E5E7EB] text-sm">{t.name}</p>
                  <p className="text-[#E5E7EB]/30 text-xs">{t.role}</p>
                </div>
              </div>

              {/* Product tag */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]/5">
                <p
                  className="text-xs font-semibold"
                  style={{ color: t.accent }}
                >
                  ✓ Purchased: {t.product}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
