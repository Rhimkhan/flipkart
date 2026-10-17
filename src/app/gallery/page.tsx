import React from "react";
import { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
  description:
    "Explore our visual chronicle — fresh mushroom harvesting in Solan Himachal Pradesh, traditional clay-pot sun-curing handis, cold-pressed mustard oils, and small-batch jars.",
  keywords: [
    "akhil foods gallery",
    "mushroom pickle photos",
    "himachal pickle jars",
    "clay pot aging photography",
    "solan mushroom farm",
    "artisanal food packaging",
  ],
  openGraph: {
    title: "Artisanal Gallery | AKHIL FOODS Mushroom Pickles",
    description:
      "A photographic journey through Solan mushroom harvests, porous clay handis, cold-pressed mustard oil, and handcrafted batches.",
    url: "https://akhilfoods.com/gallery",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/solan-harvest.jpg",
        width: 1200,
        height: 900,
        alt: "Freshly harvested oyster and button mushrooms on woven bamboo trays in Solan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisanal Gallery | AKHIL FOODS",
    description: "Visual chronicle of handcrafted mushroom pickling in Solan, Himachal Pradesh.",
    images: ["/images/solan-harvest.jpg"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
