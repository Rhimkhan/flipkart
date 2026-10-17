import React from "react";
import { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { INITIAL_PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Handcrafted Oyster Mushroom Pickle | AKHIL FOODS",
  description:
    "Buy authentic Mushroom Mela Oyster Mushroom Pickle (400g) handcrafted by AKHIL FOODS, Jhansi, Uttar Pradesh. Prepared with pure mustard oil and traditional stone-ground spices.",
  keywords: [
    "buy mushroom pickle online",
    "mushroom mela oyster mushroom pickle",
    "oyster mushroom aachar",
    "akhil foods shop",
    "jhansi mushroom pickle",
  ],
  openGraph: {
    title: "Shop Handcrafted Oyster Mushroom Pickle | AKHIL FOODS",
    description:
      "Handcrafted in Jhansi, Uttar Pradesh with pure mustard oil and authentic spices. Fast pan-India delivery.",
    url: "https://akhilfoods.com/shop",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/products/mushroom-mela-front.jpg",
        width: 1200,
        height: 630,
        alt: "AKHIL FOODS Mushroom Mela Oyster Mushroom Pickle Jar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Handcrafted Oyster Mushroom Pickle | AKHIL FOODS",
    description: "Handcrafted in Jhansi, UP with pure mustard oil and stone-ground spices.",
    images: ["/images/products/mushroom-mela-front.jpg"],
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AKHIL FOODS Handcrafted Mushroom Pickle Collection",
    description: "Authentic Oyster Mushroom Pickle handcrafted in Jhansi, UP.",
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
          "@type": "Offer",
          price: prod.sizes[0]?.price || 399,
          priceCurrency: "INR",
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
