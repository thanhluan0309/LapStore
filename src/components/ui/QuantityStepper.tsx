"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = "md" }: Props) {
  const isSm = size === "sm";

  return (
    <div className={cn("flex items-center bg-[#0F1419] border border-[#E5E7EB]/10 rounded-xl overflow-hidden", isSm ? "h-8" : "h-10")}>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center text-[#E5E7EB]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed border-r border-[#E5E7EB]/8",
          isSm ? "w-8" : "w-10"
        )}
      >
        <Minus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </motion.button>

      <span className={cn("font-bold text-[#E5E7EB] tabular-nums text-center", isSm ? "w-8 text-sm" : "w-10 text-base")}>
        {value}
      </span>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center text-[#E5E7EB]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed border-l border-[#E5E7EB]/8",
          isSm ? "w-8" : "w-10"
        )}
      >
        <Plus className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </motion.button>
    </div>
  );
}
