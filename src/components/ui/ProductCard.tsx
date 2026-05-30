"use client";

import { useState } from "react";
import { Star, ShoppingCart, Heart, Eye, Package, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product);
  }

  return (
    <Link href={`/products/${product.id}`} className="block">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,136,0.2)" }}
        transition={{ duration: 0.25 }}
        className="group relative bg-[#1A2129] rounded-2xl overflow-hidden border border-[#E5E7EB]/5 h-full"
      >
        {/* Neon top border on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-[#00FF88] origin-left rounded-t-2xl z-20"
          style={{ boxShadow: "0 0 10px rgba(0,255,136,0.6)" }}
        />

        {/* Image */}
        <div className="relative overflow-hidden bg-[#0F1419] aspect-4/3">
          <motion.img
            src={product.image}
            alt={product.name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-linear-to-t from-[#0F1419]/80 via-transparent to-transparent"
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
            {!product.inStock && (
              <span className="bg-[#E5E7EB]/10 text-[#E5E7EB]/60 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#E5E7EB]/10">
                Sold Out
              </span>
            )}
          </div>

          {/* Side actions */}
          <motion.div
            animate={{ x: hovered ? 0 : 40, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <motion.button
              onClick={handleWishlist}
              whileTap={{ scale: 0.85 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                wishlisted
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-[#1A2129]/90 border-[#E5E7EB]/10 text-[#E5E7EB]/60 hover:border-red-500 hover:text-red-400"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-current")} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="w-8 h-8 rounded-full bg-[#1A2129]/90 border border-[#E5E7EB]/10 text-[#E5E7EB]/60 hover:border-[#00FF88]/40 hover:text-[#00FF88] flex items-center justify-center transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[10px] font-bold text-[#00FF88] uppercase tracking-[0.15em] mb-1.5">{product.brand}</p>
          <h3 className="font-semibold text-[#E5E7EB] text-sm leading-tight mb-2.5 line-clamp-2">{product.name}</h3>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {[product.specs.cpu, product.specs.ram, product.specs.storage].map((spec) => (
              <span key={spec} className="text-[10px] bg-[#0F1419] text-[#E5E7EB]/40 px-2 py-0.5 rounded-md font-mono border border-[#E5E7EB]/5">
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#E5E7EB]/10 fill-[#E5E7EB]/10")} />
              ))}
            </div>
            <span className="text-xs font-bold text-[#E5E7EB]/70">{product.rating}</span>
            <span className="text-[10px] text-[#E5E7EB]/30">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-[#E5E7EB]">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#E5E7EB]/25 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-[10px] text-[#00FF88] font-medium flex items-center gap-0.5 mt-0.5">
                  <Package className="w-2.5 h-2.5" /> In Stock
                </p>
              ) : (
                <p className="text-[10px] text-[#E5E7EB]/30 font-medium mt-0.5">Out of Stock</p>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.button
                key={addedToCart ? "added" : "default"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileHover={product.inStock && !addedToCart ? { scale: 1.05, boxShadow: "0 0 20px rgba(255,184,0,0.4)" } : {}}
                whileTap={product.inStock ? { scale: 0.92 } : {}}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all",
                  product.inStock
                    ? addedToCart ? "bg-[#00FF88] text-[#0F1419]" : "bg-[#FFB800] text-[#0F1419]"
                    : "bg-[#E5E7EB]/5 text-[#E5E7EB]/20 cursor-not-allowed border border-[#E5E7EB]/5"
                )}
              >
                {addedToCart ? <><Zap className="w-3.5 h-3.5" /> Added!</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add</>}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
