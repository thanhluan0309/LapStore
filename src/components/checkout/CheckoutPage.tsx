"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, Truck, ClipboardList, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1 as Step, label: "Shipping", icon: Truck },
  { n: 2 as Step, label: "Payment", icon: CreditCard },
  { n: 3 as Step, label: "Review", icon: ClipboardList },
];

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Shipping", eta: "5-7 business days", price: 0 },
  { id: "express", label: "Express Shipping", eta: "2 business days", price: 19.99 },
  { id: "overnight", label: "Overnight Delivery", eta: "Next business day", price: 39.99 },
];

type ShippingData = { name: string; email: string; phone: string; address: string; city: string; state: string; zip: string; country: string; method: string };
type PaymentData = { method: "card" | "paypal"; cardNumber: string; expiry: string; cvv: string; cardName: string; sameAddress: boolean };

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.n;
        const active = current === step.n;
        const Icon = step.icon;
        return (
          <div key={step.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all",
                done ? "bg-[#00FF88] border-[#00FF88]" : active ? "border-[#00FF88] bg-[#00FF88]/10" : "border-[#E5E7EB]/10 bg-[#1A2129]"
              )}
              style={active ? { boxShadow: "0 0 16px rgba(0,255,136,0.3)" } : {}}>
                {done ? <Check className="w-4.5 h-4.5 text-[#0F1419]" /> : <Icon className={cn("w-4 h-4", active ? "text-[#00FF88]" : "text-[#E5E7EB]/25")} />}
              </div>
              <span className={cn("text-xs font-semibold", active ? "text-[#00FF88]" : done ? "text-[#E5E7EB]/60" : "text-[#E5E7EB]/25")}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("w-16 sm:w-24 h-px mx-3 mb-5 transition-colors", done ? "bg-[#00FF88]/40" : "bg-[#E5E7EB]/8")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FormInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#E5E7EB]/40 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-[#0F1419] border border-[#E5E7EB]/8 rounded-xl px-4 py-3 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/20 focus:outline-none focus:border-[#00FF88]/30 focus:shadow-[0_0_12px_rgba(0,255,136,0.08)] transition-all"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState<ShippingData>({
    name: "", email: "", phone: "", address: "", city: "", state: "", zip: "", country: "US", method: "standard",
  });
  const [payment, setPayment] = useState<PaymentData>({
    method: "card", cardNumber: "", expiry: "", cvv: "", cardName: "", sameAddress: true,
  });

  useEffect(() => { setMounted(true); }, []);

  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === shipping.method)!;
  const shippingCost = selectedShipping?.price ?? 0;
  const tax = Math.round((subtotal + shippingCost) * 0.085 * 100) / 100;
  const total = subtotal + shippingCost + tax;

  function formatCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(v: string) {
    return v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
  }

  async function placeOrder() {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const orderId = `LAP-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    router.push(`/order/success?orderId=${orderId}`);
  }

  if (!mounted) return null;

  // Mini order summary (sidebar)
  const OrderSummary = (
    <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-5 space-y-4 sticky top-24">
      <h3 className="text-sm font-bold text-[#E5E7EB] border-b border-[#E5E7EB]/5 pb-3">Order Summary</h3>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#E5E7EB] line-clamp-1">{item.product.name}</p>
              <p className="text-[10px] text-[#E5E7EB]/35">Qty: {item.qty}</p>
            </div>
            <p className="text-xs font-bold text-[#E5E7EB] shrink-0 ml-auto">{formatPrice(item.product.price * item.qty)}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-xs pt-2 border-t border-[#E5E7EB]/5">
        <div className="flex justify-between text-[#E5E7EB]/50"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-[#E5E7EB]/50"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span></div>
        <div className="flex justify-between text-[#E5E7EB]/50"><span>Tax (8.5%)</span><span>{formatPrice(tax)}</span></div>
        <div className="flex justify-between font-black text-base text-[#E5E7EB] pt-2 border-t border-[#E5E7EB]/5">
          <span>Total</span>
          <span className="text-[#00FF88]">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F1419] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[#00FF88] text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-[#00FF88]" /> Secure Checkout
          </p>
          <h1 className="text-3xl font-black text-[#E5E7EB]">Checkout</h1>
        </div>

        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1 — Shipping */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-6 space-y-4">
                    <h2 className="text-base font-bold text-[#E5E7EB]">Shipping Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Full Name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} placeholder="John Doe" />
                      <FormInput label="Email" type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} placeholder="john@email.com" />
                      <FormInput label="Phone" type="tel" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                    </div>
                    <FormInput label="Street Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123 Main Street, Apt 4B" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <FormInput label="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="San Francisco" />
                      <FormInput label="State" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} placeholder="CA" />
                      <FormInput label="ZIP Code" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} placeholder="94105" />
                    </div>
                  </div>

                  {/* Shipping method */}
                  <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-6 space-y-3">
                    <h2 className="text-base font-bold text-[#E5E7EB]">Shipping Method</h2>
                    {SHIPPING_METHODS.map((m) => (
                      <label key={m.id} className={cn("flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all", shipping.method === m.id ? "border-[#00FF88]/30 bg-[#00FF88]/5" : "border-[#E5E7EB]/5 hover:border-[#E5E7EB]/10")}>
                        <div onClick={() => setShipping({ ...shipping, method: m.id })} className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all", shipping.method === m.id ? "border-[#00FF88]" : "border-[#E5E7EB]/20")}>
                          {shipping.method === m.id && <div className="w-2 h-2 rounded-full bg-[#00FF88]" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#E5E7EB]">{m.label}</p>
                          <p className="text-xs text-[#E5E7EB]/35">{m.eta}</p>
                        </div>
                        <span className={cn("text-sm font-bold", m.price === 0 ? "text-[#00FF88]" : "text-[#E5E7EB]")}>{m.price === 0 ? "FREE" : formatPrice(m.price)}</span>
                      </label>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#FFB800] text-[#0F1419] font-black rounded-xl flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2 — Payment */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-6 space-y-5">
                    <h2 className="text-base font-bold text-[#E5E7EB]">Payment Method</h2>
                    {/* Method toggle */}
                    <div className="flex gap-3">
                      {(["card", "paypal"] as const).map((m) => (
                        <button key={m} onClick={() => setPayment({ ...payment, method: m })}
                          className={cn("flex-1 py-3 rounded-xl border text-sm font-semibold transition-all", payment.method === m ? "border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88]" : "border-[#E5E7EB]/8 text-[#E5E7EB]/50 hover:border-[#E5E7EB]/15")}
                        >
                          {m === "card" ? "💳 Credit Card" : "🅿️ PayPal"}
                        </button>
                      ))}
                    </div>
                    {payment.method === "card" && (
                      <div className="space-y-4">
                        <FormInput label="Card Number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })} placeholder="1234 5678 9012 3456" />
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Expiry" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" />
                          <FormInput label="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="•••" type="password" />
                        </div>
                        <FormInput label="Cardholder Name" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} placeholder="John Doe" />
                      </div>
                    )}
                    {payment.method === "paypal" && (
                      <div className="text-center py-8 text-[#E5E7EB]/40 text-sm">You'll be redirected to PayPal to complete payment.</div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 border border-[#E5E7EB]/8 text-[#E5E7EB]/50 rounded-xl text-sm font-semibold hover:border-[#E5E7EB]/15 transition-colors">← Back</button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)} className="flex-1 py-4 bg-[#FFB800] text-[#0F1419] font-black rounded-xl flex items-center justify-center gap-2">
                      Review Order <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Review */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-6 space-y-5">
                    <h2 className="text-base font-bold text-[#E5E7EB]">Review Your Order</h2>
                    {/* Shipping summary */}
                    <div className="bg-[#0F1419] rounded-xl p-4 space-y-1">
                      <p className="text-xs text-[#00FF88] font-bold uppercase tracking-widest mb-2">Shipping To</p>
                      <p className="text-sm text-[#E5E7EB]">{shipping.name || "—"}</p>
                      <p className="text-sm text-[#E5E7EB]/50">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                      <p className="text-sm text-[#E5E7EB]/50">{selectedShipping.label} · {selectedShipping.eta}</p>
                    </div>
                    {/* Payment summary */}
                    <div className="bg-[#0F1419] rounded-xl p-4">
                      <p className="text-xs text-[#00FF88] font-bold uppercase tracking-widest mb-2">Payment</p>
                      <p className="text-sm text-[#E5E7EB]">
                        {payment.method === "card"
                          ? `•••• •••• •••• ${payment.cardNumber.replace(/\s/g, "").slice(-4) || "XXXX"}`
                          : "PayPal"}
                      </p>
                    </div>
                    {/* Items */}
                    <div className="space-y-3">
                      <p className="text-xs text-[#00FF88] font-bold uppercase tracking-widest">Items ({items.reduce((s, i) => s + i.qty, 0)})</p>
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg" />
                          <p className="flex-1 text-sm text-[#E5E7EB]/70 line-clamp-1">{item.product.name} ×{item.qty}</p>
                          <p className="text-sm font-bold text-[#E5E7EB]">{formatPrice(item.product.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-4 border border-[#E5E7EB]/8 text-[#E5E7EB]/50 rounded-xl text-sm font-semibold hover:border-[#E5E7EB]/15 transition-colors">← Back</button>
                    <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(0,255,136,0.35)" }} whileTap={{ scale: 0.97 }} onClick={placeOrder} disabled={placing}
                      className="flex-1 py-4 bg-[#00FF88] text-[#0F1419] font-black rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                      {placing ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</> : <>Place Order · {formatPrice(total)}</>}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">{OrderSummary}</div>
        </div>
      </div>
    </div>
  );
}
