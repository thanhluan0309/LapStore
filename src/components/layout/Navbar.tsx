"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, User, Menu, X, Laptop, ChevronDown, Heart, Zap,
  Gamepad2, Briefcase, BookOpen, Palette, Wallet,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { brands as brandList } from "@/data/brands";

type DropdownItem = { label: string; href: string; icon?: LucideIcon; imgSrc?: string };
type NavLink = { label: string; href: string; icon: LucideIcon; dropdown?: DropdownItem[] };

const navLinks: NavLink[] = [
  {
    label: "Laptops",
    href: "/products",
    icon: Laptop,
    dropdown: [
      { label: "Gaming",    href: "/products?category=gaming",    icon: Gamepad2  },
      { label: "Business",  href: "/products?category=business",  icon: Briefcase },
      { label: "Student",   href: "/products?category=student",   icon: BookOpen  },
      { label: "Ultrabook", href: "/products?category=ultrabook", icon: Zap       },
      { label: "Creator",   href: "/products?category=creator",   icon: Palette   },
      { label: "Budget",    href: "/products?category=budget",    icon: Wallet    },
    ],
  },
  {
    label: "Brands",
    href: "/products",
    icon: Laptop,
    dropdown: brandList.slice(0, 6).map((b) => ({
      label: b.name,
      href: b.href,
      imgSrc: b.logo,
    })),
  },
  { label: "Deals",   href: "/products?sort=price-asc", icon: Wallet  },
  { label: "Support", href: "#",                         icon: User    },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function submitSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setSearchQuery("");
    setMobileOpen(false);
    setMobileSearch("");
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0F1419]/95 backdrop-blur-xl border-b border-[#00FF88]/10 shadow-[0_4px_30px_rgba(0,255,136,0.05)]"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className="bg-[#00FF88] text-[#0F1419] text-xs py-2 px-4 text-center font-semibold tracking-wide">
        <span className="flex items-center justify-center gap-4 flex-wrap">
          <span>⚡ Free shipping on orders over $999</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">🎮 Exclusive Gaming Deals This Week</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">📞 1-800-LAPSTORE</span>
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.03 }}>
              <div className="w-8 h-8 bg-[#00FF88] rounded-lg flex items-center justify-center glow-neon-sm">
                <Laptop className="w-4 h-4 text-[#0F1419]" />
              </div>
              <span className="text-xl font-black text-[#E5E7EB] tracking-tight">
                LAP<span className="text-[#00FF88] text-glow-neon">STORE</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[#E5E7EB]/70 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                    {link.dropdown && (
                      <motion.span
                        animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    )}
                  </motion.div>
                </Link>

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-[#1A2129] rounded-xl border border-[#00FF88]/15 py-2 z-50 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                    >
                      {link.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#E5E7EB]/65 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-all group"
                          >
                            {item.imgSrc ? (
                              <Image
                                src={item.imgSrc}
                                alt={item.label}
                                width={16}
                                height={16}
                                className="object-contain shrink-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                              />
                            ) : Icon ? (
                              <Icon className="w-3.5 h-3.5 text-[#E5E7EB]/25 group-hover:text-[#00FF88] transition-colors shrink-0" />
                            ) : null}
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">

            {/* Search — desktop */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-open"
                  initial={{ width: 36, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 36, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hidden sm:flex items-center relative"
                >
                  <input
                    ref={searchRef}
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitSearch(searchQuery);
                      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                    }}
                    placeholder="Search laptops… (Enter)"
                    className="w-full pr-9 pl-3 py-1.5 text-sm bg-[#1A2129] border border-[#00FF88]/30 rounded-full text-[#E5E7EB] placeholder-[#E5E7EB]/30 focus:outline-none focus:border-[#00FF88] focus:shadow-[0_0_12px_rgba(0,255,136,0.2)] transition-all"
                  />
                  <button
                    className="absolute right-2"
                    onMouseDown={(e) => { e.preventDefault(); submitSearch(searchQuery); }}
                  >
                    <Search className="w-4 h-4 text-[#00FF88]" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-closed"
                  onClick={() => setSearchOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hidden sm:flex p-2 rounded-full text-[#E5E7EB]/60 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-colors"
                >
                  <Search className="w-4.5 h-4.5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full text-[#E5E7EB]/60 hover:text-[#FFB800] hover:bg-[#FFB800]/5 transition-colors cursor-pointer"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FFB800] text-[#0F1419] text-[10px] font-black rounded-full flex items-center justify-center"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full text-[#E5E7EB]/60 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#00FF88] text-[#0F1419] text-[10px] font-black rounded-full flex items-center justify-center"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Sign In */}
            <Link href="/signin" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#E5E7EB]/70 hover:text-[#00FF88] hover:bg-[#00FF88]/5 rounded-full transition-all border border-transparent hover:border-[#00FF88]/20 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Sign In
              </motion.div>
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-full text-[#E5E7EB]/60 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X className="w-5 h-5" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}><Menu className="w-5 h-5" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu — always bg-[#0F1419] bất kể scroll state */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              {/* Solid bg — always opaque regardless of header scroll state */}
              <div className="bg-[#0F1419] border-t border-[#00FF88]/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                <div className="py-4 space-y-0.5">

                  {/* Mobile search */}
                  <div className="px-4 pb-3">
                    <form
                      onSubmit={(e) => { e.preventDefault(); submitSearch(mobileSearch); }}
                      className="flex items-center gap-2 bg-[#1A2129] border border-[#00FF88]/20 rounded-xl px-3 py-2.5"
                    >
                      <Search className="w-4 h-4 text-[#00FF88] shrink-0" />
                      <input
                        type="text"
                        value={mobileSearch}
                        onChange={(e) => setMobileSearch(e.target.value)}
                        placeholder="Search laptops…"
                        className="flex-1 bg-transparent text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/35 focus:outline-none"
                      />
                      {mobileSearch && (
                        <button type="submit" className="text-[#00FF88] text-xs font-bold px-1">Go</button>
                      )}
                    </form>
                  </div>

                  {/* Nav items with real icons */}
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#E5E7EB]/65 hover:text-[#00FF88] hover:bg-[#00FF88]/5 transition-all cursor-pointer mx-1 rounded-xl"
                        >
                          <Icon className="w-4 h-4 text-[#00FF88]/60" />
                          {link.label}
                        </motion.div>
                      </Link>
                    );
                  })}

                  <div className="mx-4 my-2 h-px bg-[#E5E7EB]/5" />

                  {/* Sign In mobile */}
                  <Link href="/signin" onClick={() => setMobileOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#E5E7EB]/65 hover:text-[#00FF88] hover:bg-[#00FF88]/5 rounded-xl mx-1 transition-all cursor-pointer">
                      <User className="w-4 h-4 text-[#00FF88]/60" />
                      Sign In
                    </div>
                  </Link>

                  <div className="px-4 pt-1 pb-3">
                    <Link href="/cart" onClick={() => setMobileOpen(false)}>
                      <div className="flex items-center justify-center gap-2 py-3 bg-[#FFB800] text-[#0F1419] font-bold text-sm rounded-xl">
                        <ShoppingCart className="w-4 h-4" />
                        View Cart {itemCount > 0 && `(${itemCount})`}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
