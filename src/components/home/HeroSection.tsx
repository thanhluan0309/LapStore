"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { heroSlides } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ACCENT_COLORS: Record<number, { neon: string; glow: string }> = {
  0: { neon: "#00FF88", glow: "rgba(0,255,136,0.2)" },
  1: { neon: "#FF4444", glow: "rgba(255,68,68,0.2)" },
  2: { neon: "#00CCFF", glow: "rgba(0,204,255,0.2)" },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Defined outside component — no recreation on re-render
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();

  const slide = heroSlides[current];
  const accent = ACCENT_COLORS[current];

  useEffect(() => {
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [current]);

  function paginate(dir: number) {
    setDirection(dir);
    setCurrent((c) => (c + dir + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F1419] pt-20 scan-line">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accent.neon} 1px, transparent 1px), linear-gradient(90deg, ${accent.neon} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated orbs — opacity-only animation, blur is static on inner div */}
      {reducedMotion ? (
        <>
          <div
            className="absolute top-1/4 right-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] pointer-events-none"
            style={{ opacity: 0.2 }}
          >
            <div className="w-full h-full rounded-full blur-[80px] sm:blur-[120px]" style={{ background: accent.glow }} />
          </div>
          <div
            className="absolute bottom-1/4 left-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] pointer-events-none"
            style={{ opacity: 0.1 }}
          >
            <div className="w-full h-full rounded-full blur-[60px] sm:blur-[100px]" style={{ background: "rgba(255,184,0,0.15)" }} />
          </div>
        </>
      ) : (
        <>
          <motion.div
            key={current + "orb1"}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] pointer-events-none"
          >
            <div className="w-full h-full rounded-full blur-[80px] sm:blur-[120px]" style={{ background: accent.glow }} />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] pointer-events-none"
          >
            <div className="w-full h-full rounded-full blur-[60px] sm:blur-[100px]" style={{ background: "rgba(255,184,0,0.15)" }} />
          </motion.div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-8 lg:py-12">
          {/* Text */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current + "text"}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6 z-10"
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3 sm:space-y-5">
                {/* Badge */}
                <motion.span
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 border text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase"
                  style={{ borderColor: accent.neon + "50", color: accent.neon, background: accent.glow }}
                >
                  {reducedMotion ? (
                    <span className="w-2 h-2 rounded-full" style={{ background: accent.neon }} />
                  ) : (
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: accent.neon }}
                    />
                  )}
                  {slide.badge}
                </motion.span>

                {/* Title */}
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#E5E7EB] leading-none tracking-tight">
                    {slide.title}
                  </h1>
                  <h1
                    className="text-3xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tight mt-1"
                    style={{ color: accent.neon, textShadow: `0 0 30px ${accent.neon}60` }}
                  >
                    {slide.highlight}
                  </h1>
                </motion.div>

                {/* Subtitle + desc */}
                <motion.div variants={itemVariants}>
                  <p className="text-[#00FF88] font-semibold text-base sm:text-lg">{slide.subtitle}</p>
                  <p className="text-[#E5E7EB]/50 mt-1 max-w-md leading-relaxed">{slide.description}</p>
                </motion.div>

                {/* Price + CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-2">
                  <div>
                    <p className="text-[#E5E7EB]/40 text-xs font-medium uppercase tracking-widest">Starting from</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB] mt-0.5">{formatPrice(slide.price)}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,184,0,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 sm:px-7 py-2 sm:py-3.5 rounded-xl font-bold text-[#0F1419] bg-[#FFB800] text-xs sm:text-sm tracking-wide"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {slide.cta}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, borderColor: accent.neon, color: accent.neon }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3.5 rounded-xl font-semibold text-[#E5E7EB]/60 border border-[#E5E7EB]/15 text-xs sm:text-sm transition-colors"
                    >
                      Specs <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="flex gap-4 sm:gap-8 pt-2">
                  {[
                    { value: "50K+", label: "Customers" },
                    { value: "4.9★", label: "Avg Rating" },
                    { value: "500+", label: "Models" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-base sm:text-xl font-black" style={{ color: accent.neon }}>{s.value}</p>
                      <p className="text-xs text-[#E5E7EB]/40 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Image */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current + "img"}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative">
                {/* Glow behind image — opacity only, no scale */}
                <motion.div
                  animate={reducedMotion ? {} : { opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl blur-3xl scale-90"
                  style={{ background: `radial-gradient(ellipse, ${accent.glow} 0%, transparent 70%)` }}
                />

                {/* Floating laptop — disable float on reduced motion */}
                <motion.div
                  animate={reducedMotion ? {} : { y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: reducedMotion ? "auto" : "transform" }}
                >
                  <img
                    src={slide.image}
                    alt={slide.subtitle}
                    className="relative w-full max-w-lg rounded-2xl object-cover aspect-[4/3]"
                    style={{ boxShadow: `0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent.neon}20` }}
                  />
                </motion.div>

                {/* Floating stat card — bottom left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="hidden sm:flex absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-[#1A2129] border border-[#00FF88]/20 rounded-2xl p-3 shadow-xl items-center gap-2 glow-neon-sm"
                >
                  <div className="w-8 h-8 bg-[#00FF88] rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#0F1419]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#E5E7EB]">Performance Score</p>
                    <p className="text-sm font-black text-[#00FF88]">98 / 100</p>
                  </div>
                </motion.div>

                {/* Floating price card — top right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="hidden sm:block absolute -top-3 sm:-top-5 -right-3 sm:-right-5 bg-[#1A2129] border border-[#FFB800]/20 rounded-2xl p-3 shadow-xl"
                >
                  <p className="text-[10px] text-[#E5E7EB]/40 font-medium uppercase tracking-wide">From</p>
                  <p className="text-base sm:text-xl font-black text-[#FFB800]">{formatPrice(slide.price)}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="flex items-center justify-between pb-10">
          <div className="flex gap-2 items-center">
            {heroSlides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                animate={{ width: i === current ? 32 : 10 }}
                className={cn(
                  "h-2.5 rounded-full transition-colors duration-300",
                  i === current ? "bg-[#00FF88]" : "bg-[#E5E7EB]/15 hover:bg-[#E5E7EB]/30"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[{ fn: () => paginate(-1), icon: ChevronLeft }, { fn: () => paginate(1), icon: ChevronRight }].map(({ fn, icon: Icon }, i) => (
              <motion.button
                key={i}
                onClick={fn}
                whileHover={{ scale: 1.1, borderColor: "#00FF88", color: "#00FF88" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-[#E5E7EB]/15 text-[#E5E7EB]/40 flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
