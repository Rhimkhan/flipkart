"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Hero Artisanal Mushroom Pickle Jar",
      subtitle: "Hexagonal glass jar sealed with wooden cork and jute twine in terracotta clay setting.",
      image: "/images/hero-pickle.jpg",
      tag: "Signature Jar",
    },
    {
      title: "Classic Masala Oyster Mushroom Pickle",
      subtitle: "Fresh oyster mushrooms marinated in fragrant fenugreek, kalonji, and raw mustard oil.",
      image: "/images/classic-masala.jpg",
      tag: "Flagship Batch",
    },
    {
      title: "Slow-Roasted Garlic Shiitake Blend",
      subtitle: "Whole golden desi garlic cloves paired with rich earthy shiitake mushrooms.",
      image: "/images/garlic-shiitake.jpg",
      tag: "Gourmet Reserve",
    },
    {
      title: "Traditional Mustard Oil Button Pickle",
      subtitle: "Plump button mushrooms sun-steeped in cold-pressed wooden expeller oil.",
      image: "/images/mustard-oil.jpg",
      tag: "Heritage Craft",
    },
    {
      title: "Spicy Red Chilli Pahadi Mushroom",
      subtitle: "Hand-pounded mountain red chillies and wild timur pepper on rustic stone.",
      image: "/images/spicy-chilli.jpg",
      tag: "Himalayan Heat",
    },
    {
      title: "The Artisanal Studio & Kitchen Aesthetic",
      subtitle: "Natural earth tones, espresso accents, and handcrafted culinary minimalism.",
      image: "/images/moodboard-brown.jpg",
      tag: "Kitchen Philosophy",
    },
  ];

  const [activeItem, setActiveItem] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full">
            Visual Chronicle
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            The Artisanal Gallery
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            A visual glimpse into our handcrafted batches, sun-curing jars, whole spices, and earthy clay pots.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveItem(item)}
              className="clay-card overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FFF8E7]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#6B352A]/90 backdrop-blur-sm text-[#FFF1A6] text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  {item.tag}
                </span>
                <div className="absolute inset-0 bg-[#4A231B]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#6B352A] flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#6B352A] group-hover:text-[#A8553F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-[#6B352A]/20 shadow-2xl space-y-4 p-6 relative">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 bg-[#6B352A] text-[#FFF1A6] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10"
              >
                ✕
              </button>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                <Image src={activeItem.image} alt={activeItem.title} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#A8553F] bg-[#FFF1A6] px-2 py-0.5 rounded">
                  {activeItem.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#6B352A]">{activeItem.title}</h3>
                <p className="text-xs text-stone-600">{activeItem.subtitle}</p>
              </div>
              <div className="pt-2 flex justify-end">
                <Link
                  href="/shop"
                  className="px-6 py-2.5 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold hover:bg-[#4A231B] transition-colors"
                >
                  Shop This Collection
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all"
          >
            <span>Order Artisanal Jars Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
