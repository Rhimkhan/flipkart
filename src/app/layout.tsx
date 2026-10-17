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
  metadataBase: new URL("http://localhost:3000"),
  title: "AKHIL FOODS | Artisanal Handcrafted Mushroom Pickles",
  description:
    "Experience royal artisanal mushroom pickles crafted with fresh farm mushrooms, cold-pressed mustard oil, traditional clay-aged recipes, and zero chemical preservatives. Good Food, Better Life.",
  keywords: [
    "mushroom pickle",
    "akhil foods",
    "artisanal pickle",
    "organic mushroom aachar",
    "homemade pickle online",
    "gourmet food",
    "cold pressed mustard oil pickle",
  ],
  openGraph: {
    title: "AKHIL FOODS | Artisanal Handcrafted Mushroom Pickles",
    description: "Good Food, Better Life. 100% natural, handcrafted mushroom pickles.",
    images: [{ url: "/images/hero-pickle.jpg", width: 1200, height: 630, alt: "Akhil Foods Artisanal Mushroom Pickle" }],
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
      <body className="min-h-screen flex flex-col bg-[#FFFBEF] text-[#1F0E12] antialiased selection:bg-[#4E111B] selection:text-[#FFFBEF]">
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
