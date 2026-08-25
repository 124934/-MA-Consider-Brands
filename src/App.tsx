import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/Header/AnnouncementBar';
import { Navbar } from './components/Header/Navbar';
import { MobileMenuDrawer } from './components/Header/MobileMenuDrawer';
import { HeroSlider } from './components/Hero/HeroSlider';
import { TrustBar } from './components/TrustBar/TrustBar';
import { CategorySection } from './components/Category/CategorySection';
import { BestSellersSection } from './components/Product/BestSellersSection';
import { ToolBatteryAdvisor } from './components/Advisor/ToolBatteryAdvisor';
import { NewsletterSection } from './components/Newsletter/NewsletterSection';
import { FAQSection } from './components/FAQ/FAQSection';
import { Footer } from './components/Footer/Footer';
import { ShopPage } from './components/Shop/ShopPage';
import { ProductDetailPage } from './components/Product/ProductDetailPage';
import { CheckoutPage } from './components/Checkout/CheckoutPage';
import { WishlistPage } from './components/Wishlist/WishlistPage';
import { AboutPage } from './components/About/AboutPage';
import { ContactPage } from './components/Contact/ContactPage';
import { CartDrawer } from './components/Cart/CartDrawer';
import { SearchModal } from './components/Search/SearchModal';
import { QuickViewModal } from './components/Product/QuickViewModal';
import { CompareModal } from './components/Comparison/CompareModal';
import { MessageSquare, ArrowUp, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, toastMessage, compareList, setIsCompareModalOpen } = useShop();

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans selection:bg-[#F7C600] selection:text-black">
      
      {/* Top Header System */}
      <AnnouncementBar />
      <Navbar />
      <MobileMenuDrawer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <CompareModal />

      {/* Main Dynamic Page Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSlider />
            <TrustBar />
            <CategorySection />
            <BestSellersSection />
            <ToolBatteryAdvisor />
            <NewsletterSection />
            <FAQSection />
          </>
        )}

        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductDetailPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'faq' && (
          <div className="py-12 bg-[#111111] min-h-screen">
            <FAQSection />
          </div>
        )}
      </main>

      {/* Floating Compare Counter Bar if items selected */}
      {compareList.length > 0 && (
        <aside aria-label="Compare bar" className="fixed bottom-20 left-4 z-40 bg-[#1C1C1C] border border-[#F7C600] rounded-xl p-3 shadow-2xl flex items-center gap-3">
          <div className="text-xs">
            <span className="font-bold text-white block">Compare Tools</span>
            <span className="text-neutral-400">{compareList.length} selected</span>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3 py-1.5 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-bold text-xs uppercase rounded-lg transition-colors cursor-pointer"
          >
            View Specs
          </button>
        </aside>
      )}

      {/* Floating Instant WhatsApp Button */}
      <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/923155959375?text=Hello%20MA%20Brand,%20I'd%20like%20to%20inquire%20about%20ordering%20tools"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          title="Direct WhatsApp Order (+92 315 5959375)"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline font-condensed font-bold text-xs uppercase tracking-wider">
            WhatsApp Order (+92 315 5959375)
          </span>
        </a>
      </aside>

      {/* Global Toast Notification */}
      {toastMessage && (
        <aside aria-label="Notifications" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-[#F7C600] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#F7C600] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </aside>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
