import React from "react";
import { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
  description:
    "Explore our visual chronicle — real Mushroom Mela Oyster Mushroom Pickle jars, ingredients, nutrition label, and small-batch packaging in Jhansi, Uttar Pradesh.",
  keywords: ["AKHIL FOODS", "Mushroom Pickle"],
  openGraph: {
    title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
    description:
      "A photographic journey through our real 400g Mushroom Mela Oyster Mushroom Pickle jars, label ingredients, and artisanal packing in Jhansi, Uttar Pradesh.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/gallery`,
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/products/mushroom-mela-front.jpg",
        width: 1200,
        height: 900,
        alt: "Mushroom Mela Oyster Mushroom Pickle 400g Jar - Akhil Foods Jhansi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisanal Gallery | AKHIL FOODS",
    description: "Visual chronicle of handcrafted mushroom pickling in Jhansi, Uttar Pradesh.",
    images: ["/images/products/mushroom-mela-front.jpg"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
