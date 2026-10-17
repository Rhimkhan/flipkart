"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Friendly speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#4A231B] text-[#FFF8E7] px-3.5 py-2 rounded-2xl shadow-xl border border-[#FFF1A6]/30 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <span>Need help or want to order directly? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#FFF1A6] hover:text-white ml-1"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/30 group"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
