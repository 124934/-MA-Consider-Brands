import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface Slide {
  id: string;
  badge: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  image: string;
  categoryTarget: 'power-tools' | 'batteries-chargers' | 'combo-kits' | 'hand-tools';
}

const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'MA CONSIDER BRAND 20V MAX* XR',
    headline: 'MAXIMUM POWER & RUNTIME',
    subheadline: 'High-efficiency brushless tools engineered for heavy jobsite demands.',
    primaryCtaText: 'SHOP TOOLS',
    secondaryCtaText: 'VIEW ALL',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1920&q=85',
    categoryTarget: 'power-tools'
  },
  {
    id: 'slide-2',
    badge: 'MA CONSIDER BRAND FLEXVOLT®',
    headline: 'CORDED POWER. ZERO CORDS.',
    subheadline: 'Heavy-duty cutting, grinding, and demolition with cordless freedom.',
    primaryCtaText: 'SHOP FLEXVOLT',
    secondaryCtaText: 'BATTERIES',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1920&q=85',
    categoryTarget: 'batteries-chargers'
  },
  {
    id: 'slide-3',
    badge: 'MA CONSIDER BRAND COMBO KITS',
    headline: 'COMPLETE TOOLSETS & STORAGE',
    subheadline: 'Multi-tool bundles with high-output batteries and rugged storage.',
    primaryCtaText: 'SHOP KITS',
    secondaryCtaText: 'EXPLORE',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1920&q=85',
    categoryTarget: 'combo-kits'
  },
  {
    id: 'slide-4',
    badge: 'MA CONSIDER BRAND ATOMIC™',
    headline: 'COMPACT SIZE. EXTREME SPEED.',
    subheadline: 'Engineered for tight spaces without sacrificing torque or durability.',
    primaryCtaText: 'DISCOVER ATOMIC',
    secondaryCtaText: 'SHOP NOW',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1920&q=85',
    categoryTarget: 'power-tools'
  }
];

export const HeroSlider: React.FC = () => {
  const { setActivePage, navigateToCategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide progression - exactly 2 seconds (2000 ms) as requested
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] bg-[#141414] overflow-hidden flex items-center"
    >
      {/* Background Image Carousel */}
      {SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none -z-10'
          }`}
        >
          <img
            src={s.image}
            alt={s.headline}
            className="w-full h-full object-cover object-center brightness-90 contrast-105"
          />
          {/* Gradients to keep text clear while highlighting tool images */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/40" />
        </div>
      ))}

      {/* Main Slide Content - Minimal and Clean */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/80 backdrop-blur-md border-l-4 border-[#F7C600] text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-4 shadow">
            <Zap className="w-3.5 h-3.5 fill-[#F7C600]" />
            <span>{slide.badge}</span>
          </div>

          {/* Headline - Bold & Short */}
          <h1 className="font-condensed font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.0] mb-3 uppercase drop-shadow-md">
            {slide.headline}
          </h1>

          {/* Clean Subheadline */}
          <p className="text-sm sm:text-base text-neutral-300 mb-6 max-w-lg font-normal leading-normal drop-shadow">
            {slide.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigateToCategory(slide.categoryTarget as any);
              }}
              className="px-6 py-3 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-extrabold text-base uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-95 hover:shadow-[0_0_15px_rgba(247,198,0,0.4)]"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActivePage('shop');
              }}
              className="px-5 py-3 bg-black/60 hover:bg-neutral-900 text-white border border-neutral-600 hover:border-white font-condensed font-bold text-base uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer backdrop-blur-sm"
            >
              <span>{slide.secondaryCtaText}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="w-9 h-9 rounded-lg bg-black/80 hover:bg-[#F7C600] text-white hover:text-black border border-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="w-9 h-9 rounded-lg bg-black/80 hover:bg-[#F7C600] text-white hover:text-black border border-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Slide Indicators */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide ? 'w-8 bg-[#F7C600] shadow-[0_0_8px_rgba(247,198,0,0.6)]' : 'w-2 bg-neutral-600/80 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>

      {/* Bottom hazard stripe accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F7C600] via-[#FFE169] to-[#F7C600]" />
    </section>
  );
};
