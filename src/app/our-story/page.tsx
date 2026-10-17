import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Sparkles, Heart, Award, ShieldCheck, Sun, CheckCircle, Leaf, Compass } from "lucide-react";
import { BRAND } from "@/lib/brand";
import StoryVideoCard from "@/components/StoryVideoCard";

export const metadata: Metadata = {
  title: "Our Story & Himalayan Heritage | AKHIL FOODS Mushroom Pickles",
  description:
    "Discover the artisanal heritage of Akhil Foods in Solan, Himachal Pradesh — reviving ancient clay-pot fermentation, cold-pressed wood-pressed mustard oil, and pesticide-free mushroom harvesting.",
  keywords: [
    "akhil foods story",
    "mushroom city solan",
    "clay pot pickle fermentation",
    "handcrafted mushroom pickle",
    "himachal pradesh organic pickles",
    "mitti handi aachar",
    "cold pressed mustard oil pickle",
  ],
  openGraph: {
    title: "Our Story & Heritage | AKHIL FOODS Artisanal Mushroom Pickles",
    description:
      "Crafted with generational recipes in the Mushroom Capital of India, Solan. Slow-cured inside porous earthenware pots with cold-pressed mustard oil.",
    url: "https://akhilfoods.com/our-story",
    siteName: "AKHIL FOODS",
    images: [
      {
        url: "/images/clay-pot-aging.jpg",
        width: 1200,
        height: 900,
        alt: "Generational Himachal master pickling in earthenware clay pots",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story & Himalayan Heritage | AKHIL FOODS",
    description: "Discover ancient clay-pot fermented mushroom pickles crafted in Solan, Himachal Pradesh.",
    images: ["/images/clay-pot-aging.jpg"],
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
      "The artisanal history, traditional clay pot aging process, and Himalayan mushroom cultivation of Akhil Foods.",
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: "https://akhilfoods.com",
      logo: "https://akhilfoods.com/images/akhil-foods-logo.png",
      taxID: BRAND.gstNumber,
      identifier: [
        {
          "@type": "PropertyValue",
          name: "FSSAI Registration",
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
        addressLocality: "Solan",
        addressRegion: "Himachal Pradesh",
        postalCode: "173212",
        addressCountry: "IN",
      },
    },
  };

  const timelineMilestones = [
    {
      year: "1984",
      title: "Grandmother's Terracotta Recipe",
      desc: "Our grandmother in Solan began pickling freshly foraged mountain mushrooms in glazed ceramic barnis (martabans), preserving them with cold-pressed mustard oil and sun-drying.",
    },
    {
      year: "2012",
      title: "Dedicated Organic Cultivation",
      desc: "Established dedicated mushroom cultivation beds in Solan hills, nurturing button, oyster, and shiitake mushrooms with natural mountain spring water without synthetic chemicals.",
    },
    {
      year: "2024",
      title: "Founding AKHIL FOODS",
      desc: "Formalized our generational recipes into micro-batches of 100 jars, reviving authentic porous Mitti Handi clay aging and wood-pressed mustard oils.",
    },
    {
      year: "2026 & Beyond",
      title: "Pan-India Gourmet Delivery",
      desc: "Bringing artisanal mushroom pickles safely packed in shock-absorbing honeycomb glass jars to discerning food connoisseurs across India with zero chemical preservatives.",
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
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Himalayan Heritage & Craftsmanship</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#6B352A] leading-tight">
            Reviving The Sacred Heritage of Clay-Pot Mushroom Pickling
          </h1>
          <p className="text-base sm:text-lg text-[#2B1B17]/80 leading-relaxed font-light">
            In an era of mass-produced industrial food loaded with synthetic acetic acid and artificial preservatives,{" "}
            <strong className="font-bold text-[#6B352A]">{BRAND.name}</strong> was born out of a quiet rebellion in the pristine mountain mist of Solan, Himachal Pradesh.
          </p>
        </div>

        {/* Story Section 1: The Solan Mushroom Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-[#6B352A]/15 shadow-2xl group">
              <Image
                src="/images/solan-harvest.jpg"
                alt="Freshly harvested oyster and button mushrooms on woven bamboo trays in Solan Himachal Pradesh"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#2B1B17]/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-white text-xs">
                <p className="font-medium">Organic mushroom cultivation in Solan, nestled at 1,600m altitude in Himachal Pradesh.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#A8553F] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Chapter I: The Cradle</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A] leading-snug">
              Born in India’s Mushroom Capital
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              Solan, cradled in the pristine foothills of the Shivalik Himalayas, has long been celebrated as the &ldquo;Mushroom City of India&rdquo;. Our family grew up with the delicate art of cultivating velvety Oyster (Dhingri), plump Button, and medicinal Shiitake mushrooms in crisp mountain air and mineral-rich glacial spring waters.
            </p>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              Every winter harvest, freshly picked mushrooms were sun-steeped on handwoven bamboo mats to gently reduce moisture while sealing in their meaty umami texture. Sun, mountain wind, and heirloom stone-ground spices were all that was ever needed.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#6B352A]/10">
                <span className="font-serif text-2xl font-bold text-[#6B352A]">1,600m</span>
                <p className="text-xs text-[#2B1B17]/70 mt-0.5">High altitude clean mountain air</p>
              </div>
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#6B352A]/10">
                <span className="font-serif text-2xl font-bold text-[#6B352A]">100% Raw</span>
                <p className="text-xs text-[#2B1B17]/70 mt-0.5">Wood-pressed mustard oil only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section 2: Why Clay Matters */}
        <div className="bg-[#6B352A] text-[#FFF8E7] rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF1A6]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#FFF1A6] bg-[#4A231B] px-4 py-1.5 rounded-full border border-[#FFF1A6]/20 inline-flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#FFF1A6]" />
                <span>The Science of Mitti Handi & Barni Aging</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF1A6] leading-tight">
                Why We Insist on Fermenting in Porous Earthenware
              </h2>
              <p className="text-sm sm:text-base text-[#FFF8E7]/85 leading-relaxed">
                Industrial pickle factories ferment inside cold stainless-steel vats using industrial acetic acid regulators. But steel cannot breathe. Traditional unglazed earthenware handis and ceramic terracotta martaban jars possess natural microscopic pores that facilitate slow, gentle oxygen exchange.
              </p>
              <p className="text-sm sm:text-base text-[#FFF8E7]/85 leading-relaxed">
                This micro-breathing process naturally mellows harsh sharp pungency, balances alkaline levels, and fosters healthy wild probiotic bacterial cultures. The outcome is a velvety, deeply layered, rounded umami that mass factory machines can never achieve.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs px-3.5 py-1.5 rounded-full border border-[#FFF1A6]/20">
                  Micro-Porous Oxygenation
                </span>
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs px-3.5 py-1.5 rounded-full border border-[#FFF1A6]/20">
                  Natural Mineral Infusion
                </span>
                <span className="bg-[#4A231B] text-[#FFF1A6] text-xs px-3.5 py-1.5 rounded-full border border-[#FFF1A6]/20">
                  Zero Synthetic Vinegar
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#FFF1A6]/20 shadow-2xl">
              <Image
                src="/images/clay-pot-aging.jpg"
                alt="Traditional Indian earthenware handis and glazed martaban jars on sunlit stone courtyard"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Video Showcase: The Solan Artisanal Craft */}
        <div className="space-y-6 pt-2">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
              <span>Behind The Scenes</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              The Solan Earthenware Pickling Craft
            </h2>
            <p className="text-xs sm:text-sm text-[#2B1B17]/75">
              Watch how fresh oyster and button mushrooms are cured inside porous clay barnis with cold-pressed mustard oil.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <StoryVideoCard />
          </div>
        </div>

        {/* Section 3: The Cold-Pressed Spices & Oil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#6B352A]/15 shadow-2xl">
            <Image
              src="/images/spices-mustard-oil.jpg"
              alt="Cold-pressed golden mustard oil pouring over whole fenugreek, mustard seeds, and mushrooms in earthenware bowl"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-bold text-[#A8553F] uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-4 h-4" />
              <span>Chapter II: The Alchemy</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              Single-Origin Wooden Kolhu Mustard Oil & Whole Mountain Spices
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              We never use cheap solvent-extracted refined vegetable oil. Every batch of Akhil Foods pickle is cured in raw, unrefined mustard oil expelled slowly in wooden churners (Kacchi Ghani). It retains its natural pungency, golden lustre, and high levels of plant antioxidants.
            </p>
            <p className="text-sm sm:text-base text-[#2B1B17]/80 leading-relaxed">
              Our spice blends feature whole yellow mustard seeds, roasted fenugreek (methi), black kalonji, wild timur pepper, and Himalayan rock salt, sun-roasted on cast iron tawas and coarse-ground on granite sil-battas.
            </p>
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className="space-y-10 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full border border-[#EAD075]">
              Generational Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              Our Path Through The Decades
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">From our home kitchen in Solan to dining tables across the nation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineMilestones.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#6B352A]/15 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-serif text-3xl font-extrabold text-[#A8553F]">{milestone.year}</div>
                  <h3 className="font-serif text-base font-bold text-[#6B352A]">{milestone.title}</h3>
                  <p className="text-xs text-[#2B1B17]/75 leading-relaxed">{milestone.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#6B352A]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Verified Craft</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B352A]">
              Our 4 Sacred Purity Promises
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">The unbreakable rules behind every single jar we bottle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">01</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">No Synthetic Vinegar</h3>
              <p className="text-xs text-[#2B1B17]/75 leading-relaxed">
                We only use natural Himalayan rock salt, sun curing, and raw sun-dried mango extract to achieve natural tang.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">02</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Cold-Pressed Mustard Oil</h3>
              <p className="text-xs text-[#2B1B17]/75 leading-relaxed">
                Zero refined palm or commercial seed oils. Only pure single-origin cold-pressed mustard oil in traditional wooden expellers.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">03</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Fresh Harvest Everyday</h3>
              <p className="text-xs text-[#2B1B17]/75 leading-relaxed">
                We pluck mushrooms the very morning they are prepared. No frozen, canned, or rehydrated commercial mushrooms.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">04</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Small Micro-Batches</h3>
              <p className="text-xs text-[#2B1B17]/75 leading-relaxed">
                Each batch is restricted to 100 jars. Inspected, tasted, numbered, and hand-labelled before it leaves our Solan facility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#6B352A]">
            Taste The Difference of Genuine Himalayan Craft
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Packed in double-walled secure courier packaging with Pan-India dispatch from Solan.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all"
            >
              <span>Explore The 4 Flavours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
