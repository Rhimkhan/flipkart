"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Truck,
  Award,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { INITIAL_PRODUCTS, REVIEWS, FAQS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { ProductSize } from "@/lib/types";
import HeroProductCard from "@/components/HeroProductCard";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE, FSSAI_NUMBER, GST_NUMBER, UDYAM_NUMBER } from "@/lib/config";

export default function HomePage() {
  const { addToCart, buyNow } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSize>>({
    "prod-mushroom-mela": "400g",
  });
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const handleSizeChange = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="bg-[#FFFBEF]">
      {/* HERO SECTION (Starting directly from hero with authentic artisanal background & product card) */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-8 pb-16 sm:py-20 overflow-hidden bg-[#2B1B17]"
      >
        {/* Full-screen rich photography background with Deep Clay overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10">
          <Image
            src="/images/hero-pickle.jpg"
            alt="Akhil Foods Artisanal Mushroom Pickle"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Deep Clay Dark Overlay (Deep Clay #4A231B at ~65% opacity) for rich warmth and crisp contrast */}
          <div className="absolute inset-0 bg-[#2B1B17]/75 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-transparent to-[#2B1B17]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Text Content (With Dark Glass Backdrop for 100% Crisp Readability) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left bg-[#2B1B17]/65 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-[#FFF1A6]/20 shadow-2xl"
            >
              {/* Badge Pill in Soft Butter & Deep Clay */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF1A6] text-[#4A231B] border border-[#6B352A]/25 shadow-sm text-caption font-bold">
                <Sparkles className="w-4 h-4 text-[#A8553F]" />
                <span>Handcrafted in Jhansi, Uttar Pradesh • FSSAI Registered</span>
              </div>

              {/* Tagline & Main Title */}
              <div className="space-y-3">
                <p className="text-sm tracking-wider font-extrabold text-[#FFF1A6]">
                  {BRAND.tagline} — Handcrafted Mushroom Pickle
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-[#FFF8E7] leading-[1.12] tracking-tight drop-shadow-md">
                  Artisanal Oyster Mushroom Pickles, Handcrafted in{" "}
                  <span className="text-[#FFF1A6] italic underline decoration-[#FFF1A6] decoration-4 underline-offset-8">
                    Jhansi
                  </span>
                  .
                </h1>
              </div>

              {/* Brand Description */}
              <p className="text-base sm:text-lg text-[#FFF8E7]/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light drop-shadow-sm">
                Experience the authentic, rich taste of tender oyster mushrooms steeped in pure mustard oil, vinegar, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, and garlic. Real 400g glass jars made by {BRAND.name} in Village Nandsiya, Moth, Jhansi (UP).
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-semibold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 group border border-[#FFF1A6]/30"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white border-2 border-white/20 font-semibold text-base shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 text-xs font-semibold text-[#FFF8E7]">
                <div className="flex items-center gap-1.5 bg-[#4A231B]/80 px-3.5 py-2 rounded-full border border-[#FFF1A6]/20 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FSSAI Lic. #{FSSAI_NUMBER}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#4A231B]/80 px-3.5 py-2 rounded-full border border-[#FFF1A6]/20 shadow-sm">
                  <Truck className="w-4 h-4 text-[#FFF1A6]" />
                  <span>Pan-India 2-5 Day Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#4A231B]/80 px-3.5 py-2 rounded-full border border-[#FFF1A6]/20 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-[#FFF1A6]" />
                  <span>400g Net Quantity</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Product Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center w-full"
            >
              <HeroProductCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* REST OF SECTIONS WITH ARTISANAL SPACING */}
      <div className="space-y-20 sm:space-y-28">

      {/* STATS STRIP */}
      <section className="bg-[#E5D3C0]/70 border-y border-[#D1B89F] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                400g
              </div>
              <p className="text-sm font-semibold text-[#6B352A]">
                Net Weight Glass Jar
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                100%
              </div>
              <p className="text-sm font-semibold text-[#6B352A]">
                Pure Mustard Oil & Spices
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                0%
              </div>
              <p className="text-sm font-semibold text-[#6B352A]">
                Chemical Shortcuts
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                FSSAI
              </div>
              <p className="text-sm font-semibold text-[#6B352A]">
                Registered {FSSAI_NUMBER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (4 ICONS & ROUNDED CARDS) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
            Authentic Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B]">
            Why Akhil Foods Tastes Unbelievably Authentic
          </h2>
          <p className="text-sm sm:text-base text-[#2B1B17]/75 leading-relaxed">
            Crafted with real care in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. We use tender oyster mushrooms, pungent mustard oil, and time-honoured whole spices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: 100% Homemade */}
          <div className="clay-card p-8 bg-white rounded-2xl space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🏡
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">100% Homemade</h3>
            <p className="text-sm text-[#2B1B17]/85 leading-relaxed font-sans">
              Handcrafted in artisanal batches in Jhansi, Uttar Pradesh with authentic family care and clean, hygienic preparation.
            </p>
          </div>

          {/* Card 2: Pure Ingredients */}
          <div className="clay-card p-8 bg-white rounded-2xl space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🌿
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">Pure Mustard Oil & Spices</h3>
            <p className="text-sm text-[#2B1B17]/85 leading-relaxed font-sans">
              Real mustard oil, vinegar, red chilli, coriander, mustard seeds, fennel, fenugreek, cumin, turmeric, ajwain, fresh ginger, and garlic.
            </p>
          </div>

          {/* Card 3: Quality Oyster Mushrooms */}
          <div className="clay-card p-8 bg-white rounded-2xl space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🍄
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">Tender Oyster Mushrooms</h3>
            <p className="text-sm text-[#2B1B17]/85 leading-relaxed font-sans">
              Carefully chosen fresh oyster mushrooms, sliced and steeped to retain texture, tenderness, and rich savoury flavour.
            </p>
          </div>

          {/* Card 4: Certified & Safe */}
          <div className="clay-card p-8 bg-white rounded-2xl space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🛡️
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">FSSAI & MSME Certified</h3>
            <p className="text-sm text-[#2B1B17]/85 leading-relaxed font-sans">
              Registered with FSSAI (Lic. 22726293000001), GST, and Udyam. Safe 400g glass jar packaging with secure pan-India delivery.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. FEATURED PRODUCT ROW */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
              Signature Product
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B] mt-3">
              Mushroom Mela Oyster Pickle
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/75 mt-1 font-sans">
              Our signature 400g glass jar of authentic Oyster Mushroom Pickle handcrafted by AKHIL FOODS.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B352A] hover:text-[#4A231B] underline underline-offset-4"
          >
            <span>Visit Full Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_PRODUCTS.map((product) => {
            const currentSize = selectedSizes[product.id] || "400g";
            const sizeOption =
              product.sizes.find((s) => s.size === currentSize) || product.sizes[0];

            return (
              <div
                key={product.id}
                className="clay-card rounded-2xl overflow-hidden flex flex-col justify-between group bg-white border border-[#6B352A]/15 hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-1 max-w-md mx-auto w-full"
              >
                <div>
                  {/* Product Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-[#FFFBEF] p-4 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badges[0] && (
                      <span className="absolute top-3.5 left-3.5 bg-[#4A231B] text-[#FFF1A6] text-caption font-bold px-3 py-1 rounded-full shadow-md border border-[#FFF1A6]/20">
                        {product.badges[0]}
                      </span>
                    )}
                    <span className="absolute top-3.5 right-3.5 bg-[#FFF1A6] text-[#4A231B] text-caption font-bold px-2.5 py-1 rounded-full shadow-md border border-[#6B352A]/20">
                      400g Jar
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center justify-between text-caption font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <span>✓ In Stock</span>
                      <span className="text-stone-500">Jhansi, UP</span>
                    </div>

                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="font-serif text-xl font-bold text-[#2B1B17] group-hover:text-[#6B352A] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#2B1B17]/80 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    {/* Size Selector */}
                    <div className="pt-2">
                      <label className="text-xs font-semibold text-[#4A231B] block mb-1.5">
                        Pack Size:
                      </label>
                      <div className="grid grid-cols-1 gap-1 bg-[#FFFBEF] p-1.5 rounded-xl border border-[#6B352A]/15">
                        {product.sizes.map((s) => (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => handleSizeChange(product.id, s.size)}
                            className="py-1.5 text-xs font-semibold rounded-xl bg-[#6B352A] text-[#FFF1A6] shadow-sm text-center"
                          >
                            Net Quantity: {s.size} (MRP ₹{s.price})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-serif text-2xl font-extrabold text-[#4A231B]">
                        ₹{sizeOption.price}
                      </span>
                      <span className="text-caption text-stone-500 font-medium">
                        (All Taxes Included)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, currentSize, 1)}
                    className="py-3 px-3 rounded-xl border-2 border-[#6B352A] text-[#6B352A] hover:bg-[#6B352A] hover:text-[#FFF1A6] text-sm font-bold transition-all text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => buyNow(product, currentSize, 1)}
                    className="py-3 px-3 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] text-sm font-bold transition-all text-center shadow-md hover:shadow-lg"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 4. OUR STORY TEASER SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-[#4A231B] text-[#FFF8E7] rounded-2xl p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden border border-[#FFF1A6]/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B352A]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Story Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#FFF1A6]/30 shadow-2xl bg-[#2B1B17] flex items-center justify-center p-4">
                <Image
                  src="/images/products/mushroom-mela-side.jpg"
                  alt="Mushroom Mela Jar by Akhil Foods Jhansi"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#2B1B17]/85 backdrop-blur-md p-3.5 rounded-xl border border-[#FFF1A6]/20 text-caption text-[#FFF1A6]">
                  🌾 Packed in Village Nandsiya, Moth, Jhansi, UP
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B352A] text-[#FFF1A6] text-caption font-semibold border border-[#FFF1A6]/20">
                <Award className="w-4 h-4 text-[#FFF1A6]" />
                <span>Our Story • AKHIL FOODS</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1A6] leading-tight">
                Authentic Oyster Mushroom Pickles from Jhansi, Uttar Pradesh.
              </h2>

              <p className="text-sm sm:text-base text-[#FFF8E7]/90 leading-relaxed font-sans">
                {BRAND.name} was founded in Village Nandsiya, Moth, Jhansi with a clear vision: {BRAND.tagline}. We set out to prepare pure, delicious, and honest pickles made with tender oyster mushrooms, pure mustard oil, and time-honoured whole spices.
              </p>

              <p className="text-sm sm:text-base text-[#FFF8E7]/90 leading-relaxed font-sans">
                Our signature &ldquo;Mushroom Mela&rdquo; pickle is crafted in clean micro-batches, packed into 400g sealed glass jars, and certified by FSSAI (Lic. No. {FSSAI_NUMBER}). No fake claims, just honest quality delivered straight from our kitchen to your home.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/our-story"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-sm shadow-xl transition-all hover:scale-105"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/certificates"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6B352A] hover:bg-[#873E2C] text-[#FFF8E7] font-semibold text-sm border border-[#FFF1A6]/25 transition-all"
                >
                  <span>View Licenses & Certificates</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. REVIEWS SECTION (BE THE FIRST TO REVIEW) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="bg-[#E5D3C0]/40 py-16 sm:py-24 border-y border-[#D1B89F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#6B352A]/15">
              Customer Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B]">
              Real Customer Feedback
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/75">
              We value complete honesty. We never publish fake testimonials or invented reviews.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#6B352A]/15 shadow-xl text-center space-y-5">
              <div className="w-16 h-16 rounded-xl bg-[#FFFBEF] border border-[#6B352A]/20 flex items-center justify-center text-3xl mx-auto">
                ⭐
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#4A231B]">
                Be the first to review Mushroom Mela!
              </h3>
              <p className="text-sm text-[#2B1B17]/75 max-w-md mx-auto leading-relaxed">
                Have you tasted our 400g Mushroom Mela Oyster Mushroom Pickle? We would love to hear your genuine feedback! Send us your review on WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Akhil Foods, I would like to share my honest review of the Mushroom Mela Pickle:")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Share Your Review on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. FAQ ACCORDION SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#2B1B17]/75">
            Transparent answers regarding our ingredients, location in Jhansi, certifications, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#6B352A]/15 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-base sm:text-lg text-[#4A231B] hover:bg-[#FFFBEF]/60 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-[#A8553F] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 pt-0 text-sm text-[#2B1B17]/85 leading-relaxed border-t border-stone-100 bg-[#FFFBEF]/50 font-sans"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 7. FINAL TRUST BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="bg-[#6B352A] rounded-2xl p-8 sm:p-14 lg:p-16 text-center text-[#FFF8E7] shadow-2xl relative overflow-hidden space-y-6 border border-[#FFF1A6]/20">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4A231B] bg-[#FFF1A6] px-4 py-1.5 rounded-full shadow-sm">
              Authentic Jhansi Quality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF1A6] leading-tight">
              Taste The Pure Goodness of Mushroom Mela
            </h2>
            <p className="text-sm sm:text-base text-[#FFF8E7]/90 leading-relaxed font-sans">
              Handcrafted by {BRAND.name} in Village Nandsiya, Moth, Jhansi, UP. 400g of flavourful oyster mushrooms steeped in mustard oil and traditional spices.
            </p>
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-base shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Mushroom Mela Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
    </div>
  );
}
