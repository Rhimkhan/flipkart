import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileText, Phone, Mail, MapPin, ArrowLeft, AlertCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, TEL_LINK, FSSAI_NUMBER, GST_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND.name} - Jhansi, Uttar Pradesh`,
  description: `Terms and conditions for purchasing artisanal oyster mushroom pickles from ${BRAND.name}, Village Nandsiya, Moth, Jhansi, Uttar Pradesh - 284303.`,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Service | ${BRAND.name}`,
    description: `Plain and honest terms of service for purchasing handcrafted pickles from ${BRAND.name}, Jhansi, UP.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
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
              <Scale className="w-3.5 h-3.5 text-[#A87B28]" />
              <span>Straightforward & Fair Terms</span>
            </span>
            <h1 className="headline-luxury text-3xl sm:text-5xl font-serif text-[#211612]">
              Terms of Service
            </h1>
            <p className="text-xs text-[#736b63] font-light">
              Last updated: {lastUpdated} • {BRAND.legalName}, Moth, Jhansi (UP)
            </p>
          </div>
        </div>

        {/* Introduction Callout */}
        <div className="bg-[#1C130E] text-[#FAF6EE] rounded-3xl p-6 sm:p-8 shadow-md border border-[#C89B3C]/30">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#D4AF37] mb-3">
            Welcome to Akhil Foods
          </h2>
          <p className="text-sm sm:text-base text-[#EADBB6]/90 leading-relaxed font-light">
            These Terms of Service govern your use of this website and purchases of our handcrafted oyster mushroom pickles from <strong>{BRAND.name}</strong>. By placing an order with us, you agree to these clear and honest terms. If you have any questions or require clarification, we invite you to message us directly on WhatsApp before completing your order.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#3D2C24]">

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">1</span>
              <span>About Our Small Enterprise</span>
            </h2>
            <p>
              <strong>{BRAND.name}</strong> is an independent artisanal food kitchen owned and operated by Abhishek Kumar, located at Village Nandsiya, Karguwan Road, Near Ambedkar Murti, Moth, Jhansi, Uttar Pradesh - 284303. We hold valid Government of India food safety registrations: <strong>FSSAI Reg. No. {FSSAI_NUMBER}</strong> and GSTIN: <strong>{GST_NUMBER}</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">2</span>
              <span>Artisanal Nature of Our Pickles</span>
            </h2>
            <p>
              Our flagship product, <em>Mushroom Mela</em>, is an oyster mushroom pickle prepared in small batches using mustard oil and traditional ground spices. Because our products are handcrafted with real mushrooms and whole spices in small batches:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Slight natural variations in color, spice sharpness, oil separation, or mushroom chunk sizing between different batches are completely normal and characteristic of traditional pickles.</li>
              <li>Always use a clean, completely dry spoon when serving to preserve freshness, and ensure the top surface is submerged in mustard oil as naturally intended.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">3</span>
              <span>Pricing & Orders</span>
            </h2>
            <p>
              All prices shown on our website are in Indian National Rupees (₹) and include all applicable taxes.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Order Confirmation:</strong> An order placed on our website represents an offer to purchase. We confirm your order upon payment verification (or upon phone/WhatsApp confirmation in the case of Cash on Delivery).</li>
              <li><strong>Order Cancellation by Us:</strong> We reserve the right to cancel any order if a pin code cannot be reached by reliable couriers, if stock is temporarily exhausted due to high demand, or if there is an error in pricing or product specification. If any payment was collected, it will be refunded back immediately in full.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">4</span>
              <span>Customer Responsibilities</span>
            </h2>
            <p>
              To ensure your pickle jar reaches you safely and without courier returns, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide your accurate, full recipient name and a reachable 10-digit Indian mobile number.</li>
              <li>Provide a clear, detailed address including house/flat number, street name, nearest landmark, city, state, and exact 6-digit postal pin code.</li>
              <li>Accept delivery when the courier partner arrives. For Cash on Delivery (COD) orders, please keep exact cash ready to prevent courier delivery failure. Refusing genuine COD orders causes food waste and significant shipping losses for our small rural kitchen.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">5</span>
              <span>Payments & UPI QR</span>
            </h2>
            <p>
              We support three payment methods:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Online Payment:</strong> Via secured Indian payment gateways.</li>
              <li><strong>Pay by UPI QR:</strong> Directly from any Indian UPI app (Google Pay, PhonePe, Paytm, BHIM, Cred). You must submit the correct 12-digit UTR/Bank Reference Number after transferring so our accounts desk can verify the credit.</li>
              <li><strong>Cash on Delivery (COD):</strong> Pay in cash directly to the courier delivery executive upon receiving your sealed package.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">6</span>
              <span>Intellectual Property</span>
            </h2>
            <p>
              The trade name &quot;AKHIL FOODS&quot;, our logos, jar label artwork, product names (&quot;Mushroom Mela&quot;), photographic assets, and written content are the exclusive property of Akhil Foods. They may not be reproduced, copied, or used for commercial purposes without our prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">7</span>
              <span>Governing Law & Dispute Resolution</span>
            </h2>
            <p>
              These terms and any contracts entered into with Akhil Foods are governed by the laws of India. In the rare event of an unresolved dispute, it shall be subject to the exclusive jurisdiction of the competent courts in <strong>Jhansi, Uttar Pradesh, India</strong>.
            </p>
          </section>

          {/* Contact Block */}
          <div className="pt-6 border-t border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#211612]">
              Need Help or Want to Discuss an Order?
            </h3>
            <p className="text-sm">
              We are friendly and always happy to help our customers directly:
            </p>
            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs sm:text-sm">
              <p className="font-medium text-[#211612]"><strong>Proprietor:</strong> Abhishek Kumar</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A87B28] shrink-0" />
                <span>{BRAND.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A87B28] shrink-0" />
                <a href={TEL_LINK} className="hover:text-[#A87B28] underline">{PHONE_DISPLAY}</a>
                <span className="text-[#736b63]">(WhatsApp: wa.me/{WHATSAPP_NUMBER})</span>
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
