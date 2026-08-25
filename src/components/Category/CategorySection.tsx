import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import { ToolCategory } from '../../types';

export const CategorySection: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#111111] px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>DISCOVER THE CATALOG</span>
          </div>
          <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            Find the tools and equipment you need to get the job done right. Engineered for high torque, all-day runtime, and heavy jobsite endurance.
          </p>
        </div>

        <button
          onClick={() => navigateToCategory(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#F7C600] hover:text-white uppercase tracking-wider transition-colors cursor-pointer self-start md:self-auto"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Grid (8 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            onClick={() => navigateToCategory(category.id)}
            className="group relative bg-[#1B1B1B] rounded-xl overflow-hidden border border-neutral-800 hover:border-[#F7C600]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative w-full h-48 overflow-hidden bg-neutral-900">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/30 to-transparent" />
              
              {/* Items count badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded text-[11px] font-bold text-[#F7C600] border border-neutral-700">
                {category.itemCount}+ Items
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F7C600] uppercase tracking-wider block mb-1">
                  {category.tagline}
                </span>
                <h3 className="font-condensed font-extrabold text-2xl text-white group-hover:text-[#F7C600] transition-colors leading-tight mb-2 uppercase">
                  {category.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                  {category.description}
                </p>
              </div>

              {/* Action link with hover underline line */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-[#F7C600] uppercase tracking-wider flex items-center gap-1">
                  Shop Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-6 h-0.5 bg-neutral-700 group-hover:w-12 group-hover:bg-[#F7C600] transition-all duration-300" />
              </div>
            </div>

            {/* Bottom accent indicator */}
            <div className="h-1 w-full bg-neutral-800 group-hover:bg-[#F7C600] transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
};
