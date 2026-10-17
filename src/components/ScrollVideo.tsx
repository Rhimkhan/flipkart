"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE, FSSAI_NUMBER } from "@/lib/config";

export default function ScrollVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Framer Motion useScroll
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Scale and tilt effects for premium 3D feel
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const videoTiltX = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const videoTiltY = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, -1]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Video metadata and iOS Safari touch unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.pause();

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
        setIsLoaded(true);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // iOS Safari unlock on first touch
    const handleFirstTouch = () => {
      if (video.paused) {
        video
          .play()
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      }
      window.removeEventListener("touchstart", handleFirstTouch);
    };

    window.addEventListener("touchstart", handleFirstTouch, { passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("touchstart", handleFirstTouch);
    };
  }, []);

  // Smooth scrubbing with LERP in requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollPercent(latest);
      if (duration > 0) {
        targetTime = latest * duration;
      }
    });

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && duration > 0) {
        // LERP factor 0.12 for buttery smooth scrubbing
        currentTime = lerp(currentTime, targetTime, 0.12);

        // Clamp inside [0, duration]
        const clamped = Math.max(0, Math.min(duration, currentTime));

        // Only update if difference is meaningful to prevent micro-stutter
        if (Math.abs(video.currentTime - clamped) > 0.015) {
          video.currentTime = clamped;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress, duration, prefersReducedMotion]);

  // If user prefers reduced motion, render just a poster with calm static presentation
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center bg-[#2B1B17] text-[#FFF8E7] overflow-hidden py-16 px-4">
        {/* Full-width static poster image */}
        <div className="absolute inset-0">
          <Image
            src="/images/products/mushroom-mela-front.jpg"
            alt="Akhil Foods Mushroom Mela Pickle"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-[#4A231B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-transparent to-[#2B1B17]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 bg-[#2B1B17]/80 backdrop-blur-md p-8 sm:p-12 rounded-[32px] border border-[#FFF1A6]/20 shadow-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-[#FFF1A6] bg-[#6B352A] px-4 py-1.5 rounded-full border border-[#FFF1A6]/20 inline-block">
            Artisanal Heritage • Jhansi
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFF1A6]">
            Handcrafted in Jhansi
          </h2>
          <p className="text-sm sm:text-base text-[#FFF8E7]/90 max-w-xl mx-auto font-sans leading-relaxed">
            Fresh mushrooms, real spices. Handcrafted in Village Nandsiya, Moth, Jhansi, Uttar Pradesh under FSSAI Lic. #{FSSAI_NUMBER}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#6B352A] hover:bg-[#873E2C] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all border border-[#FFF1A6]/30"
            >
              Shop Now • ₹399
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-[400vh] bg-[#2B1B17]">
      {/* Sticky Full-Screen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1200px]">
        {/* Scrubbing Video Element with 3D scale & parallax tilt */}
        <motion.div
          style={{
            scale: videoScale,
            rotateX: videoTiltX,
            rotateY: videoTiltY,
            transformPerspective: 1200,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none select-none will-change-transform"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/images/products/mushroom-mela-front.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/pickle-scroll.mp4" type="video/mp4" />
            <source src="/pickle-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Loading poster while video initializes */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#2B1B17] z-10 flex items-center justify-center">
            <Image
              src="/images/products/mushroom-mela-front.jpg"
              alt="Loading Akhil Foods Artisanal Craft..."
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="relative z-20 text-center space-y-2 bg-[#2B1B17]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#FFF1A6]/20">
              <span className="w-3 h-3 rounded-full bg-[#FFF1A6] animate-ping inline-block mb-1" />
              <p className="text-xs font-bold text-[#FFF1A6] uppercase tracking-wider">
                Loading Interactive Experience...
              </p>
            </div>
          </div>
        )}

        {/* Deep Clay Dark Overlay (40%) for text readability */}
        <div className="absolute inset-0 bg-[#4A231B]/40 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/85 via-transparent to-[#2B1B17]/60 pointer-events-none z-10" />

        {/* Top Floating Badge */}
        <div className="absolute top-6 left-4 sm:left-10 z-30 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2B1B17]/85 backdrop-blur-md text-[#FFF1A6] border border-[#FFF1A6]/30 shadow-xl text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF1A6]" />
            <span className="hidden xs:inline sm:inline">Scroll to Experience the Craft</span>
            <span className="xs:hidden sm:hidden">Scroll to Experience</span>
          </div>
        </div>

        {/* Thin Soft Butter Right Progress Bar Indicator */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 h-40 sm:h-48 w-1 bg-white/20 rounded-full overflow-hidden z-30 shadow-md">
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-[#FFF1A6] rounded-full shadow-[0_0_8px_#FFF1A6]"
          />
        </div>

        {/* Bottom Scroll Prompt (Only visible at start < 15%) */}
        {scrollPercent < 0.15 && (
          <div className="absolute bottom-6 sm:bottom-8 z-30 pointer-events-none text-center animate-bounce">
            <span className="text-[11px] uppercase tracking-widest text-[#FFF1A6] font-extrabold flex items-center justify-center gap-1.5 drop-shadow">
              <span>Scroll down to play</span>
              <ChevronDown className="w-4 h-4 text-[#FFF1A6]" />
            </span>
          </div>
        )}

        {/* Story Text Overlay #1 (~20% Scroll: 0.12 - 0.38) */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 pointer-events-none ${
            scrollPercent >= 0.12 && scrollPercent <= 0.38
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="max-w-2xl bg-[#2B1B17]/85 backdrop-blur-md p-6 sm:p-12 rounded-[28px] sm:rounded-[32px] border border-[#FFF1A6]/25 shadow-2xl space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FFF1A6] bg-[#6B352A] px-3.5 sm:px-4 py-1.5 rounded-full border border-[#FFF1A6]/20 inline-block shadow-sm">
              Authentic Origin
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF8E7] leading-tight">
              Handcrafted in Jhansi
            </h2>
            <p className="text-xs sm:text-base text-[#FFF8E7]/85 leading-relaxed font-sans max-w-lg mx-auto">
              Prepared in clean, hygienic micro-batches in Village Nandsiya, Moth, Jhansi, Uttar Pradesh with tender oyster mushrooms and maternal culinary care.
            </p>
          </div>
        </div>

        {/* Story Text Overlay #2 (~50% Scroll: 0.42 - 0.68) */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 pointer-events-none ${
            scrollPercent >= 0.42 && scrollPercent <= 0.68
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="max-w-2xl bg-[#2B1B17]/85 backdrop-blur-md p-6 sm:p-12 rounded-[28px] sm:rounded-[32px] border border-[#FFF1A6]/25 shadow-2xl space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FFF1A6] bg-[#6B352A] px-3.5 sm:px-4 py-1.5 rounded-full border border-[#FFF1A6]/20 inline-block shadow-sm">
              Pure Ingredients
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF8E7] leading-tight">
              Fresh Mushrooms, Real Spices
            </h2>
            <p className="text-xs sm:text-base text-[#FFF8E7]/85 leading-relaxed font-sans max-w-lg mx-auto">
              Steeped in cold-pressed mustard oil, vinegar, red chilli, coriander, fennel, fenugreek, cumin, turmeric, ajwain, fresh ginger, and garlic. Zero synthetic shortcuts.
            </p>
          </div>
        </div>

        {/* Story Text Overlay #3 (~80% Scroll: 0.72 - 0.90) */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 pointer-events-none ${
            scrollPercent >= 0.72 && scrollPercent < 0.90
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="max-w-2xl bg-[#2B1B17]/85 backdrop-blur-md p-6 sm:p-12 rounded-[28px] sm:rounded-[32px] border border-[#FFF1A6]/25 shadow-2xl space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FFF1A6] bg-[#6B352A] px-3.5 sm:px-4 py-1.5 rounded-full border border-[#FFF1A6]/20 inline-block shadow-sm">
              Quality Packaging
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF8E7] leading-tight">
              Order Your Jar Today
            </h2>
            <p className="text-xs sm:text-base text-[#FFF8E7]/85 leading-relaxed font-sans max-w-lg mx-auto">
              Each 400g glass jar is vacuum-sealed with FSSAI Lic. #{FSSAI_NUMBER} registration and dispatched pan-India with express 2-5 day delivery.
            </p>
          </div>
        </div>

        {/* Final CTA Overlay (90% - 100% Scroll) */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 ${
            scrollPercent >= 0.90
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-w-xl bg-[#4A231B]/95 backdrop-blur-lg p-6 sm:p-12 rounded-[28px] sm:rounded-[36px] border-2 border-[#FFF1A6]/30 shadow-2xl space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF1A6] text-[#4A231B] text-xs font-bold shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6B352A]" />
              <span>Net Quantity: 400g • MRP ₹399</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#FFF1A6] leading-tight">
              Mushroom Mela Oyster Mushroom Pickle
            </h2>

            <p className="text-xs sm:text-sm text-[#FFF8E7]/90 leading-relaxed font-sans max-w-md mx-auto">
              Handcrafted by {BRAND.name} in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6B352A] hover:bg-[#873E2C] text-[#FFF1A6] font-bold text-sm shadow-xl flex items-center justify-center gap-2 border border-[#FFF1A6]/30 transition-all hover:scale-105"
              >
                <span>Shop Now • ₹399</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
