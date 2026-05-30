"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, ArrowRight, Tag, Truck, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import { COUPON_CODES } from "@/data/products";
import QuantityStepper from "@/components/ui/QuantityStepper";

const FREE_SHIPPING_THRESHOLD = 999;
const TAX_RATE = 0.085;

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; pct: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 19.99;
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.pct) / 100) : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE * 100) / 100;
  const total = subtotal - discount + shipping + tax;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const pct = COUPON_CODES[code];
    if (pct) {
      setAppliedCoupon({ code, pct });
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try SAVE10, FLASH20, or TECH15.");
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F1419] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#00FF88] text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-[#00FF88]" /> Your Order
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E5E7EB]">
            Shopping <span className="text-[#00FF88]">Cart</span>
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShoppingCart className="w-9 h-9 text-[#E5E7EB]/20" />
            </div>
            <h2 className="text-2xl font-black text-[#E5E7EB] mb-2">Your cart is empty</h2>
            <p className="text-[#E5E7EB]/35 mb-7">Looks like you haven't added any laptops yet.</p>
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(0,255,136,0.3)" }}
                className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#00FF88] text-[#0F1419] font-bold rounded-xl text-xs sm:text-sm"
              >
                Browse Laptops <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5 sm:gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-4 flex gap-4"
                  >
                    {/* Image */}
                    <Link href={`/products/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] text-[#00FF88] font-black uppercase tracking-widest">{item.product.brand}</p>
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="text-sm font-semibold text-[#E5E7EB] hover:text-[#00FF88] transition-colors line-clamp-2">{item.product.name}</h3>
                          </Link>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {[item.product.specs.cpu, item.product.specs.ram].map((s) => (
                              <span key={s} className="text-[10px] bg-[#0F1419] text-[#E5E7EB]/35 px-1.5 py-0.5 rounded font-mono border border-[#E5E7EB]/5">{s}</span>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeItem(item.product.id)}
                          className="w-7 h-7 rounded-lg bg-[#0F1419] border border-[#E5E7EB]/8 text-[#E5E7EB]/30 hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-all shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <QuantityStepper
                          value={item.qty}
                          onChange={(v) => updateQty(item.product.id, v)}
                          min={1}
                          max={10}
                          size="sm"
                        />
                        <div className="text-right">
                          <p className="text-base font-black text-[#E5E7EB]">{formatPrice(item.product.price * item.qty)}</p>
                          {item.qty > 1 && <p className="text-[10px] text-[#E5E7EB]/30">{formatPrice(item.product.price)} each</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-[#E5E7EB]/35 hover:text-[#00FF88] transition-colors mt-2">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-5 sticky top-24 space-y-4">
                <h2 className="text-base font-bold text-[#E5E7EB] border-b border-[#E5E7EB]/5 pb-4">Order Summary</h2>

                {/* Shipping bar */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="bg-[#0F1419] rounded-xl p-3">
                    <p className="text-xs text-[#E5E7EB]/50 mb-2 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#FFB800]" />
                      Add <span className="text-[#FFB800] font-semibold">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> more for free shipping
                    </p>
                    <div className="h-1.5 bg-[#E5E7EB]/8 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                        className="h-full bg-[#FFB800] rounded-full"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
                {subtotal >= FREE_SHIPPING_THRESHOLD && (
                  <div className="flex items-center gap-2 text-sm text-[#00FF88] bg-[#00FF88]/5 border border-[#00FF88]/15 rounded-xl p-3">
                    <Package className="w-4 h-4" /> You qualify for <strong>FREE shipping!</strong>
                  </div>
                )}

                {/* Coupon */}
                <div>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-[#0F1419] border border-[#E5E7EB]/8 rounded-xl px-3 py-2">
                      <Tag className="w-3.5 h-3.5 text-[#E5E7EB]/25" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="Coupon code"
                        className="flex-1 bg-transparent text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/25 focus:outline-none uppercase"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={applyCoupon}
                      className="px-4 bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-sm font-semibold rounded-xl hover:bg-[#00FF88]/15 transition-colors"
                    >
                      Apply
                    </motion.button>
                  </div>
                  {couponError && <p className="text-xs text-red-400 mt-1.5">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs mt-1.5">
                      <span className="text-[#00FF88] font-semibold">{appliedCoupon.code} (-{appliedCoupon.pct}%)</span>
                      <button onClick={() => setAppliedCoupon(null)} className="text-[#E5E7EB]/30 hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  )}
                </div>

                {/* Line items */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-[#E5E7EB]/60">
                    <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#00FF88]">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#E5E7EB]/60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-[#00FF88]" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-[#E5E7EB]/60">
                    <span>Est. Tax (8.5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-black text-base sm:text-lg text-[#E5E7EB] pt-3 border-t border-[#E5E7EB]/8">
                    <span>Total</span>
                    <span className="text-[#00FF88]" style={{ textShadow: "0 0 16px rgba(0,255,136,0.4)" }}>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link href="/checkout">
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(255,184,0,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className={cn("flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#FFB800] text-[#0F1419] font-black rounded-xl text-xs sm:text-sm cursor-pointer")}
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>

                <p className="text-center text-[10px] text-[#E5E7EB]/20">
                  🔒 Secure checkout · 30-day returns · 2-yr warranty
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
