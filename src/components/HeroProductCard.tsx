import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function HeroProductCard() {
  const product = INITIAL_PRODUCTS[0];

  return (
    <div className="relative w-full max-w-xl flex flex-col">
      {/* Solid dark-espresso card container */}
      <div className="relative w-full rounded-[6px] bg-[#1C130E] border border-[#C89B3C]/35 shadow-xl p-6 sm:p-7 overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#C89B3C]/20">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xs tracking-wider uppercase text-[#D4AF37] font-semibold">
              MUSHROOM MELA • JHANSI
            </span>
          </div>
          <span className="font-serif text-xs tracking-wider uppercase text-[#D4AF37] font-semibold">
            400 G JAR
          </span>
        </div>

        {/* Real Product Photograph */}
        <div className="my-4 rounded-[6px] overflow-hidden border border-[#C89B3C]/25 bg-[#FAF6EE]">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/products/mushroom-mela-front.jpg"
              alt="Mushroom Mela Oyster Mushroom Pickle 400g jar front view"
              fill
              sizes="(max-width: 640px) 100vw, 550px"
              priority
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Ingredient Points */}
        <div className="grid grid-cols-3 gap-2 pt-1 pb-4">
          <div className="bg-[#2A1D17] border border-[#C89B3C]/20 rounded-[6px] py-2 px-1 text-center">
            <span className="font-serif text-xs text-[#EADBB6] tracking-wider block font-medium">
              Oyster Mushroom
            </span>
          </div>
          <div className="bg-[#2A1D17] border border-[#C89B3C]/20 rounded-[6px] py-2 px-1 text-center">
            <span className="font-serif text-xs text-[#EADBB6] tracking-wider block font-medium">
              Mustard Oil
            </span>
          </div>
          <div className="bg-[#2A1D17] border border-[#C89B3C]/20 rounded-[6px] py-2 px-1 text-center">
            <span className="font-serif text-xs text-[#EADBB6] tracking-wider block font-medium">
              Indian Spices
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-[#C89B3C]/20 flex items-center justify-between text-[#FAF6EE] gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-[#D4AF37]">
              ₹399
            </span>
            <span className="text-xs text-[#EADBB6]/80 font-serif">
              400 g jar
            </span>
          </div>

          <Link
            href="/product/mushroom-mela-oyster-mushroom-pickle"
            className="btn-primary !py-2 !px-4 !bg-[#FAF6EE] !text-[#211612] !border-[#FAF6EE] hover:!bg-[#EFE8DD] text-xs font-serif tracking-wider uppercase font-bold shrink-0"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A87B28]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
