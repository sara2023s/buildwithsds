import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const siteUrl = "https://buildwithsds.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sara da Silva — IT support engineer who builds, New Zealand",
    template: "%s · Sara da Silva",
  },
  description:
    "25 certs across AWS, Azure, IBM AI, Cisco, MikroTik, Anthropic. ISP support by day, shipping React and Node by night. Three client websites, five live apps. Open to Level 2 support, sysadmin, or full-stack engineering.",
  keywords: [
    "IT support",
    "full stack developer",
    "New Plymouth",
    "New Zealand",
    "MTCNA",
    "CCNA",
    "React",
    "Node",
    "Sara da Silva",
    "buildwithsds",
  ],
  authors: [{ name: "Sara da Silva", url: siteUrl }],
  creator: "Sara da Silva",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: siteUrl,
    siteName: "Build With SDS",
    title: "Sara da Silva — IT support engineer who builds",
    description:
      "25 certs across AWS, Azure, IBM AI, Cisco, MikroTik, Anthropic. ISP support by day, shipping React and Node by night. Open to Level 2 support, sysadmin, or full-stack engineering.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sara da Silva — IT support engineer who builds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara da Silva — IT support engineer who builds",
    description:
      "25 certs across AWS, Azure, IBM AI, Cisco, MikroTik, Anthropic. ISP support by day, shipping React and Node by night. Open to Level 2 support, sysadmin, or full-stack engineering.",
    images: ["/opengraph-image"],
    creator: "@sara2023s",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
