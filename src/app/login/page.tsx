"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/account");
    } else {
      openAuthModal("signin");
    }
  }, [user, router, openAuthModal]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF6EE] p-4">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#211612] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-serif text-sm tracking-widest uppercase text-[#A87B28]">
          Opening Atelier Login...
        </p>
      </div>
    </div>
  );
}
