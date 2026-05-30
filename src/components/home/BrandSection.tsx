"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { brands } from "@/data/brands";

export default function BrandSection() {
  return (
    <section className="py-10 sm:py-14 bg-[#1A2129] border-y border-[#00FF88]/8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00FF88]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00FF88]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#E5E7EB]/20 text-xs font-semibold uppercase tracking-[0.3em] mb-8"
        >
          Official Partner Brands
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.06 }}
            >
              <Link
                href={brand.href}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0F1419] border border-[#E5E7EB]/5 hover:border-[#00FF88]/25 transition-all cursor-pointer group"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={20}
                  className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ filter: "invert(1)", width: "auto", height: "20px" }}
                />
                <span className="font-bold text-sm text-[#E5E7EB]/30 group-hover:text-[#E5E7EB]/80 transition-colors tracking-tight">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
