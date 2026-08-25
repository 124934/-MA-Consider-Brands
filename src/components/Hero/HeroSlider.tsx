import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import hammerDrillImage from '../../assets/images/regenerated_image_1787662218697.png';
import circularSawImage from '../../assets/images/regenerated_image_1787664354762.png';
import angleGrinderImage from '../../assets/images/regenerated_image_1787664350071.png';
import rotaryHammerImage from '../../assets/images/regenerated_image_1787664345426.png';

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
    badge: 'BEST SELLER • 20V MAX* XR®',
    headline: 'BRUSHLESS 3-SPEED HAMMER DRILL',
    subheadline: 'High-efficiency brushless tools engineered for heavy jobsite demands and masonry.',
    primaryCtaText: 'SHOP TOOLS',
    secondaryCtaText: 'VIEW ALL',
    image: hammerDrillImage,
    categoryTarget: 'power-tools'
  },
  {
    id: 'slide-2',
    badge: 'BEST SELLER • FLEXVOLT® 60V MAX*',
    headline: 'WORM DRIVE STYLE CIRCULAR SAW',
    subheadline: 'Heavy-duty cordless cutting performance delivering corded-power precision.',
    primaryCtaText: 'SHOP FLEXVOLT',
    secondaryCtaText: 'EXPLORE',
    image: circularSawImage,
    categoryTarget: 'power-tools'
  },
  {
    id: 'slide-3',
    badge: 'BEST SELLER • FLEXVOLT® 60V MAX*',
    headline: 'CORDLESS ANGLE GRINDER',
    subheadline: 'Kickback Brake™ technology with 9,000 RPM for heavy-duty metal and concrete cutting.',
    primaryCtaText: 'SHOP GRINDERS',
    secondaryCtaText: 'VIEW ALL',
    image: angleGrinderImage,
    categoryTarget: 'power-tools'
  },
  {
    id: 'slide-4',
    badge: 'BEST SELLER • 20V MAX* XR® SDS PLUS',
    headline: 'BRUSHLESS ROTARY HAMMER DRILL',
    subheadline: '2.1 Joules of impact energy delivering ultra-fast drilling in reinforced concrete.',
    primaryCtaText: 'SHOP ROTARY HAMMERS',
    secondaryCtaText: 'SHOP NOW',
    image: rotaryHammerImage,
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
          {/* Subtle industrial background & radial ambient glow */}
          <div className="absolute inset-0 bg-[#141414]" />
          <div className="absolute top-1/2 right-12 lg:right-28 -translate-y-1/2 w-80 lg:w-[480px] h-80 lg:h-[480px] bg-[#F7C600]/10 rounded-full blur-3xl pointer-events-none" />

          {/* High-Impact Product Showcase Image */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 flex items-center justify-center lg:justify-end pr-4 sm:pr-8 lg:pr-16 pointer-events-none">
            <img
              src={s.image}
              alt={s.headline}
              className="max-h-[300px] sm:max-h-[380px] lg:max-h-[440px] w-auto max-w-[90%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-700"
            />
          </div>

          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 sm:via-[#141414]/50 to-transparent sm:w-3/4 lg:w-2/3 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 pointer-events-none" />
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
