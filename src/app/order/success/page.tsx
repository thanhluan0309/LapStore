import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import OrderSuccessPage from "@/components/order/OrderSuccessPage";

export const metadata: Metadata = {
  title: "Order Confirmed — LapStore",
};

type Props = { searchParams: Promise<{ orderId?: string }> };

export default async function Page({ searchParams }: Props) {
  const { orderId } = await searchParams;
  const id = orderId ?? `LAP-${Date.now().toString(36).toUpperCase()}`;

  return (
    <main>
      <Navbar />
      <OrderSuccessPage orderId={id} />
    </main>
  );
}
