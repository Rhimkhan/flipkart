import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Sparkles, Leaf, MapPin } from "lucide-react";
import { BRAND } from "@/lib/brand";
import StoryCraftShowcase from "@/components/StoryCraftShowcase";

export const metadata: Metadata = {
  title: "Our Story & Craft | AKHIL FOODS - Handcrafted Mushroom Pickles",
  description:
    "Learn about AKHIL FOODS, based in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. We handcraft authentic Oyster Mushroom Pickles using pure mustard oil, vinegar, and traditional Indian spices.",
  keywords: [
    "akhil foods story",
    "mushroom pickle jhansi",
    "oyster mushroom pickle",
    "mushroom mela pickle",
    "handcrafted mushroom pickle uttar pradesh",
    "fssai registered pickle",
  ],
  openGraph: {
    title: "Our Story & Craft | AKHIL FOODS",
    description:
      "Handcrafted Oyster Mushroom Pickles from Village Nandsiya, Moth, Jhansi, Uttar Pradesh. Great Food, Better Life.",
    url: "https://akhilfoods.com/our-story",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/products/mushroom-mela-front.jpg",
        width: 1200,
        height: 900,
        alt: "Mushroom Mela Oyster Mushroom Pickle by AKHIL FOODS",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story & Craft | AKHIL FOODS",
    description: "Handcrafted Oyster Mushroom Pickles from Jhansi, Uttar Pradesh.",
    images: ["/images/products/mushroom-mela-front.jpg"],
  },
  alternates: {
    canonical: "/our-story",
  },
};

export default function OurStoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Story - Akhil Foods",
    description:
      "The authentic story, preparation standards, and craftsmanship of AKHIL FOODS in Jhansi, Uttar Pradesh.",
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: "https://akhilfoods.com",
      logo: "https://akhilfoods.com/images/akhil-foods-logo.png",
      taxID: BRAND.gstNumber,
      identifier: [
        {
          "@type": "PropertyValue",
          name: "FSSAI License",
          value: BRAND.fssaiNumber,
        },
        {
          "@type": "PropertyValue",
          name: "GSTIN",
          value: BRAND.gstNumber,
        },
        {
          "@type": "PropertyValue",
          name: "Udyam Registration",
          value: BRAND.udyamNumber,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: BRAND.address,
        addressLocality: BRAND.city,
        addressRegion: BRAND.state,
        postalCode: BRAND.pincode,
        addressCountry: "IN",
      },
    },
  };

  const values = [
    {
      title: "Real Oyster Mushrooms",
      desc: "Selected oyster mushrooms hand-trimmed, washed, and dried to retain their distinct meaty texture and rich flavor.",
    },
    {
      title: "Pure Mustard Oil & Whole Spices",
      desc: "Cured in genuine mustard oil with crushed coriander, mustard seeds, fennel, fenugreek, cumin, turmeric, and ajwain.",
    },
    {
      title: "Clean & Certified Kitchen",
      desc: "Prepared under strict food safety and hygiene protocols with active FSSAI Lic. No. 22726293000001.",
    },
    {
      title: "Direct from Jhansi to You",
      desc: "Bottled in sturdy 400g glass jars, securely padded, and delivered across India straight from our kitchen.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-20 bg-[#FFFBEF]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-xl border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Rooted in Jhansi, Uttar Pradesh</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#6B352A] leading-tight">
            Handcrafted Oyster Mushroom Pickle with Genuine Taste
          </h1>
          <p className="text-base sm:text-lg text-[#2B1B17]/80 leading-relaxed font-light">
            At <strong className="font-bold text-[#6B352A]">{BRAND.name}</strong>, we are committed to our motto &ldquo;{BRAND.tagline}&rdquo;. Operating out of Village Nandsiya in Moth, Jhansi, we make honest, flavourful pickles using tender oyster mushrooms and authentic Indian kitchen spices.
          </p>
        </div>

        {/* Story Section 1: The Product & Roots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#6B352A]/15 shadow-2xl group bg-white">
              <Image
                src="/images/products/mushroom-mela-front.jpg"
                alt="Mushroom Mela Oyster Mushroom Pickle jar by Akhil Foods"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#2B1B17]/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white text-xs">
                <p className="font-medium">Mushroom Mela Oyster Mushroom Pickle (400g) — Crafted in Jhansi, UP.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#A8553F] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#A8553F]" />
              <span>Our Origin</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A] leading-snug">
              Authentic Preparation in Village Nandsiya, Moth
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              AKHIL FOODS began with a straightforward idea: bring the wonderful nutritional qualities and meaty texture of oyster mushrooms into the cherished tradition of Indian pickles.
            </p>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              In our facility in Moth, Jhansi, we handcraft each batch of our signature &ldquo;Mushroom Mela&rdquo; pickle. Fresh oyster mushrooms are carefully sliced, dried, and blended with pure mustard oil, natural vinegar, and roasted aromatic spices like fenugreek, coriander, fennel, and cumin.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#6B352A]/10">
                <span className="font-serif text-2xl font-bold text-[#6B352A]">400g</span>
                <p className="text-xs text-[#2B1B17]/80 mt-0.5">Glass Jar Packaging</p>
              </div>
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#6B352A]/10">
                <span className="font-serif text-2xl font-bold text-[#6B352A]">100% Real</span>
                <p className="text-xs text-[#2B1B17]/80 mt-0.5">Mustard Oil & Spices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Craft Process Showcase (No video, authentic photography) */}
        <div className="space-y-6 pt-2">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-xl border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
              <span>Behind The Scenes</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              The Artisanal Pickling Process
            </h2>
            <p className="text-sm text-[#2B1B17]/80">
              How our pickles are hand-cured with pure mustard oil and stone-ground spices in Village Nandsiya, Moth, Jhansi.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <StoryCraftShowcase />
          </div>
        </div>

        {/* Ingredients & Recipe Details */}
        <div className="bg-[#6B352A] text-[#FFF8E7] rounded-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF1A6]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#FFF1A6] bg-[#4A231B] px-4 py-1.5 rounded-xl border border-[#FFF1A6]/20 inline-flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#FFF1A6]" />
                <span>True Label Transparency</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF1A6] leading-tight">
                Simple, Honest Ingredients
              </h2>
              <p className="text-sm sm:text-base text-[#FFF8E7]/90 leading-relaxed">
                We believe in full transparency. Look at our back label: tender oyster mushrooms, pure mustard oil, vinegar, salt, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, and garlic.
              </p>
              <p className="text-sm sm:text-base text-[#FFF8E7]/90 leading-relaxed">
                Every batch is crafted in controlled quantities, tested for optimal taste and shelf stability, and packed in secure glass jars for delivery across the nation.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#FFF1A6]/20">
                  Pure Mustard Oil
                </span>
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#FFF1A6]/20">
                  Tender Oyster Mushrooms
                </span>
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#FFF1A6]/20">
                  FSSAI Compliant
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#FFF1A6]/20 shadow-2xl bg-white p-4 flex items-center justify-center">
              <Image
                src="/images/products/mushroom-mela-ingredients.jpg"
                alt="Mushroom Mela ingredients and nutrition label"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              Our 4 Quality Standards
            </h2>
            <p className="text-sm text-stone-600">The core principles behind every jar of AKHIL FOODS pickle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="clay-card rounded-2xl p-6 bg-white space-y-3">
                <div className="text-2xl font-bold text-[#6B352A]">0{idx + 1}</div>
                <h3 className="font-serif text-base font-bold text-[#6B352A]">{v.title}</h3>
                <p className="text-sm text-[#2B1B17]/80 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B352A]">
            Taste Mushroom Mela Oyster Mushroom Pickle
          </h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Packed in double-walled secure courier packaging with Pan-India dispatch from Jhansi, Uttar Pradesh.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all"
            >
              <span>Order Mushroom Mela (400g)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
