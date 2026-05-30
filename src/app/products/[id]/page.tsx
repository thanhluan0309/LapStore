import { notFound } from "next/navigation";
import { featuredProducts } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailPage from "@/components/products/ProductDetailPage";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return featuredProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = featuredProducts.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found — LapStore" };
  return {
    title: `${product.name} — LapStore`,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = featuredProducts.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <main>
      <Navbar />
      <ProductDetailPage product={product} />
      <Footer />
    </main>
  );
}
