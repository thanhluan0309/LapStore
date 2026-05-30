import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutPage from "@/components/checkout/CheckoutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — LapStore",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <CheckoutPage />
      <Footer />
    </main>
  );
}
