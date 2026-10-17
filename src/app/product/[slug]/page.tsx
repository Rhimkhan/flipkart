"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Share2,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  MessageCircle,
  Sparkles,
  Loader2,
  Award,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { INITIAL_PRODUCTS, REVIEWS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Product, ProductSize } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import PincodeChecker from "@/components/PincodeChecker";

function ProductDetailContent() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const { addToCart, buyNow } = useCart();

  const [product, setProduct] = useState<Product | null>(() => {
    return INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
  });

  const [selectedSize, setSelectedSize] = useState<ProductSize>("250g");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("/images/hero-pickle.jpg");
  const [copied, setCopied] = useState<boolean>(false);

  // Sync with API in case product has been edited or fetched from Supabase
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          const match = data.products.find((p: Product) => p.slug === slug);
          if (match) {
            setProduct(match);
            if (match.image) setSelectedImage(match.image);
          }
        }
      })
      .catch((err) => console.log("Using static fallback:", err));
  }, [slug]);

  useEffect(() => {
    if (product?.image && selectedImage === "/images/hero-pickle.jpg") {
      setSelectedImage(product.image);
    }
  }, [product, selectedImage]);

  if (!product) {
    // If not found in initial static seed, check if loaded or show notFound
    return notFound();
  }

  const currentSizeOption =
    product.sizes?.find((s) => s.size === selectedSize) ||
    product.sizes?.[0] || {
      size: "250g",
      price: 299,
      originalPrice: 350,
      inStock: true,
    };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image, "/images/hero-pickle.jpg"];

  const whatsappOrderUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
    `Hello Akhil Foods! I would like to order:\n- Pickle: ${product.name}\n- Flavour: ${product.flavour}\n- Jar Size: ${selectedSize}\n- Quantity: ${quantity}\n- Total Price: ₹${currentSizeOption.price * quantity}\nPlease confirm delivery availability to my pincode.`
  )}`;

  return (
    <div className="py-8 sm:py-16 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B352A] hover:text-[#4A231B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Artisanal Pickles</span>
        </Link>

        {/* Product Hero Grid (Image Gallery on Left, Purchase Form on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 1. Image Gallery with Main View & Clickable Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-[36px] overflow-hidden bg-white border-2 border-[#6B352A]/20 shadow-2xl group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-[#4A231B] text-[#FFF1A6] text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-[#FFF1A6]/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="absolute top-4 right-4 bg-[#FFF1A6] text-[#4A231B] text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-[#6B352A]/20">
                {product.flavour}
              </div>
            </div>

            {/* Clickable Image Thumbnails */}
            <div className="flex gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#6B352A] ring-4 ring-[#FFF1A6] scale-105"
                      : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select gallery photo ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Product Details & Purchase Controller */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#6B352A]/15 shadow-sm">
                  {product.flavour}
                </span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-[#E5D3C0] text-[#6B352A] transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  <span>{copied ? "Link Copied!" : "Share Pickle"}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A231B] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-[#4A231B]">{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} customer ratings)</span>
                <span>•</span>
                <span className="text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  In Stock ({product.stockCount} jars aged)
                </span>
              </div>
            </div>

            {/* Price Box with Live Recalculation */}
            <div className="p-5 rounded-3xl bg-white border border-[#6B352A]/15 shadow-md flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A231B]">
                  ₹{currentSizeOption.price * quantity}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  ₹{currentSizeOption.originalPrice * quantity}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl">
                  Save ₹{(currentSizeOption.originalPrice - currentSizeOption.price) * quantity}
                </span>
              </div>
              <span className="text-[11px] text-stone-500">Inclusive of all taxes</span>
            </div>

            {/* Size Selector Switcher (Updates Price) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#2B1B17] uppercase tracking-wider">
                  Select Weight / Jar Size:
                </span>
                <span className="text-[#6B352A] font-semibold">Active: {selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3.5 px-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      selectedSize === s.size
                        ? "border-[#6B352A] bg-[#6B352A] text-[#FFF1A6] shadow-md scale-[1.02]"
                        : "border-[#6B352A]/20 bg-white text-[#2B1B17] hover:border-[#6B352A]"
                    }`}
                  >
                    <span className="font-bold text-sm sm:text-base">{s.size}</span>
                    <span className="text-xs opacity-90">₹{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-[#2B1B17] uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center border-2 border-[#6B352A]/30 rounded-full bg-white px-3 py-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#6B352A] text-stone-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-base text-[#2B1B17]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#6B352A] text-stone-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product, selectedSize, quantity, true)}
                className="py-4 px-6 rounded-full border-2 border-[#6B352A] text-[#6B352A] hover:bg-[#6B352A] hover:text-[#FFF1A6] font-bold text-sm transition-all text-center shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{currentSizeOption.price * quantity}</span>
              </button>

              <button
                type="button"
                onClick={() => buyNow(product, selectedSize, quantity)}
                className="py-4 px-6 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <Zap className="w-4 h-4 text-[#FFF1A6]" />
                <span>Buy Now (Express Checkout)</span>
              </button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <div>
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] border border-[#6B352A]/30 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order This Jar Directly on WhatsApp</span>
              </a>
            </div>

            {/* Pincode Availability Checker */}
            <div className="pt-2">
              <PincodeChecker />
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#6B352A]" />
                <span>2-4 Days Fast Air Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#6B352A]" />
                <span>FSSAI Certified Artisanal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Product Tabs: Traditional Recipe, Ingredients, Shelf Life */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#6B352A]/15 shadow-md space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#4A231B]">Traditional Recipe</h3>
              <p className="text-xs sm:text-sm text-[#2B1B17]/80 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#4A231B]">100% Pure Ingredients</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#2B1B17]/80 font-sans">
                {product.ingredients?.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A8553F] font-bold">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#4A231B]">Shelf Life & Care</h3>
              <p className="text-xs sm:text-sm text-[#2B1B17]/80 leading-relaxed font-sans">
                <strong>{product.shelfLife}</strong>
              </p>
              <div className="bg-[#FFFBEF] p-4 rounded-2xl border border-[#6B352A]/20 text-xs text-[#2B1B17] space-y-1.5 font-sans">
                <p>🏺 <strong>Pro Tip:</strong> Always use a clean dry wooden or stainless spoon.</p>
                <p>🌿 Keep mushrooms fully submerged under the golden mustard oil layer for lasting natural freshness.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews for this item */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#4A231B]">
            Verified Customer Impressions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 2).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#6B352A]/15 shadow-sm space-y-3"
              >
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#2B1B17]/85 italic leading-relaxed font-serif">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-[#4A231B]">
                    {rev.author} ({rev.location})
                  </span>
                  <span className="text-stone-400 text-[11px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center bg-[#FFFBEF]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#6B352A]" />
          <p className="text-xs text-stone-500 mt-2">Loading artisanal pickle jar...</p>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
