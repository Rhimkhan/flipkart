"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle, MessageSquare, Printer, ArrowRight, Package, Clock, Phone, MapPin, Loader2 } from "lucide-react";
import { Order } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import { getLocalOrders } from "@/lib/store";

function OrderSuccessContent() {
  const params = useParams();
  const orderId = (params?.orderId as string) || "";
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4E111B", "#E5D3C0", "#8C2D3C", "#34080F"],
      });
    } catch {
      // ignore
    }

    // Fetch order details from local store or API
    const orders = getLocalOrders();
    const found = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (found) {
      setOrder(found);
    } else {
      fetch(`/api/orders?q=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.orders && data.orders.length > 0) {
            setOrder(data.orders[0]);
          }
        });
    }
  }, [orderId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const whatsappMessage = order
    ? encodeURIComponent(
        `Hi Akhil Foods! I just placed an order:\n\n*Order #:* ${order.orderNumber}\n*Name:* ${order.customerName}\n*Amount:* ₹${order.total}\n*Payment Mode:* ${order.paymentMethod}\n*Items:* ${order.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(", ")}\n*Delivery Address:* ${order.address}, ${order.city}, ${order.pincode}\n\nPlease share tracking updates when dispatched!`
      )
    : "";

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Header */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#6B352A]/15 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full">
              Order Confirmed & Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#6B352A]">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Your artisanal mushroom pickle is being prepared in our Solan kitchen. We will dispatch your jar with love within 24 hours.
            </p>
          </div>

          {order && (
            <div className="inline-block bg-[#FFF8E7] px-6 py-2.5 rounded-2xl border border-[#6B352A]/20">
              <span className="text-xs text-stone-500 font-medium">Order Number:</span>{" "}
              <strong className="font-mono text-base text-[#6B352A]">{order.orderNumber}</strong>
            </div>
          )}

          {/* WhatsApp Notify CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Order to WhatsApp & Get Live Dispatch Alert</span>
            </a>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Order Details Receipt */}
        {order && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#6B352A]/15 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#6B352A]">Receipt Summary</h3>
                <p className="text-xs text-stone-500">{new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
                <div className="text-[10px] text-stone-500 font-mono mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                  <span>FSSAI: <strong>{BRAND.fssaiNumber}</strong></span>
                  <span>•</span>
                  <span>GSTIN: <strong>{BRAND.gstNumber}</strong></span>
                  <span>•</span>
                  <span>Udyam: <strong>{BRAND.udyamNumber}</strong></span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#4A231B] bg-[#FFF1A6] px-3 py-1 rounded-full self-start sm:self-center">
                Status: {order.orderStatus}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FFF8E7] shrink-0 border border-stone-200">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B1B17]">{item.name}</h4>
                      <p className="text-stone-500 text-[11px]">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#6B352A]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#6B352A] pt-2 border-t border-stone-200">
                <span>Total Paid / Payable</span>
                <span className="font-serif text-lg">₹{order.total}</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                <span>Payment Mode:</span>
                <span className="font-medium text-[#2B1B17]">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="pt-4 border-t border-stone-100 bg-[#FFF8E7]/50 p-4 rounded-2xl text-xs space-y-1.5">
              <h4 className="font-bold text-[#6B352A] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A8553F]" />
                <span>Delivery Address</span>
              </h4>
              <p className="font-semibold text-[#2B1B17]">{order.customerName}</p>
              <p className="text-stone-600">{order.address} {order.landmark ? `(Near ${order.landmark})` : ""}</p>
              <p className="text-stone-600">{order.city}, {order.state} - {order.pincode}</p>
              <p className="text-stone-600">Contact: {order.phone} | {order.email}</p>
            </div>

            {/* Quick Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <Link
                href={`/track-order?q=${order.orderNumber}`}
                className="text-[#6B352A] font-bold underline hover:text-[#A8553F]"
              >
                Track this order online →
              </Link>
              <Link
                href="/shop"
                className="px-6 py-2.5 rounded-full bg-[#6B352A] text-[#FFF1A6] font-semibold hover:bg-[#4A231B] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#6B352A]" />
          <p className="text-xs text-stone-500 mt-2">Loading your order receipt...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
