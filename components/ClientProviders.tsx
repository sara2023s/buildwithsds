"use client";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import CursorGlow from "@/components/CursorGlow";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { CursorProvider } from "@/context/CursorContext";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <Preloader />
      <CursorGlow />
      <CustomCursor />
      <TopNav />
      {children}
      <Footer />
    </CursorProvider>
  );
}
