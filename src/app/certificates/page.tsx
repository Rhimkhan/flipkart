import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FSSAI_NUMBER, FSSAI_VALIDITY, GST_NUMBER, UDYAM_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: `Provenance & Authenticity | ${BRAND.name} - FSSAI, GST, Udyam`,
  description: `The story of provenance, slow-curing, and official government certifications for ${BRAND.name}, Village Nandsiya, Moth, Jhansi, Uttar Pradesh. FSSAI Lic. No. ${FSSAI_NUMBER}, GSTIN ${GST_NUMBER}, Udyam ${UDYAM_NUMBER}.`,
  openGraph: {
    title: `Provenance & Government Accreditations | ${BRAND.name}`,
    description: `Discover how our oyster mushroom pickles are hand-cured in Moth, Jhansi, backed by verified FSSAI, GST, and Udyam certifications.`,
    url: `${BRAND.url}/certificates`,
    type: "website",
  },
};

export default function CertificatesPage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen py-14 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Luxury Editorial Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="eyebrow-luxury text-[#A87B28] bg-[#EFE8DD] px-4 py-1.5 rounded-full border border-[#DDD3C4] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A87B28]" />
            <span>Provenance, Craft & Official Integrity</span>
          </span>
          <h1 className="headline-luxury text-3xl sm:text-5xl md:text-6xl text-[#211612] font-normal">
            The Provenance of Purity
          </h1>
          <p className="editorial-body text-[#3D2C24] max-w-2xl mx-auto font-light">
            Before a jar of <strong>Mushroom Mela</strong> reaches your table, it begins as an unhurried culinary tradition in Village Nandsiya, Moth, Jhansi. Our government registrations are the ultimate seals of our uncompromising quality and food safety.
          </p>
        </div>

        {/* Immersive Narrative Chapter: The Harvest & Curing Tradition */}
        <div className="bg-[#1C130E] text-[#FAF6EE] rounded-3xl p-8 sm:p-12 border border-[#C89B3C]/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <span className="eyebrow-luxury text-[#D4AF37] flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>An Unhurried Heritage Ritual</span>
            </span>
            <h2 className="headline-luxury text-2xl sm:text-3xl lg:text-4xl text-[#FAF6EE] font-normal">
              Cultivated in Jhansi. Cured in Cold-Pressed Mustard Oil.
            </h2>
            <p className="editorial-body text-[#EADBB6]/90 leading-relaxed max-w-3xl font-light">
              In the heart of the Bundelkhand plains, tender oyster mushrooms are hand-harvested at dawn, carefully inspected, gently washed, and trimmed to preserve their naturally succulent, meaty texture.
            </p>
            <p className="editorial-body text-[#EADBB6]/90 leading-relaxed max-w-3xl font-light">
              We steep the mushrooms in cold-pressed virgin mustard oil, blending them with freshly crushed coriander, whole mustard seeds, fenugreek, fennel, cumin, and fragrant ajwain. Slow-cured under the Indian sun, each small batch develops an unforgettable depth of umami, pungency, and tangy perfection without industrial shortcuts.
            </p>
          </div>

          {/* Understated Legal Entity Provenance Strip */}
          <div className="relative z-10 pt-6 border-t border-[#C89B3C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#EADBB6]/80 font-light">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{BRAND.legalName} • {BRAND.address}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#2A1D17] text-[#D4AF37] border border-[#C89B3C]/30 font-serif font-semibold text-caption tracking-wider uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Registered & Verified Agro-Kitchen</span>
            </div>
          </div>
        </div>

        {/* 3 Illuminated Seals of Government Integrity & Compliance */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="eyebrow-luxury text-[#A87B28]">Official Accreditations</span>
            <h2 className="headline-luxury text-2xl sm:text-3xl text-[#211612] font-normal">
              Seals of Authenticity & Food Safety
            </h2>
            <p className="editorial-body text-[#3D2C24] text-sm font-light">
              Our registered certifications are held to the highest national food safety and commercial compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Seal 1: FSSAI Food Safety */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 sm:p-8 border border-[#E8DEC8] hover:border-[#C89B3C]/40 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-2xl shadow-inner">
                  🏛️
                </div>
                <div className="space-y-1">
                  <span className="eyebrow-luxury text-[#A87B28] block text-caption">
                    Food Safety & Purity
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#211612]">
                    FSSAI License
                  </h3>
                </div>

                <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#E8DEC8] space-y-1">
                  <p className="text-caption font-serif font-semibold text-stone-500 uppercase tracking-wider">
                    License Number
                  </p>
                  <p className="font-mono text-base font-extrabold text-[#211612] tracking-wide select-all">
                    {FSSAI_NUMBER}
                  </p>
                </div>

                <div className="space-y-2 editorial-body text-xs sm:text-sm text-[#3D2C24] font-sans leading-relaxed font-light">
                  <p>
                    <strong className="text-[#211612] font-serif">Authority:</strong> Food Safety & Standards Authority of India, Ministry of Health & Family Welfare.
                  </p>
                  <div className="flex items-center gap-1.5 text-stone-600 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#A87B28]" />
                    <span>Valid through: <strong>{FSSAI_VALIDITY}</strong></span>
                  </div>
                  <p className="text-stone-600 text-xs pt-1">
                    Licensed for small-batch artisanal mushroom pickle curing, sterile glass bottling, and all-India courier fulfillment.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8DEC8] mt-6">
                <a
                  href="/certificates/fssai-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#211612] hover:bg-[#34221A] text-[#FAF6EE] font-serif font-bold text-xs tracking-wider uppercase shadow-md transition-all border border-[#211612]"
                >
                  <span>View Official FSSAI PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Seal 2: GST Commercial Compliance */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 sm:p-8 border border-[#E8DEC8] hover:border-[#C89B3C]/40 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-2xl shadow-inner">
                  📑
                </div>
                <div className="space-y-1">
                  <span className="eyebrow-luxury text-[#A87B28] block text-caption">
                    Commercial Integrity
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#211612]">
                    GST Registration
                  </h3>
                </div>

                <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#E8DEC8] space-y-1">
                  <p className="text-caption font-serif font-semibold text-stone-500 uppercase tracking-wider">
                    GSTIN Identification
                  </p>
                  <p className="font-mono text-base font-extrabold text-[#211612] tracking-wide select-all">
                    {GST_NUMBER}
                  </p>
                </div>

                <div className="space-y-2 editorial-body text-xs sm:text-sm text-[#3D2C24] font-sans leading-relaxed font-light">
                  <p>
                    <strong className="text-[#211612] font-serif">Authority:</strong> Goods & Services Tax Network, Department of Revenue, Ministry of Finance.
                  </p>
                  <p className="text-stone-600 text-xs">
                    <strong className="text-[#211612] font-serif">Jurisdiction:</strong> Uttar Pradesh (State Code 09).
                  </p>
                  <p className="text-stone-600 text-xs pt-1">
                    Verified entity ensuring lawful, transparent taxation, official invoices, and genuine pan-India consignment transit.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8DEC8] mt-6">
                <div className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] text-[#211612] font-semibold text-xs text-center border border-[#E8DEC8] tracking-wider font-mono">
                  GSTIN Active • State Code 09
                </div>
              </div>
            </div>

            {/* Seal 3: Udyam MSME Recognition */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 sm:p-8 border border-[#E8DEC8] hover:border-[#C89B3C]/40 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#EFE8DD] border border-[#DDD3C4] flex items-center justify-center text-2xl shadow-inner">
                  🏭
                </div>
                <div className="space-y-1">
                  <span className="eyebrow-luxury text-[#A87B28] block text-caption">
                    Enterprise Recognition
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#211612]">
                    Udyam MSME Reg.
                  </h3>
                </div>

                <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#E8DEC8] space-y-1">
                  <p className="text-caption font-serif font-semibold text-stone-500 uppercase tracking-wider">
                    Udyam Certificate No.
                  </p>
                  <p className="font-mono text-base font-extrabold text-[#211612] tracking-wide select-all">
                    {UDYAM_NUMBER}
                  </p>
                </div>

                <div className="space-y-2 editorial-body text-xs sm:text-sm text-[#3D2C24] font-sans leading-relaxed font-light">
                  <p>
                    <strong className="text-[#211612] font-serif">Authority:</strong> Ministry of Micro, Small & Medium Enterprises, Govt. of India.
                  </p>
                  <p className="text-stone-600 text-xs">
                    <strong className="text-[#211612] font-serif">Classification:</strong> Micro Agro-Processing Enterprise.
                  </p>
                  <p className="text-stone-600 text-xs pt-1">
                    Honouring our local agrarian heritage and empowering cottage food craft in rural Jhansi, Uttar Pradesh.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8DEC8] mt-6">
                <div className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] text-[#211612] font-semibold text-xs text-center border border-[#E8DEC8] tracking-wider font-mono">
                  Udyam Registered Agro Unit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Atelier Guarantee & Call to Acquire */}
        <div className="bg-[#1C130E] rounded-3xl p-8 sm:p-12 text-[#FAF6EE] text-center space-y-5 border border-[#C89B3C]/35 shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#2A1D17] text-[#D4AF37] border border-[#C89B3C]/30 flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="headline-luxury text-2xl sm:text-3xl text-[#FAF6EE] font-normal">
              A Guarantee of Pure Taste & Integrity
            </h2>
            <p className="editorial-body text-[#EADBB6]/90 max-w-xl mx-auto font-light">
              Every 400g jar of Mushroom Mela is sealed with airtight freshness, verified against strict safety parameters, and dispatched direct from Jhansi.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#211612] font-serif font-bold text-xs tracking-[0.2em] uppercase shadow-xl hover:scale-105 transition-all"
            >
              <span>Explore The Collection (₹399)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
