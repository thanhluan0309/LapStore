import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartPage from "@/components/cart/CartPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart — LapStore",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <CartPage />
      <Footer />
    </main>
  );
}
