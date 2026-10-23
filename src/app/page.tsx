"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Home as HomeIcon,
  Leaf,
  FlaskConical,
} from "lucide-react";
import { INITIAL_PRODUCTS, FAQS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { ProductSize } from "@/lib/types";
import HeroProductCard from "@/components/HeroProductCard";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE, FSSAI_NUMBER } from "@/lib/config";

export default function HomePage() {
  const { addToCart, buyNow } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSize>>({
    "prod-mushroom-mela": "400g",
  });
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const product = INITIAL_PRODUCTS[0];
  const currentSize = selectedSizes[product.id] || "400g";
  const sizeOption =
    product.sizes.find((s) => s.size === currentSize) || product.sizes[0];

  return (
    <div className="bg-[#FAF6EE]">
      {/* HERO SECTION */}
      <section
        id="hero-section"
        className="relative flex items-center justify-center pt-8 pb-16 sm:py-20 bg-[#FAF6EE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Plain, Factual Typography */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left pr-0 lg:pr-6">
              <div className="space-y-3">
                <span className="font-serif text-xs tracking-wider uppercase text-[#A87B28] font-bold block">
                  AKHIL FOODS • JHANSI, UTTAR PRADESH
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#211612] leading-tight">
                  Mushroom Mela oyster mushroom pickle
                </h1>
              </div>

              <p className="editorial-body text-base sm:text-lg text-[#3D2C24] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                Made by Akhil Foods in Nandsiya, Moth, Jhansi. 400 g jar, Rs 399. FSSAI registered.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop"
                  className="btn-primary w-full sm:w-auto"
                >
                  <span>Shop now</span>
                  <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 text-[#211612]" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Factual Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-serif text-[#3D2C24]">
                <div className="flex items-center gap-1.5 bg-[#EFE8DD] border border-[#DDD3C4] px-3 py-1.5 rounded-[6px]">
                  <ShieldCheck className="w-4 h-4 text-[#A87B28]" />
                  <span>FSSAI Lic. {FSSAI_NUMBER}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EFE8DD] border border-[#DDD3C4] px-3 py-1.5 rounded-[6px]">
                  <CheckCircle className="w-4 h-4 text-[#A87B28]" />
                  <span>400 g Net Quantity</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Product Card */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <HeroProductCard />
            </div>
          </div>
        </div>
      </section>

      {/* REST OF SECTIONS */}
      <div className="space-y-16 sm:space-y-20">

      {/* FACTS STRIP */}
      <section className="bg-[#F2ECE1] border-y border-[#E2D6C0] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-serif text-3xl lg:text-4xl font-light text-[#211612]">
                400 g
              </div>
              <p className="text-xs font-serif tracking-wider text-[#A87B28]">
                Net Weight per Jar
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl lg:text-4xl font-light text-[#211612]">
                Rs 399
              </div>
              <p className="text-xs font-serif tracking-wider text-[#A87B28]">
                MRP (Taxes Included)
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl lg:text-4xl font-light text-[#211612]">
                100% Veg
              </div>
              <p className="text-xs font-serif tracking-wider text-[#A87B28]">
                Vegetarian Recipe
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl lg:text-4xl font-light text-[#211612]">
                FSSAI
              </div>
              <p className="text-xs font-serif tracking-wider text-[#A87B28]">
                Lic. {FSSAI_NUMBER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT DETAILS AND FACTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#A87B28]">
            Product Details
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#211612]">
            What Goes Into Mushroom Mela
          </h2>
          <p className="text-sm sm:text-base text-[#3D2C24] leading-relaxed font-light">
            Prepared by Akhil Foods in Village Nandsiya, Moth, Jhansi, Uttar Pradesh using oyster mushrooms, mustard oil, and spices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Kitchen Location */}
          <div className="clay-card p-6 bg-[#FDFBF7] space-y-4 border border-[#E8DEC8]">
            <div className="w-10 h-10 rounded-[6px] bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-[#A87B28]">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211612]">Village Nandsiya, Moth</h3>
            <p className="text-sm text-[#3D2C24] leading-relaxed font-sans font-light">
              Prepared and packed in Village Nandsiya, Karguwan Road, Near Ambedkar Murti, Moth, Jhansi, Uttar Pradesh 284303.
            </p>
          </div>

          {/* Card 2: Mustard Oil & Spices */}
          <div className="clay-card p-6 bg-[#FDFBF7] space-y-4 border border-[#E8DEC8]">
            <div className="w-10 h-10 rounded-[6px] bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-[#A87B28]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211612]">Mustard Oil & Spices</h3>
            <p className="text-sm text-[#3D2C24] leading-relaxed font-sans font-light">
              Prepared with mustard oil, vinegar, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, garlic, and salt.
            </p>
          </div>

          {/* Card 3: Oyster Mushrooms */}
          <div className="clay-card p-6 bg-[#FDFBF7] space-y-4 border border-[#E8DEC8]">
            <div className="w-10 h-10 rounded-[6px] bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-[#A87B28]">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211612]">Oyster Mushrooms</h3>
            <p className="text-sm text-[#3D2C24] leading-relaxed font-sans font-light">
              Oyster mushrooms harvested, cleaned, trimmed, and cured in spices and mustard oil for tender texture and savory flavor.
            </p>
          </div>

          {/* Card 4: Certified & Registered */}
          <div className="clay-card p-6 bg-[#FDFBF7] space-y-4 border border-[#E8DEC8]">
            <div className="w-10 h-10 rounded-[6px] bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-[#A87B28]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211612]">FSSAI & GST Registered</h3>
            <p className="text-sm text-[#3D2C24] leading-relaxed font-sans font-light">
              FSSAI Lic. No. 22726293000001, GSTIN 09FTOPD3011E1ZZ, and Udyam Reg. UDYAM-UP-39-0059446.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCT */}
      <section id="featured-product" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#A87B28] block mb-1">
            Featured Product
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#211612]">
            Mushroom Mela Oyster Mushroom Pickle
          </h2>
          <p className="text-sm sm:text-base text-[#3D2C24] mt-1 font-sans font-light">
            400 g jar prepared by AKHIL FOODS in Moth, Jhansi.
          </p>
        </div>

        {/* Centered Product Showcase Card */}
        <div className="flex justify-center">
          <div className="clay-card rounded-[6px] overflow-hidden flex flex-col justify-between bg-[#FDFBF7] border border-[#E8DEC8] max-w-md w-full shadow-md">
            <div>
              {/* Product Image */}
              <div className="relative aspect-square bg-[#FAF6EE] p-4 flex items-center justify-center border-b border-[#E8DEC8]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                <span className="absolute top-3.5 right-3.5 bg-[#EFE8DD] text-[#211612] text-xs font-serif font-bold px-2.5 py-1 rounded-[4px] border border-[#DDD3C4]">
                  400 g Jar
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-[4px] border border-emerald-200">
                  <span>In Stock</span>
                  <span className="text-[#3D2C24]/70 font-serif">Moth, Jhansi</span>
                </div>

                <Link href={`/product/${product.slug}`} className="block">
                  <h3 className="font-serif text-xl font-bold text-[#211612] hover:text-[#A87B28] transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-[#3D2C24] leading-relaxed font-light">
                  {product.subtitle}
                </p>

                <div className="pt-2">
                  <div className="flex items-center justify-between py-2 px-3.5 rounded-[4px] bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-serif text-[#211612]">
                    <span className="font-semibold text-[#A87B28] uppercase tracking-wider">
                      Net Quantity
                    </span>
                    <span className="font-bold text-[#211612]">
                      {sizeOption.size} (MRP ₹{sizeOption.price})
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="font-serif text-2xl font-bold text-[#211612]">
                    ₹{sizeOption.price}
                  </span>
                  <span className="text-xs text-[#3D2C24]/70">
                    (All taxes included)
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => addToCart(product, currentSize, 1)}
                className="btn-outline w-full !py-2.5 !px-3"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => buyNow(product, currentSize, 1)}
                className="btn-primary w-full !py-2.5 !px-3"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="btn-outline inline-flex items-center gap-2 text-xs font-serif tracking-wider uppercase font-bold"
          >
            <span>View Shop</span>
            <ArrowRight className="w-4 h-4 text-[#A87B28]" />
          </Link>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C130E] text-[#FAF6EE] rounded-[6px] p-8 sm:p-12 shadow-xl border border-[#C89B3C]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-[6px] overflow-hidden border border-[#C89B3C]/30 bg-[#FAF6EE] flex items-center justify-center p-4">
                <Image
                  src="/images/products/mushroom-mela-side.jpg"
                  alt="Mushroom Mela Jar by Akhil Foods Jhansi"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="font-serif text-xs tracking-wider uppercase text-[#D4AF37] block font-bold">
                About Akhil Foods
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF6EE] leading-tight">
                Mushroom Mela Oyster Mushroom Pickle from Jhansi
              </h2>

              <p className="text-sm sm:text-base text-[#EADBB6]/90 leading-relaxed font-sans font-light">
                {BRAND.name} is based in Village Nandsiya, Moth, Jhansi. We prepare oyster mushroom pickles using tender mushrooms, mustard oil, and spices.
              </p>

              <p className="text-sm sm:text-base text-[#EADBB6]/90 leading-relaxed font-sans font-light">
                Our pickle is packed in 400 g jars and registered under FSSAI Lic. No. {FSSAI_NUMBER}. We ship through courier partners across India.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/our-story"
                  className="btn-primary !bg-[#FAF6EE] !text-[#211612] !border-[#FAF6EE] hover:!bg-[#EFE8DD]"
                >
                  <span>Read our story</span>
                  <ArrowRight className="w-4 h-4 text-[#A87B28]" />
                </Link>
                <Link
                  href="/certificates"
                  className="btn-outline !text-[#FAF6EE] !border-[#FAF6EE]/40 hover:!bg-[#FAF6EE] hover:!text-[#211612]"
                >
                  <span>View certificates</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#A87B28] block">
            Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#211612]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#3D2C24] font-light">
            Answers regarding ingredients, location in Jhansi, certifications, and delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FDFBF7] rounded-[6px] border border-[#E8DEC8] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-[#211612] hover:bg-[#FAF6EE] transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-[#A87B28] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-sm text-[#3D2C24] leading-relaxed border-t border-[#E8DEC8] bg-[#FAF6EE]/50 font-sans font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1C130E] rounded-[6px] p-8 sm:p-12 text-center text-[#FAF6EE] shadow-xl space-y-4 border border-[#C89B3C]/35">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-serif font-bold tracking-wider uppercase text-[#D4AF37]">
              Moth, Jhansi, Uttar Pradesh
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF6EE]">
              Order Mushroom Mela Oyster Mushroom Pickle
            </h2>
            <p className="text-sm sm:text-base text-[#EADBB6]/90 leading-relaxed font-sans font-light">
              Prepared by {BRAND.name} in Village Nandsiya, Moth, Jhansi, UP. 400 g jar, Rs 399.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="btn-primary !bg-[#FAF6EE] !text-[#211612] !border-[#FAF6EE] hover:!bg-[#EFE8DD] !px-8 !py-3"
              >
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4 text-[#A87B28]" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !text-[#FAF6EE] !border-[#FAF6EE]/40 hover:!bg-[#FAF6EE] hover:!text-[#211612] !px-8 !py-3"
              >
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
