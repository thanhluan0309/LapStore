import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WishlistPage from "@/components/wishlist/WishlistPage";

export const metadata: Metadata = {
  title: "Wishlist — LapStore",
  description: "Your saved laptops on LapStore.",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <WishlistPage />
      <Footer />
    </main>
  );
}
