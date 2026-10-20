"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
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
  const [couponStatus, setCouponStatus] = useState<{ message: string; isError?: boolean } | null>(null);

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = BRAND.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponStatus({ message: res.message, isError: !res.success });
    if (res.success) setCouponInput("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFBEF] shadow-2xl flex flex-col border-l border-[#6B352A]/20">
          {/* Header (Clay Brown & Soft Butter) */}
          <div className="p-5 bg-[#6B352A] text-[#FFF1A6] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#FFF1A6]" />
              <h2 className="font-serif text-xl font-bold tracking-wide text-[#FFF1A6]">
                Your Pickle Basket
              </h2>
              <span className="text-xs bg-[#4A231B] text-[#FFF1A6] px-2.5 py-0.5 rounded-full font-semibold border border-[#FFF1A6]/20">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#4A231B] text-[#FFF1A6] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#FFF1A6] px-5 py-3 border-b border-[#6B352A]/20 text-xs text-[#4A231B]">
            {amountNeededForFreeShipping === 0 || appliedCoupon === "FREESHIP" ? (
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>You unlocked <strong>FREE Express Shipping</strong>!</span>
              </div>
            ) : (
              <div>
                <p className="font-medium mb-1.5">
                  Add <strong className="text-[#6B352A]">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping</strong>
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

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E5D3C0] flex items-center justify-center mx-auto text-[#6B352A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#4A231B]">Your basket is empty</h3>
                <p className="text-sm text-[#2B1B17]/80 max-w-xs mx-auto">
                  Add our signature 400g Mushroom Mela Oyster Mushroom Pickle to your basket.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] text-sm font-semibold shadow-md transition-all"
                >
                  Explore Artisanal Pickles
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="bg-white p-3.5 rounded-2xl border border-[#6B352A]/15 shadow-sm flex gap-3.5 relative"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FFFBEF] shrink-0 border border-[#6B352A]/15">
                    <Image
                      src={item.image}
                      alt={`${item.name} - Handcrafted Pickle Jar`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-[#2B1B17] truncate leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-[#6B352A]/50 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="inline-block text-caption font-semibold text-[#4A231B] bg-[#FFF1A6] px-2 py-0.5 rounded-full mt-1 border border-[#6B352A]/15">
                        Jar Size: {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#6B352A]/30 rounded-full bg-[#FFFBEF] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="p-1 hover:text-[#6B352A] text-stone-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-[#2B1B17]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="p-1 hover:text-[#6B352A] text-stone-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-500">₹{item.price} each</span>
                        <p className="font-serif text-sm font-bold text-[#4A231B]">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#6B352A]/20 space-y-3.5 shadow-inner">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Coupon (try AKHIL10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#6B352A]/25 uppercase font-mono focus:outline-none focus:ring-1 focus:ring-[#6B352A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6B352A] text-[#FFF1A6] text-sm font-semibold hover:bg-[#4A231B] transition-colors shadow-sm"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-[#FFF1A6] p-2.5 rounded-xl text-[#4A231B] border border-[#6B352A]/20">
                  <span>Code <strong>{appliedCoupon}</strong> active</span>
                  <button onClick={removeCoupon} className="text-red-700 font-semibold underline text-xs">
                    Remove
                  </button>
                </div>
              )}

              {couponStatus && (
                <p className={`text-xs ${couponStatus.isError ? "text-red-600" : "text-emerald-700"} font-medium`}>
                  {couponStatus.message}
                </p>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2B1B17]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-800 font-semibold">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#4A231B] pt-2 border-t border-stone-100">
                  <span>Total Amount</span>
                  <span className="font-serif text-xl font-extrabold text-[#4A231B]">₹{total}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl border-2 border-[#6B352A] text-[#6B352A] font-semibold text-sm text-center hover:bg-[#6B352A] hover:text-[#FFF1A6] transition-all"
                >
                  View Cart Page
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-semibold text-sm text-center flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Order on WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi, I want to order mushroom pickle from Akhil Foods!\nMy Cart Items:\n${items
                    .map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ₹${i.price * i.quantity}`)
                    .join("\n")}\nTotal Amount: ₹${total}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
