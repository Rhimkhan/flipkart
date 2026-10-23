import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Truck, PackageCheck, MapPin, Phone, Mail, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, TEL_LINK } from "@/lib/config";

export const metadata: Metadata = {
  title: `Shipping & Delivery Policy | ${BRAND.name} - Jhansi, Uttar Pradesh`,
  description: `Pan-India shipping details for handcrafted oyster mushroom pickles from ${BRAND.name}, Village Nandsiya, Moth, Jhansi. Honest delivery timelines and packaging safety.`,
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: `Shipping & Delivery Policy | ${BRAND.name}`,
    description: `Safe packaging and nationwide delivery from our Jhansi kitchen. Honest shipping policy with no false promises.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/shipping-policy`,
    type: "website",
  },
};

export default function ShippingPolicyPage() {
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
              <Truck className="w-3.5 h-3.5 text-[#A87B28]" />
              <span>Pan-India Delivery</span>
            </span>
            <h1 className="headline-luxury text-3xl sm:text-5xl font-serif text-[#211612]">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-[#736b63] font-light">
              Last updated: {lastUpdated} • Dispatched from Moth, Jhansi, Uttar Pradesh
            </p>
          </div>
        </div>

        {/* Highlight Callout: Honest Delivery Timelines */}
        <div className="bg-[#2D4F36] text-[#FAF6EE] rounded-3xl p-6 sm:p-8 shadow-md border border-[#3D6948] space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-300" />
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#FAF6EE]">
              Honest Shipping Timelines
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#FAF6EE]/90 leading-relaxed font-light">
            We are a small rural kitchen based in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. <strong>We do not make unrealistic promises of same-day or fixed delivery days. Delivery time depends strictly on the courier partner and your exact location and pin code.</strong> We take immense care to pack each glass jar with heavy cushioning so it arrives intact.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#3D2C24]">

          {/* Section 1: Dispatch from Jhansi */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">1</span>
              <span>Where Orders are Dispatched From</span>
            </h2>
            <p>
              Every jar of our artisanal oyster mushroom pickle (<em>Mushroom Mela</em>) is prepared, slow-cured in mustard oil, jarred, and packed right here in:
            </p>
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC8] flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#A87B28] shrink-0" />
              <span className="font-medium text-[#211612] text-sm sm:text-base">
                {BRAND.address}
              </span>
            </div>
            <p className="text-sm text-[#736b63]">
              Orders are typically packed and handed over to our courier partner within 1 to 2 business days of order confirmation.
            </p>
          </section>

          {/* Section 2: Delivery Timelines */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">2</span>
              <span>Delivery Time Depends on Courier & Location</span>
            </h2>
            <p>
              Because India is vast and logistics vary between regions, actual transit time is determined by the courier network (e.g., India Post Speed Post, Delhivery, DTDC, or regional couriers) and distance from Jhansi:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Uttar Pradesh & Delhi-NCR:</strong> Usually reached sooner due to direct highway transport connections from Jhansi.</li>
              <li><strong>Metro & Major Cities:</strong> (Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Ahmedabad, Pune): Typically standard inter-state transit times.</li>
              <li><strong>Rural Towns, Northeast, Hilly & Remote Areas:</strong> May take additional days depending on local postal or courier reach.</li>
              <li><strong>External Factors:</strong> Weather disruptions, public holidays, regional festivals, or courier route delays can occasionally prolong transit. We appreciate your patience and understanding for handcrafted food shipments.</li>
            </ul>
          </section>

          {/* Section 3: Shipping Charges */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">3</span>
              <span>Shipping Charges</span>
            </h2>
            <p>
              Courier charges are calculated based on the weight of heavy glass jars and destination pin code. <strong>We do not promise blanket or unconditional free shipping on every order.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Any applicable delivery charge is calculated accurately and displayed transparently on the Checkout page before you make any payment.</li>
              <li>Special promotions or free shipping thresholds (e.g. for multi-jar bundles) are applied automatically when eligible and indicated at checkout.</li>
            </ul>
          </section>

          {/* Section 4: Safe Glass Jar Packaging */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">4</span>
              <span>Heavy Cushioning & Glass Packaging</span>
            </h2>
            <p>
              We pack our pickles in premium glass jars to maintain natural aroma, mustard oil richness, and freshness without plastic contamination.
            </p>
            <div className="bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] space-y-2">
              <div className="flex items-center gap-2 text-[#211612] font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our Multi-Layer Cushioning Standard:</span>
              </div>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-[#736b63] space-y-1">
                <li>Heavy bubble-wrap cocoon around every glass jar.</li>
                <li>Tight tape seal on lid to prevent mustard oil seepage under air pressure changes.</li>
                <li>Sturdy corrugated shipping box packed with shock-absorbing fillers.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Tracking Your Shipment */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">5</span>
              <span>Tracking Your Shipment</span>
            </h2>
            <p>
              Once your package leaves our kitchen, we update the courier tracking number. You can check its live journey:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>On our website directly at <Link href="/track-order" className="text-[#A87B28] underline font-semibold">Track Order</Link> using your Order ID and 10-digit mobile number.</li>
              <li>Or simply message us on WhatsApp with your Order ID, and our team will share the latest tracking status.</li>
            </ul>
          </section>

          {/* Section 6: Delivery Attempts */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">6</span>
              <span>Delivery Attempts & Address Accuracy</span>
            </h2>
            <p>
              The courier executive will attempt delivery at your address and usually calls the mobile number provided. Please ensure someone is available to receive the package. If a parcel is returned to our Jhansi kitchen due to incorrect address, incomplete pin code, or repeated failure to answer delivery calls, additional shipping charges will apply to re-dispatch the package.
            </p>
          </section>

          {/* Contact Block */}
          <div className="pt-6 border-t border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#211612]">
              Questions About Dispatch or Tracking?
            </h3>
            <p className="text-sm">
              We are available to answer your shipping queries personally:
            </p>
            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs sm:text-sm">
              <p className="font-medium text-[#211612]"><strong>Akhil Foods Dispatch Desk:</strong> Village Nandsiya, Moth, Jhansi, UP - 284303</p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A87B28] shrink-0" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-[#A87B28] underline font-bold">
                  WhatsApp: +91 63864 23865
                </a>
                <span className="text-[#736b63]">(Send your Order ID for instant status)</span>
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
