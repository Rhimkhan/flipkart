import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Award, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function OurStoryPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full">
            Generational Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#6B352A] leading-tight">
            Reviving The Ancient Heritage of Clay-Pot Mushroom Pickling
          </h1>
          <p className="text-base text-[#2B1B17]/80 leading-relaxed">
            In an era of mass-produced industrial food loaded with synthetic chemicals and artificial vinegar, {BRAND.name} was born out of a quiet rebellion in Solan, Himachal Pradesh.
          </p>
        </div>

        {/* Story Section 1: The Solan Mushroom Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-[#6B352A]/15 shadow-2xl">
              <Image
                src="/images/hero-pickle.jpg"
                alt="Clay jar aging process"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#6B352A] uppercase tracking-wider">Chapter I</span>
            <h2 className="font-serif text-3xl font-bold text-[#6B352A]">
              Born in India’s Mushroom Capital
            </h2>
            <p className="text-sm text-[#2B1B17]/80 leading-relaxed">
              Solan, cradled in the pristine foothills of Himachal Pradesh, has long been renowned as the &ldquo;Mushroom City of India&rdquo;. Our family grew up with the delicate art of cultivating Button, velvety Oyster (Dhingri), and medicinal Shiitake mushrooms in crisp mountain air and mineral-rich spring water.
            </p>
            <p className="text-sm text-[#2B1B17]/80 leading-relaxed">
              Every winter, our grandmother would take freshly plucked mushrooms, sun-dry them on woven bamboo mats to lock in their meatiness, and steep them inside glazed ceramic barnis and earthenware pots with cold-pressed mustard oil.
            </p>
          </div>
        </div>

        {/* Story Section 2: Why Clay Matters */}
        <div className="bg-[#6B352A] text-[#FFF8E7] rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#FFF1A6] bg-[#4A231B] px-3.5 py-1 rounded-full border border-[#FFF1A6]/20">
                The Science of Mitti Handi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF1A6] leading-tight">
                Why We Insist on Fermenting in Porous Earthenware
              </h2>
              <p className="text-sm text-[#FFF8E7]/80 leading-relaxed">
                Industrial factories pickle in massive stainless steel vats with chemical acid regulators. But steel cannot breathe. Traditional unglazed and ceramic terracotta pots possess natural microscopic porosity that allows slow, gentle oxygen exchange.
              </p>
              <p className="text-sm text-[#FFF8E7]/80 leading-relaxed">
                This breathing process eliminates harsh bitter edges, naturally alkalizes acidity, and encourages beneficial probiotic bacterial strains to thrive. The result is a smooth, complex, deep umami that no factory jar can ever replicate.
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#FFF1A6]/20 shadow-xl">
              <Image
                src="/images/classic-masala.jpg"
                alt="Clay Pot Achar"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Brand Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#6B352A]">Our 4 Golden Principles</h2>
            <p className="text-xs sm:text-sm text-stone-600">The sacred guidelines behind every single jar we bottle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">01</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">No Synthetic Vinegar</h3>
              <p className="text-xs text-[#2B1B17]/75">
                We only use sendha namak (rock salt), sun curing, and natural raw mango extract to achieve natural tang.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">02</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Wood-Pressed Oil Only</h3>
              <p className="text-xs text-[#2B1B17]/75">
                Zero refined palm or sunflower oil. Only pure single-origin mustard seeds pressed in traditional wooden Kolhus.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">03</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Fresh Harvest Everyday</h3>
              <p className="text-xs text-[#2B1B17]/75">
                We harvest mushrooms the very morning they are prepared. No canned or rehydrated commercial mushrooms.
              </p>
            </div>

            <div className="clay-card p-6 bg-white space-y-3">
              <div className="text-2xl font-bold text-[#6B352A]">04</div>
              <h3 className="font-serif text-base font-bold text-[#6B352A]">Small Micro-Batches</h3>
              <p className="text-xs text-[#2B1B17]/75">
                Each batch is restricted to 100 jars. Inspected, tasted, and hand-labelled before it leaves our Solan facility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all"
          >
            <span>Experience Our Artisanal Flavours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
