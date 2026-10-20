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
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-6 bg-[#FFFBEF]">
        <div className="w-20 h-20 rounded-2xl bg-[#E5D3C0] text-[#6B352A] flex items-center justify-center mx-auto shadow-md">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#4A231B]">Your Pickle Basket is Empty</h1>
        <p className="text-sm text-[#2B1B17]/80 font-sans">
          Looks like you haven&apos;t added any handcrafted mushroom pickles yet. Experience our authentic Mushroom Mela flavours!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#6B352A] text-[#FFF1A6] font-semibold text-sm shadow-xl hover:bg-[#4A231B] transition-all hover:scale-105"
        >
          <span>Explore Artisanal Pickles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A231B]">
            Your Shopping Basket
          </h1>
          <p className="text-sm text-[#2B1B17]/80 mt-1 font-sans">
            Review your handcrafted jars before proceeding to express checkout.
          </p>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-[#FFF1A6] p-4 rounded-2xl border border-[#6B352A]/20 text-sm text-[#4A231B] shadow-sm">
          {amountNeeded === 0 || appliedCoupon === "FREESHIP" ? (
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Congratulations! Your order qualifies for 100% FREE Express Shipping!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="font-medium">
                Add <strong className="text-[#6B352A]">₹{amountNeeded}</strong> more to your basket for <strong>FREE Express Shipping</strong>!
              </p>
              <div className="w-full bg-[#E5D3C0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#6B352A] h-full rounded-full transition-all duration-500"
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
                className="bg-white p-4 sm:p-6 rounded-2xl border border-[#6B352A]/15 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FFFBEF] shrink-0 border border-[#6B352A]/15 flex items-center justify-center p-1">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B1B17]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Jar Size:{" "}
                      <strong className="text-[#4A231B] bg-[#FFF1A6] px-2.5 py-0.5 rounded-full border border-[#6B352A]/15">
                        {item.size}
                      </strong>
                    </p>
                    <p className="text-xs text-stone-600 mt-1">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-[#6B352A]/30 rounded-xl bg-[#FFFBEF] px-2 py-1 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-1 hover:text-[#6B352A] text-stone-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#2B1B17]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-1 hover:text-[#6B352A] text-stone-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base sm:text-xl font-bold text-[#4A231B]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B352A] hover:text-[#4A231B]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Artisanal Pickles</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-[#6B352A]/15 shadow-md space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#4A231B]">Order Summary</h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-sm font-semibold text-stone-700 block">Have a Coupon?</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. AKHIL10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#6B352A]/25 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6B352A] text-[#FFF1A6] text-sm font-bold hover:bg-[#4A231B] transition-colors shadow-sm"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-[#FFF1A6] p-2.5 rounded-xl text-[#4A231B] font-semibold border border-[#6B352A]/20">
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
            <div className="space-y-2.5 text-sm text-stone-700 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#2B1B17]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shipping === 0 ? <strong className="text-emerald-800 font-bold">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#4A231B] pt-3 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="font-serif text-2xl font-extrabold text-[#4A231B]">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-95"
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
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp (+91 69665 58899)</span>
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
