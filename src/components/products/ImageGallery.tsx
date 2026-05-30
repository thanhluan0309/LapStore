"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Props = { images: string[]; name: string };

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  function prev() { setActive((a) => (a - 1 + images.length) % images.length); }
  function next() { setActive((a) => (a + 1) % images.length); }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1A2129] border border-[#E5E7EB]/5 aspect-4/3 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={images[active]}
              alt={`${name} — image ${active + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Zoom button */}
          <button
            onClick={() => setZoomed(true)}
            className="absolute top-3 right-3 w-8 h-8 bg-[#0F1419]/80 backdrop-blur-sm border border-[#E5E7EB]/10 rounded-lg flex items-center justify-center text-[#E5E7EB]/50 hover:text-[#00FF88] opacity-0 group-hover:opacity-100 transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0F1419]/80 backdrop-blur-sm border border-[#E5E7EB]/10 rounded-lg flex items-center justify-center text-[#E5E7EB]/50 hover:text-[#00FF88] opacity-0 group-hover:opacity-100 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0F1419]/80 backdrop-blur-sm border border-[#E5E7EB]/10 rounded-lg flex items-center justify-center text-[#E5E7EB]/50 hover:text-[#00FF88] opacity-0 group-hover:opacity-100 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`rounded-full transition-all ${i === active ? "w-5 h-1.5 bg-[#00FF88]" : "w-1.5 h-1.5 bg-[#E5E7EB]/20"}`} />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative overflow-hidden rounded-xl aspect-4/3 border-2 transition-all ${
                i === active ? "border-[#00FF88]" : "border-[#E5E7EB]/5 hover:border-[#E5E7EB]/20"
              }`}
              style={i === active ? { boxShadow: "0 0 12px rgba(0,255,136,0.3)" } : {}}
            >
              <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={images[active]}
              alt={name}
              className="max-w-4xl max-h-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
