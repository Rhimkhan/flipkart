"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Tag,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput("");
  };

  const freeShippingThreshold = BRAND.freeShippingThreshold;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-6 bg-[#FAF6EE]">
        <div className="w-20 h-20 rounded-2xl bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center mx-auto shadow-sm border border-[#DDD3C4]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-normal text-[#211612]">Your Basket is Empty</h1>
        <p className="text-sm text-[#3D2C24] font-sans font-light">
          Looks like you haven&apos;t added any handcrafted mushroom pickles yet. Experience our authentic Mushroom Mela flavours!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#211612] text-[#FAF6EE] font-serif font-bold text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-[#34221A] transition-all hover:scale-105 border border-[#211612]"
        >
          <span>Explore Artisanal Pickles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#211612]">
            Your Shopping Basket
          </h1>
          <p className="text-sm text-[#3D2C24] mt-1 font-sans font-light">
            Review your handcrafted jars before proceeding to express checkout.
          </p>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-[#EFE8DD] p-4 rounded-2xl border border-[#DDD3C4] text-sm text-[#211612] shadow-sm">
          {amountNeeded === 0 || appliedCoupon === "FREESHIP" ? (
            <div className="flex items-center gap-2 font-serif font-bold text-emerald-900">
              <Sparkles className="w-4 h-4 text-[#A87B28]" />
              <span>Congratulations! Your order qualifies for 100% FREE Express Shipping!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="font-serif text-xs">
                Add <strong className="text-[#A87B28]">₹{amountNeeded}</strong> more to your basket for <strong>FREE Express Shipping</strong>!
              </p>
              <div className="w-full bg-[#E2D6C0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#211612] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / Cards */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="sr-only">Items in Your Basket</h2>
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="bg-[#FDFBF7] p-4 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF6EE] shrink-0 border border-[#E8DEC8] flex items-center justify-center p-1">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#211612]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Jar Size:{" "}
                      <strong className="text-[#211612] bg-[#EFE8DD] px-2.5 py-0.5 rounded-full border border-[#DDD3C4] font-serif">
                        {item.size}
                      </strong>
                    </p>
                    <p className="text-xs text-stone-600 mt-1">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8DEC8]">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-[#E8DEC8] rounded-xl bg-[#FAF6EE] px-2 py-1 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-1 hover:text-[#211612] text-stone-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#211612]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-1 hover:text-[#211612] text-stone-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base sm:text-xl font-bold text-[#211612]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="p-2 text-stone-400 hover:text-red-700 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#211612] hover:text-[#A87B28]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Artisanal Pickles</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-[#FDFBF7] p-6 sm:p-7 rounded-2xl border border-[#E8DEC8] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#211612]">Order Summary</h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#211612] block">Have a Coupon?</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-[#A87B28]" />
                  <input
                    type="text"
                    placeholder="e.g. AKHIL10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DEC8] bg-[#FAF6EE] text-[#211612] uppercase font-mono focus:outline-none focus:ring-1 focus:ring-[#C89B3C]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#211612] text-[#FAF6EE] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#34221A] transition-colors shadow-sm"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-[#EFE8DD] p-2.5 rounded-xl text-[#211612] font-semibold border border-[#DDD3C4]">
                  <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                  <button onClick={removeCoupon} className="text-red-700 font-bold underline text-xs">
                    Remove
                  </button>
                </div>
              )}

              {couponMsg && (
                <p className={`text-xs ${couponMsg.isError ? "text-red-600" : "text-emerald-700"} font-medium`}>
                  {couponMsg.text}
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#3D2C24] pt-2 border-t border-[#E8DEC8] font-light">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#211612]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Transit</span>
                <span>{shipping === 0 ? <strong className="text-emerald-800 font-bold">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#211612] pt-3 border-t border-[#E8DEC8]">
                <span>Grand Total</span>
                <span className="font-serif text-2xl font-bold text-[#211612]">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-[#211612] hover:bg-[#34221A] text-[#FAF6EE] font-serif font-bold text-xs tracking-[0.2em] uppercase shadow-xl transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-95 border border-[#211612]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Order on WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi, I want to order mushroom pickle from Akhil Foods!\nMy Cart Items:\n${items
                  .map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ₹${i.price * i.quantity}`)
                  .join("\n")}\nTotal Amount: ₹${total}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#38271F] text-[#FAF6EE] font-serif font-semibold text-xs tracking-wider uppercase border border-[#C89B3C]/30 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#C89B3C]" />
              <span>Order on WhatsApp Concierge</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-600 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
