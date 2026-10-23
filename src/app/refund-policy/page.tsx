import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Camera, AlertTriangle, CheckCircle2, Phone, Mail, MapPin, ArrowLeft, Clock } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, TEL_LINK, FSSAI_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: `Refund & Replacement Policy | ${BRAND.name} - Jhansi, Uttar Pradesh`,
  description: `Clear and honest refund, replacement, and cancellation policy for ${BRAND.name}. Learn our simple 48-hour photo policy for damaged or incorrect jars.`,
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: `Refund & Replacement Policy | ${BRAND.name}`,
    description: `No returns on opened food items. Quick replacement or full refund for damaged or wrong items reported within 48 hours with photos.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/refund-policy`,
    type: "website",
  },
};

export default function RefundPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12 sm:py-20 text-[#211612]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-[#A87B28] hover:text-[#211612] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <div className="space-y-2">
            <span className="eyebrow-luxury text-[#A87B28] bg-[#EFE8DD] px-3.5 py-1 rounded-full border border-[#DDD3C4] inline-flex items-center gap-1.5 text-xs">
              <RefreshCw className="w-3.5 h-3.5 text-[#A87B28]" />
              <span>Honest & Fair Returns</span>
            </span>
            <h1 className="headline-luxury text-3xl sm:text-5xl font-serif text-[#211612]">
              Refund & Replacement Policy
            </h1>
            <p className="text-xs text-[#736b63] font-light">
              Last updated: {lastUpdated} • {BRAND.legalName}, Moth, Jhansi (UP)
            </p>
          </div>
        </div>

        {/* 48-Hour Guarantee Highlight Banner in Clay/Green */}
        <div className="bg-[#2D4F36] text-[#FAF6EE] rounded-3xl p-6 sm:p-8 shadow-md border border-[#3D6948] space-y-3">
          <div className="flex items-center gap-2 text-[#FAF6EE]">
            <Clock className="w-5 h-5 text-emerald-300" />
            <h2 className="font-serif text-xl sm:text-2xl font-medium">
              48-Hour Damage & Mistake Protection
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#FAF6EE]/90 leading-relaxed font-light">
            If your package arrives damaged, leaking, broken in courier transit, or if you received the wrong jar, simply report it to us within <strong>48 hours of delivery with photos</strong>. We will happily send you an immediate free replacement jar or issue a full refund.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#3D2C24]">

          {/* Section 1: Food Safety Rule */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">1</span>
              <span>No Returns on Opened Food Items</span>
            </h2>
            <div className="bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-[#3D2C24]">
                <strong>Important Food Safety Notice:</strong> Because our oyster mushroom pickles are perishable food items packed in sealed glass jars for hygiene and strict food safety compliance (FSSAI Lic. No. {FSSAI_NUMBER}), <strong>we cannot accept returns or exchanges once the jar seal has been opened or unsealed by the customer</strong>. We are sure you understand that no food item can be accepted back into our kitchen once opened.
              </p>
            </div>
          </section>

          {/* Section 2: Damaged or Wrong Items */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">2</span>
              <span>Damaged in Transit or Wrong Item Delivered</span>
            </h2>
            <p>
              We pack our glass jars in heavy, multi-layered protective cushioning. However, if courier mishandling causes damage or if an packing mistake happened at our kitchen:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Report within 48 Hours:</strong> You must inform us within 48 hours of delivery (as marked by the courier tracking record).
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#A87B28] shrink-0 mt-0.5" />
                <div>
                  <strong>Share Clear Photos or Video:</strong> Take 2-3 clear pictures of the outer shipping box, shipping label showing your address, and the damaged or wrong jar showing the defect or seal breakage.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#A87B28] shrink-0 mt-0.5" />
                <div>
                  <strong>Contact Us on WhatsApp or Email:</strong> Send the photos along with your Order ID (e.g. #AF-...) to our WhatsApp at <strong>+91 63864 23865</strong> or email us at <strong>{BRAND.email}</strong>.
                </div>
              </div>
            </div>
            <p className="pt-2 text-sm text-[#736b63]">
              Once verified by our team (typically within 24 hours), you may choose either:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DEC8]">
                <h4 className="font-serif font-bold text-[#211612] text-sm">Option A: Free Replacement</h4>
                <p className="text-xs text-[#736b63] mt-1">We immediately dispatch a fresh jar of your ordered pickle to your address at zero extra cost.</p>
              </div>
              <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DEC8]">
                <h4 className="font-serif font-bold text-[#211612] text-sm">Option B: 100% Full Refund</h4>
                <p className="text-xs text-[#736b63] mt-1">We initiate a direct refund to your original payment method or via UPI to your mobile number.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Order Cancellations */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">3</span>
              <span>Order Cancellation</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Before Courier Dispatch:</strong> You may cancel your order at any time before it has been handed over to the courier partner. Simply send us a message on WhatsApp (+91 63864 23865) with your Order ID. We will cancel it and immediately refund any prepaid amount.</li>
              <li><strong>After Courier Dispatch:</strong> Once a parcel has been picked up by the courier partner and tracking details are generated, the parcel cannot be cancelled mid-transit.</li>
              <li><strong>Cash on Delivery (COD) Cancellations:</strong> If you placed a COD order and need to cancel, please notify us before dispatch so we do not waste fragile courier packaging and transit fuel.</li>
            </ul>
          </section>

          {/* Section 4: Refund Timelines */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">4</span>
              <span>Refund Timelines & Method</span>
            </h2>
            <p>
              Once a refund is approved by our team:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Prepaid Orders (Cards / Net Banking):</strong> Refunds are initiated through the payment gateway back to the original source account. Banks typically credit the amount within 3 to 7 working days.</li>
              <li><strong>UPI QR Payments:</strong> We transfer the refund directly to your UPI ID (VPA) or phone number linked with UPI within 24 to 48 hours.</li>
              <li><strong>Cash on Delivery (COD) Orders:</strong> In case a COD order arrived damaged, we will ask for your UPI ID or bank account details to remit your refund directly.</li>
            </ul>
          </section>

          {/* Contact Block */}
          <div className="pt-6 border-t border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#211612]">
              How to Claim a Replacement or Refund
            </h3>
            <p className="text-sm">
              Please contact Abhishek Kumar directly with your order number and photos:
            </p>
            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs sm:text-sm">
              <p className="font-medium text-[#211612]"><strong>Akhil Foods Kitchen:</strong> Village Nandsiya, Moth, Jhansi, UP - 284303</p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A87B28] shrink-0" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-[#A87B28] underline font-bold">
                  WhatsApp: +91 63864 23865
                </a>
                <span className="text-[#736b63]">(Quickest response for photos)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A87B28] shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#A87B28] underline">{BRAND.email}</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
