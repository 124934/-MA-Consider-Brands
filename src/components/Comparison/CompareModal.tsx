import React from 'react';
import { X, Scale, Trash2, Check, Star, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const CompareModal: React.FC = () => {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    compareList,
    removeFromCompare,
    clearCompare,
    orderProductOnWhatsApp,
    navigateToProduct
  } = useShop();

  if (!isCompareModalOpen) return null;

  const compareProducts = compareList
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-6xl bg-[#161616] border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden z-10 text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-[#F7C600]" />
            <div>
              <h3 className="font-condensed font-extrabold text-2xl uppercase tracking-wide text-white">
                TOOL SPECIFICATION COMPARISON
              </h3>
              <p className="text-xs text-neutral-400">
                Comparing {compareProducts.length} selected MA BRAND® tools side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table / Columns */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          {compareProducts.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <Scale className="w-12 h-12 mx-auto mb-3 text-neutral-600" />
              <p className="text-base font-semibold text-neutral-200">
                No tools selected for comparison
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Click the compare icon (scales) on any product card in the store.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[700px]">
              {compareProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#1C1C1C] rounded-xl border border-neutral-800 p-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Remove button */}
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-neutral-900 mb-3">
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title & SKU */}
                    <span className="text-[11px] font-mono text-[#F7C600] block mb-1">
                      SKU: {product.sku}
                    </span>
                    <h4
                      onClick={() => {
                        setIsCompareModalOpen(false);
                        navigateToProduct(product);
                      }}
                      className="font-condensed font-bold text-base text-white hover:text-[#F7C600] transition-colors cursor-pointer line-clamp-2 mb-2"
                    >
                      {product.name}
                    </h4>

                    {/* Price */}
                    <div className="font-condensed font-black text-2xl text-white mb-4">
                      ${product.price.toFixed(2)}
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-2 border-t border-neutral-800 pt-3 text-xs mb-4">
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Voltage</span>
                        <span className="text-white font-semibold">{product.voltage}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Platform</span>
                        <span className="text-[#F7C600] font-semibold">{product.batteryPlatform}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Rating</span>
                        <span className="text-white font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#F7C600] fill-[#F7C600]" />
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                      {product.specifications.slice(0, 4).map((spec, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-neutral-800/60">
                          <span className="text-neutral-500 truncate max-w-[100px]">{spec.label}</span>
                          <span className="text-white font-semibold text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order on WhatsApp button */}
                  <button
                    onClick={() => {
                      orderProductOnWhatsApp(product, 1);
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
