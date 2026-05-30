"use client";

import { useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

const filters = ["All", "Gaming", "Business", "Creator", "Ultrabook", "Student"];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};
// Items beyond the 6th appear instantly — no cascading delay on large grids
const instantVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-20 bg-[#1A2129] perf-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#00FF88] font-semibold text-xs uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-[#00FF88]" />
              Handpicked for You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-[#E5E7EB]"
            >
              Featured{" "}
              <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>
                Laptops
              </span>
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-sm font-semibold text-[#E5E7EB]/40 hover:text-[#00FF88] transition-colors whitespace-nowrap"
          >
            View All <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-[#E5E7EB]/20 shrink-0" />
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
                activeFilter === f
                  ? "text-[#0F1419]"
                  : "text-[#E5E7EB]/50 hover:text-[#E5E7EB]/80 bg-[#0F1419] border border-[#E5E7EB]/5"
              )}
            >
              {activeFilter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[#00FF88]"
                  style={{ boxShadow: "0 0 16px rgba(0,255,136,0.4)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Product grid — popLayout lets new cards appear while old ones exit */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((product, i) => (
              <motion.div key={product.id} variants={i < 6 ? cardVariants : instantVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(0,255,136,0.25)" }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#00FF88]/30 text-[#00FF88] font-semibold rounded-xl hover:bg-[#00FF88]/5 transition-colors"
          >
            Load More Products
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
