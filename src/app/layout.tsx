import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const description =
  "Independent minds. Clearer decisions. Perllynn brings together a global network of independent experts, providing unbiased advice focused solely on what makes sense for you. Based in Chicago.";
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl =
  process.env.SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Perllynn — Independent minds. Clearer decisions.",
  description,
  openGraph: {
    title: "Perllynn — Independent minds. Clearer decisions.",
    description,
    type: "website",
    locale: "en_US",
    siteName: "Perllynn",
  },
  twitter: { card: "summary_large_image", title: "Perllynn", description },
  icons: {
    icon: "/brand/perllynn-logo.jpg",
    apple: "/brand/perllynn-logo.jpg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
