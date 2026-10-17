"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const extendedFaqs = [
    ...FAQS,
    {
      question: "Are Akhil Foods pickles 100% vegetarian & vegan?",
      answer:
        "Yes, 100%! All our pickles are plant-based and vegan-friendly. We use purely fresh farm mushrooms, raw cold-pressed mustard oil, whole spices, and rock salt. No dairy, no animal fats, and no artificial flavour enhancers.",
    },
    {
      question: "Can children and seniors consume this pickle?",
      answer:
        "Yes! Because we use genuine digestive spices like roasted fenugreek (methi), kalonji, ginger, and turmeric aged naturally in clay, it is gentle on digestion. For milder palates, we recommend our Heritage Mustard Oil Button Mushroom pickle or Classic Masala.",
    },
    {
      question: "How do you pack the glass jars for courier transit so they don't break?",
      answer:
        "Every single glass jar is encased inside a custom honeycomb shock-absorbing sleeve, followed by double-walled corrugated outer boxing. Our transit damage rate is less than 0.1%. In the rare event of damage, we dispatch a free replacement immediately.",
    },
    {
      question: "Do you offer wedding gifting or corporate hampers?",
      answer:
        "Yes! We create bespoke earthen handi sets and wooden crate gift boxes with customized greeting tags for weddings, Diwali, and corporate gifts. Contact our care team via WhatsApp or email for custom quotes.",
    },
  ];

  const filteredFaqs = extendedFaqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full">
            Knowledge Base
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Find answers to commonly asked questions about our traditional clay fermentation, ingredients, and courier safety.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search questions (e.g. shelf life, oil, shipping)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#6B352A]/20 text-xs text-[#2B1B17] focus:outline-none focus:ring-2 focus:ring-[#6B352A] shadow-sm"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#6B352A]/15 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-sm sm:text-base text-[#6B352A] hover:bg-[#FFF8E7]/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A8553F] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#2B1B17]/80 leading-relaxed border-t border-stone-100 bg-[#FFF8E7]/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="bg-[#FFF1A6] p-8 rounded-3xl border border-[#EAD075] text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-[#6B352A] mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#6B352A]">Still Have Questions?</h3>
            <p className="text-xs text-[#4A231B]/80 max-w-md mx-auto">
              Our master picklers in Solan are always happy to talk about traditional recipes, ingredients, and dispatch details.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20Akhil%20Foods,%20I%20have%20a%20question%20about%20your%20pickles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#6B352A] text-[#FFF1A6] font-bold text-xs hover:bg-[#4A231B] transition-colors"
            >
              Contact Support Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
