import React from "react";
import { Metadata } from "next";
import FAQClient from "@/components/FAQClient";
import { FAQ_DATA } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | AKHIL FOODS Mushroom Pickles",
  description:
    "Got questions about our artisanal mushroom pickles? Learn about traditional clay-pot aging in Solan, wood-pressed mustard oil, vegan ingredients, shelf life, and courier delivery.",
  keywords: [
    "akhil foods faq",
    "mushroom pickle ingredients",
    "is mushroom pickle healthy",
    "clay pot aging pickle",
    "how to store artisanal pickle",
    "akhil foods delivery time",
  ],
  openGraph: {
    title: "Frequently Asked Questions | AKHIL FOODS",
    description:
      "All answers about our Himalayan mushroom pickles, earthenware fermentation, courier safety, and zero chemical preservatives.",
    url: "https://akhilfoods.com/faq",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/clay-pot-aging.jpg",
        width: 1200,
        height: 900,
        alt: "Traditional Indian ceramic pickle jars and terracotta handis",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | AKHIL FOODS Artisanal Mushroom Pickles",
    description: "Learn about traditional clay-pot fermentation, purity, and shelf life.",
    images: ["/images/clay-pot-aging.jpg"],
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  // Generate JSON-LD for Google Rich Results (FAQPage Schema)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
