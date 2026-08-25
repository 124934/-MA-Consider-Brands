import React, { useState } from 'react';
import { Star, Heart, Scale, Check, MessageSquare } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    orderProductOnWhatsApp,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    compareList
  } = useShop();

  const [imgSrc, setImgSrc] = useState<string>(product.primaryImage || FALLBACK_IMAGE);
  const isSaved = isInWishlist(product.id);
  const isCompared = compareList.includes(product.id);
  const savings = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;

  // Ensure non-blank name and brand
  const productName = product.name?.trim() || 'MA Consider Brand Tool';
  const brandName = product.brand?.trim() || 'MA CONSIDER BRAND';
  const productSku = product.sku || product.modelNumber || 'MAC-PRO';
  const ratingValue = product.rating || 4.9;
  const reviewCount = product.reviewCount || 120;
  const stockQuantity = product.stockQuantity || 24;

  return (
    <div className="group relative bg-[#1B1B1B] rounded-xl border border-neutral-800 hover:border-[#F7C600]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-2xl">
      
      {/* 1. Product Image & Badges */}
      <div
        className="relative w-full pt-[85%] bg-neutral-900 overflow-hidden cursor-pointer"
        onClick={() => navigateToProduct(product)}
      >
        <img
          src={imgSrc}
          alt={productName}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-transparent to-black/30 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isOnSale && savings > 0 && (
            <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow">
              SAVE {savings}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded bg-[#F7C600] text-black font-extrabold text-[10px] uppercase tracking-wider shadow">
              BEST SELLER
            </span>
          )}
          {product.voltage && (
            <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-neutral-300 font-semibold text-[10px] border border-neutral-700">
              {product.voltage}
            </span>
          )}
        </div>

        {/* Floating Quick Action Icons (Wishlist & Compare) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-md cursor-pointer ${
              isSaved
                ? 'bg-rose-500 text-white'
                : 'bg-black/80 hover:bg-white text-neutral-300 hover:text-black border border-neutral-700'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-md cursor-pointer ${
              isCompared
                ? 'bg-[#F7C600] text-black'
                : 'bg-black/80 hover:bg-[#F7C600] text-neutral-300 hover:text-black border border-neutral-700'
            }`}
            title="Compare specifications"
            aria-label="Compare"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Structured Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & SKU bar */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="font-bold text-[#F7C600] tracking-wider uppercase">
              {brandName}
            </span>
            <span className="font-mono text-[11px] bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400 border border-neutral-800">
              SKU: {productSku}
            </span>
          </div>

          {/* Product Name (Always displayed clearly below image) */}
          <h3
            onClick={() => navigateToProduct(product)}
            className="font-condensed font-bold text-lg text-white group-hover:text-[#F7C600] transition-colors leading-snug cursor-pointer line-clamp-2 mb-2 min-h-[44px]"
            title={productName}
          >
            {productName}
          </h3>

          {/* Rating & Stock Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-[#F7C600]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(ratingValue)
                        ? 'fill-[#F7C600]'
                        : 'text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-300 font-semibold">
                {ratingValue.toFixed(1)}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium">
                ({reviewCount})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <Check className="w-3 h-3" />
              <span>{product.inStock ? `In Stock (${stockQuantity})` : 'Special Order'}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-neutral-800">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-condensed font-black text-2xl text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-neutral-500 line-through font-medium">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.batteryPlatform && (
              <span className="text-[10px] text-neutral-400 uppercase font-semibold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {product.batteryPlatform.split(' ')[0]}
              </span>
            )}
          </div>

          {/* Action Button: Direct WhatsApp Order */}
          <div>
            <button
              onClick={() => orderProductOnWhatsApp(product, 1)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-extrabold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ORDER ON WHATSAPP</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
