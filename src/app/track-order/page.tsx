"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  Package,
} from "lucide-react";
import { Order } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import { findOrderByNumberOrPhone } from "@/lib/store";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if URL has query parameter (e.g. ?q=AF-8921)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get("q");
      if (q) {
        setQuery(q);
        searchOrder(q);
      }
    }
  }, []);

  const searchOrder = async (searchStr: string) => {
    if (!searchStr.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      // 1. Check local store
      const localMatched = findOrderByNumberOrPhone(searchStr);
      if (localMatched.length > 0) {
        setResults(localMatched);
        setLoading(false);
        return;
      }

      // 2. Query server API (which checks Supabase)
      const res = await fetch(`/api/orders?q=${encodeURIComponent(searchStr.trim())}`);
      const data = await res.json();
      if (data?.success && Array.isArray(data.orders) && data.orders.length > 0) {
        // Map database fields to application Order model if needed
        const mapped = data.orders.map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number || o.orderNumber,
          customerName: o.customer_name || o.customerName,
          email: o.email,
          phone: o.phone,
          address: o.address,
          landmark: o.landmark,
          city: o.city,
          state: o.state,
          pincode: o.pincode,
          items: Array.isArray(o.items) ? o.items : [],
          subtotal: Number(o.subtotal) || 0,
          shipping: Number(o.shipping) || 0,
          discount: Number(o.discount) || 0,
          total: Number(o.total) || 0,
          paymentMethod: o.payment_method || o.paymentMethod || "Cash on Delivery",
          paymentStatus: o.payment_status || o.paymentStatus || "Pending",
          orderStatus: o.order_status || o.orderStatus || "New",
          trackingNumber: o.tracking_number || o.trackingNumber,
          courierName: o.courier_name || o.courierName,
          createdAt: o.created_at || o.createdAt || new Date().toISOString(),
        }));
        setResults(mapped);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Order lookup error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrder(query);
  };

  const statuses = ["New", "Packed", "Shipped", "Delivered"];

  const getStepStatus = (orderStatus: string, step: string) => {
    const currentIndex = statuses.indexOf(orderStatus);
    const stepIndex = statuses.indexOf(step);
    if (currentIndex >= stepIndex) return "completed";
    return "pending";
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FFFBEF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#6B352A]/15 shadow-sm">
            Live Consignment Status
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4A231B]">
            Track Your Pickle Shipment
          </h1>
          <p className="text-xs sm:text-sm text-[#2B1B17]/75 font-sans">
            Enter your Order Number (e.g. <strong>AF-8921</strong>) or your 10-digit mobile number used during checkout.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-[32px] border border-[#6B352A]/15 shadow-md max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter Order # (AF-XXXX) or 10-digit Phone"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] font-mono focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-2xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "Locating..." : "Track Order"}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            {results.length === 0 ? (
              <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#6B352A]/15 text-center space-y-4 max-w-md mx-auto shadow-md">
                <ShieldAlert className="w-12 h-12 text-[#A8553F] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#4A231B]">No Matching Order Found</h3>
                <p className="text-xs text-[#2B1B17]/70 font-sans leading-relaxed">
                  We could not find an order matching &ldquo;{query}&rdquo;. Please verify your 10-digit phone number or order reference.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20Akhil%20Foods!%20Need%20help%20tracking%20my%20order:%20${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ask Customer Desk on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              results.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#6B352A]/15 shadow-lg space-y-6"
                >
                  {/* Order Header Ribbon */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
                    <div>
                      <span className="text-xs font-bold text-[#A8553F] uppercase tracking-wider font-mono">
                        Consignment #{order.orderNumber}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#4A231B]">{order.customerName}</h3>
                      <p className="text-[11px] text-stone-500">
                        Booked on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFF1A6] text-[#4A231B] border border-[#6B352A]/20">
                        Status: {order.orderStatus}
                      </span>
                      <p className="text-xs font-serif font-bold text-[#6B352A] mt-1.5">
                        ₹{order.total} • {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* Visual 4-Step Pipeline */}
                  <div className="py-4">
                    <div className="grid grid-cols-4 gap-2 text-center relative">
                      {statuses.map((step, idx) => {
                        const status = getStepStatus(order.orderStatus, step);
                        const isDone = status === "completed";

                        return (
                          <div key={step} className="flex flex-col items-center space-y-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-sm ${
                                isDone
                                  ? "bg-[#6B352A] text-[#FFF1A6] ring-4 ring-[#FFF1A6]"
                                  : "bg-stone-100 text-stone-400 border border-stone-200"
                              }`}
                            >
                              {isDone ? <CheckCircle2 className="w-5 h-5 text-[#FFF1A6]" /> : idx + 1}
                            </div>
                            <span
                              className={`text-xs font-semibold ${
                                isDone ? "text-[#6B352A]" : "text-stone-400"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Courier Tracking Details */}
                  {order.trackingNumber && (
                    <div className="p-4 rounded-2xl bg-[#FFF1A6]/50 border border-[#6B352A]/20 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-stone-600 font-medium">Logistics Partner:</span>{" "}
                        <strong className="text-[#6B352A]">{order.courierName || "Express Courier"}</strong>
                        <p className="text-stone-600 mt-0.5">
                          Air Waybill (AWB):{" "}
                          <strong className="font-mono text-[#2B1B17]">{order.trackingNumber}</strong>
                        </p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-300">
                        In Transit
                      </span>
                    </div>
                  )}

                  {/* Items in this order */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      Jars In This Consignment:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items?.map((i, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-[#FFFBEF] p-3 rounded-2xl border border-[#6B352A]/15 text-xs"
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                            <Image src={i.image} alt={i.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#2B1B17] truncate">{i.name}</p>
                            <p className="text-stone-500 text-[11px]">
                              {i.size} × {i.quantity} (₹{i.price * i.quantity})
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl">
                    <span className="font-semibold text-[#2B1B17]">Delivering to:</span>{" "}
                    {order.address}, {order.city}, {order.state} - {order.pincode}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
