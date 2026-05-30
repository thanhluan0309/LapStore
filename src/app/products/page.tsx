import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductListingPage from "@/components/products/ProductListingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Laptops — LapStore",
  description: "Browse 500+ premium laptops. Filter by category, brand, price, and more.",
};

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <Suspense>
        <ProductListingPage />
      </Suspense>
      <Footer />
    </main>
  );
}
