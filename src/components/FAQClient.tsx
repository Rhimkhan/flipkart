"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FAQ_DATA, FAQItem } from "@/lib/faq-data";


export default function FAQClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { key: "all", label: "All Questions" },
    { key: "ingredients", label: "Ingredients & Purity" },
    { key: "preparation", label: "Preparation & Location" },
    { key: "storage", label: "Shelf Life & Care" },
    { key: "shipping", label: "Packaging & Delivery" },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-[#FFFBEF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Customer Knowledge Base</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Everything you need to know about our Mushroom Mela Oyster Mushroom Pickle, ingredients, certifications, and delivery.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search questions (e.g. oil, shelf life, shipping, vegan)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#6B352A]/20 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A] shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? "bg-[#6B352A] text-[#FFF1A6] shadow-sm scale-105"
                  : "bg-white text-[#2B1B17]/80 hover:bg-[#FFF8E7] border border-[#6B352A]/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#6B352A]/15 p-8 space-y-3">
              <p className="text-sm text-stone-600">No questions matched &ldquo;{search}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="text-xs font-bold text-[#6B352A] underline"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#6B352A]/15 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-sm sm:text-base text-[#6B352A] hover:bg-[#FFF8E7]/40 transition-colors gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#A8553F] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[#2B1B17]/85 leading-relaxed border-t border-stone-100 bg-[#FFF8E7]/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-[#FFF1A6] p-8 sm:p-10 rounded-3xl border border-[#EAD075] text-center space-y-4 shadow-sm">
          <HelpCircle className="w-10 h-10 text-[#6B352A] mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#6B352A]">Still Have Any Questions?</h3>
            <p className="text-xs sm:text-sm text-[#4A231B]/80 max-w-md mx-auto leading-relaxed">
              Our team in Jhansi is always happy to discuss ingredients, certificates, and delivery statuses directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20Akhil%20Foods,%20I%20have%20a%20question%20about%20your%20artisanal%20mushroom%20pickles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp Directly</span>
            </a>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-full bg-[#6B352A] text-[#FFF1A6] font-bold text-xs hover:bg-[#4A231B] transition-colors"
            >
              Contact Support Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
