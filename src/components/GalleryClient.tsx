"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "jars" | "ingredients" | "packaging";
  categoryLabel: string;
  image: string;
  alt: string;
  shopSlug?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Mushroom Mela 400g Glass Jar (Front View)",
    subtitle: "Artisanal handcrafted Oyster Mushroom Pickle sealed in a sturdy glass jar with golden metal lid.",
    category: "jars",
    categoryLabel: "Product Jar",
    image: "/images/products/mushroom-mela-front.jpg",
    alt: "Mushroom Mela Oyster Mushroom Pickle front view jar 400g by Akhil Foods Jhansi",
    shopSlug: "mushroom-mela-oyster-mushroom-pickle",
  },
  {
    id: "gal-2",
    title: "Jar Profile & Product Presentation (Side View)",
    subtitle: "Generous chunks of tender oyster mushrooms steeped in golden mustard oil with stone-ground Indian spices.",
    category: "jars",
    categoryLabel: "Product Jar",
    image: "/images/products/mushroom-mela-side.jpg",
    alt: "Mushroom Mela jar side profile showcasing oyster mushroom pickle texture",
    shopSlug: "mushroom-mela-oyster-mushroom-pickle",
  },
  {
    id: "gal-3",
    title: "Official Label & Complete Ingredients List",
    subtitle: "Transparent labelling: Mushroom, mustard oil, vinegar, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, garlic.",
    category: "ingredients",
    categoryLabel: "Ingredients & Label",
    image: "/images/products/mushroom-mela-ingredients.jpg",
    alt: "Mushroom Mela label showing ingredients, manufacturing, and storage directions",
    shopSlug: "mushroom-mela-oyster-mushroom-pickle",
  },
  {
    id: "gal-4",
    title: "Packaging & Directions for Use (Back View)",
    subtitle: "Net Quantity 400g, MRP ₹399. Storage: cool, dry place, keep away from direct sunlight, use a clean dry spoon.",
    category: "packaging",
    categoryLabel: "Packaging & Details",
    image: "/images/products/mushroom-mela-back.jpg",
    alt: "Mushroom Mela back label with net weight 400g, MRP, and use directions",
    shopSlug: "mushroom-mela-oyster-mushroom-pickle",
  },
  {
    id: "gal-5",
    title: "Cold-Pressed Mustard Oil & Roasted Spices",
    subtitle: "Pure mustard oil infused with roasted mustard, fenugreek, cumin, and whole spices.",
    category: "ingredients",
    categoryLabel: "Ingredients & Label",
    image: "/images/spices-mustard-oil.jpg",
    alt: "Pure mustard oil pouring over whole spices in artisanal bowl",
  },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const categories = [
    { key: "all", label: "All Photos" },
    { key: "jars", label: "Product Jars" },
    { key: "ingredients", label: "Ingredients & Label" },
    { key: "packaging", label: "Packaging & Details" },
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
            A real photographic look into our Mushroom Mela 400g jars, complete label ingredients, and artisanal packing in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeCategory === cat.key
                  ? "bg-[#6B352A] text-[#FFF1A6] shadow-md"
                  : "bg-white text-stone-700 hover:bg-[#FFF8E7] border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setModalIndex(idx)}
              className="clay-card rounded-3xl overflow-hidden bg-white border border-[#6B352A]/15 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FFFBEF] flex items-center justify-center p-3">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#4A231B]/90 backdrop-blur-sm text-[#FFF1A6] text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-[#FFF1A6]/20">
                  {item.categoryLabel}
                </span>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-[#4A231B] shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-bold text-[#4A231B] group-hover:text-[#6B352A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
                {item.shopSlug && (
                  <div className="pt-2">
                    <Link
                      href={`/product/${item.shopSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A8553F] hover:text-[#6B352A] underline underline-offset-4"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeItem && modalIndex !== null && (
          <div
            onClick={() => setModalIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 relative animate-in zoom-in-95"
            >
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#4A231B] flex items-center justify-center shadow-lg transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#4A231B] flex items-center justify-center shadow-lg transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative aspect-[4/3] bg-[#FFFBEF] flex items-center justify-center p-6">
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="p-6 bg-[#4A231B] text-[#FFF8E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#FFF1A6] uppercase tracking-wider">
                    {activeItem.categoryLabel}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                    {activeItem.title}
                  </h4>
                  <p className="text-xs text-[#FFF8E7]/80 max-w-xl mt-1">
                    {activeItem.subtitle}
                  </p>
                </div>
                {activeItem.shopSlug && (
                  <Link
                    href={`/product/${activeItem.shopSlug}`}
                    className="shrink-0 px-5 py-2.5 rounded-full bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Order Now</span>
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
            Order fresh 400g jars directly from our Jhansi kitchen to your doorstep.
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
