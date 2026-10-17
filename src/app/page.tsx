"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Truck,
  ShieldCheck,
  HeartHandshake,
  Award,
  Layers,
  Leaf,
  Flame,
} from "lucide-react";
import { INITIAL_PRODUCTS, REVIEWS, FAQS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { ProductSize } from "@/lib/types";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";

export default function HomePage() {
  const { addToCart, buyNow } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSize>>({
    "prod-1": "250g",
    "prod-2": "250g",
    "prod-3": "250g",
    "prod-4": "250g",
  });
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handleSizeChange = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Auto rotate reviews every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 sm:space-y-32 bg-[#FFFBEF] overflow-hidden">
      {/* 1. FULL-SCREEN HERO SECTION WITH BACKGROUND VIDEO */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-8 pb-16 sm:py-20 overflow-hidden">
        {/* Full-screen background video with Deep Clay 55% overlay */}
        <HeroVideoBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              {/* Badge Pill in Clay Palette */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B1B17]/85 backdrop-blur-md text-[#FFF1A6] border border-[#FFF1A6]/30 shadow-lg text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-[#FFF1A6]" />
                <span>Mitti Handi Fermentation • Zero Chemical Preservatives</span>
              </div>

              {/* Tagline & Main Title */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm uppercase tracking-widest font-extrabold text-[#FFF1A6] drop-shadow">
                  Handcrafted Mushroom Pickle, Made the Traditional Way
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-[#FFF8E7] leading-[1.12] tracking-tight drop-shadow-md">
                  Pure Himalayan Mushroom Pickles, Handcrafted in{" "}
                  <span className="italic underline decoration-[#FFF1A6] decoration-4 underline-offset-8 text-[#FFF1A6]">
                    Clay Pots
                  </span>
                  .
                </h1>
              </div>

              {/* Brand Description */}
              <p className="text-base sm:text-lg text-[#FFF8E7]/95 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans drop-shadow-sm font-light">
                Experience the authentic, pungent tang of wild mountain mushrooms steeped in cold-pressed Kacchi Ghani mustard oil, fragrant Himalayan whole spices, and cured under the golden sun. 100% natural, 0% chemicals.
              </p>

              {/* CTA Buttons ("Shop Now" & "Order on WhatsApp") */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-semibold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 group border border-[#FFF1A6]/30"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white border-2 border-white/20 font-semibold text-base shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Social Proof & Quick Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-[#FFF8E7]/90 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[#FFF1A6]">4.9 / 5</span>
                  <span>(450+ Real Customer Reviews)</span>
                </div>
                <span className="hidden sm:inline text-white/40">•</span>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FFF1A6]" />
                  <span>Pan-India 2-4 Day Express Delivery</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Pickle Jar Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#6B352A]/20 bg-[#4A231B] group">
                <Image
                  src="/images/hero-pickle.jpg"
                  alt="Akhil Foods Artisanal Mushroom Pickle Jar in Clay Pot Setting"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating Seal Badge (Clay Brown & Butter) */}
                <div className="absolute top-5 right-5 bg-[#4A231B]/95 backdrop-blur-md text-[#FFF1A6] px-4 py-2 rounded-2xl border border-[#FFF1A6]/30 shadow-lg text-xs font-semibold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Fresh Harvest Batch #08</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#FFFBEF]/95 backdrop-blur-md p-4 rounded-2xl border border-[#6B352A]/20 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#4A231B]">
                        Clay-Fermented In Solan
                      </p>
                      <p className="text-[11px] text-stone-600 font-medium">
                        Pure Kacchi Ghani Mustard Oil & Himalayan Spices
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#4A231B] bg-[#FFF1A6] px-3 py-1.5 rounded-xl border border-[#6B352A]/20">
                      100% Desi
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS STRIP (Mocha Cream & Clay Accents) */}
      <section className="bg-[#E5D3C0]/70 border-y border-[#D1B89F] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                12,500+
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6B352A]">
                Jars Handcrafted
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                100%
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6B352A]">
                Clay-Pot Sun Cured
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                0%
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6B352A]">
                Chemical Preservatives
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B]">
                19,000+
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6B352A]">
                Pincodes Served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (4 ICONS & ROUNDED CARDS WITH GENEROUS SPACING) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
            Artisanal Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B]">
            Why Akhil Foods Tastes Unbelievably Authentic
          </h2>
          <p className="text-sm sm:text-base text-[#2B1B17]/75 leading-relaxed">
            Modern commercial pickles are loaded with sodium benzoate and cheap refined palm oil. We chose the ancient Himalayan path of patience, porous clay, and wholesome ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: 100% Homemade */}
          <div className="clay-card p-8 bg-white rounded-[24px] space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-[20px] bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🏡
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">100% Homemade</h3>
            <p className="text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-sans">
              Handcrafted in home-style micro-batches using small stone cauldrons and earthenware pots, preserving the comforting warmth of maternal kitchen love.
            </p>
          </div>

          {/* Card 2: No Preservatives */}
          <div className="clay-card p-8 bg-white rounded-[24px] space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-[20px] bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🌿
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">No Preservatives</h3>
            <p className="text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-sans">
              Zero chemical preservatives, zero synthetic vinegar (acetic acid), and zero artificial food coloring. Naturally preserved with rock salt and mustard oil.
            </p>
          </div>

          {/* Card 3: Farm-Fresh Mushrooms */}
          <div className="clay-card p-8 bg-white rounded-[24px] space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-[20px] bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🍄
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">Farm-Fresh Mushrooms</h3>
            <p className="text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-sans">
              Plucked fresh at dawn from organic agro beds in Solan (Mushroom City of India), sun-steeped on bamboo mats for a rich, tender, and meaty bite.
            </p>
          </div>

          {/* Card 4: Traditional Recipe */}
          <div className="clay-card p-8 bg-white rounded-[24px] space-y-5 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl border border-[#6B352A]/15">
            <div className="w-16 h-16 rounded-[20px] bg-[#FFF1A6] flex items-center justify-center text-3xl shadow-inner border border-[#6B352A]/20">
              🏺
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4A231B]">Traditional Recipe</h3>
            <p className="text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-sans">
              Generational Himalayan heirloom spice blend aged slowly inside porous clay Mitti Handis with cold-pressed Kacchi Ghani mustard oil for deep umami tang.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. FEATURED PRODUCTS ROW (WITH SIZE SWITCHER & ROUNDED CARDS) */}
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
              Signature Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B] mt-3">
              Featured Mushroom Pickles
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/75 mt-1 font-sans">
              Select your jar size (250g, 500g, or 1kg) and taste generational mountain craftsmanship.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B352A] hover:text-[#4A231B] underline underline-offset-4"
          >
            <span>View All Pickles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INITIAL_PRODUCTS.map((product) => {
            const currentSize = selectedSizes[product.id] || "250g";
            const sizeOption =
              product.sizes.find((s) => s.size === currentSize) || product.sizes[0];

            return (
              <div
                key={product.id}
                className="clay-card rounded-3xl overflow-hidden flex flex-col justify-between group bg-white border border-[#6B352A]/15 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Product Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-[#FFFBEF]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badges[0] && (
                      <span className="absolute top-3.5 left-3.5 bg-[#4A231B] text-[#FFF1A6] text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-[#FFF1A6]/20">
                        {product.badges[0]}
                      </span>
                    )}
                    <span className="absolute top-3.5 right-3.5 bg-[#FFF1A6] text-[#4A231B] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md border border-[#6B352A]/20">
                      {product.spiceLevel}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                    </div>

                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="font-serif text-lg font-bold text-[#2B1B17] group-hover:text-[#6B352A] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#2B1B17]/70 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    {/* Interactive Size Selector Switcher */}
                    <div className="pt-2">
                      <label className="text-[11px] font-semibold text-stone-500 block mb-1.5 uppercase tracking-wider">
                        Choose Size:
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-[#FFFBEF] p-1.5 rounded-2xl border border-[#6B352A]/15">
                        {product.sizes.map((s) => (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => handleSizeChange(product.id, s.size)}
                            className={`py-1.5 text-xs font-semibold rounded-xl transition-all ${
                              currentSize === s.size
                                ? "bg-[#6B352A] text-[#FFF1A6] shadow-sm"
                                : "text-stone-600 hover:text-[#6B352A]"
                            }`}
                          >
                            {s.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price with savings indicator */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-serif text-2xl font-extrabold text-[#4A231B]">
                        ₹{sizeOption.price}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{sizeOption.originalPrice}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Save ₹{sizeOption.originalPrice - sizeOption.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, currentSize, 1)}
                    className="py-3 px-3 rounded-2xl border-2 border-[#6B352A] text-[#6B352A] hover:bg-[#6B352A] hover:text-[#FFF1A6] text-xs font-bold transition-all text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => buyNow(product, currentSize, 1)}
                    className="py-3 px-3 rounded-2xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] text-xs font-bold transition-all text-center shadow-md hover:shadow-lg"
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
        <div className="bg-[#4A231B] text-[#FFF8E7] rounded-[36px] p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden border border-[#FFF1A6]/20">
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B352A]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Story Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-[30px] overflow-hidden border-2 border-[#FFF1A6]/30 shadow-2xl bg-[#2B1B17]">
                <Image
                  src="/images/classic-masala.jpg"
                  alt="Traditional Mitti Handi Pickle Fermentation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#2B1B17]/85 backdrop-blur-md p-3.5 rounded-xl border border-[#FFF1A6]/20 text-xs text-[#FFF1A6]">
                  🌾 Hand-packed in Solan, Himachal Pradesh
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-semibold border border-[#FFF1A6]/20">
                <Award className="w-4 h-4 text-[#FFF1A6]" />
                <span>Our Generational Story</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1A6] leading-tight">
                Born in India&apos;s Mushroom Capital, Crafted in Earth&apos;s Lap.
              </h2>

              <p className="text-sm sm:text-base text-[#FFF8E7]/85 leading-relaxed font-sans">
                Solan, cradled in the Himalayan foothills, has long been renowned as the <em>&ldquo;Mushroom City of India&rdquo;</em>. Our family grew up cultivating velvety Oyster and medicinal Shiitake mushrooms in crisp mountain air and mineral-rich springs.
              </p>

              <p className="text-sm sm:text-base text-[#FFF8E7]/80 leading-relaxed font-sans">
                In an era where industrial factories rush pickling with synthetic acetic acid in stainless steel tanks, we preserve our grandmother&apos;s heirloom practice: gentle fermentation inside porous clay pots under 40 days of golden Himalayan sun.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/our-story"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-sm shadow-xl transition-all hover:scale-105"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#6B352A] hover:bg-[#873E2C] text-[#FFF8E7] font-semibold text-sm border border-[#FFF1A6]/25 transition-all"
                >
                  <span>Explore Harvest Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. TESTIMONIAL SLIDER (CAROUSEL WITH CONTROLS & SMOOTH ANIMATIONS) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="bg-[#E5D3C0]/40 py-20 sm:py-28 border-y border-[#D1B89F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#6B352A]/15">
              Real Customer Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A231B]">
              Loved by Gourmet Food Lovers
            </h2>
            <p className="text-sm sm:text-base text-[#2B1B17]/75">
              Read how our artisanal mushroom pickles are transforming meals in homes across India.
            </p>
          </div>

          {/* Interactive Testimonial Slider Card */}
          <div className="max-w-4xl mx-auto relative">
            <div className="min-h-[260px] sm:min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45 }}
                  className="w-full bg-white p-8 sm:p-12 rounded-[32px] border border-[#6B352A]/15 shadow-xl relative"
                >
                  <div className="space-y-6">
                    {/* Stars & Quote */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500">
                        {[...Array(REVIEWS[currentReviewIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Purchase
                      </span>
                    </div>

                    <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#2B1B17] italic leading-relaxed">
                      &ldquo;{REVIEWS[currentReviewIndex].comment}&rdquo;
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-[#4A231B]">
                          {REVIEWS[currentReviewIndex].author}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {REVIEWS[currentReviewIndex].location}
                        </p>
                      </div>
                      <div className="text-xs text-stone-400 font-mono">
                        Review {currentReviewIndex + 1} of {REVIEWS.length}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prevReview}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#FFF1A6] text-[#4A231B] border border-[#6B352A]/20 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentReviewIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentReviewIndex === idx
                        ? "w-8 bg-[#6B352A]"
                        : "w-2.5 bg-[#6B352A]/30 hover:bg-[#6B352A]/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextReview}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#FFF1A6] text-[#4A231B] border border-[#6B352A]/20 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
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
            Transparent answers regarding our ingredients, shelf-life, and delivery timelines.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-[#6B352A]/15 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                    className="p-6 pt-0 text-xs sm:text-sm text-[#2B1B17]/85 leading-relaxed border-t border-stone-100 bg-[#FFFBEF]/50 font-sans"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 7. FINAL TRUST BANNER (CLAY THEME WITH SATISFACTION GUARANTEE) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="bg-[#6B352A] rounded-[36px] p-8 sm:p-14 lg:p-16 text-center text-[#FFF8E7] shadow-2xl relative overflow-hidden space-y-6 border border-[#FFF1A6]/20">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4A231B] bg-[#FFF1A6] px-4 py-1.5 rounded-full shadow-sm">
              100% Taste & Freshness Guarantee
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF1A6] leading-tight">
              Taste The Pure Goodness of Real Clay-Pot Pickling
            </h2>
            <p className="text-sm sm:text-base text-[#FFF8E7]/85 leading-relaxed font-sans">
              If our mushroom pickle isn&apos;t the freshest, most authentic, and deeply flavourful you&apos;ve experienced, our team will personally replace it or refund your payment in full.
            </p>
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-base shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Your First Jar Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
