import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://akhilfoods.com"),
  title: {
    default: "AKHIL FOODS | Artisanal Handcrafted Mushroom Pickles",
    template: "%s | AKHIL FOODS",
  },
  description:
    "Experience royal artisanal mushroom pickles crafted in Solan, Himachal Pradesh with fresh farm mushrooms, wood-pressed mustard oil, traditional clay-pot aging, and zero chemical preservatives. Good Food, Better Life.",
  keywords: [
    "mushroom pickle",
    "akhil foods",
    "artisanal mushroom pickle",
    "organic mushroom aachar",
    "himachal pradesh pickles",
    "solan mushroom capital",
    "mitti handi pickle",
    "cold pressed mustard oil pickle",
    "vegan handcrafted pickle online",
  ],
  authors: [{ name: "AKHIL FOODS", url: "https://akhilfoods.com" }],
  creator: "AKHIL FOODS",
  publisher: "AKHIL FOODS",
  formatDetection: {
    telephone: false,
    email: false,
  },
  openGraph: {
    title: "AKHIL FOODS | Artisanal Handcrafted Mushroom Pickles",
    description: "Good Food, Better Life. 100% natural, clay-aged handcrafted mushroom pickles from Solan, HP.",
    url: "https://akhilfoods.com",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/hero-pickle.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Foods Artisanal Handcrafted Mushroom Pickle Jar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKHIL FOODS | Artisanal Mushroom Pickles",
    description: "Generational clay-pot fermented mushroom pickles from Solan, Himachal Pradesh.",
    images: ["/images/hero-pickle.jpg"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/akhil-foods-logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFF8E7] text-[#2B1B17] antialiased selection:bg-[#6B352A] selection:text-[#FFF1A6]">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
