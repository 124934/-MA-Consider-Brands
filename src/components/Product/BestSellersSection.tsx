import React, { useRef, useState, useEffect } from 'react';
import { Flame, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/ShopContext';

export const BestSellersSection: React.FC = () => {
  const { setActivePage } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        currentRef.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // approximate width of one card with gap
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#111111] px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>CONTRACTOR FAVORITES</span>
            </div>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              BEST SELLERS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2">
              The highest-rated, most reliable power tools and battery packs trusted on job sites nationwide.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            {/* Desktop Navigation Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll Best Sellers Left"
                className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? 'bg-neutral-900 border-neutral-700 text-white hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600]'
                    : 'bg-neutral-950 border-neutral-800/60 text-neutral-600 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll Best Sellers Right"
                className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? 'bg-neutral-900 border-neutral-700 text-white hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600]'
                    : 'bg-neutral-950 border-neutral-800/60 text-neutral-600 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setActivePage('shop')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F7C600] hover:text-white uppercase tracking-wider transition-colors cursor-pointer ml-2"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel (Swipeable on Touch / Drag / Scroll on Desktop & Mobile) */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-5 sm:gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
