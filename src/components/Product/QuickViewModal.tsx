import React, { useState } from 'react';
import { X, Star, Check, Heart, Scale, ArrowRight, ShieldCheck, Truck, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    orderProductOnWhatsApp,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    compareList,
    navigateToProduct,
    sendWhatsAppProductInquiry
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);
  const isCompared = compareList.includes(quickViewProduct.id);
  const images = quickViewProduct.galleryImages.length > 0 ? quickViewProduct.galleryImages : [quickViewProduct.primaryImage];

  const handleOrderOnWhatsApp = () => {
    orderProductOnWhatsApp(quickViewProduct, quantity);
    closeQuickView();
  };

  const handleFullView = () => {
    closeQuickView();
    navigateToProduct(quickViewProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-[#161616] border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left: Product Images */}
          <div className="p-6 bg-neutral-900 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 mb-4">
              <img
                src={images[selectedImageIndex] || quickViewProduct.primaryImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#F7C600] text-black font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                {quickViewProduct.voltage}
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-[#F7C600]' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Brand & SKU */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="font-bold text-[#F7C600] uppercase tracking-wider">
                  {quickViewProduct.brand}
                </span>
                <span className="font-mono bg-neutral-900 px-2 py-0.5 rounded text-neutral-400 border border-neutral-800">
                  SKU: {quickViewProduct.sku}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-condensed font-bold text-2xl text-white leading-tight mb-2">
                {quickViewProduct.name}
              </h3>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#F7C600]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewProduct.rating) ? 'fill-[#F7C600]' : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-300">
                  {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({quickViewProduct.stockQuantity} available)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="font-condensed font-black text-3xl text-white">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    ${quickViewProduct.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#F7C600] font-bold ml-auto uppercase tracking-wide">
                  {quickViewProduct.batteryPlatform}
                </span>
              </div>

              {/* Description preview */}
              <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Specs snapshot */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {quickViewProduct.specifications.slice(0, 4).map((spec, i) => (
                  <div key={i} className="p-2 bg-neutral-900/60 rounded border border-neutral-800 text-[11px]">
                    <span className="text-neutral-500 block">{spec.label}</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Order on WhatsApp */}
                <button
                  onClick={handleOrderOnWhatsApp}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-black text-base uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                </button>

                {/* WhatsApp button */}
                <button
                  onClick={() => sendWhatsAppProductInquiry(quickViewProduct)}
                  className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                  title="Inquire on WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleFullView}
                className="w-full text-center text-xs font-bold text-[#F7C600] hover:underline flex items-center justify-center gap-1.5 pt-2"
              >
                <span>View Full Product Specifications & Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
