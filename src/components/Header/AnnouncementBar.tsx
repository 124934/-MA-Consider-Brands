import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { navigateToCategory, setActivePage } = useShop();

  return (
    <div className="bg-[#0A0A0A] border-b border-neutral-800 text-xs text-neutral-300 font-medium py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left perk highlights */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F7C600]" />
            <span>Professional-Grade MA BRAND® Equipment</span>
          </div>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-neutral-400">
            <Truck className="w-3.5 h-3.5 text-[#F7C600]" />
            <span>Free US Standard Shipping on Orders $199+</span>
          </div>
        </div>

        {/* Center Flash Promo */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] font-semibold text-[11px]">
            <Sparkles className="w-3 h-3" /> PRO TIER CODE: PROTRADE10
          </span>
          <button
            onClick={() => {
              navigateToCategory('power-tools');
            }}
            className="text-white hover:text-[#F7C600] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Shop 20V & 60V Deals →
          </button>
        </div>

        {/* Right Help & Direct Assistance */}
        <div className="hidden lg:flex items-center gap-4 text-neutral-400">
          <button
            onClick={() => setActivePage('faq')}
            className="hover:text-white transition-colors"
          >
            Help & FAQs
          </button>
          <span className="text-neutral-700">|</span>
          <a
            href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I%20have%20an%20inquiry%20about%20your%20MA BRAND%20tools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Orders</span>
          </a>
          <span className="text-neutral-700">|</span>
          <button
            onClick={() => setActivePage('contact')}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#F7C600]" />
            <span>Contractor Desk</span>
          </button>
        </div>

      </div>
    </div>
  );
};
