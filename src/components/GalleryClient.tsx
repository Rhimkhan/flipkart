"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Mushroom Mela 400 g Jar (Front View)",
    subtitle: "Front label view showing brand name, product name, and net quantity 400 g.",
    image: "/images/products/mushroom-mela-front.jpg",
    alt: "Mushroom Mela Oyster Mushroom Pickle front view jar 400g by Akhil Foods Jhansi",
  },
  {
    id: "gal-2",
    title: "Jar Side View & Texture",
    subtitle: "Side profile showing oyster mushrooms steeped in mustard oil and spices.",
    image: "/images/products/mushroom-mela-side.jpg",
    alt: "Mushroom Mela jar side profile showcasing oyster mushroom pickle texture",
  },
  {
    id: "gal-3",
    title: "Official Label & Ingredients List",
    subtitle: "Label showing mushroom, mustard oil, vinegar, salt, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, garlic, and permitted additives.",
    image: "/images/products/mushroom-mela-ingredients.jpg",
    alt: "Mushroom Mela label showing ingredients, manufacturing, and storage directions",
  },
  {
    id: "gal-4",
    title: "Packaging & Directions for Use (Back View)",
    subtitle: "Net Quantity 400 g, MRP Rs 399. Storage instructions and manufacturer details in Moth, Jhansi.",
    image: "/images/products/mushroom-mela-back.jpg",
    alt: "Mushroom Mela back label with net weight 400g, MRP, and use directions",
  },
];

export default function GalleryClient() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const activeItem = modalIndex !== null ? GALLERY_ITEMS[modalIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#A87B28] block">
            Product Photos
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#211612]">
            Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#3D2C24] font-light leading-relaxed">
            Actual photos of our 400 g Mushroom Mela jar, label, ingredients list, and packaging from our kitchen in Village Nandsiya, Moth, Jhansi.
          </p>
        </div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setModalIndex(index)}
              className="clay-card rounded-[6px] overflow-hidden bg-[#FDFBF7] border border-[#E8DEC8] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square bg-[#FAF6EE] overflow-hidden border-b border-[#E8DEC8]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#211612]/0 group-hover:bg-[#211612]/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#211612] text-[#FAF6EE] p-2 rounded-[6px] shadow">
                      <Eye className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-[#211612] group-hover:text-[#A87B28] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3D2C24] font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <span className="text-xs font-serif font-bold text-[#A87B28] group-hover:text-[#211612] transition-colors inline-flex items-center gap-1">
                  <span>View photo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {activeItem && modalIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-[#211612]/90 flex items-center justify-center p-4"
            onClick={() => setModalIndex(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#FAF6EE] rounded-[6px] overflow-hidden shadow-2xl border border-[#E8DEC8]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-[6px] bg-[#211612] text-[#FAF6EE] hover:bg-[#34221A] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-[6px] bg-[#211612] text-[#FAF6EE] hover:bg-[#34221A] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-[6px] bg-[#211612] text-[#FAF6EE] hover:bg-[#34221A] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] bg-[#FAF6EE]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="p-5 bg-[#FDFBF7] border-t border-[#E8DEC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#211612]">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-[#3D2C24] font-light mt-0.5">
                    {activeItem.subtitle}
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="btn-primary shrink-0"
                >
                  <span>Order Now (Rs 399)</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Action Link */}
        <div className="pt-4 text-center">
          <Link
            href="/shop"
            className="btn-primary"
          >
            <span>Shop Mushroom Mela (400 g)</span>
            <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
