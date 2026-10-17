"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, PhoneCall, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top artisanal announcement bar (Deep Clay & Soft Butter) */}
      <div className="bg-[#4A231B] text-[#FFF1A6] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#6B352A]/40">
        <span className="inline-block w-2 h-2 rounded-full bg-[#FFF1A6] animate-pulse"></span>
        <span>
          Clay-Pot Aged Artisanal Mushroom Pickles | Free Shipping over ₹{BRAND.freeShippingThreshold} | Use Code:{" "}
          <strong className="underline underline-offset-2 tracking-wider text-[#FFF1A6]">AKHIL10</strong>
        </span>
      </div>

      {/* Main Sticky Navbar (Shrinks smoothly on scroll) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#6B352A]/95 backdrop-blur-md shadow-lg py-2 border-b border-[#FFF1A6]/15"
            : "bg-[#6B352A] py-3.5 border-b border-[#4A231B]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#FFF1A6]/80 shadow-md group-hover:scale-105 transition-transform bg-[#2B1B17]">
                <Image
                  src={BRAND.logo}
                  alt={`${BRAND.name} Emblem`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#FFF1A6] drop-shadow-sm group-hover:text-white transition-colors">
                  {BRAND.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#FFF8E7]/80">
                  {BRAND.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#FFF8E7]">
              <Link
                href="/"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/shop"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/our-story"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                Our Story
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/gallery"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/faq"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/track-order"
                className="hover:text-[#FFF1A6] transition-colors py-1 relative group text-[#FFF1A6]/90"
              >
                Track Order
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFF1A6] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/admin"
                className="text-xs px-2.5 py-1 rounded-full bg-[#4A231B] text-[#FFF1A6] hover:bg-[#A8553F] transition-all flex items-center gap-1 border border-[#FFF1A6]/20"
                title="Admin Management Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFF1A6]" />
                Admin
              </Link>
            </nav>

            {/* Right actions: WhatsApp CTA + Cart trigger with item count */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-[#A8553F] hover:bg-[#873E2C] text-[#FFF1A6] border border-[#FFF1A6]/30 shadow-sm transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Cart Drawer Trigger with item count */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2.5 rounded-full bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] shadow-md transition-transform active:scale-95 group"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#6B352A] group-hover:scale-110 transition-transform" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#A8553F] text-[#FFF1A6] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#6B352A] animate-bounce">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg lg:hidden text-[#FFF1A6] hover:bg-[#4A231B] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#4A231B] border-t border-[#6B352A] px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              Shop
            </Link>
            <Link
              href="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              Our Story
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              Gallery
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF8E7] hover:bg-[#6B352A] hover:text-[#FFF1A6]"
            >
              Contact
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#FFF1A6] hover:bg-[#6B352A]"
            >
              Track Order Status
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#FFF1A6]/80 hover:bg-[#6B352A]"
            >
              🔒 Admin Portal
            </Link>

            <div className="pt-2 border-t border-[#6B352A]/80">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#A8553F] text-[#FFF1A6] font-semibold text-sm shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Instant WhatsApp Order</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
