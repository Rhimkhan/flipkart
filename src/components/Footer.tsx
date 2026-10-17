"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Heart,
  Award,
  Sparkles,
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
    <footer className="bg-[#4A231B] text-[#FFF8E7] border-t-4 border-[#6B352A] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#6B352A]/60 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#6B352A] flex items-center justify-center text-[#FFF1A6] mb-3 shadow-sm border border-[#FFF1A6]/20">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-sm text-[#FFF1A6]">Clay Pot Aged</h4>
            <p className="text-xs text-[#FFF8E7]/70 mt-1">Fermented naturally in Mitti Handi</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#6B352A] flex items-center justify-center text-[#FFF1A6] mb-3 shadow-sm border border-[#FFF1A6]/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-sm text-[#FFF1A6]">0% Preservatives</h4>
            <p className="text-xs text-[#FFF8E7]/70 mt-1">No sodium benzoate or chemicals</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#6B352A] flex items-center justify-center text-[#FFF1A6] mb-3 shadow-sm border border-[#FFF1A6]/20">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-sm text-[#FFF1A6]">Cold-Pressed Mustard Oil</h4>
            <p className="text-xs text-[#FFF8E7]/70 mt-1">Pure wood-pressed Kacchi Ghani</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#6B352A] flex items-center justify-center text-[#FFF1A6] mb-3 shadow-sm border border-[#FFF1A6]/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-sm text-[#FFF1A6]">Fresh Farm Harvested</h4>
            <p className="text-xs text-[#FFF8E7]/70 mt-1">Button, Oyster & Shiitake daily</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info & Social Icons */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFF1A6]/80 bg-[#2B1B17]">
                <Image
                  src={BRAND.logo}
                  alt={BRAND.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FFF1A6]">
                  {BRAND.name}
                </span>
                <p className="text-xs text-[#FFF8E7]/80 uppercase tracking-widest">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-[#FFF8E7]/80 leading-relaxed max-w-sm">
              {BRAND.subTagline}. Every batch is crafted in small micro-lots using ancient Himalayan recipes and 100% natural ingredients.
            </p>

            {/* FSSAI License Number Placeholder */}
            <div className="text-xs text-[#FFF1A6] font-mono bg-[#6B352A]/60 px-3.5 py-2 rounded-xl inline-flex items-center gap-2 border border-[#FFF1A6]/25">
              <span>🛡️</span>
              <span><strong>FSSAI Lic. No.</strong> 10923999000184</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#FFF1A6] mb-2 uppercase tracking-wider">Follow Our Harvest:</p>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={BRAND.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#6B352A] hover:bg-[#FFF1A6] text-[#FFF1A6] hover:text-[#4A231B] flex items-center justify-center transition-all border border-[#FFF1A6]/20"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={BRAND.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#6B352A] hover:bg-[#FFF1A6] text-[#FFF1A6] hover:text-[#4A231B] flex items-center justify-center transition-all border border-[#FFF1A6]/20"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.8C10.5 0 9 1.5 9 4.5V8z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={BRAND.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#6B352A] hover:bg-[#FFF1A6] text-[#FFF1A6] hover:text-[#4A231B] flex items-center justify-center transition-all border border-[#FFF1A6]/20"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all shadow-sm"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#FFF1A6]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#FFF8E7]/80">
              <li>
                <Link href="/" className="hover:text-[#FFF1A6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#FFF1A6] transition-colors">
                  Shop All Pickles
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#FFF1A6] transition-colors">
                  Our Clay-Pot Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFF1A6] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#FFF1A6] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFF1A6] transition-colors">
                  FAQ & Shelf Life
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#FFF1A6]">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF8E7]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFF1A6] shrink-0 mt-0.5" />
                <span>Solan, Himachal Pradesh 173212, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFF1A6] shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-[#FFF1A6]">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFF1A6] shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#FFF1A6]">
                  {BRAND.email}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="text-xs text-[#FFF1A6]/80 hover:text-white underline underline-offset-4"
                >
                  Store Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#FFF1A6]">Stay in the Loop</h4>
            <p className="text-xs text-[#FFF8E7]/70">
              Subscribe for harvest drops, seasonal flavours, and secret coupon discounts.
            </p>
            {subscribed ? (
              <div className="bg-[#6B352A] p-3 rounded-xl border border-[#FFF1A6]/30 text-xs text-[#FFF1A6] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Use coupon <strong>AKHIL10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2B1B17] border border-[#6B352A] text-sm text-[#FFF8E7] placeholder-[#FFF8E7]/40 focus:outline-none focus:ring-2 focus:ring-[#FFF1A6]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-semibold text-xs transition-colors shadow-sm"
                >
                  Join Tasting Club
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#6B352A]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8E7]/60 gap-4">
          <p>© 2026 {BRAND.name}. All rights reserved. Handcrafted with pride in India.</p>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-[#FFF1A6]">Shipping & Returns</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#FFF1A6]">Privacy & Terms</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#FFF1A6]">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
