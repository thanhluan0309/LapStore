import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";
import BrandSection from "@/components/home/BrandSection";

// Below-the-fold sections code-split into separate JS chunks to reduce initial parse cost
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const NewsletterSection = dynamic(() => import("@/components/home/NewsletterSection"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
