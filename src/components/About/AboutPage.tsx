import React from 'react';
import {
  ShieldCheck,
  Truck,
  Wrench,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Flame,
  Zap,
  Building2,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Genuine Professional Equipment',
      description: 'Every tool, battery pack, and accessory in our catalog is authentic, factory-sealed MA BRAND® equipment inspected for demanding jobsite duty.'
    },
    {
      icon: Truck,
      title: 'Prompt Nationwide US Delivery',
      description: 'We understand that downtime on a jobsite costs money. We prioritize fast order processing and secure packaging across all 50 states.'
    },
    {
      icon: Headphones,
      title: 'Direct Contractor Support',
      description: 'Our customer support team provides real tool recommendations, warranty assistance, and rapid response via phone, email, and WhatsApp.'
    },
    {
      icon: Building2,
      title: 'Commercial & Bulk Purchasing',
      description: 'Specialized programs, net-30 terms, and dedicated volume pricing for general contractors, framing outfits, and commercial builders.'
    }
  ];

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-neutral-900 via-[#181818] to-[#111111] border-b border-neutral-800 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>ESTABLISHED FOR TOUGH WORK</span>
          </div>
          <h1 className="font-condensed font-black text-4xl sm:text-6xl text-white uppercase tracking-tight mb-4">
            BUILT TO POWER AMERICAN JOBSITES
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            MA Consider Brands is a dedicated USA-focused retailer providing commercial contractors, tradesmen, and industrial builders with premier MA BRAND® tools and battery ecosystems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#F7C600] uppercase tracking-widest">
              OUR MISSION & PURPOSE
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Tools That Withstand The Toughest Working Conditions
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We started MA Consider Brands with a clear focus: make ordering top-tier, heavy-duty cordless tools straightforward, fast, and transparent. We know that tradesmen need tools that don't quit halfway through framing a floor or drilling concrete anchors.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From our headquarters to our nationwide logistics fulfillment network, we specialize strictly in proven MA BRAND® brushless motor systems, 20V MAX* XR®, FLEXVOLT® dual-voltage power, and modular ToughSystem® storage units.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-3 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-black text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
              >
                <span>EXPLORE TOOL CATALOG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I'd%20like%20to%20discuss%20a%20commercial%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 font-condensed font-bold text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP CONTRACTOR DESK</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80"
                alt="Construction crew on commercial framing build"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              WHY CONTRACTORS CHOOSE MA CONSIDER BRANDS
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Our core commitments to every builder, mechanic, electrician, and woodworker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#181818] rounded-2xl border border-neutral-800 hover:border-[#F7C600]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-wide mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Transparency Disclaimer Box */}
        <div className="p-6 bg-[#161616] border border-neutral-800 rounded-2xl text-xs text-neutral-400 leading-relaxed">
          <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-2">
            INDEPENDENT RETAILER TRANSPARENCY NOTICE
          </h4>
          <p>
            MA Consider Brands is an independent e-commerce retailer and distributor of authentic professional tool hardware. We source authentic tools, batteries, chargers, and accessories for American customers. MA BRAND®, GUARANTEED TOUGH®, FLEXVOLT®, and 20V MAX* are registered trademarks of Stanley Black & Decker, Inc. MA Consider Brands operates independently and does not claim ownership or manufacturing affiliation with Stanley Black & Decker.
          </p>
        </div>

      </div>
    </div>
  );
};
