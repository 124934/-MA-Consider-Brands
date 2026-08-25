import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/ShopContext';

export const FeaturedToolsSection: React.FC = () => {
  const { setActivePage } = useShop();
  const [activeFilter, setActiveFilter] = useState<'all' | 'xr' | 'flexvolt' | 'combos' | 'batteries'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Featured Tools' },
    { id: 'xr', label: '20V MAX* XR®' },
    { id: 'flexvolt', label: 'FLEXVOLT® 60V' },
    { id: 'combos', label: 'Contractor Combos' },
    { id: 'batteries', label: 'Batteries & Power' }
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'xr') return p.batteryPlatform === 'XR® Brushless';
    if (activeFilter === 'flexvolt') return p.batteryPlatform.includes('FLEXVOLT');
    if (activeFilter === 'combos') return p.category === 'combo-kits';
    if (activeFilter === 'batteries') return p.category === 'batteries-chargers';
    return p.isFeatured;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#141414] border-t border-b border-neutral-800/80 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>HANDPICKED PERFORMANCE</span>
            </div>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              FEATURED TOOLS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Professional tools selected for performance, reliability, and everyday jobsite demands.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#F7C600] text-black shadow-lg shadow-[#F7C600]/10'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 hover:bg-[#F7C600] text-white hover:text-black border border-neutral-700 hover:border-[#F7C600] font-condensed font-bold text-base uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer"
          >
            <span>Explore Entire Catalog ({PRODUCTS.length} Tools)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
