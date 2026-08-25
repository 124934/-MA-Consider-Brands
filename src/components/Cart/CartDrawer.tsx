import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Tag,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    freeShippingThreshold,
    shippingCost,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
    setActivePage,
    sendWhatsAppOrder
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#161616] border-l border-neutral-800 text-white h-full flex flex-col z-10 shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F7C600]" />
            <h3 className="font-condensed font-extrabold text-xl uppercase tracking-wider">
              YOUR CART ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Truck className="w-4 h-4 text-[#F7C600]" />
              {amountToFreeShipping === 0 ? (
                <span className="text-emerald-400 font-bold">You qualify for FREE US Standard Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-[#F7C600]">${amountToFreeShipping.toFixed(2)}</strong> for FREE Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-neutral-400">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F7C600] transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-neutral-300 mb-1">Your cart is currently empty</p>
              <p className="text-xs text-neutral-500 mb-6">Discover professional MA BRAND® tools built for heavy jobs.</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('shop');
                }}
                className="px-6 py-2.5 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-bold text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3.5 bg-[#1C1C1C] rounded-xl border border-neutral-800"
              >
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-neutral-900 border border-neutral-700 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-condensed font-bold text-sm text-white line-clamp-2 leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-500 hover:text-rose-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#F7C600] font-mono block mt-0.5">
                      SKU: {item.product.sku}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80">
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-md p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-condensed font-bold text-base text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#111111] border-t border-neutral-800 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. PROTRADE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-[#F7C600]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-lg border border-neutral-700 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponError && (
              <p className="text-[11px] text-rose-400">{couponError}</p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-950/40 border border-emerald-800/60 p-2 rounded text-emerald-400">
                <span>Coupon ({appliedCoupon}) applied</span>
                <button
                  onClick={removeCoupon}
                  className="text-neutral-400 hover:text-white text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                <span className="font-condensed uppercase tracking-wider">Estimated Total</span>
                <span className="font-condensed text-xl text-[#F7C600]">
                  ${total.toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-base uppercase tracking-wider rounded-lg transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => sendWhatsAppOrder()}
                className="w-full py-2.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order via WhatsApp (+92 315 5959375)</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-[10px] text-neutral-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F7C600]" />
                256-Bit SSL Encrypted USA Checkout
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
