"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function HeroProductCard() {
  const { addToCart, buyNow } = useCart();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const product = INITIAL_PRODUCTS[0]; // Mushroom Mela Pickle

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, "400g", 1);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      buyNow(product, "400g", 1);
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-[36px] overflow-hidden shadow-2xl border-4 border-[#FFF1A6]/30 bg-gradient-to-br from-[#3D1E16] via-[#2B1B17] to-[#1E110E] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:border-[#FFF1A6]/50">
      {/* Ambient background glow behind jar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFF1A6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Strip with Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="bg-[#6B352A]/90 backdrop-blur-md text-[#FFF1A6] text-body font-bold px-3.5 py-1.5 rounded-full border border-[#FFF1A6]/30 shadow-md inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFF1A6]" />
          <span>Signature 400g Glass Jar</span>
        </span>
        <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-body font-semibold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>FSSAI Certified</span>
        </span>
      </div>

      {/* Center Product Image with Clean Framing */}
      <div className="relative z-10 my-4 sm:my-5 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-square rounded-[28px] overflow-hidden bg-white/95 p-5 shadow-inner border border-white/40 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
          <div className="relative w-full h-full">
            <Image
              src="/images/products/mushroom-mela-front.jpg"
              alt="Mushroom Mela Artisanal Oyster Mushroom Pickle Jar - Akhil Foods"
              fill
              sizes="(max-width: 640px) 240px, 280px"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Product Highlights & Badges */}
      <div className="relative z-10 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2 text-body text-[#FFF8E7]/90">
          <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#FFF1A6]" />
            100% Pure Mustard Oil
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#FFF1A6]" />
            No Artificial Shortcuts
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#FFF1A6]" />
            Jhansi Origin
          </span>
        </div>

        {/* Bottom Action Card */}
        <div className="bg-[#FFFBEF] p-4 rounded-2xl border border-[#6B352A]/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[#2B1B17]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-extrabold text-[#4A231B]">₹399</span>
              <span className="text-body text-stone-500 font-medium">MRP incl. taxes</span>
            </div>
            <p className="text-body text-[#6B352A] font-semibold">
              Net Quantity: 400g • Free Pan-India Delivery over ₹500
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs border border-[#6B352A] transition-all flex items-center justify-center gap-1.5 ${
                addedAnimation
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-transparent text-[#6B352A] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{addedAnimation ? "Added!" : "Add to Cart"}</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
