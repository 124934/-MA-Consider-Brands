import React, { useState, useMemo } from 'react';
import {
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Search,
  Check,
  ChevronDown,
  RotateCcw,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../Product/ProductCard';
import { ToolCategory, BatteryPlatform } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    navigateToCategory,
    selectedTradeFilter,
    setSelectedTradeFilter,
    navigateToProduct
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedVoltages, setSelectedVoltages] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [sortBy, setSortBy] = useState<'featured' | 'best-selling' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const platforms: BatteryPlatform[] = [
    '20V MAX*',
    'XR® Brushless',
    'FLEXVOLT® (20V/60V MAX*)',
    'Corded (120V)',
    'Manual'
  ];

  const voltages = ['20V MAX*', '60V MAX*', '120V Corded', 'Manual'];

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const toggleVoltage = (v: string) => {
    setSelectedVoltages((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  const handleResetFilters = () => {
    navigateToCategory(null);
    setSelectedTradeFilter(null);
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSelectedVoltages([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMaxPrice(700);
    setSortBy('featured');
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // Trade filter
      if (selectedTradeFilter && !product.suitableTrades.includes(selectedTradeFilter) && !product.suitableTrades.includes('All Trades')) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q)) ||
          product.batteryPlatform.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Battery platform
      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(product.batteryPlatform)) {
        return false;
      }
      // Voltage
      if (selectedVoltages.length > 0 && !selectedVoltages.includes(product.voltage)) {
        return false;
      }
      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // On sale
      if (onSaleOnly && !product.isOnSale) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedTradeFilter,
    searchQuery,
    selectedPlatforms,
    selectedVoltages,
    inStockOnly,
    onSaleOnly,
    maxPrice,
    sortBy
  ]);

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-[#181818] to-neutral-900 border-b border-neutral-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>PROFESSIONAL TOOL CATALOG</span>
              </div>
              <h1 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                {activeCategoryInfo ? activeCategoryInfo.name : selectedTradeFilter ? `${selectedTradeFilter} Tools` : 'ALL TOOLS & EQUIPMENT'}
              </h1>
              <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
                {activeCategoryInfo
                  ? activeCategoryInfo.description
                  : 'Shop professional-grade MA BRAND® cordless drills, impact drivers, FLEXVOLT® saws, batteries, and jobsite equipment.'}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 self-start md:self-auto">
              <div className="text-right">
                <span className="text-[11px] text-neutral-400 block uppercase font-bold">Showing</span>
                <span className="font-condensed font-black text-2xl text-[#F7C600]">{filteredProducts.length} Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Controls Toolbar (Search, Filter Button on mobile, Sort, Grid/List view) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
          
          {/* Search within catalog */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name, model or SKU..."
              className="w-full bg-[#181818] border border-neutral-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F7C600]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between lg:justify-end">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-[#181818] border border-neutral-700 text-white rounded-xl text-xs font-bold uppercase flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#F7C600]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#181818] border border-neutral-700 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#F7C600]"
              >
                <option value="featured">Featured Tools</option>
                <option value="best-selling">Best Sellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[#181818] border border-neutral-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#F7C600] text-black' : 'text-neutral-400 hover:text-white'}`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#F7C600] text-black' : 'text-neutral-400 hover:text-white'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {(selectedCategory || selectedTradeFilter || selectedPlatforms.length > 0 || selectedVoltages.length > 0 || inStockOnly || onSaleOnly || searchQuery) && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs font-semibold text-neutral-400">Active Filters:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1C1C1C] border border-neutral-700 text-xs rounded-lg text-white">
                Category: {activeCategoryInfo?.name || selectedCategory}
                <X className="w-3.5 h-3.5 text-neutral-400 hover:text-white cursor-pointer" onClick={() => navigateToCategory(null)} />
              </span>
            )}
            {selectedTradeFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1C1C1C] border border-neutral-700 text-xs rounded-lg text-[#F7C600]">
                Trade: {selectedTradeFilter}
                <X className="w-3.5 h-3.5 text-neutral-400 hover:text-white cursor-pointer" onClick={() => setSelectedTradeFilter(null)} />
              </span>
            )}
            {selectedPlatforms.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1C1C1C] border border-neutral-700 text-xs rounded-lg text-white">
                Platform: {p}
                <X className="w-3.5 h-3.5 text-neutral-400 hover:text-white cursor-pointer" onClick={() => togglePlatform(p)} />
              </span>
            ))}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950/60 border border-emerald-800 text-xs rounded-lg text-emerald-400">
                In Stock Only
                <X className="w-3.5 h-3.5 text-emerald-400 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {onSaleOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-950/60 border border-rose-800 text-xs rounded-lg text-rose-400">
                On Sale Only
                <X className="w-3.5 h-3.5 text-rose-400 cursor-pointer" onClick={() => setOnSaleOnly(false)} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#F7C600] hover:underline font-bold ml-2 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* 2-Column Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar (Col 3) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-5 space-y-6">
              
              {/* Category selector */}
              <div>
                <h3 className="font-condensed font-bold text-base uppercase tracking-wider text-white mb-3">
                  CATEGORIES
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => navigateToCategory(null)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === null ? 'bg-[#F7C600] text-black' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigateToCategory(cat.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedCategory === cat.id ? 'bg-[#F7C600] text-black' : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] opacity-70">{cat.itemCount}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-condensed font-bold text-base uppercase tracking-wider text-white">
                    MAX PRICE
                  </h3>
                  <span className="font-condensed font-bold text-base text-[#F7C600]">
                    ${maxPrice} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="700"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#F7C600] cursor-pointer"
                />
              </div>

              {/* Battery Platform Filter */}
              <div className="pt-4 border-t border-neutral-800">
                <h3 className="font-condensed font-bold text-base uppercase tracking-wider text-white mb-3">
                  BATTERY PLATFORM
                </h3>
                <div className="space-y-2">
                  {platforms.map((plat) => (
                    <label key={plat} className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(plat)}
                        onChange={() => togglePlatform(plat)}
                        className="rounded accent-[#F7C600]"
                      />
                      <span>{plat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Voltage */}
              <div className="pt-4 border-t border-neutral-800">
                <h3 className="font-condensed font-bold text-base uppercase tracking-wider text-white mb-3">
                  VOLTAGE
                </h3>
                <div className="space-y-2">
                  {voltages.map((v) => (
                    <label key={v} className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={selectedVoltages.includes(v)}
                        onChange={() => toggleVoltage(v)}
                        className="rounded accent-[#F7C600]"
                      />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-neutral-800 space-y-2.5">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded accent-[#F7C600]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded accent-[#F7C600]"
                  />
                  <span>Special Offers & Sale Items</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Area (Col 9) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#181818] rounded-2xl border border-neutral-800 p-8">
                <Zap className="w-12 h-12 text-[#F7C600] mx-auto mb-3 opacity-50" />
                <h3 className="font-condensed font-bold text-2xl text-white uppercase tracking-wide mb-2">
                  No matching tools found
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
                  Try adjusting your filters, clearing search keywords, or selecting a broader price range.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-[#1B1B1B] rounded-xl border border-neutral-800 hover:border-[#F7C600] transition-all flex flex-col sm:flex-row items-center gap-4"
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-lg bg-neutral-900 border border-neutral-700 shrink-0 cursor-pointer"
                      onClick={() => navigateToProduct(product)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                        <span className="font-bold text-[#F7C600]">{product.brand}</span>
                        <span>•</span>
                        <span className="font-mono">SKU: {product.sku}</span>
                        <span>•</span>
                        <span>{product.voltage}</span>
                      </div>
                      <h3
                        onClick={() => navigateToProduct(product)}
                        className="font-condensed font-bold text-lg text-white hover:text-[#F7C600] transition-colors cursor-pointer line-clamp-1 mb-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-2 w-full sm:w-auto">
                      <span className="font-condensed font-black text-2xl text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => navigateToProduct(product)}
                        className="px-4 py-2 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        View Tool
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xs bg-[#161616] h-full flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="font-condensed font-bold text-lg uppercase tracking-wide">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Mobile Categories list */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#F7C600] uppercase mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigateToCategory(null);
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left py-1 text-xs text-neutral-300"
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigateToCategory(c.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className="w-full text-left py-1 text-xs text-neutral-300 truncate"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div>
                <h4 className="text-xs font-bold text-[#F7C600] uppercase mb-2">Max Price (${maxPrice})</h4>
                <input
                  type="range"
                  min="20"
                  max="700"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#F7C600]"
                />
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#F7C600] text-black font-condensed font-black text-sm uppercase tracking-wider rounded-lg mt-6"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
