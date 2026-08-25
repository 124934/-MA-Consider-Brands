import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Building2,
  MessageSquare,
  Package,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingCost,
    discountAmount,
    appliedCoupon,
    total,
    clearCart,
    setActivePage,
    sendWhatsAppOrder
  } = useShop();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('TX');
  const [zip, setZip] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'po' | 'whatsapp'>('card');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [poNumber, setPoNumber] = useState('');

  // Order Success State
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'Valued Customer';
    const customerPhone = phone.trim() || 'Not provided';
    const fullAddress = [
      address1.trim(),
      address2.trim(),
      city.trim(),
      state.trim(),
      zip.trim()
    ].filter(Boolean).join(', ') || 'Not provided';

    // Send full order details to WhatsApp
    sendWhatsAppOrder({
      customerName: fullName,
      customerPhone: customerPhone,
      deliveryAddress: fullAddress
    });

    const generatedId = 'MAC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#111111] text-white min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#181818] border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#F7C600] uppercase tracking-widest block mb-1">
            ORDER CONFIRMATION
          </span>
          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-sm text-neutral-400 mb-6">
            Your order number is <strong className="text-white font-mono">{orderId}</strong>. A confirmation email and tracking updates will be dispatched shortly to <strong className="text-white">{email || 'your email address'}</strong>.
          </p>

          <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-left text-xs text-neutral-300 space-y-2 mb-8">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Shipping To:</span>
              <span className="text-white font-semibold">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Address:</span>
              <span className="text-white">{address1}, {city}, {state} {zip}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Customer Support:</span>
              <span className="text-[#F7C600] font-bold">support@maconsiderbrands.com | +92 315 5959375</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923155959375"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-black text-base uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <button
              onClick={() => setActivePage('home')}
              className="px-8 py-3.5 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-black text-base uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
            <button
              onClick={() => setActivePage('shop')}
              className="px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-condensed font-bold text-base uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#111111] text-white min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-[#181818] border border-neutral-800 rounded-2xl p-8">
          <Package className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h2 className="font-condensed font-bold text-2xl uppercase tracking-wide mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-neutral-400 mb-6">Add tools to your cart before proceeding to checkout.</p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-6 py-3 bg-[#F7C600] text-black font-condensed font-bold text-sm uppercase tracking-wider rounded-lg"
          >
            Browse Tools Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Checkout Header */}
      <div className="bg-[#161616] border-b border-neutral-800 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Lock className="w-4 h-4 text-[#F7C600]" />
            <span>256-Bit SSL Encrypted USA Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Checkout Inputs (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Customer Contact */}
            <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white">
                  1. CUSTOMER & CONTACT INFORMATION
                </h2>
                <span className="text-xs text-neutral-400 font-mono">STEP 1 OF 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Email Address (for order tracking)*</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contractor@jobsite.com"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Phone Number (delivery updates & WhatsApp)*</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: USA Shipping Address */}
            <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white">
                  2. USA SHIPPING ADDRESS
                </h2>
                <span className="text-xs text-neutral-400 font-mono">STEP 2 OF 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">First Name*</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Last Name*</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Company / Contractor Name (Optional)</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Framing LLC"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Street Address*</label>
                  <input
                    type="text"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="123 Industrial Parkway"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-400 block mb-1">Apartment, Suite, Unit, Jobsite Gate (Optional)</label>
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Suite 400 or Jobsite Trailer"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">City*</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">State*</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    >
                      {usStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">ZIP Code*</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="75001"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment & Order Submission */}
            <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white">
                  3. PAYMENT & ORDER COMPLETION
                </h2>
                <span className="text-xs text-neutral-400 font-mono">STEP 3 OF 3</span>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 mb-6">
                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'bg-[#222222] border-[#F7C600] ring-1 ring-[#F7C600]' : 'bg-neutral-900 border-neutral-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#F7C600]"
                    />
                    <span className="font-bold text-xs text-white">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#F7C600]" />
                </label>

                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'whatsapp' ? 'bg-[#222222] border-emerald-500 ring-1 ring-emerald-500' : 'bg-neutral-900 border-neutral-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="accent-emerald-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-emerald-400 block">Instant Order via WhatsApp (+92 315 5959375)</span>
                      <span className="text-[11px] text-neutral-400">Direct contractor purchase, invoice & custom delivery</span>
                    </div>
                  </div>
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </label>

                <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'po' ? 'bg-[#222222] border-[#F7C600] ring-1 ring-[#F7C600]' : 'bg-neutral-900 border-neutral-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'po'}
                      onChange={() => setPaymentMethod('po')}
                      className="accent-[#F7C600]"
                    />
                    <span className="font-bold text-xs text-white">Contractor Purchase Order (PO / Commercial Net-30)</span>
                  </div>
                  <Building2 className="w-5 h-5 text-[#F7C600]" />
                </label>
              </div>

              {/* Card Inputs if Card chosen */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-700 space-y-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8842"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">MM / YY</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="892"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PO Input if PO chosen */}
              {paymentMethod === 'po' && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-700 space-y-2">
                  <label className="text-xs text-neutral-400 block">Enter Commercial PO Number</label>
                  <input
                    type="text"
                    required
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    placeholder="PO-2026-9812"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                  <span className="text-[11px] text-neutral-500 block">Our commercial accounts team will verify credentials prior to dispatch.</span>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-black text-xl uppercase tracking-wider rounded-xl transition-all duration-200 shadow-2xl cursor-pointer active:scale-95"
            >
              {paymentMethod === 'whatsapp' ? 'SUBMIT ORDER VIA WHATSAPP' : `PAY & PLACE ORDER ($${total.toFixed(2)} USD)`}
            </button>
          </div>

          {/* Right Column: Order Summary (Col 5) */}
          <div className="lg:col-span-5">
            <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sticky top-24 space-y-6 shadow-xl">
              <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white border-b border-neutral-800 pb-3">
                ORDER SUMMARY ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)
              </h2>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-neutral-900 border border-neutral-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <span className="text-[11px] text-neutral-400">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</span>
                    </div>
                    <span className="font-condensed font-bold text-sm text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Details */}
              <div className="space-y-2 text-xs border-t border-neutral-800 pt-4">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>US Standard Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax</span>
                  <span className="text-white">$0.00</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-white border-t border-neutral-800 pt-3">
                  <span className="font-condensed uppercase tracking-wider">Total</span>
                  <span className="font-condensed text-2xl text-[#F7C600]">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#F7C600]" />
                  <span>The MA Consider Brands Guarantee</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Carefully packed in industrial protective boxing. Full manufacturer warranty support and fast dispatch nationwide.
                </p>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
