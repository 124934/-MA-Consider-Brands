import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  ChevronDown,
  Layers,
  Sparkles,
  Wrench,
  Zap,
  PhoneCall,
  Scale
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from '../Brand/BrandLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { ToolCategory } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    navigateToCategory,
    cartCount,
    subtotal,
    setIsCartOpen,
    setIsSearchOpen,
    wishlist,
    compareList,
    setIsCompareModalOpen,
    setIsOrderTrackingOpen
  } = useShop();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact' | 'faq' | 'wishlist') => {
    setActivePage(page);
    setIsMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (category: ToolCategory) => {
    navigateToCategory(category);
    setIsMegaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <div
        className={`w-full bg-[#111111]/95 backdrop-blur-md border-b border-neutral-800 transition-all duration-200 ${
          isScrolled ? 'py-2.5 shadow-xl' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-[#F7C600] hover:bg-neutral-800 transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo / Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left cursor-pointer transition-transform hover:opacity-95"
              aria-label="MA Consider Brands Home"
            >
              <BrandLogo size="md" showTagline={true} />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-neutral-300">
            {/* Shop Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => handleNavClick('shop')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold ${
                  activePage === 'shop' || isMegaMenuOpen ? 'text-[#F7C600] bg-neutral-800/40' : ''
                }`}
              >
                <span>Shop Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#F7C600]' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleCategoryNav('power-tools')}
              className="px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold"
            >
              Power Tools
            </button>

            <button
              onClick={() => handleCategoryNav('batteries-chargers')}
              className="px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold flex items-center gap-1"
            >
              <span>FLEXVOLT & Batteries</span>
            </button>

            <button
              onClick={() => handleCategoryNav('combo-kits')}
              className="px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold text-[#F7C600]"
            >
              Combo Deals
            </button>

            <button
              onClick={() => handleCategoryNav('hand-tools')}
              className="px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold"
            >
              Hand Tools
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold ${
                activePage === 'about' ? 'text-[#F7C600]' : ''
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-md hover:text-[#F7C600] hover:bg-neutral-800/60 transition-colors uppercase tracking-wider text-xs font-bold ${
                activePage === 'contact' ? 'text-[#F7C600]' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right: Actions (Search, Compare, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#F7C600] transition-colors flex items-center gap-2 text-xs"
              title="Search catalog"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 text-[#F7C600]" />
              <span className="hidden xl:inline text-neutral-400 font-medium">Search tools...</span>
            </button>

            {/* Compare Tools Button (shows badge if active) */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-[#F7C600] hover:bg-neutral-800 transition-colors"
                title="Compare tools"
                aria-label="Compare tools"
              >
                <Scale className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#F7C600] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Saved tools"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#F7C600] hover:bg-[#deb200] text-black px-3.5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-[#F7C600] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#F7C600]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-black">
                {cartCount > 0 ? `$${subtotal.toFixed(2)}` : 'CART'}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
