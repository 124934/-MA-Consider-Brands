import React, { useState } from 'react';
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  Heart,
  Scale,
  ShoppingCart,
  Zap,
  ArrowLeft,
  Share2,
  MessageSquare,
  HelpCircle,
  Package,
  BatteryCharging,
  Plus
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product, ProductReview } from '../../types';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    activeProduct,
    setActivePage,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    compareList,
    showToast,
    sendWhatsAppProductInquiry
  } = useShop();

  const product = activeProduct || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'included' | 'reviews' | 'faq'>('overview');

  // Bundle Selector (Frequently Bought Together)
  const bundleAddon = PRODUCTS.find((p) => p.id === 'dcb205-2') || PRODUCTS[5];
  const [includeAddon, setIncludeAddon] = useState(true);

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTrade, setNewReviewTrade] = useState('General Contractor');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(product.reviews || []);

  const isSaved = isInWishlist(product.id);
  const isCompared = compareList.includes(product.id);
  const images = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.primaryImage];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBundle = () => {
    addToCart(product, 1);
    if (includeAddon) {
      addToCart(bundleAddon, 1);
    }
    showToast('Bundle package added to cart!');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      showToast('Please fill out all review fields');
      return;
    }
    const rev: ProductReview = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor,
      location: 'Verified US Contractor',
      trade: newReviewTrade,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle || 'Solid performance',
      comment: newReviewComment,
      verifiedPurchase: true
    };
    setLocalReviews([rev, ...localReviews]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Thank you! Your verified tool review has been published.');
  };

  const relatedTools = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Breadcrumb & Navigation Bar */}
      <div className="border-b border-neutral-800 bg-[#161616] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-neutral-400">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#F7C600] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tool Catalog</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span>/</span>
            <span className="text-[#F7C600] font-mono">{product.sku}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#F7C600]" />
            <span>Share Tool</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={images[selectedImage] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-[#F7C600] text-black font-condensed font-black text-xs uppercase tracking-wider rounded shadow">
                  {product.voltage}
                </span>
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-black/85 backdrop-blur-md text-white border border-neutral-700 font-extrabold text-[10px] uppercase tracking-wider rounded shadow">
                    PRO BEST SELLER
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === idx ? 'border-[#F7C600] scale-95 shadow-md' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3.5 bg-[#181818] border border-neutral-800 rounded-xl flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#F7C600] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Fast US Shipping</span>
                  <span className="text-[11px] text-neutral-400">Ships promptly nationwide</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#181818] border border-neutral-800 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F7C600] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Factory Warranty</span>
                  <span className="text-[11px] text-neutral-400">3-Year Limited Coverage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing & Purchasing (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand & SKU Header */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="font-bold text-[#F7C600] uppercase tracking-widest text-sm">
                  {product.brand}
                </span>
                <span className="font-mono bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-neutral-300">
                  MODEL: {product.modelNumber} | SKU: {product.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-condensed font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.05] mb-3">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center text-[#F7C600]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-[#F7C600]' : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-neutral-400">
                  ({localReviews.length || product.reviewCount} customer reviews)
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stockQuantity} ready to ship)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-5 bg-[#181818] border border-neutral-800 rounded-2xl mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-condensed font-black text-4xl text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-neutral-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  {product.compareAtPrice && (
                    <span className="px-2 py-0.5 rounded bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase ml-auto">
                      Save ${(product.compareAtPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-400 flex items-center gap-2">
                  <span>Battery Platform: <strong className="text-[#F7C600]">{product.batteryPlatform}</strong></span>
                  <span>•</span>
                  <span>US Sales Tax calculated at checkout</span>
                </div>
              </div>

              {/* Short description */}
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2 mb-8">
                <span className="text-xs font-bold text-[#F7C600] uppercase tracking-wider block mb-2">
                  TOP CAPABILITIES:
                </span>
                {product.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-[#F7C600] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Controls */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-neutral-700 bg-neutral-900 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white font-bold text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-base text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white font-bold text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-lg uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>ADD TO CART</span>
                </button>

                {/* Wishlist & Compare Icons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 rounded-xl border transition-colors ${
                      isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`p-4 rounded-xl border transition-colors ${
                      isCompared ? 'bg-[#F7C600] text-black border-[#F7C600]' : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                    title="Compare specs"
                  >
                    <Scale className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Direct Buy Now and WhatsApp Order Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-condensed font-bold text-base uppercase tracking-wider rounded-xl border border-neutral-700 transition-colors cursor-pointer text-center"
                >
                  BUY NOW WITH 1-CLICK CHECKOUT
                </button>

                <button
                  onClick={() => sendWhatsAppProductInquiry(product)}
                  className="py-3 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP (+92 315 5959375)</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="mt-16 p-6 sm:p-8 bg-[#181818] border border-neutral-800 rounded-2xl">
          <span className="text-xs font-bold text-[#F7C600] uppercase tracking-widest block mb-1">
            FREQUENTLY BOUGHT TOGETHER
          </span>
          <h3 className="font-condensed font-bold text-2xl text-white uppercase tracking-tight mb-6">
            CONTRACTOR POWER BUNDLE
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg bg-neutral-900 border border-neutral-700"
                />
                <div>
                  <span className="text-xs font-bold text-white block line-clamp-1">{product.name}</span>
                  <span className="text-xs text-[#F7C600] font-bold">${product.price.toFixed(2)}</span>
                </div>
              </div>

              <Plus className="w-5 h-5 text-[#F7C600]" />

              <div className="flex items-center gap-3">
                <img
                  src={bundleAddon.primaryImage}
                  alt={bundleAddon.name}
                  className="w-16 h-16 object-cover rounded-lg bg-neutral-900 border border-neutral-700"
                />
                <div>
                  <span className="text-xs font-bold text-white block line-clamp-1">{bundleAddon.name}</span>
                  <span className="text-xs text-[#F7C600] font-bold">${bundleAddon.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col sm:flex-row items-center gap-4">
              <div>
                <span className="text-xs text-neutral-400 block">Total Combined Price:</span>
                <span className="font-condensed font-black text-2xl text-[#F7C600]">
                  ${(product.price + bundleAddon.price).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddBundle}
                className="px-6 py-3 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Add Both to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview / Specifications / What's Included / Reviews / FAQ */}
        <div className="mt-16">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'overview', label: 'Detailed Description' },
              { id: 'specs', label: 'Full Specifications' },
              { id: 'included', label: "What's Included & Compatibility" },
              { id: 'reviews', label: `Customer Reviews (${localReviews.length})` },
              { id: 'faq', label: 'Product FAQs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 font-condensed font-bold text-base uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#F7C600] border-b-2 border-[#F7C600] bg-neutral-900/40'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-8">
            
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="font-condensed font-bold text-2xl text-white uppercase tracking-wide mb-3">
                    ENGINEERED FOR EXTREME JOBSITE DURABILITY
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-condensed font-bold text-xl text-white uppercase tracking-wide mb-3">
                    FULL FEATURE MATRIX:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 p-3 bg-[#181818] rounded-lg border border-neutral-800">
                        <Zap className="w-4 h-4 text-[#F7C600] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 2. Specifications Table */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-[#141414] border-b border-neutral-800">
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-wide">
                    TECHNICAL SPECIFICATIONS
                  </h3>
                </div>
                <div className="divide-y divide-neutral-800">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="grid grid-cols-2 p-3.5 text-xs hover:bg-neutral-900/50 transition-colors">
                      <span className="text-neutral-400 font-medium">{spec.label}</span>
                      <span className="text-white font-semibold">{spec.value}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 p-3.5 text-xs bg-neutral-900/30">
                    <span className="text-neutral-400 font-medium">Manufacturer Warranty</span>
                    <span className="text-[#F7C600] font-semibold">{product.warranty}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Included & Compatibility */}
            {activeTab === 'included' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="p-6 bg-[#181818] border border-neutral-800 rounded-2xl">
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#F7C600]" />
                    <span>WHAT'S IN THE BOX</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {product.whatsIncluded.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-[#181818] border border-neutral-800 rounded-2xl">
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                    <BatteryCharging className="w-5 h-5 text-[#F7C600]" />
                    <span>BATTERY & CHARGER COMPATIBILITY</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {product.compatibility.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Zap className="w-4 h-4 text-[#F7C600] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
                {/* Reviews List (Col 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-condensed font-bold text-2xl text-white uppercase tracking-wide mb-4">
                    VERIFIED BUYER FEEDBACK
                  </h3>

                  {localReviews.length === 0 ? (
                    <p className="text-sm text-neutral-400">No reviews yet for this model. Be the first contractor to review!</p>
                  ) : (
                    localReviews.map((rev) => (
                      <div key={rev.id} className="p-5 bg-[#181818] border border-neutral-800 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{rev.author}</span>
                            <span className="text-xs text-neutral-500">• {rev.trade}</span>
                          </div>
                          <span className="text-[11px] text-neutral-500">{rev.date}</span>
                        </div>

                        <div className="flex items-center text-[#F7C600]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#F7C600]' : 'text-neutral-600'}`}
                            />
                          ))}
                        </div>

                        <h4 className="font-bold text-sm text-white">{rev.title}</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Write a Review Form (Col 5) */}
                <div className="lg:col-span-5 p-6 bg-[#181818] border border-neutral-800 rounded-2xl">
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-wide mb-3">
                    WRITE A CONTRACTOR REVIEW
                  </h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Dave M."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Primary Trade</label>
                      <select
                        value={newReviewTrade}
                        onChange={(e) => setNewReviewTrade(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      >
                        <option>General Contractor</option>
                        <option>Framing & Carpentry</option>
                        <option>Electrical</option>
                        <option>Plumbing & HVAC</option>
                        <option>Mechanical & Heavy Tech</option>
                        <option>DIY & Home Improvement</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      >
                        <option value={5}>5 Stars - Outstanding Performance</option>
                        <option value={4}>4 Stars - Solid Jobsite Tool</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="e.g. Unbelievable power and runtime"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Comments & Field Experience</label>
                      <textarea
                        rows={3}
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="How did this tool hold up in the field?"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      SUBMIT REVIEW
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 5. FAQs */}
            {activeTab === 'faq' && (
              <div className="max-w-3xl space-y-4">
                <div className="p-4 bg-[#181818] border border-neutral-800 rounded-xl">
                  <h4 className="font-bold text-sm text-white mb-1">Is this tool compatible with FLEXVOLT® batteries?</h4>
                  <p className="text-xs text-neutral-300">Yes! If this is a 20V MAX* tool, any MA BRAND FLEXVOLT battery will operate seamlessly while providing up to 6X extended runtime.</p>
                </div>
                <div className="p-4 bg-[#181818] border border-neutral-800 rounded-xl">
                  <h4 className="font-bold text-sm text-white mb-1">Does this product come with a manufacturer warranty?</h4>
                  <p className="text-xs text-neutral-300">Yes. It is backed by MA BRAND's 3-Year Limited Warranty, 1-Year Free Service Contract, and 90-Day Money-Back Guarantee.</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedTools.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-800">
            <h3 className="font-condensed font-black text-3xl text-white uppercase tracking-tight mb-8">
              RELATED TOOLS IN THIS CATEGORY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#111111]/95 backdrop-blur-md border-t border-neutral-800 flex items-center justify-between gap-3 z-30 shadow-2xl">
        <div>
          <span className="font-condensed font-black text-xl text-white">${product.price.toFixed(2)}</span>
          <span className="text-[10px] text-emerald-400 block font-medium">In Stock</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => sendWhatsAppProductInquiry(product)}
            className="p-3 bg-emerald-600 text-white rounded-xl"
            title="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-[#F7C600] text-black font-condensed font-black text-sm uppercase tracking-wider rounded-xl shadow-lg"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
