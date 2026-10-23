import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, FileText, Phone, Mail, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, TEL_LINK, FSSAI_NUMBER, GST_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.name} - Artisanal Pickles Jhansi`,
  description: `Privacy policy for ${BRAND.name}, Village Nandsiya, Moth, Jhansi, Uttar Pradesh. Learn how we handle your personal data honestly and safely when you order our handcrafted oyster mushroom pickles.`,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `Privacy Policy | ${BRAND.name}`,
    description: `Transparent and honest privacy practices for ${BRAND.name}. We respect your data and never sell your personal information.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-3.5 h-3.5 text-[#A87B28]" />
              <span>Customer Trust & Data Honesty</span>
            </span>
            <h1 className="headline-luxury text-3xl sm:text-5xl font-serif text-[#211612]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#736b63] font-light">
              Last updated: {lastUpdated} • {BRAND.legalName}, Moth, Jhansi (UP)
            </p>
          </div>
        </div>

        {/* Introduction Callout */}
        <div className="bg-[#2D4F36] text-[#FAF6EE] rounded-3xl p-6 sm:p-8 shadow-md border border-[#3D6948]">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#FAF6EE] mb-3">
            Our Promise to You
          </h2>
          <p className="text-sm sm:text-base text-[#FAF6EE]/90 leading-relaxed font-light">
            At <strong>{BRAND.name}</strong>, we are a small food kitchen in Village Nandsiya, Moth, Jhansi, dedicated to making genuine, handcrafted oyster mushroom pickles. We believe in complete transparency with our patrons. We only collect the minimal personal information necessary to deliver our pickles to your home, and we will never sell, rent, or abuse your private details.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[#3D2C24]">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">1</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              When you browse our catalog, make an order, or get in touch with us, we may ask you for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#3D2C24]">
              <li><strong>Contact Information:</strong> Your full name, active mobile number, WhatsApp number, and email address.</li>
              <li><strong>Delivery Information:</strong> Your complete shipping address, nearby landmarks, city, state, and 6-digit postal pin code.</li>
              <li><strong>Order Details:</strong> The pickle items ordered, jar sizes (400g), total amounts, and payment mode chosen (COD, UPI QR, or Online Payment).</li>
              <li><strong>Technical Data:</strong> Standard server logs, IP addresses (used strictly for spam and rate-limit prevention), and essential browser session cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>We use your information exclusively for legitimate business and fulfillment purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To prepare, pack, and ship your pickle orders from our Jhansi kitchen.</li>
              <li>To send you order confirmations, courier dispatch tracking links, and delivery updates via SMS, WhatsApp, or email.</li>
              <li>To contact you if a delivery address is incomplete, pin code is unclear, or the courier delivery partner requires directions.</li>
              <li>To respond to your questions, feedback, or support requests regarding your order.</li>
              <li>To prevent fraudulent orders, abuse of cash-on-delivery, or unauthorized website activities.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">3</span>
              <span>Payment Security</span>
            </h2>
            <p>
              <strong>We never see or store your private payment card numbers, CVVs, net banking credentials, or UPI PINs.</strong>
            </p>
            <p>
              When you pay online via payment gateway (e.g. Razorpay), all transaction details are processed over encrypted 256-bit SSL connections directly by RBI-authorized payment aggregators conforming to PCI-DSS standards. For UPI QR payments, you verify the transaction through your own mobile UPI application (Google Pay, PhonePe, Paytm, BHIM) and provide the 12-digit UTR reference number for our accounting team to confirm.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">4</span>
              <span>Sharing of Personal Information</span>
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, monetize, or trade your contact details with external marketing agencies or third-party advertisers. Your information is shared only with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Courier & Delivery Partners:</strong> Such as India Post, Delhivery, DTDC, or local logistics agents solely to deliver your package to your doorstep and contact you upon arrival.</li>
              <li><strong>Legal & Regulatory Authorities:</strong> If strictly required under Indian law, food safety regulations (FSSAI), tax compliance (GST), or valid court orders.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">5</span>
              <span>Cookies & Analytics</span>
            </h2>
            <p>
              Our website uses basic functional cookies to keep track of your shopping cart and maintain a smooth checkout experience. We do not use intrusive spyware or third-party tracking networks to profile you across other websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#211612] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#EFE8DD] text-[#A87B28] flex items-center justify-center text-xs font-bold">6</span>
              <span>Your Rights & Access</span>
            </h2>
            <p>
              You have the right to request a copy of the personal details we hold about you, or to ask us to correct or delete your contact records once your order has been successfully fulfilled. To do so, simply send us an email or message on WhatsApp.
            </p>
          </section>

          {/* Contact Block */}
          <div className="pt-6 border-t border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#211612]">
              Questions or Concerns Regarding Privacy?
            </h3>
            <p className="text-sm">
              If you have any questions regarding how your data is handled, please get in touch with the proprietor:
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
              <p className="text-[#736b63] text-xs pt-1">
                FSSAI Reg. No. {FSSAI_NUMBER} • GSTIN: {GST_NUMBER}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
