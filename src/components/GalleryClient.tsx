"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "jars" | "harvest" | "aging" | "studio";
  categoryLabel: string;
  image: string;
  alt: string;
  shopSlug?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Signature Hexagonal Jar in Clay Setting",
    subtitle: "Sealed with natural jute twine, wooden cork lid, and handcrafted calligraphic label.",
    category: "jars",
    categoryLabel: "Signature Jars",
    image: "/images/hero-pickle.jpg",
    alt: "Handcrafted glass jar of Akhil Foods mushroom pickle sealed with cork and jute twine",
    shopSlug: "classic-masala-oyster-mushroom-pickle",
  },
  {
    id: "gal-2",
    title: "Morning Mushroom Harvest in Solan Valley",
    subtitle: "Freshly plucked oyster and button mushrooms air-drying on woven bamboo trays under mountain sun.",
    category: "harvest",
    categoryLabel: "Farm Harvest",
    image: "/images/solan-harvest.jpg",
    alt: "Freshly harvested oyster and button mushrooms on woven bamboo trays in Solan Himachal Pradesh",
  },
  {
    id: "gal-3",
    title: "Sun-Curing in Glazed Ceramic Martabans",
    subtitle: "Generational earthen handis and traditional barnis absorbing natural mountain sunlight.",
    category: "aging",
    categoryLabel: "Clay Aging & Spices",
    image: "/images/clay-pot-aging.jpg",
    alt: "Traditional Indian ceramic pickle barni and terracotta handis on stone courtyard",
  },
  {
    id: "gal-4",
    title: "Cold-Pressed Mustard Oil & Spices Alchemy",
    subtitle: "Golden virgin mustard oil infused over roasted fenugreek, yellow mustard, and kalonji seeds.",
    category: "aging",
    categoryLabel: "Clay Aging & Spices",
    image: "/images/spices-mustard-oil.jpg",
    alt: "Golden virgin mustard oil pouring over whole spices and mushrooms in terracotta bowl",
  },
  {
    id: "gal-5",
    title: "Classic Masala Oyster Mushroom Pickle",
    subtitle: "Velvety oyster mushroom florets soaked in kacchi ghani mustard oil with whole roasted spices.",
    category: "jars",
    categoryLabel: "Signature Jars",
    image: "/images/classic-masala.jpg",
    alt: "Classic Masala Oyster Mushroom Pickle jar with roasted spices and fresh coriander",
    shopSlug: "classic-masala-oyster-mushroom-pickle",
  },
  {
    id: "gal-6",
    title: "Slow-Roasted Garlic & Shiitake Gourmet Reserve",
    subtitle: "Whole golden caramelized garlic cloves steeped with medicinal shiitake in mountain spices.",
    category: "jars",
    categoryLabel: "Signature Jars",
    image: "/images/garlic-shiitake.jpg",
    alt: "Slow Roasted Garlic Shiitake Mushroom Pickle with golden garlic cloves and black peppercorn",
    shopSlug: "slow-roasted-garlic-shiitake-mushroom-pickle",
  },
  {
    id: "gal-7",
    title: "Traditional Mustard Oil Button Mushroom",
    subtitle: "Tender button mushroom caps aged in wood-pressed mustard oil with Himalayan sendha namak.",
    category: "jars",
    categoryLabel: "Signature Jars",
    image: "/images/mustard-oil.jpg",
    alt: "Traditional Mustard Oil Button Mushroom Pickle in rustic glass jar",
    shopSlug: "traditional-mustard-oil-button-mushroom-pickle",
  },
  {
    id: "gal-8",
    title: "Pahadi Red Chilli & Wild Timur Blend",
    subtitle: "Hand-pounded mountain red chillies with tingling wild timur pepper for bold spice lovers.",
    category: "jars",
    categoryLabel: "Signature Jars",
    image: "/images/spicy-chilli.jpg",
    alt: "Spicy Pahadi Red Chilli Mushroom Pickle with dried whole red chillies and mustard oil",
    shopSlug: "spicy-pahadi-red-chilli-mushroom-pickle",
  },
  {
    id: "gal-9",
    title: "The Artisanal Studio & Culinary Aesthetic",
    subtitle: "Warm earth tones, rustic terracotta textures, and minimal clay pottery aesthetics.",
    category: "studio",
    categoryLabel: "Kitchen Studio",
    image: "/images/moodboard-brown.jpg",
    alt: "Warm clay brown terracotta kitchen moodboard with artisanal food design elements",
  },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const categories = [
    { key: "all", label: "All Works" },
    { key: "jars", label: "Signature Jars" },
    { key: "harvest", label: "Farm Harvest" },
    { key: "aging", label: "Clay Aging & Spices" },
    { key: "studio", label: "Kitchen Studio" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const activeItem = modalIndex !== null ? filteredItems[modalIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Visual Chronicle</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            The Artisanal Gallery
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            A photographic look into our sunlit Solan harvests, clay-pot aging handis, stone-ground whole spices, and hand-bottled batches.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setModalIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? "bg-[#6B352A] text-[#FFF1A6] shadow-md scale-105"
                  : "bg-white text-[#2B1B17]/80 hover:bg-[#FFF8E7] border border-[#6B352A]/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Alt text & Lazy Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setModalIndex(index)}
              className="clay-card overflow-hidden cursor-pointer group flex flex-col justify-between bg-white border border-[#6B352A]/15 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF8E7]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#6B352A]/90 backdrop-blur-sm text-[#FFF1A6] text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  {item.categoryLabel}
                </span>
                <div className="absolute inset-0 bg-[#4A231B]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-[#6B352A] flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#6B352A] group-hover:text-[#A8553F] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.subtitle}
                </p>
                {item.shopSlug && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#A8553F] flex items-center gap-1 group-hover:underline">
                      <span>View in Shop</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && modalIndex !== null && (
          <div
            onClick={() => setModalIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-[#6B352A]/20 shadow-2xl space-y-4 p-6 relative animate-fadeIn"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalIndex(null)}
                className="absolute top-4 right-4 bg-[#6B352A] text-[#FFF1A6] hover:bg-[#4A231B] rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold z-20 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Nav */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#6B352A] text-white p-2.5 rounded-full z-20 backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#6B352A] text-white p-2.5 rounded-full z-20 backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Preview */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FFF8E7]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="space-y-1 max-w-lg">
                  <span className="text-[10px] uppercase font-bold text-[#A8553F] bg-[#FFF1A6] px-2.5 py-0.5 rounded-full">
                    {activeItem.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#6B352A]">{activeItem.title}</h3>
                  <p className="text-xs text-stone-600">{activeItem.subtitle}</p>
                </div>
                {activeItem.shopSlug ? (
                  <Link
                    href={`/product/${activeItem.shopSlug}`}
                    className="px-6 py-3 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold hover:bg-[#4A231B] transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Order This Flavour</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/shop"
                    className="px-6 py-3 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold hover:bg-[#4A231B] transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-8 space-y-3">
          <h3 className="font-serif text-2xl font-bold text-[#6B352A]">
            Taste The Artistry in Every Spoon
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Order fresh small-batch jars directly from our Solan kitchen to your doorstep.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all"
            >
              <span>Explore The Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
