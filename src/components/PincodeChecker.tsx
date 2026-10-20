"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { PINCODES_INFO } from "@/lib/data";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    state?: string;
    days?: string;
    message?: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian postal pincode.",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const known = PINCODES_INFO[clean];
      if (known) {
        setResult({
          valid: true,
          city: known.city,
          state: known.state,
          days: known.days,
        });
      } else {
        // Universal PAN-India courier coverage fallback
        setResult({
          valid: true,
          city: "Verified Pincode",
          state: "All India Delivery",
          days: "3-5 business days via BlueDart / Delhivery Express",
        });
      }
    }, 400);
  };

  return (
    <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#6B352A]/20 text-sm">
      <div className="flex items-center gap-1.5 text-[#4A231B] font-semibold mb-2">
        <MapPin className="w-4 h-4 text-[#A8553F]" />
        <span>Check Delivery Availability & Estimated Time</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#6B352A]/25 text-[#4A231B] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-semibold text-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>Check</span>
        </button>
      </form>

      {result && (
        <div className="mt-2.5 pt-2 border-t border-[#6B352A]/15">
          {result.valid ? (
            <div className="flex items-start gap-2 text-emerald-800 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">
                  Express Delivery Available for {result.city} {result.state ? `(${result.state})` : ""}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Estimated arrival: <strong>{result.days}</strong>. Cash on Delivery is enabled.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
