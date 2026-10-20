import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { FSSAI_NUMBER, FSSAI_VALIDITY, GST_NUMBER, UDYAM_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: `Licenses & Certifications | ${BRAND.name} - FSSAI, GST, Udyam`,
  description: `Official government registrations, licenses and certifications for ${BRAND.name}, Village Nandsiya, Moth, Jhansi, Uttar Pradesh. FSSAI Lic. No. ${FSSAI_NUMBER}, GSTIN ${GST_NUMBER}, Udyam ${UDYAM_NUMBER}.`,
  openGraph: {
    title: `Official Licenses & Certifications | ${BRAND.name}`,
    description: `Registered with FSSAI (Lic. ${FSSAI_NUMBER}), GST (${GST_NUMBER}), and Udyam (${UDYAM_NUMBER}) in Jhansi, Uttar Pradesh.`,
    url: `${BRAND.url}/certificates`,
    type: "website",
  },
};

export default function CertificatesPage() {
  return (
    <div className="bg-[#FFFBEF] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#FFF1A6] text-[#4A231B] border border-[#6B352A]/20 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#6B352A]" />
            <span>Government Registrations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4A231B] tracking-tight">
            Our Licenses & Certifications
          </h1>
          <p className="text-sm sm:text-base text-[#2B1B17]/80 font-sans leading-relaxed">
            {BRAND.name} operates with complete legal compliance and transparency. All our mushroom pickles are prepared, packed, and sold in strict accordance with Indian food safety standards.
          </p>
        </div>

        {/* Business Entity Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#6B352A]/15 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#4A231B]">
              {BRAND.legalName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <MapPin className="w-4 h-4 text-[#A8553F] shrink-0" />
              <span>{BRAND.address}</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Verified & Active
          </span>
        </div>

        {/* 3 Main Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. FSSAI Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#6B352A]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-2xl border border-[#6B352A]/20 shadow-inner">
                🏛️
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#A8553F]">
                  Food Safety Standard
                </span>
                <h2 className="font-serif text-xl font-bold text-[#4A231B]">
                  FSSAI Registration
                </h2>
              </div>

              <div className="bg-[#FFF8E7] p-3.5 rounded-xl border border-[#6B352A]/15 space-y-1">
                <p className="text-xs font-semibold text-stone-600">
                  Registration Number
                </p>
                <p className="font-mono text-base font-extrabold text-[#4A231B] tracking-wide select-all">
                  {FSSAI_NUMBER}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#2B1B17]/80 leading-relaxed font-sans">
                <p>
                  <strong className="text-[#4A231B]">Issuing Authority:</strong> Food Safety and Standards Authority of India (FSSAI), Ministry of Health & Family Welfare, Govt. of India.
                </p>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Calendar className="w-4 h-4 text-[#A8553F]" />
                  <span>Valid through: <strong>{FSSAI_VALIDITY}</strong></span>
                </div>
                <p className="text-stone-600 pt-1">
                  Registered for the artisanal preparation, bottling, and pan-India dispatch of proprietary mushroom pickles.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-6">
              <a
                href="/certificates/fssai-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-md transition-all group-hover:scale-102"
              >
                <span>View FSSAI Certificate</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. GST Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#6B352A]/15 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-2xl border border-[#6B352A]/20 shadow-inner">
                📑
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#A8553F]">
                  Taxation & Compliance
                </span>
                <h2 className="font-serif text-xl font-bold text-[#4A231B]">
                  GST Registration
                </h2>
              </div>

              <div className="bg-[#FFF8E7] p-3.5 rounded-xl border border-[#6B352A]/15 space-y-1">
                <p className="text-xs font-semibold text-stone-600">
                  GSTIN Number
                </p>
                <p className="font-mono text-base font-extrabold text-[#4A231B] tracking-wide select-all">
                  {GST_NUMBER}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#2B1B17]/80 leading-relaxed font-sans">
                <p>
                  <strong className="text-[#4A231B]">Issuing Authority:</strong> Goods and Services Tax Network, Department of Revenue, Ministry of Finance, Govt. of India.
                </p>
                <p>
                  <strong className="text-[#4A231B]">Jurisdiction:</strong> Uttar Pradesh (State Code 09).
                </p>
                <p className="text-stone-600 pt-1">
                  Verified GST-compliant entity for authentic tax billing and commercial shipments across India.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-6">
              <div className="w-full py-2.5 px-4 rounded-xl bg-[#FFF8E7] text-stone-700 font-semibold text-xs text-center border border-[#6B352A]/20">
                GSTIN Verified: {GST_NUMBER}
              </div>
            </div>
          </div>

          {/* 3. Udyam MSME Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#6B352A]/15 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFF1A6] flex items-center justify-center text-2xl border border-[#6B352A]/20 shadow-inner">
                🏭
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#A8553F]">
                  Enterprise Recognition
                </span>
                <h2 className="font-serif text-xl font-bold text-[#4A231B]">
                  Udyam MSME Registration
                </h2>
              </div>

              <div className="bg-[#FFF8E7] p-3.5 rounded-xl border border-[#6B352A]/15 space-y-1">
                <p className="text-xs font-semibold text-stone-600">
                  Udyam Reg. Number
                </p>
                <p className="font-mono text-base font-extrabold text-[#4A231B] tracking-wide select-all">
                  {UDYAM_NUMBER}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#2B1B17]/80 leading-relaxed font-sans">
                <p>
                  <strong className="text-[#4A231B]">Issuing Authority:</strong> Ministry of Micro, Small and Medium Enterprises, Government of India.
                </p>
                <p>
                  <strong className="text-[#4A231B]">Enterprise Type:</strong> Micro Agro-Processing Unit.
                </p>
                <p className="text-stone-600 pt-1">
                  Officially registered manufacturing unit in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-6">
              <div className="w-full py-2.5 px-4 rounded-xl bg-[#FFF8E7] text-stone-700 font-semibold text-xs text-center border border-[#6B352A]/20">
                Udyam Reg: {UDYAM_NUMBER}
              </div>
            </div>
          </div>
        </div>

        {/* Safe Ordering Guarantee */}
        <div className="bg-[#6B352A] rounded-2xl p-8 sm:p-10 text-[#FFF8E7] text-center space-y-4 border border-[#FFF1A6]/20">
          <div className="w-12 h-12 rounded-xl bg-[#FFF1A6] text-[#4A231B] flex items-center justify-center mx-auto text-xl font-bold shadow-md">
            ✓
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#FFF1A6]">
            100% Genuine, Pure & Safe
          </h2>
          <p className="text-sm text-[#FFF8E7]/90 max-w-xl mx-auto leading-relaxed">
            Every jar of Mushroom Mela Oyster Mushroom Pickle is sealed, tamper-evident, and labelled with our FSSAI registration number, ingredients list, and net weight (400g).
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FFF1A6] hover:bg-[#FFF9D6] text-[#4A231B] font-bold text-sm shadow-lg transition-all"
            >
              <span>Order Mushroom Mela (₹399)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
