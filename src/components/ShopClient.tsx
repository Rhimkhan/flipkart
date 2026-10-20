"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Filter,
  ArrowUpDown,
  Search,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Product, ProductSize } from "@/lib/types";
import PincodeChecker from "@/components/PincodeChecker";

export default function ShopClient() {
  const { addToCart, buyNow } = useCart();
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedFlavour, setSelectedFlavour] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSize>>({
    "prod-1": "250g",
    "prod-2": "250g",
    "prod-3": "250g",
    "prod-4": "250g",
  });

  // Fetch updated products from API endpoint
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.log("Using cached products:", err));
  }, []);

  const flavours = ["All", "Classic Masala", "Garlic", "Mustard Oil", "Spicy Red Chilli"];

  const handleSizeChange = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const filteredProducts = useMemo(() => {
    return productsList
      .filter((product) => {
        const matchesFlavour =
          selectedFlavour === "All" ||
          product.flavour.toLowerCase().includes(selectedFlavour.toLowerCase());
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.ingredients?.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFlavour && matchesSearch;
      })
      .sort((a, b) => {
        const sizeA = selectedSizes[a.id] || "250g";
        const sizeB = selectedSizes[b.id] || "250g";
        const priceA = (a.sizes?.find((s) => s.size === sizeA) || a.sizes?.[0])?.price || 0;
        const priceB = (b.sizes?.find((s) => s.size === sizeB) || b.sizes?.[0])?.price || 0;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
        return 0; // recommended
      });
  }, [productsList, selectedFlavour, searchQuery, sortBy, selectedSizes]);

  return (
    <div className="py-10 sm:py-16 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
            Handcrafted in Jhansi, Uttar Pradesh
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4A231B]">
            Authentic Mushroom Pickles
          </h1>
          <p className="text-sm sm:text-base text-[#2B1B17]/75 font-sans leading-relaxed">
            Prepared with tender oyster mushrooms, pure mustard oil, natural vinegar, and traditional stone-ground Indian spices.
          </p>
        </div>

        {/* Filter, Search & Sort Control Panel */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#6B352A]/15 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search flavour, ingredient, mushroom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFBEF]/60 border border-[#6B352A]/20 text-sm text-[#2B1B17] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-[#6B352A]" />
              <span className="text-sm font-semibold text-[#4A231B]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-[#FFFBEF]/60 border border-[#6B352A]/20 text-sm font-medium text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Flavour Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            <span className="text-sm font-bold text-[#4A231B] flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#6B352A]" /> Flavour Filter:
            </span>
            {flavours.map((flavour) => (
              <button
                key={flavour}
                type="button"
                onClick={() => setSelectedFlavour(flavour)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedFlavour === flavour
                    ? "bg-[#6B352A] text-[#FFF1A6] shadow-sm ring-2 ring-[#6B352A]/20"
                    : "bg-[#FFFBEF] text-stone-600 hover:bg-[#E5D3C0] hover:text-[#4A231B]"
                }`}
              >
                {flavour}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with semantic h2 heading */}
        <div>
          <h2 className="sr-only">Our Handcrafted Mushroom Pickles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || "250g";
            const sizeOption =
              product.sizes?.find((s) => s.size === currentSize) || product.sizes?.[0] || {
                size: "250g",
                price: 299,
                originalPrice: 350,
                inStock: true,
              };

            return (
              <div
                key={product.id}
                className="clay-card rounded-2xl overflow-hidden flex flex-col justify-between group bg-white border border-[#6B352A]/15 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Product Image Frame with lazy load and rich alt */}
                  <div className="relative aspect-square overflow-hidden bg-[#FFFBEF]">
                    <Image
                      src={product.image || "/images/hero-pickle.jpg"}
                      alt={`${product.name} - Handcrafted clay aged mushroom pickle from Akhil Foods`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badges?.[0] && (
                      <span className="absolute top-3.5 left-3.5 bg-[#4A231B] text-[#FFF1A6] text-caption font-bold px-3 py-1 rounded-full shadow-md border border-[#FFF1A6]/20">
                        {product.badges[0]}
                      </span>
                    )}
                    <span className="absolute top-3.5 right-3.5 bg-[#FFF1A6] text-[#4A231B] text-caption font-bold px-2.5 py-1 rounded-full shadow-md border border-[#6B352A]/20">
                      {product.flavour}
                    </span>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {product.reviewsCount > 0 ? (
                      <div className="flex items-center gap-1.5 text-caption text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-caption text-stone-500 font-medium">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span className="italic">Be the first to review</span>
                      </div>
                    )}

                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="font-serif text-lg font-bold text-[#2B1B17] group-hover:text-[#6B352A] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#2B1B17]/80 line-clamp-2 leading-relaxed font-sans">
                      {product.subtitle || product.description}
                    </p>

                    {/* Size Selector Switcher */}
                    <div className="pt-2">
                      <label className="text-xs font-semibold text-[#4A231B] block mb-1.5">
                        Net Quantity / Size:
                      </label>
                      <div className="flex flex-wrap gap-1.5 bg-[#FFFBEF] p-1.5 rounded-xl border border-[#6B352A]/15">
                        {product.sizes?.map((s) => (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => handleSizeChange(product.id, s.size)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                              currentSize === s.size
                                ? "bg-[#6B352A] text-[#FFF1A6] shadow-sm"
                                : "text-stone-600 hover:text-[#6B352A]"
                            }`}
                          >
                            {s.size} (MRP ₹{s.price})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-serif text-2xl font-extrabold text-[#4A231B]">
                        ₹{sizeOption.price}
                      </span>
                      {sizeOption.originalPrice > sizeOption.price && (
                        <>
                          <span className="text-caption text-stone-400 line-through">
                            ₹{sizeOption.originalPrice}
                          </span>
                          <span className="text-caption font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Save ₹{sizeOption.originalPrice - sizeOption.price}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons: Add to Cart and Buy Now */}
                <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, currentSize, 1)}
                    className="py-3 px-3 rounded-xl border-2 border-[#6B352A] text-[#6B352A] hover:bg-[#6B352A] hover:text-[#FFF1A6] text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => buyNow(product, currentSize, 1)}
                    className="py-3 px-3 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] text-sm font-bold transition-all text-center shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* Delivery Checker Module */}
        <div className="max-w-xl mx-auto pt-8">
          <PincodeChecker />
        </div>
      </div>
    </div>
  );
}
