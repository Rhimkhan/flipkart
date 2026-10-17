import React from "react";
import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact Us & Solan Kitchen Location | AKHIL FOODS",
  description:
    "Get in touch with Akhil Foods in Solan, Himachal Pradesh. Inquire about bulk gifting, organic ingredients, courier delivery, or message our customer care team.",
  keywords: [
    "contact akhil foods",
    "akhil foods solan",
    "himachal pickle farm contact",
    "buy mushroom pickle bulk",
    "wedding gifting pickle hampers",
    "akhil foods customer care",
  ],
  openGraph: {
    title: "Contact Us & Solan Location | AKHIL FOODS",
    description:
      "Reach out to our kitchen in Solan, HP. Quick WhatsApp support, bulk orders, and delivery assistance.",
    url: "https://akhilfoods.com/contact",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/hero-pickle.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Foods Artisanal Mushroom Pickles Customer Care and Farm",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | AKHIL FOODS Solan",
    description: "Get in touch with our kitchen and farm in Solan, Himachal Pradesh.",
    images: ["/images/hero-pickle.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    image: "https://akhilfoods.com/images/hero-pickle.jpg",
    telephone: BRAND.phone,
    email: BRAND.email,
    url: "https://akhilfoods.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address,
      addressLocality: "Solan",
      addressRegion: "Himachal Pradesh",
      postalCode: "173212",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.9084,
      longitude: 77.0694,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
