import React from "react";
import { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
  description:
    "Explore our visual chronicle — real Mushroom Mela Oyster Mushroom Pickle jars, ingredients, nutrition label, and small-batch packaging in Jhansi, Uttar Pradesh.",
  keywords: [
    "akhil foods gallery",
    "mushroom pickle photos",
    "mushroom mela jar photos",
    "jhansi pickle jars",
    "oyster mushroom pickle",
    "artisanal food packaging",
  ],
  openGraph: {
    title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
    description:
      "A photographic journey through our real 400g Mushroom Mela Oyster Mushroom Pickle jars, label ingredients, and artisanal packing in Jhansi, Uttar Pradesh.",
    url: "https://akhilfoods.com/gallery",
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
