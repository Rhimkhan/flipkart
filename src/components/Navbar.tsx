"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, PhoneCall, User as UserIcon, Package, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE, FSSAI_NUMBER } from "@/lib/config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/track-order", label: "Track Order" },
];

function NavbarContent() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const { user, openAuthModal, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Account";

  return (
    <>
      {/* Top Fact Strip */}
      <div className="bg-[#211612] text-[#FAF6EE] text-[11px] font-mono py-1.5 px-4 text-center border-b border-[#3D2C24]">
        <span>FSSAI Lic. No. {FSSAI_NUMBER}, Jhansi, Uttar Pradesh</span>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 w-full transition-all duration-200 z-40 ${
          isScrolled
            ? "bg-[#FAF6EE] shadow-sm py-3 border-b border-[#E6DCBF]"
            : "bg-[#FAF6EE] py-4 border-b border-[#ECE2C8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Location */}
            <div className="text-left">
              <Link href="/" className="inline-flex flex-col group">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.18em] text-[#211612] group-hover:text-[#A87B28] transition-colors">
                  AKHIL FOODS
                </span>
                <span className="font-serif text-xs tracking-wider text-[#A87B28] font-medium mt-0.5">
                  Nandsiya, Moth, Jhansi
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-serif tracking-wider text-[#211612]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-1 transition-colors ${
                      isActive
                        ? "text-[#211612] font-bold border-b-2 border-[#211612]"
                        : "text-[#211612]/80 hover:text-[#A87B28]"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, Cart, Account */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-icon"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="btn-icon relative"
                aria-label="View Cart"
                title="View Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#211612] text-[#FAF6EE] text-[10px] font-bold w-4 h-4 rounded-[4px] flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* User Account Button / Dropdown */}
              <div className="relative" ref={userDropdownRef}>
                {!user ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal("signin")}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-serif text-[#211612] border border-[#211612] hover:bg-[#211612] hover:text-[#FAF6EE] transition-colors"
                    title="Login / Sign up"
                    aria-label="Login or Sign up"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-serif text-[#211612] bg-[#FDFBF7] border border-[#DDD3C4] shadow-sm hover:bg-[#EDE3C8] transition-colors"
                      aria-label="User Account Menu"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#A87B28]" />
                      <span className="max-w-[100px] truncate hidden sm:inline capitalize">
                        {displayName}
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#211612]/60" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-[6px] bg-[#FAF6EE] border border-[#DDD3C4] shadow-xl py-2 z-50">
                        <div className="px-4 py-2 border-b border-[#E8DEC8]">
                          <p className="text-xs uppercase font-serif tracking-widest text-[#A87B28] font-bold">
                            Account Member
                          </p>
                          <p className="text-xs font-medium text-[#211612] truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#211612] hover:bg-[#EDE3C8] transition-colors font-serif"
                        >
                          <Package className="w-4 h-4 text-[#A87B28]" />
                          <span>My Orders</span>
                        </Link>

                        <div className="border-t border-[#E8DEC8] my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-700 hover:bg-red-50 transition-colors font-serif text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-600" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-[6px] lg:hidden text-[#211612] hover:bg-[#EDE3C8]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expandable Search Input Bar */}
          {searchOpen && (
            <div className="pt-3 pb-1 border-t border-[#E6DCBF] mt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex items-center gap-2 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#211612]/50 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search pickle, ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF6EE] text-[#211612] rounded-[6px] border border-[#D5C6A0] focus:outline-none focus:ring-1 focus:ring-[#211612]"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[6px] bg-[#211612] text-[#FAF6EE] text-xs font-serif tracking-wider uppercase hover:bg-[#34221A] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF6EE] border-t border-[#E6DCBF] px-5 pt-5 pb-7 space-y-4 shadow-xl">
            {/* Mobile Authentication */}
            <div className="p-3 bg-[#FDFBF7] rounded-[6px] border border-[#DDD3C4]">
              {!user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signin");
                  }}
                  className="w-full py-2.5 px-4 rounded-[6px] bg-[#211612] text-[#FAF6EE] text-xs font-serif tracking-wider uppercase font-bold flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-[#C89B3C]" />
                  <span>Login / Sign up</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#211612] leading-none capitalize">
                        {displayName}
                      </p>
                      <p className="text-xs text-[#3D2C24]/60 truncate max-w-[170px] mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 rounded-[6px] bg-[#FAF6EE] border border-[#DDD3C4] text-xs font-serif text-[#211612] flex items-center justify-center gap-1.5"
                    >
                      <Package className="w-3.5 h-3.5 text-[#A87B28]" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut();
                      }}
                      className="py-2 px-3 rounded-[6px] bg-red-50 border border-red-200 text-xs font-serif text-red-700 flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Plain Nav Links */}
            <div className="space-y-1 font-serif text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-[6px] transition-colors ${
                    pathname === link.href
                      ? "bg-[#211612] text-[#FAF6EE] font-bold"
                      : "text-[#211612] hover:bg-[#EDE3C8]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Direct WhatsApp Ordering */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-[6px] bg-[#211612] text-[#FAF6EE] text-xs font-serif tracking-wider uppercase font-bold flex items-center justify-center gap-2 border border-[#211612]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 w-full z-40 bg-[#FAF6EE] py-4 border-b border-[#ECE2C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <span className="font-serif text-2xl font-bold tracking-wider text-[#211612]">
              AKHIL FOODS
            </span>
          </div>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
