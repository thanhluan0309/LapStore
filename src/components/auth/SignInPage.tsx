"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Laptop, Loader2, AlertCircle, Check } from "lucide-react";
import { type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const formVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, borderColor: "rgba(0,255,136,0.25)" }}
      whileTap={{ scale: 0.97 }}
      className="flex-1 flex items-center justify-center gap-2.5 py-2.5 bg-[#0F1419] border border-[#E5E7EB]/8 rounded-xl text-sm text-[#E5E7EB]/60 hover:text-[#E5E7EB]/90 transition-all font-medium"
    >
      {icon}
      {label}
    </motion.button>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 4) errs.password = "Password must be at least 4 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#0F1419] flex">
      {/* Left panel — branding (desktop only) */}
      <div className="hidden lg:flex w-[45%] relative bg-[#1A2129] border-r border-[#E5E7EB]/5 flex-col items-center justify-center p-12 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orb */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00FF88] rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-[#00FF88] rounded-2xl flex items-center justify-center" style={{ boxShadow: "0 0 24px rgba(0,255,136,0.5)" }}>
              <Laptop className="w-6 h-6 text-[#0F1419]" />
            </div>
            <span className="text-2xl font-black text-[#E5E7EB]">
              LAP<span className="text-[#00FF88]" style={{ textShadow: "0 0 16px rgba(0,255,136,0.5)" }}>STORE</span>
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-black text-[#E5E7EB] mb-2">Welcome back,</h2>
            <p className="text-3xl font-black text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>Gamer.</p>
            <p className="text-[#E5E7EB]/40 mt-3 text-sm leading-relaxed max-w-xs mx-auto">
              Sign in to access your orders, wishlist, and exclusive member deals.
            </p>
          </div>

          <div className="space-y-3 text-left max-w-xs mx-auto">
            {[
              "Track & manage your orders",
              "Saved wishlist across devices",
              "Exclusive member-only deals",
              "Faster checkout experience",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-[#00FF88]/15 border border-[#00FF88]/25 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#00FF88]" />
                </div>
                <span className="text-sm text-[#E5E7EB]/55">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-8">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#00FF88] rounded-lg flex items-center justify-center">
              <Laptop className="w-4 h-4 text-[#0F1419]" />
            </div>
            <span className="text-xl font-black text-[#E5E7EB]">
              LAP<span className="text-[#00FF88]">STORE</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#00FF88] text-xs font-semibold uppercase tracking-[0.2em] mb-2"
            >
              Member Access
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-3xl font-black text-[#E5E7EB]"
            >
              Sign In
            </motion.h1>

            {/* Demo hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-3 flex items-center gap-2 bg-[#00FF88]/5 border border-[#00FF88]/15 rounded-xl px-3 py-2"
            >
              <span className="text-[#00FF88] text-xs">⚡</span>
              <span className="text-xs text-[#E5E7EB]/50">Demo mode — use any email + any password (min 4 chars)</span>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {/* Email */}
              <motion.div key="email" variants={fieldVariants} initial="hidden" animate="show">
                <label className="block text-xs font-semibold text-[#E5E7EB]/40 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="john@example.com"
                  className={cn(
                    "w-full bg-[#1A2129] border rounded-xl px-4 py-3 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/20 focus:outline-none transition-all",
                    errors.email
                      ? "border-red-500/40 focus:border-red-500/60"
                      : "border-[#E5E7EB]/8 focus:border-[#00FF88]/30 focus:shadow-[0_0_12px_rgba(0,255,136,0.08)]"
                  )}
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div key="password" variants={fieldVariants} initial="hidden" animate="show" transition={{ delay: 0.06 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#E5E7EB]/40 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs text-[#00FF88]/70 hover:text-[#00FF88] transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                    placeholder="••••••••"
                    className={cn(
                      "w-full bg-[#1A2129] border rounded-xl px-4 py-3 pr-11 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/20 focus:outline-none transition-all",
                      errors.password
                        ? "border-red-500/40 focus:border-red-500/60"
                        : "border-[#E5E7EB]/8 focus:border-[#00FF88]/30 focus:shadow-[0_0_12px_rgba(0,255,136,0.08)]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E5E7EB]/30 hover:text-[#E5E7EB]/70 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Remember me */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0",
                  remember ? "bg-[#00FF88] border-[#00FF88]" : "border-[#E5E7EB]/20 hover:border-[#00FF88]/40"
                )}
              >
                {remember && <Check className="w-2.5 h-2.5 text-[#0F1419]" />}
              </button>
              <span className="text-sm text-[#E5E7EB]/50">Remember me for 30 days</span>
            </motion.label>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={!loading && !success ? { scale: 1.02, boxShadow: "0 0 28px rgba(255,184,0,0.4)" } : {}}
              whileTap={!loading && !success ? { scale: 0.97 } : {}}
              className={cn(
                "w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all",
                success
                  ? "bg-[#00FF88] text-[#0F1419]"
                  : "bg-[#FFB800] text-[#0F1419]"
              )}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {success && <Check className="w-4 h-4" />}
              {loading ? "Signing in…" : success ? "Welcome back!" : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E5E7EB]/8" />
            <span className="text-xs text-[#E5E7EB]/25">or continue with</span>
            <div className="flex-1 h-px bg-[#E5E7EB]/8" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <SocialButton
              label="Google"
              icon={
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }
            />
            <SocialButton
              label="GitHub"
              icon={
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#E5E7EB]/70" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              }
            />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-[#E5E7EB]/35 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#00FF88] font-semibold hover:underline">
              Create one →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
