import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Zap, BatteryCharging, Wrench, Layers, PhoneCall, MessageSquare, ShieldCheck, Heart, ShoppingBag, Search } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { ToolCategory } from '../../types';
import { BrandLogo } from '../Brand/BrandLogo';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
  const {
    navigateToCategory,
    setActivePage,
    setIsSearchOpen,
    setIsCartOpen,
    wishlist,
    cartCount
  } = useShop();

  const [expandedSection, setExpandedSection] = useState<string | null>('categories');

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleCategoryClick = (cat: ToolCategory) => {
    navigateToCategory(cat);
    onClose();
  };

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact' | 'faq' | 'wishlist') => {
    setActivePage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#141414] border-r border-neutral-800 text-white h-full flex flex-col z-10 overflow-y-auto">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <BrandLogo size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Search Bar */}
        <div className="p-4 border-b border-neutral-800/80 bg-neutral-900/50">
          <button
            onClick={() => {
              onClose();
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-400 hover:text-white hover:border-[#F7C600] transition-colors text-left"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#F7C600]" />
              <span>Search MA BRAND® tools, SKU...</span>
            </span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-4 py-4 space-y-2">
          
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>

          {/* Categories Accordion */}
          <div className="border-t border-b border-neutral-800/80 py-2">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between py-2 px-3 text-sm font-bold text-[#F7C600] uppercase tracking-wider rounded-lg hover:bg-neutral-800/60"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Shop by Category</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedSection === 'categories' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {expandedSection === 'categories' && (
              <div className="pl-4 pr-1 py-2 space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full text-left py-2 px-3 rounded text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded">
                      {cat.itemCount}+
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('shop')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span>All Tools & Equipment</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span>About MA Consider Brands</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span>Contact & Support</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span>FAQs & Compatibility</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            onClick={() => handleNavClick('wishlist')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 text-white flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved Wishlist</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-[#F7C600]">
              {wishlist.length}
            </span>
          </button>

        </div>

        {/* Direct WhatsApp Ordering Block */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 space-y-3">
          <div className="p-3 bg-[#F7C600]/10 border border-[#F7C600]/30 rounded-lg">
            <span className="text-[11px] font-bold text-[#F7C600] uppercase tracking-wider block mb-1">
              Direct Contractor Ordering
            </span>
            <p className="text-xs text-neutral-300 mb-2">
              Need immediate tool dispatch or bulk trade pricing? Reach our team on WhatsApp.
            </p>
            <a
              href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I%20am%20interested%20in%20ordering%20MA BRAND%20tools"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order via WhatsApp (+92 315 5959375)</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F7C600]" /> Genuine MA BRAND® Gear
            </span>
            <span>USA Support Desk</span>
          </div>
        </div>

      </div>
    </div>
  );
};
