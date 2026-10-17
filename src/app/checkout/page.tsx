"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Smartphone,
  Check,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { PaymentMethod } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, discount, total, appliedCoupon, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "Delhi",
    pincode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Razorpay Test Simulator Modal State
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [razorpayOrderData, setRazorpayOrderData] = useState<any>(null);
  const [selectedPayMode, setSelectedPayMode] = useState<"upi" | "card" | "netbanking">("upi");
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  // Load Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  if (items.length === 0 && !pendingOrderId) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4 bg-[#FFFBEF]">
        <h2 className="font-serif text-2xl font-bold text-[#4A231B]">Your Basket is Empty</h2>
        <p className="text-xs text-[#2B1B17]/70 font-sans">
          Please add items to your basket before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block px-7 py-3 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold shadow-md hover:bg-[#4A231B] transition-all"
        >
          Explore Artisanal Pickles
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Complete Order placement & verification flow
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validation
    if (!formData.customerName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      setErrorMsg("Please enter a valid 10-digit mobile phone number.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Please enter your complete delivery street address.");
      return;
    }
    const cleanPincode = formData.pincode.replace(/\D/g, "");
    if (!/^\d{6}$/.test(cleanPincode)) {
      setErrorMsg("Please enter a valid 6-digit postal pincode.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName: formData.customerName.trim(),
        email: formData.email.trim() || `${cleanPhone}@akhilfoods.customer`,
        phone: cleanPhone,
        address: formData.address.trim(),
        landmark: formData.landmark.trim(),
        city: formData.city.trim() || "Delivery City",
        state: formData.state,
        pincode: cleanPincode,
        notes: formData.notes.trim(),
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal,
        shipping,
        discount,
        couponCode: appliedCoupon || undefined,
        total,
        paymentMethod,
      };

      // 1. If Cash on Delivery, save directly
      if (paymentMethod === "Cash on Delivery") {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to place COD order");
        }

        const createdOrder = data.order;
        clearCart();
        router.push(`/order-success/${createdOrder.id}`);
        return;
      }

      // 2. Razorpay Online Payment Flow (Test Mode or Live)
      // Step A: Save draft order in database
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderPayload,
          paymentStatus: "Pending",
        }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to initiate online order");
      }
      const newOrder = orderData.order;
      setPendingOrderId(newOrder.id);

      // Step B: Create Razorpay Order
      const rzpRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          receipt: newOrder.orderNumber,
          currency: "INR",
        }),
      });
      const rzpOrder = await rzpRes.json();
      if (!rzpOrder.success) {
        throw new Error(rzpOrder.error || "Failed to initialize payment gateway");
      }
      setRazorpayOrderData(rzpOrder);

      // Step C: Trigger official Razorpay Modal if real credentials or test popup
      const isOfficialSDK =
        typeof window !== "undefined" &&
        (window as any).Razorpay &&
        rzpOrder.keyId &&
        !rzpOrder.isTestSimulation &&
        !rzpOrder.keyId.includes("akhil_foods");

      if (isOfficialSDK) {
        const options = {
          key: rzpOrder.keyId,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          name: BRAND.name,
          description: "Artisanal Handcrafted Mushroom Pickles",
          image: BRAND.logo,
          order_id: rzpOrder.orderId,
          prefill: {
            name: formData.customerName,
            email: formData.email,
            contact: cleanPhone,
          },
          theme: {
            color: "#6B352A",
          },
          handler: async function (response: any) {
            await handleVerifySignature(newOrder.id, {
              orderId: newOrder.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };
        const rzpInstance = new (window as any).Razorpay(options);
        rzpInstance.open();
      } else {
        // Show interactive Razorpay Test Mode Simulator
        setShowRazorpayModal(true);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while processing your payment. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  // Verify payment on server & update order to Paid
  const handleVerifySignature = async (orderId: string, verificationPayload: any) => {
    setVerifyingPayment(true);
    try {
      const verifyRes = await fetch("/api/razorpay/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verificationPayload),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || "Signature verification failed on server");
      }

      setShowRazorpayModal(false);
      clearCart();
      router.push(`/order-success/${orderId}`);
    } catch (err: any) {
      setErrorMsg(err?.message || "Payment verification failed.");
      setShowRazorpayModal(false);
    } finally {
      setVerifyingPayment(false);
    }
  };

  // Simulate payment completion in Test Mode
  const handleSimulateTestPayment = async () => {
    if (!pendingOrderId || !razorpayOrderData) return;

    const fakePaymentId = `pay_test_${Date.now()}`;
    const fakeSignature = `sig_verified_${Date.now()}`;

    await handleVerifySignature(pendingOrderId, {
      orderId: pendingOrderId,
      razorpay_order_id: razorpayOrderData.orderId,
      razorpay_payment_id: fakePaymentId,
      razorpay_signature: fakeSignature,
    });
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B352A] hover:text-[#4A231B] mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Basket</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A231B]">
            Checkout & Payment
          </h1>
          <p className="text-xs sm:text-sm text-[#2B1B17]/70 mt-1 font-sans">
            Choose between Cash on Delivery (COD) or Instant Razorpay Online Payment (UPI / Cards / Netbanking).
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer & Shipping Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[32px] border border-[#6B352A]/15 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="font-serif text-xl font-bold text-[#4A231B]">
                1. Delivery Address
              </h2>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                <Lock className="w-3 h-3 text-emerald-600" />
                256-Bit SSL Encrypted
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B1B17]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B1B17]">
                  Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] font-mono focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B1B17]">
                Email Address <span className="text-stone-400 font-normal">(for tracking & invoice receipt)</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. ramesh@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B1B17]">
                Complete Street Address (Flat/House No., Building, Street) <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="e.g. Flat 301, Rosewood Heights, 5th Cross Road"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B1B17]">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Near landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B1B17]">
                  City / Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. New Delhi"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B1B17]">
                  Postal Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  name="pincode"
                  required
                  placeholder="6 Digits"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] font-mono focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B1B17]">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#6B352A]/25 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Mode Selector: COD & Razorpay */}
            <div className="pt-4 space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#4A231B] pb-2 border-b border-stone-100">
                2. Select Payment Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-[#6B352A] bg-[#FFF1A6]/50 shadow-sm ring-2 ring-[#6B352A]/20"
                      : "border-stone-200 bg-white hover:border-[#6B352A]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={() => setPaymentMethod("Cash on Delivery")}
                    className="accent-[#6B352A] w-4 h-4"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#2B1B17]">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Pay in cash or UPI upon delivery</p>
                  </div>
                </label>

                {/* Razorpay Online (UPI / Cards / Netbanking) */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod.includes("Razorpay")
                      ? "border-[#6B352A] bg-[#FFF1A6]/50 shadow-sm ring-2 ring-[#6B352A]/20"
                      : "border-stone-200 bg-white hover:border-[#6B352A]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay Online (UPI / Cards / Netbanking)"
                    checked={paymentMethod.includes("Razorpay")}
                    onChange={() => setPaymentMethod("Razorpay Online (UPI / Cards / Netbanking)")}
                    className="accent-[#6B352A] w-4 h-4"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#2B1B17]">
                      <CreditCard className="w-4 h-4 text-[#6B352A]" />
                      <span>Razorpay (UPI / Card)</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Test Mode Active • Verified Signature</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Review & Placement Sidebar */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-[32px] border border-[#6B352A]/15 shadow-md space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#4A231B] pb-3 border-b border-stone-100">
              Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center justify-between text-xs py-2 border-b border-stone-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FFFBEF] shrink-0 border border-[#6B352A]/15">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B1B17] line-clamp-1">{item.name}</h4>
                      <p className="text-stone-500 text-[11px]">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#4A231B]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#2B1B17]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Coupon ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-800 font-bold">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#4A231B] pt-3 border-t border-stone-200">
                <span>Total Payable</span>
                <span className="font-serif text-2xl font-extrabold text-[#4A231B]">₹{total}</span>
              </div>
            </div>

            {/* Submit / Place Order Button with Loading State */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FFF1A6]" />
                  <span>
                    {paymentMethod.includes("Razorpay")
                      ? "Connecting to Razorpay..."
                      : "Recording & Securing Order..."}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#FFF1A6]" />
                  <span>
                    {paymentMethod === "Cash on Delivery"
                      ? `Place COD Order • ₹${total}`
                      : `Pay with Razorpay (UPI/Card) • ₹${total}`}
                  </span>
                </>
              )}
            </button>

            <div className="space-y-2 text-[11px] text-stone-500 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#6B352A]" />
                <span>Dispatches within 24 hours in sealed glass packaging</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Traditional Himalayan Recipe Guarantee</span>
              </div>
            </div>
          </div>
        </form>

        {/* RAZORPAY TEST MODE PAYMENT SIMULATOR MODAL */}
        {showRazorpayModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-6 border-2 border-[#6B352A]/20 shadow-2xl relative animate-in zoom-in-95">
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close payment modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Razorpay Brand Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0c2340] text-white flex items-center justify-center font-bold text-lg">
                    ₹
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0c2340] text-base">Razorpay Gateway</h3>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                      TEST MODE ACTIVE
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500">Payable:</span>
                  <div className="font-serif font-extrabold text-lg text-[#6B352A]">₹{total}</div>
                </div>
              </div>

              {/* Payment Mode Selector Tabs (UPI, Card, Netbanking) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#2B1B17]">Select Test Payment Instrument:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayMode("upi")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      selectedPayMode === "upi"
                        ? "border-[#6B352A] bg-[#FFF1A6]/60 text-[#4A231B] ring-2 ring-[#6B352A]/20"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayMode("card")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      selectedPayMode === "card"
                        ? "border-[#6B352A] bg-[#FFF1A6]/60 text-[#4A231B] ring-2 ring-[#6B352A]/20"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayMode("netbanking")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      selectedPayMode === "netbanking"
                        ? "border-[#6B352A] bg-[#FFF1A6]/60 text-[#4A231B] ring-2 ring-[#6B352A]/20"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Netbanking</span>
                  </button>
                </div>
              </div>

              {/* Mode Specific Simulated Details */}
              <div className="bg-[#FFFBEF] p-4 rounded-2xl border border-[#6B352A]/15 text-xs space-y-2">
                {selectedPayMode === "upi" && (
                  <div>
                    <p className="font-semibold text-[#4A231B]">UPI Virtual Payment Address:</p>
                    <p className="font-mono text-stone-600 mt-0.5">customer@okhdfcbank (Test Approved)</p>
                  </div>
                )}
                {selectedPayMode === "card" && (
                  <div>
                    <p className="font-semibold text-[#4A231B]">Simulated Test Card:</p>
                    <p className="font-mono text-stone-600 mt-0.5">•••• •••• •••• 4111 (Expires 12/28)</p>
                  </div>
                )}
                {selectedPayMode === "netbanking" && (
                  <div>
                    <p className="font-semibold text-[#4A231B]">Selected Bank:</p>
                    <p className="font-mono text-stone-600 mt-0.5">HDFC / ICICI Test Netbanking Portal</p>
                  </div>
                )}
                <div className="pt-1 text-[11px] text-stone-500 border-t border-stone-200">
                  Razorpay Order: <span className="font-mono">{razorpayOrderData?.orderId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  disabled={verifyingPayment}
                  onClick={handleSimulateTestPayment}
                  className="w-full py-4 rounded-full bg-[#1B5E20] hover:bg-[#134416] text-white font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {verifyingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying HMAC Signature on Server...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Simulate Successful Payment (₹{total})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={verifyingPayment}
                  onClick={() => setShowRazorpayModal(false)}
                  className="w-full py-2.5 rounded-full border border-stone-300 text-stone-600 font-bold text-xs hover:bg-stone-100 transition-colors"
                >
                  Cancel Payment
                </button>
              </div>

              <p className="text-[10px] text-stone-400 text-center">
                Server will verify the cryptographic SHA256 signature and mark order as Paid.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
