"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { featuredProducts, categories } from "@/data/products";
import { brands as brandList } from "@/data/brands";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

const BRANDS = brandList.map((b) => b.name);
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};
// Items beyond the 6th appear instantly — no cascading delay on large grids
const instantVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export default function ProductListingPage() {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Sync all URL params: category, brand, q (search), sort
  useEffect(() => {
    const cat = searchParams.get("category");
    const brand = searchParams.get("brand");
    const q = searchParams.get("q");
    const sortParam = searchParams.get("sort");

    if (cat) setSelectedCategories([cat]);
    if (brand) setSelectedBrands([brand]);
    if (q) setSearch(q);
    if (sortParam) setSort(sortParam);
  }, [searchParams]);

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  const filtered = useMemo(() => {
    let list = [...featuredProducts];
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    if (inStockOnly) list = list.filter((p) => p.inStock);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "reviews": list.sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [search, selectedCategories, selectedBrands, minPrice, maxPrice, inStockOnly, sort]);

  const hasActiveFilters =
    selectedCategories.length || selectedBrands.length || minPrice || maxPrice || inStockOnly || search;

  function clearAll() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setSearch("");
  }

  const FilterPanel = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <p className="text-xs font-bold text-[#E5E7EB]/40 uppercase tracking-widest mb-3">Search</p>
        <div className="flex items-center gap-2 bg-[#0F1419] border border-[#E5E7EB]/8 rounded-xl px-3 py-2">
          <Search className="w-3.5 h-3.5 text-[#E5E7EB]/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search laptops…"
            className="flex-1 bg-transparent text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/25 focus:outline-none"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-bold text-[#E5E7EB]/40 uppercase tracking-widest mb-3">Category</p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat.id)}
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0",
                  selectedCategories.includes(cat.id)
                    ? "bg-[#00FF88] border-[#00FF88]"
                    : "border-[#E5E7EB]/15 group-hover:border-[#00FF88]/40"
                )}
              >
                {selectedCategories.includes(cat.id) && <div className="w-2 h-2 rounded-sm bg-[#0F1419]" />}
              </div>
              <span className="text-sm text-[#E5E7EB]/60 group-hover:text-[#E5E7EB] transition-colors flex-1">
                {cat.icon} {cat.name}
              </span>
              <span className="text-[10px] text-[#E5E7EB]/25">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className="text-xs font-bold text-[#E5E7EB]/40 uppercase tracking-widest mb-3">Brand</p>
        <div className="space-y-1.5">
          {brandList.map((b) => (
            <label key={b.slug} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleBrand(b.name)}
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0",
                  selectedBrands.includes(b.name)
                    ? "bg-[#00FF88] border-[#00FF88]"
                    : "border-[#E5E7EB]/15 group-hover:border-[#00FF88]/40"
                )}
              >
                {selectedBrands.includes(b.name) && <div className="w-2 h-2 rounded-sm bg-[#0F1419]" />}
              </div>
              {/* Brand logo */}
              <Image
                src={b.logo}
                alt={b.name}
                width={40}
                height={14}
                style={{ width: "auto", height: "14px" }}
                className={cn(
                  "object-contain transition-all duration-200",
                  selectedBrands.includes(b.name)
                    ? "opacity-100 grayscale-0"
                    : "grayscale opacity-35 group-hover:opacity-70 group-hover:grayscale-0"
                )}
              />
              <span className="text-sm text-[#E5E7EB]/50 group-hover:text-[#E5E7EB]/80 transition-colors">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-bold text-[#E5E7EB]/40 uppercase tracking-widest mb-3">Price Range (USD)</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-[#0F1419] border border-[#E5E7EB]/8 rounded-lg px-3 py-2 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/25 focus:outline-none focus:border-[#00FF88]/30"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-[#0F1419] border border-[#E5E7EB]/8 rounded-lg px-3 py-2 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/25 focus:outline-none focus:border-[#00FF88]/30"
          />
        </div>
      </div>

      {/* In Stock */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={cn(
            "w-10 h-5 rounded-full border transition-all relative flex-shrink-0",
            inStockOnly ? "bg-[#00FF88] border-[#00FF88]" : "bg-[#0F1419] border-[#E5E7EB]/15"
          )}
        >
          <div className={cn(
            "w-3.5 h-3.5 rounded-full absolute top-0.5 transition-all",
            inStockOnly ? "left-[22px] bg-[#0F1419]" : "left-0.5 bg-[#E5E7EB]/30"
          )} />
        </button>
        <span className="text-sm text-[#E5E7EB]/60 group-hover:text-[#E5E7EB] transition-colors">In Stock Only</span>
      </label>

      {hasActiveFilters && (
        <button onClick={clearAll} className="w-full py-2 text-xs font-semibold text-[#FFB800] border border-[#FFB800]/20 rounded-xl hover:bg-[#FFB800]/5 transition-all">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F1419] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="text-[#00FF88] text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-[#00FF88]" /> All Products
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="text-3xl sm:text-4xl font-black text-[#E5E7EB]">
            Browse <span className="text-[#00FF88]" style={{ textShadow: "0 0 20px rgba(0,255,136,0.4)" }}>Laptops</span>
          </motion.h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:block w-60 shrink-0"
          >
            <div className="bg-[#1A2129] border border-[#E5E7EB]/5 rounded-2xl p-5 sticky top-24">
              <p className="text-sm font-bold text-[#E5E7EB] mb-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00FF88]" /> Filters
              </p>
              {FilterPanel}
            </div>
          </motion.aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-[#E5E7EB]/40">
                Showing <span className="text-[#00FF88] font-semibold">{filtered.length}</span> laptop{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#1A2129] border border-[#E5E7EB]/8 rounded-xl text-sm text-[#E5E7EB]/60 hover:text-[#00FF88] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                  {hasActiveFilters ? <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" /> : null}
                </button>
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1A2129] border border-[#E5E7EB]/8 rounded-xl text-sm text-[#E5E7EB]/60 hover:text-[#E5E7EB] transition-colors"
                  >
                    {SORTS.find((s) => s.value === sort)?.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", sortOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#1A2129] border border-[#E5E7EB]/8 rounded-xl py-1 z-30 shadow-2xl"
                      >
                        {SORTS.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => { setSort(s.value); setSortOpen(false); }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-sm transition-colors",
                              sort === s.value ? "text-[#00FF88] bg-[#00FF88]/5" : "text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/3"
                            )}
                          >
                            {s.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-[#E5E7EB]/50 text-lg font-semibold">No laptops match your filters</p>
                  <button onClick={clearAll} className="mt-4 text-[#00FF88] text-sm hover:underline">Clear all filters</button>
                </motion.div>
              ) : (
                <motion.div key="grid" initial="hidden" animate="show" transition={{ staggerChildren: 0.04 }} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product, i) => (
                    <motion.div key={product.id} variants={i < 6 ? cardVariants : instantVariants}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFiltersOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#1A2129] z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-bold text-[#E5E7EB] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#00FF88]" /> Filters
                </p>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-[#E5E7EB]/40 hover:text-[#E5E7EB]"><X className="w-5 h-5" /></button>
              </div>
              {FilterPanel}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
