import React from "react";
import { Metadata } from "next";
import FAQClient from "@/components/FAQClient";
import { FAQ_DATA } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | AKHIL FOODS",
  description:
    "Got questions about our Oyster Mushroom Pickle? Learn about our real ingredients, FSSAI registration, storage instructions, and pan-India delivery from Jhansi, Uttar Pradesh.",
  keywords: [
    "akhil foods faq",
    "mushroom mela pickle",
    "oyster mushroom pickle ingredients",
    "how to store mushroom pickle",
    "akhil foods delivery time",
    "fssai license akhil foods",
  ],
  openGraph: {
    title: "Frequently Asked Questions | AKHIL FOODS",
    description:
      "All answers about our Mushroom Mela Oyster Mushroom Pickle, genuine ingredients, packaging safety, and delivery.",
    url: "https://akhilfoods.com/faq",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/products/mushroom-mela-front.jpg",
        width: 1200,
        height: 900,
        alt: "AKHIL FOODS Mushroom Mela Jar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | AKHIL FOODS Oyster Mushroom Pickles",
    description: "Learn about Mushroom Mela ingredients, purity, and shelf life.",
    images: ["/images/products/mushroom-mela-front.jpg"],
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
