import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Zap, Star, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToCategory } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    '20V Drill',
    'Impact Driver',
    'FLEXVOLT Battery',
    'XR Brushless',
    'Combo Kits',
    'ToughSystem',
    '12" Miter Saw',
    'Angle Grinder'
  ];

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.modelNumber.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.batteryPlatform.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    navigateToProduct(product);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-[#181818] border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center gap-3 bg-[#141414]">
          <Search className="w-6 h-6 text-[#F7C600] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search MA BRAND® tools, models (e.g. DCD996B), batteries, accessories..."
            className="flex-1 bg-transparent text-lg sm:text-xl font-medium text-white placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors ml-2"
          >
            ESC
          </button>
        </div>

        {/* Popular searches suggestions */}
        <div className="px-6 py-3 bg-neutral-900/60 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs text-neutral-400">
          <span className="font-semibold text-neutral-300 shrink-0">Popular:</span>
          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => handlePopularSearch(item)}
              className="px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-[#F7C600] hover:text-black text-neutral-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center">
              <Zap className="w-10 h-10 text-[#F7C600] mx-auto mb-3 opacity-60" />
              <p className="text-sm font-semibold text-neutral-300">
                Type a tool name, model number, or technology
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Examples: DCD996B, FLEXVOLT 9.0Ah, 12" Miter Saw, ToughSystem 2.0
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-base font-semibold text-neutral-200">
                No matching tools found for "{query}"
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try checking the spelling or searching by battery platform (e.g. 20V MAX or 60V).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span>FOUND {filteredProducts.length} TOOLS</span>
                <span>Click to view tool specs & order</span>
              </div>

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 p-3 bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 hover:border-[#F7C600] transition-all cursor-pointer group"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-950 border border-neutral-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#F7C600]">{product.brand}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="font-mono text-neutral-400">SKU: {product.sku}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400">{product.batteryPlatform}</span>
                    </div>

                    <h4 className="font-condensed font-bold text-base text-white group-hover:text-[#F7C600] transition-colors truncate">
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-3 text-xs mt-1">
                      <div className="flex items-center text-[#F7C600]">
                        <Star className="w-3 h-3 fill-[#F7C600]" />
                        <span className="ml-1 font-semibold">{product.rating}</span>
                        <span className="text-neutral-500 ml-0.5">({product.reviewCount})</span>
                      </div>
                      <span className="text-neutral-500">•</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-medium text-[11px]">
                        <Check className="w-3 h-3" /> In Stock
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-condensed font-bold text-xl text-white block">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-[#F7C600] group-hover:underline flex items-center justify-end gap-1 mt-1 font-semibold">
                      View Tool <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#111111] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Press ESC or click outside to close</span>
          <span className="text-[#F7C600] font-semibold">MA Consider Brands • Fast US Delivery</span>
        </div>

      </div>
    </div>
  );
};
