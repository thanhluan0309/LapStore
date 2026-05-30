"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function WishlistPage() {
  const { items, toggle, count } = useWishlist();
  const { addItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const [movedIds, setMovedIds] = useState<Set<string>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  function moveToCart(productId: string) {
    const product = items.find((p) => p.id === productId);
    if (!product) return;
    addItem(product, 1);
    toggle(product); // remove from wishlist
    setMovedIds((prev) => new Set(prev).add(productId));
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1419] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-10 gap-4 flex-wrap">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#FFB800] text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2"
            >
              <span className="w-5 h-px bg-[#FFB800]" /> Saved Items
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]"
            >
              My <span className="text-[#FFB800]" style={{ textShadow: "0 0 20px rgba(255,184,0,0.4)" }}>Wishlist</span>
              {mounted && count > 0 && (
                <span className="ml-2 text-sm sm:text-lg text-[#E5E7EB]/30 font-normal">({count})</span>
              )}
            </motion.h1>
          </div>

          {count > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => items.forEach((p) => toggle(p))}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#E5E7EB]/40 border border-[#E5E7EB]/8 rounded-xl hover:border-red-400/30 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Wishlist
            </motion.button>
          )}
        </div>

        {/* Empty state */}
        {count === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-[#1A2129] border border-[#FFB800]/15 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-9 h-9 text-[#FFB800]/40" />
            </motion.div>
            <h2 className="text-2xl font-black text-[#E5E7EB] mb-2">Your wishlist is empty</h2>
            <p className="text-[#E5E7EB]/35 mb-8 max-w-sm mx-auto">
              Browse our collection and save the laptops you love — they'll be waiting for you here.
            </p>
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(0,255,136,0.3)" }}
                className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#00FF88] text-[#0F1419] font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Browse Laptops <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Product grid */}
            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.07 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {items.map((product) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                      className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl overflow-hidden group hover:border-[#FFB800]/20 transition-all"
                      whileHover={{ y: -4, boxShadow: "0 16px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,184,0,0.15)" }}
                    >
                      {/* Image */}
                      <Link href={`/products/${product.id}`} className="block relative overflow-hidden aspect-4/3 bg-[#0F1419]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.badge && (
                            <span className="bg-[#00FF88] text-[#0F1419] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                              {product.badge}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="bg-[#FFB800] text-[#0F1419] text-[10px] font-black px-2.5 py-1 rounded-full">
                              -{discount}%
                            </span>
                          )}
                        </div>
                        {/* Remove from wishlist */}
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => { e.preventDefault(); toggle(product); }}
                          className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </motion.button>
                      </Link>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-[10px] font-bold text-[#FFB800] uppercase tracking-[0.15em] mb-1">{product.brand}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-sm font-semibold text-[#E5E7EB] hover:text-[#00FF88] transition-colors line-clamp-2 mb-3">{product.name}</h3>
                        </Link>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-base font-black text-[#E5E7EB]">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#E5E7EB]/25 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={product.inStock ? { scale: 1.03, boxShadow: "0 0 16px rgba(0,255,136,0.3)" } : {}}
                            whileTap={product.inStock ? { scale: 0.96 } : {}}
                            onClick={() => moveToCart(product.id)}
                            disabled={!product.inStock}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#00FF88] text-[#0F1419] disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {product.inStock ? (
                              <><ShoppingCart className="w-3.5 h-3.5" /> Move to Cart</>
                            ) : (
                              "Out of Stock"
                            )}
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => toggle(product)}
                            className="w-9 h-9 rounded-xl border border-[#E5E7EB]/8 text-[#E5E7EB]/30 hover:border-red-400/30 hover:text-red-400 flex items-center justify-center transition-all shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-[#00FF88]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#E5E7EB]">Ready to buy everything?</p>
                  <p className="text-xs text-[#E5E7EB]/35">Move all items to cart at once</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(255,184,0,0.35)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => items.filter((p) => p.inStock).forEach((p) => moveToCart(p.id))}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FFB800] text-[#0F1419] font-bold rounded-xl text-xs sm:text-sm whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4" />
                Add All to Cart
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
