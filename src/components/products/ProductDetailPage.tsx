"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, Package, Cpu, MemoryStick, HardDrive, Monitor, Zap, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product, featuredProducts } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QuantityStepper from "@/components/ui/QuantityStepper";
import ImageGallery from "@/components/products/ImageGallery";
import ProductTabs from "@/components/products/ProductTabs";
import ProductCard from "@/components/ui/ProductCard";

const SPEC_ICONS = {
  cpu: Cpu,
  ram: MemoryStick,
  storage: HardDrive,
  display: Monitor,
};

export default function ProductDetailPage({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const related = featuredProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="min-h-screen bg-[#0F1419] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/products" className="text-[#E5E7EB]/30 hover:text-[#00FF88] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Breadcrumb items={[
            { label: "Laptops", href: "/products" },
            { label: categoryLabel, href: `/products?category=${product.category}` },
            { label: product.name },
          ]} />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <ImageGallery images={product.images} name={product.name} />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="space-y-5"
          >
            {/* Brand + badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[#00FF88] text-xs font-black uppercase tracking-[0.2em]">{product.brand}</span>
              {product.badge && (
                <span className="bg-[#00FF88] text-[#0F1419] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">{product.badge}</span>
              )}
              {discount > 0 && (
                <span className="bg-[#FFB800] text-[#0F1419] text-[10px] font-black px-2.5 py-1 rounded-full">-{discount}%</span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB] leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "text-[#FFB800] fill-[#FFB800]" : "text-[#E5E7EB]/10 fill-[#E5E7EB]/10")} />
                ))}
              </div>
              <span className="font-bold text-[#E5E7EB]">{product.rating}</span>
              <span className="text-sm text-[#E5E7EB]/35">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-[#E5E7EB]/25 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && (
                <span className="text-sm text-[#FFB800] font-semibold">Save {formatPrice(product.originalPrice! - product.price)}</span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="text-sm text-[#00FF88] font-semibold flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" /> In Stock — Ships in 1-2 business days
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#E5E7EB]/20" />
                  <span className="text-sm text-[#E5E7EB]/40">Out of Stock</span>
                </>
              )}
            </div>

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(SPEC_ICONS) as [keyof typeof SPEC_ICONS, React.ElementType][]).map(([key, Icon]) => (
                <div key={key} className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-xl p-3 flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#E5E7EB]/30 uppercase tracking-widest">{key}</p>
                    <p className="text-xs text-[#E5E7EB]/80 font-semibold mt-0.5">{product.specs[key]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Qty + Add to cart */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#E5E7EB]/50">Quantity</span>
                <QuantityStepper value={qty} onChange={setQty} min={1} max={10} />
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  whileHover={product.inStock ? { scale: 1.02, boxShadow: "0 0 30px rgba(255,184,0,0.4)" } : {}}
                  whileTap={product.inStock ? { scale: 0.97 } : {}}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all",
                    product.inStock
                      ? addedToCart ? "bg-[#00FF88] text-[#0F1419]" : "bg-[#FFB800] text-[#0F1419]"
                      : "bg-[#E5E7EB]/5 text-[#E5E7EB]/20 cursor-not-allowed"
                  )}
                >
                  {addedToCart ? <><Zap className="w-4 h-4" /> Added to Cart!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                </motion.button>

                <motion.button
                  onClick={() => toggle(product)}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "w-10 sm:w-12 h-10 sm:h-12 rounded-xl border flex items-center justify-center transition-all",
                    wishlisted ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-[#1A2129] border-[#E5E7EB]/8 text-[#E5E7EB]/40 hover:border-red-500/30 hover:text-red-400"
                  )}
                >
                  <Heart className={cn("w-5 h-5", wishlisted && "fill-current")} />
                </motion.button>
              </div>

              <Link href="/cart" className="block text-center py-3 border border-[#00FF88]/20 text-[#00FF88] text-sm font-semibold rounded-xl hover:bg-[#00FF88]/5 transition-colors">
                View Cart
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-[#E5E7EB]/5">
              {["Free 2-day shipping", "2-year warranty", "30-day returns"].map((t) => (
                <span key={t} className="text-[10px] text-[#E5E7EB]/35 flex items-center gap-1">
                  <span className="text-[#00FF88]">✓</span> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ProductTabs product={product} />
        </motion.div>

        {/* Related products */}
        {related.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#00FF88] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-[#00FF88]" /> You Might Also Like
            </p>
            <h2 className="text-2xl font-black text-[#E5E7EB] mb-6">Related <span className="text-[#00FF88]">Laptops</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
