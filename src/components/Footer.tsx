"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import {
  WHATSAPP_NUMBER,
  PHONE_DISPLAY,
  TEL_LINK,
  WHATSAPP_DEFAULT_MESSAGE,
  FSSAI_NUMBER,
  FSSAI_VALIDITY,
  GST_NUMBER,
  UDYAM_NUMBER,
} from "@/lib/config";
import {
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Mail,
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#160E0A] text-[#FAF6EE] border-t border-[#C89B3C]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Facts Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#C89B3C]/20 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-[6px] bg-[#2A1D17] flex items-center justify-center text-[#D4AF37] mb-3 border border-[#C89B3C]/25">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-sm text-[#FAF6EE]">Village Nandsiya</h3>
            <p className="text-xs text-[#EADBB6]/70 mt-1 font-light">Moth, Jhansi, Uttar Pradesh</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-[6px] bg-[#2A1D17] flex items-center justify-center text-[#D4AF37] mb-3 border border-[#C89B3C]/25">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-sm text-[#FAF6EE]">Label Ingredients</h3>
            <p className="text-xs text-[#EADBB6]/70 mt-1 font-light">Mustard oil, spices, vinegar</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-[6px] bg-[#2A1D17] flex items-center justify-center text-[#D4AF37] mb-3 border border-[#C89B3C]/25">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-sm text-[#FAF6EE]">400 g Net Quantity</h3>
            <p className="text-xs text-[#EADBB6]/70 mt-1 font-light">MRP Rs 399 per jar</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-[6px] bg-[#2A1D17] flex items-center justify-center text-[#D4AF37] mb-3 border border-[#C89B3C]/25">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-semibold text-sm text-[#FAF6EE]">FSSAI Registered</h3>
            <p className="text-xs text-[#EADBB6]/70 mt-1 font-light">Lic. No. {FSSAI_NUMBER}</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info & Social Icons */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-[6px] overflow-hidden border border-[#C89B3C]/50 bg-[#120B08]">
                <Image
                  src={BRAND.logo}
                  alt={`${BRAND.name} Logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF6EE]">
                  {BRAND.name}
                </span>
                <p className="text-xs font-serif text-[#D4AF37] tracking-wider mt-0.5">Nandsiya, Moth, Jhansi</p>
              </div>
            </div>
            <p className="text-sm text-[#EADBB6]/85 leading-relaxed max-w-sm font-light">
              Mushroom Mela oyster mushroom pickle made by Akhil Foods in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.
            </p>

            {/* Government Registrations */}
            <div className="space-y-2 pt-1">
              <div className="text-xs text-[#D4AF37] font-mono bg-[#2A1D17] px-3.5 py-2 rounded-[6px] flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1 border border-[#C89B3C]/30">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>FSSAI Lic. No. {FSSAI_NUMBER}</span>
                </span>
                <span className="text-caption text-[#EADBB6]/80">(Valid till {FSSAI_VALIDITY})</span>
              </div>
              <div className="flex flex-wrap gap-2 text-caption font-mono text-[#EADBB6]">
                <span className="bg-[#2A1D17] px-3 py-1.5 rounded-[6px] border border-[#C89B3C]/20">
                  GSTIN: <strong className="text-[#D4AF37]">{GST_NUMBER}</strong>
                </span>
                <span className="bg-[#2A1D17] px-3 py-1.5 rounded-[6px] border border-[#C89B3C]/20">
                  Udyam: <strong className="text-[#D4AF37]">{UDYAM_NUMBER}</strong>
                </span>
              </div>
            </div>

            {/* Contact links */}
            <div className="pt-2">
              <p className="text-xs font-serif tracking-wider uppercase text-[#D4AF37] mb-2 font-medium">Contact:</p>
              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-[6px] bg-[#2A1D17] hover:bg-[#34221A] text-[#D4AF37] text-xs font-serif border border-[#C89B3C]/30 transition-colors flex items-center gap-1.5"
                  aria-label="WhatsApp"
                >
                  <span>WhatsApp: {PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider">Navigation</h3>
            <ul className="space-y-2.5 text-sm text-[#EADBB6]/80 font-light">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#D4AF37] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#D4AF37] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#D4AF37] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Address */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider">Address & Details</h3>
            <ul className="space-y-2.5 text-sm text-[#EADBB6]/80 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={TEL_LINK} className="hover:text-[#D4AF37]">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#D4AF37]">
                  {BRAND.email}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/track-order"
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Email Updates */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider">Updates</h3>
            <p className="text-sm text-[#EADBB6]/85 font-light">
              Enter your email for batch readiness and availability updates.
            </p>
            {subscribed ? (
              <div className="bg-[#2A1D17] p-3 rounded-[6px] border border-[#C89B3C]/30 text-xs text-[#D4AF37] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. Your email has been saved.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-[6px] bg-[#120B08] border border-[#C89B3C]/30 text-xs text-[#FAF6EE] placeholder-[#EADBB6]/40 focus:outline-none focus:ring-1 focus:ring-[#C89B3C]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-[6px] bg-[#C89B3C] hover:bg-[#D4AF37] text-[#211612] font-serif font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & Policy Links */}
        <div className="pt-8 border-t border-[#C89B3C]/20 flex flex-col md:flex-row items-center justify-between text-xs text-[#EADBB6]/70 gap-4 font-light">
          <p>© 2026 {BRAND.name}. All rights reserved. Village Nandsiya, Moth, Jhansi, Uttar Pradesh.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 gap-y-1.5">
            <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms and Conditions</Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-[#D4AF37] transition-colors">Refund Policy</Link>
            <span>•</span>
            <Link href="/certificates" className="hover:text-[#D4AF37] transition-colors">Official Certificates</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
