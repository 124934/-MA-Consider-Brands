import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
  Check,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from '../Brand/BrandLogo';
import { ToolCategory } from '../../types';

export const Footer: React.FC = () => {
  const { setActivePage, navigateToCategory, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleFooterNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast('Subscribed to MA Consider Brands updates!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0D0D0D] border-t-2 border-neutral-800 text-neutral-400 text-xs">
      
      {/* Top Value Assurance Bar */}
      <div className="border-b border-neutral-800/80 py-8 px-4 sm:px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed font-bold text-sm text-white block uppercase">Authentic MA Consider Brand</span>
              <span className="text-[11px] text-neutral-400">Inspected professional contractor tools</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed font-bold text-sm text-white block uppercase">256-Bit SSL Protection</span>
              <span className="text-[11px] text-neutral-400">Guaranteed secure checkout encryption</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-condensed font-bold text-sm text-white block uppercase">WhatsApp Direct Ordering</span>
              <span className="text-[11px] text-neutral-400">Instant commercial & quote support</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed font-bold text-sm text-white block uppercase">Rapid US Dispatch</span>
              <span className="text-[11px] text-neutral-400">Orders packaged and shipped daily</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Overview (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" showTagline={true} />

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              MA Consider Brands provides American tradesmen, contractors, and builders with professional-grade MA BRAND® cordless tools, FLEXVOLT® batteries, and high-performance jobsite equipment.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-[#F7C600] shrink-0" />
                <a href="mailto:support@maconsiderbrands.com" className="hover:text-white transition-colors">
                  support@maconsiderbrands.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-[#F7C600] shrink-0" />
                <span>+1 (800) 555-TOOL (8665)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <a
                  href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold"
                >
                  WhatsApp: +92 315 5959375
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <MapPin className="w-4 h-4 text-[#F7C600] shrink-0" />
                <span>United States Operations & Fulfillment</span>
              </div>
            </div>
          </div>

          {/* Col 2: Shop Catalog (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-white">
              SHOP TOOLS
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Power Tools', cat: 'power-tools' },
                { label: 'Batteries & Chargers', cat: 'batteries-chargers' },
                { label: 'Combo Kits', cat: 'combo-kits' },
                { label: 'Hand Tools', cat: 'hand-tools' },
                { label: 'Accessories', cat: 'accessories' },
                { label: 'Outdoor Equipment', cat: 'outdoor' },
                { label: 'Tool Storage', cat: 'storage' },
                { label: 'Specialty Tools', cat: 'specialty' }
              ].map((item) => (
                <li key={item.cat}>
                  <button
                    onClick={() => navigateToCategory(item.cat as ToolCategory)}
                    className="hover:text-[#F7C600] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-white">
              CUSTOMER CARE & SUPPORT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  About MA Consider Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  Contact Contractor Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('faq')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  Shipping & Dispatch Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('faq')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  Returns & 30-Day Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('faq')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  3-Year Manufacturer Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('faq')}
                  className="hover:text-[#F7C600] transition-colors"
                >
                  Commercial & Bulk Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Newsletter & WhatsApp (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-white">
              CONTRACTOR DISPATCH
            </h4>
            <p className="text-xs text-neutral-400">
              Get timely notifications on high-demand MA BRAND® kit restocks and contractor promotions.
            </p>

            <form onSubmit={handleFooterNewsletter} className="space-y-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F7C600]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </form>

            <div className="pt-2">
              <a
                href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I'd%20like%20to%20inquire%20about%20a%20tool%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Desk (+92 315 5959375)</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Legal Disclaimers & Trademarks */}
      <div className="border-t border-neutral-800/80 bg-[#090909] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            <strong>TRADEMARK & INDEPENDENT RETAILER NOTICE:</strong> MA BRAND®, GUARANTEED TOUGH®, 20V MAX*, FLEXVOLT®, ATOMIC™, and ToughSystem® are registered trademarks of Stanley Black & Decker, Inc. or its affiliates. MA Consider Brands is an independent e-commerce retailer offering genuine, authentic tools and equipment. This website is not endorsed by, directly affiliated with, or sponsored by Stanley Black & Decker or MA BRAND. All referenced product names, logos, and brands are property of their respective owners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-neutral-900 text-[11px] text-neutral-500">
            <div>
              © {new Date().getFullYear()} MA Consider Brands LLC. All rights reserved. Built for professional contractors and jobsite performance.
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setActivePage('about')} className="hover:text-neutral-300">About Us</button>
              <span>•</span>
              <button onClick={() => setActivePage('faq')} className="hover:text-neutral-300">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => setActivePage('faq')} className="hover:text-neutral-300">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};
