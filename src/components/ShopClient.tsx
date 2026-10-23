"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
    "prod-mushroom-mela": "400g",
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

  const flavours = ["All", "Oyster Mushroom"];

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
        const sizeA = selectedSizes[a.id] || "400g";
        const sizeB = selectedSizes[b.id] || "400g";
        const priceA = (a.sizes?.find((s) => s.size === sizeA) || a.sizes?.[0])?.price || 0;
        const priceB = (b.sizes?.find((s) => s.size === sizeB) || b.sizes?.[0])?.price || 0;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        return 0; // recommended
      });
  }, [productsList, selectedFlavour, searchQuery, sortBy, selectedSizes]);

  return (
    <div className="py-10 sm:py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#A87B28] block">
            Village Nandsiya, Moth, Jhansi
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#211612]">
            Shop Mushroom Pickles
          </h1>
          <p className="text-sm sm:text-base text-[#3D2C24] font-sans font-light leading-relaxed">
            Prepared with oyster mushrooms, mustard oil, vinegar, and traditional Indian spices.
          </p>
        </div>

        {/* Filter, Search & Sort Control Panel */}
        <div className="bg-[#FDFBF7] p-4 sm:p-6 rounded-[6px] border border-[#E8DEC8] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#A87B28] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search pickle, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[6px] bg-[#FAF6EE] border border-[#E8DEC8] text-xs text-[#211612] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#211612]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-[#A87B28]" />
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#211612]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-[6px] bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-serif text-[#211612] focus:outline-none focus:ring-1 focus:ring-[#211612]"
              >
                <option value="recommended">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Flavour Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#211612] flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#A87B28]" /> Variety:
            </span>
            {flavours.map((flavour) => (
              <button
                key={flavour}
                type="button"
                onClick={() => setSelectedFlavour(flavour)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-serif tracking-wider uppercase shrink-0 transition-colors ${
                  selectedFlavour === flavour
                    ? "bg-[#211612] text-[#FAF6EE] border border-[#211612]"
                    : "bg-[#FAF6EE] text-[#3D2C24] hover:bg-[#EFE8DD] border border-[#E8DEC8]"
                }`}
              >
                {flavour}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="sr-only">Mushroom Pickles Catalog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || "400g";
            const sizeOption =
              product.sizes?.find((s) => s.size === currentSize) || product.sizes?.[0] || {
                size: "400g",
                price: 399,
                originalPrice: 399,
                inStock: true,
              };

            return (
              <div
                key={product.id}
                className="clay-card rounded-[6px] overflow-hidden flex flex-col justify-between bg-[#FDFBF7] border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Product Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-[#FAF6EE] border-b border-[#E8DEC8]">
                    <Image
                      src={product.image || "/images/products/mushroom-mela-front.jpg"}
                      alt={`${product.name} from Akhil Foods Jhansi`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4"
                    />
                    <span className="absolute top-3.5 right-3.5 bg-[#EFE8DD] text-[#211612] text-xs font-serif font-bold px-2 py-0.5 rounded-[4px] border border-[#DDD3C4]">
                      {product.flavour}
                    </span>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 space-y-3">
                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="font-serif text-lg font-bold text-[#211612] hover:text-[#A87B28] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#3D2C24] line-clamp-2 leading-relaxed font-sans font-light">
                      {product.subtitle || product.description}
                    </p>

                    {/* Size display */}
                    <div className="pt-2">
                      <div className="py-2 px-3 rounded-[6px] bg-[#FAF6EE] border border-[#E8DEC8] text-xs font-serif text-[#211612] flex justify-between">
                        <span className="font-semibold text-[#A87B28] uppercase">Net Quantity:</span>
                        <span className="font-bold">{sizeOption.size} (MRP ₹{sizeOption.price})</span>
                      </div>
                    </div>

                    {/* Price */}
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

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, currentSize, 1)}
                    className="btn-outline !py-2.5 !px-3"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => buyNow(product, currentSize, 1)}
                    className="btn-primary !py-2.5 !px-3"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* Pincode Availability Checker */}
        <div className="max-w-xl mx-auto pt-6">
          <PincodeChecker />
        </div>
      </div>
    </div>
  );
}
