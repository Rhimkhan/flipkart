import React from "react";
import { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { INITIAL_PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Artisanal Mushroom Pickles | 4 Handcrafted Flavours",
  description:
    "Buy artisanal mushroom pickles online from Solan, HP. Choose from Classic Masala, Garlic Shiitake, Traditional Mustard Oil, and Spicy Pahadi Red Chilli. 100% natural, clay-aged, cold-pressed.",
  keywords: [
    "buy mushroom pickle online",
    "mushroom aachar",
    "organic mushroom pickle india",
    "solan mushroom pickle price",
    "garlic mushroom pickle",
    "spicy pahadi pickle",
    "akhil foods shop",
  ],
  openGraph: {
    title: "Shop Artisanal Mushroom Pickles | AKHIL FOODS",
    description:
      "Handcrafted in Solan, HP with cold-pressed mustard oil and sun-cured spices. Free delivery on select orders.",
    url: "https://akhilfoods.com/shop",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/hero-pickle.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Foods Artisanal Mushroom Pickles Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Artisanal Mushroom Pickles | AKHIL FOODS",
    description: "Handcrafted in Solan, HP with cold-pressed mustard oil and sun-cured spices.",
    images: ["/images/hero-pickle.jpg"],
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AKHIL FOODS Artisanal Mushroom Pickles Collection",
    description: "Small-batch clay pot fermented mushroom pickles from Solan, HP.",
    numberOfItems: INITIAL_PRODUCTS.length,
    itemListElement: INITIAL_PRODUCTS.map((prod, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: prod.name,
        image: `https://akhilfoods.com${prod.image}`,
        description: prod.description,
        sku: prod.id,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: prod.sizes[0].price,
          highPrice: prod.sizes[prod.sizes.length - 1].price,
          offerCount: prod.sizes.length,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ShopClient />
    </>
  );
}
