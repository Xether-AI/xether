"use client";

import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <FooterSection />
    </div>
  );
}
