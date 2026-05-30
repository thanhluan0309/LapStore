import type { Metadata } from "next";
import SignInPage from "@/components/auth/SignInPage";

export const metadata: Metadata = {
  title: "Sign In — LapStore",
  description: "Sign in to your LapStore account.",
};

export default function Page() {
  return <SignInPage />;
}
