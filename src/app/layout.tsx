import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "AKHIL FOODS | Mushroom Mela oyster mushroom pickle",
    template: "%s | AKHIL FOODS",
  },
  description:
    "Mushroom Mela oyster mushroom pickle made by Akhil Foods in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. 400 g jar, Rs 399. FSSAI registered.",
  keywords: ["AKHIL FOODS", "Mushroom Mela", "Mushroom Pickle", "Jhansi"],
  authors: [{ name: "AKHIL FOODS", url: appUrl }],
  creator: "AKHIL FOODS",
  publisher: "AKHIL FOODS",
  formatDetection: {
    telephone: false,
    email: false,
  },
  openGraph: {
    title: "AKHIL FOODS | Mushroom Mela oyster mushroom pickle",
    description: "Mushroom Mela oyster mushroom pickle made by Akhil Foods in Nandsiya, Moth, Jhansi. 400 g jar, Rs 399. FSSAI registered.",
    url: appUrl,
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/products/mushroom-mela-front.jpg",
        width: 1200,
        height: 630,
        alt: "AKHIL FOODS Mushroom Mela Oyster Mushroom Pickle 400g Jar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKHIL FOODS | Mushroom Mela oyster mushroom pickle",
    description: "Mushroom Mela oyster mushroom pickle made by Akhil Foods in Nandsiya, Moth, Jhansi. 400 g jar, Rs 399.",
    images: ["/images/products/mushroom-mela-front.jpg"],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#211612] antialiased selection:bg-[#211612] selection:text-[#FAF6EE]">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <AuthModal />
            <FloatingWhatsApp />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
