import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function StoryCraftShowcase() {
  const steps = [
    {
      step: "01",
      title: "Fresh Oyster Harvest & Prep",
      desc: "Selected fresh oyster mushrooms are hand-trimmed, washed in filtered water, and gently prepared to lock in tenderness and meaty texture.",
      image: "/images/solan-harvest.jpg",
    },
    {
      step: "02",
      title: "Pure Mustard Oil & Whole Spices",
      desc: "Steeped in pure cold-pressed mustard oil with roasted coriander seeds, mustard, fennel, fenugreek, cumin, turmeric, ajwain, fresh ginger, and garlic.",
      image: "/images/spices-mustard-oil.jpg",
    },
    {
      step: "03",
      title: "Artisanal Curing in Moth, Jhansi",
      desc: "Slowly aged in traditional batches under the Uttar Pradesh sun to achieve the unmistakable deep tangy, savoury flavor profile.",
      image: "/images/clay-pot-aging.jpg",
    },
  ];

  return (
    <div className="space-y-8 my-8">
      {/* 3 Step Visual Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => (
          <div
            key={item.step}
            className="clay-card rounded-[28px] overflow-hidden bg-white border border-[#6B352A]/15 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1B17]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/80 via-transparent to-transparent" />
              <span className="absolute top-3.5 left-3.5 bg-[#FFF1A6] text-[#4A231B] text-xs font-black px-3 py-1 rounded-full shadow-md border border-[#6B352A]/20">
                Step {item.step}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#4A231B] group-hover:text-[#6B352A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#6B352A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Homemade Process</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Craft Banner */}
      <div className="bg-[#4A231B] text-[#FFF8E7] rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#FFF1A6]/25 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF1A6] text-[#4A231B] flex items-center justify-center font-serif font-black text-xl shadow-md shrink-0">
            🌾
          </div>
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#FFF1A6]">
              Handcrafted in Village Nandsiya, Moth, Jhansi
            </h4>
            <p className="text-xs text-[#FFF8E7]/80 mt-0.5">
              Operating with active FSSAI License No. {BRAND.fssaiNumber} under strict food hygiene standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-[#6B352A] text-[#FFF1A6] text-xs font-semibold px-4 py-2 rounded-xl border border-[#FFF1A6]/20">
            No Artificial Shortcuts
          </span>
        </div>
      </div>
    </div>
  );
}
