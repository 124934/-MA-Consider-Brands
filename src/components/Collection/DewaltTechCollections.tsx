import React, { useState } from 'react';
import { Zap, BatteryCharging, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface TechPlatform {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  keyStats: { label: string; value: string }[];
  recommendedCategory: 'power-tools' | 'batteries-chargers' | 'hand-tools' | 'outdoor' | 'storage';
}

const PLATFORMS: TechPlatform[] = [
  {
    id: 'flexvolt',
    name: 'FLEXVOLT® 60V MAX*',
    badge: 'HEAVY DEMOLITION & FRAMING',
    tagline: 'The Dual-Voltage Cordless Revolution',
    description: 'Automatically switches from 60V MAX* power to 20V MAX* when you change tools. Delivers the raw power of corded tools without being tethered to a generator.',
    image: 'https://images.unsplash.com/photo-1619869281313-0570b991b151?auto=format&fit=crop&w=800&q=80',
    keyStats: [
      { label: 'Voltage Output', value: '20V / 60V MAX*' },
      { label: 'Max Capacity', value: 'Up to 15.0 Ah' },
      { label: 'Power Equivalent', value: '15A Corded' }
    ],
    recommendedCategory: 'batteries-chargers'
  },
  {
    id: 'xr',
    name: '20V MAX* XR® Brushless',
    badge: 'ALL-DAY CONTRACTOR ENDURANCE',
    tagline: 'Extreme Runtime & Brushless Motors',
    description: 'Engineered for core jobsite drilling, fastening, and cutting. Brushless motor technology eliminates friction and delivers up to 57% longer runtime.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80',
    keyStats: [
      { label: 'Runtime Advantage', value: '+57% vs Brushed' },
      { label: 'System Size', value: '300+ Compatible Tools' },
      { label: 'Motor Design', value: 'Heavy Duty Brushless' }
    ],
    recommendedCategory: 'power-tools'
  },
  {
    id: 'atomic',
    name: 'ATOMIC Compact 20V',
    badge: 'TIGHT SPACES & OVERHEAD WORK',
    tagline: 'More Power in a Shorter Profile',
    description: 'Combines full 20V power in a lightweight, compact footprint. Specifically engineered for electricians, plumbers, and cabinet installers in confined spaces.',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    keyStats: [
      { label: 'Tool Length', value: 'Under 5.5 Inches' },
      { label: 'Weight Reduction', value: 'Up to 25% Lighter' },
      { label: 'Output Torque', value: 'Over 1,700 In-Lbs' }
    ],
    recommendedCategory: 'power-tools'
  },
  {
    id: 'toughsystem',
    name: 'ToughSystem® 2.0',
    badge: 'IP65 WEATHERPROOF STORAGE',
    tagline: 'Modular Jobsite Mobility',
    description: 'Patented auto-connect side latches, rugged 8-inch all-terrain rubber wheels, and IP65 dust/water gaskets to protect your investment in any weather.',
    image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=800&q=80',
    keyStats: [
      { label: 'Max Load Capacity', value: '250 lbs Rolling' },
      { label: 'Protection Rating', value: 'IP65 Water & Dust' },
      { label: 'Connectivity', value: '1-Hand Auto Latch' }
    ],
    recommendedCategory: 'storage'
  }
];

export const MABrandTechCollections: React.FC = () => {
  const { navigateToCategory, setActivePage } = useShop();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('flexvolt');

  const activeTech = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];

  return (
    <section className="py-16 sm:py-24 bg-[#111111] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>TECHNOLOGY & ECOSYSTEMS</span>
          </div>
          <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            MA BRAND® TOOLS FOR THE MODERN JOBSITE
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3">
            Explore a powerful range of professional tools, batteries, accessories, and equipment designed for demanding work.
          </p>
        </div>

        {/* Platform Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                selectedPlatform === platform.id
                  ? 'bg-[#1E1E1E] border-[#F7C600] shadow-xl ring-1 ring-[#F7C600]'
                  : 'bg-[#161616] border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-bold text-[#F7C600] uppercase tracking-wider block mb-1">
                {platform.badge}
              </span>
              <span className="font-condensed font-bold text-lg text-white block">
                {platform.name}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Tech Showcase Panel */}
        <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#F7C600] uppercase tracking-widest block mb-1">
                {activeTech.badge}
              </span>
              <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                {activeTech.name}
              </h3>
              <p className="text-base text-neutral-300 font-medium mb-4">
                {activeTech.tagline}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                {activeTech.description}
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 mb-8">
                {activeTech.keyStats.map((stat, idx) => (
                  <div key={idx} className="border-r last:border-none border-neutral-800 pr-2">
                    <span className="text-[11px] text-neutral-400 block mb-1 uppercase font-semibold">
                      {stat.label}
                    </span>
                    <span className="font-condensed font-bold text-base sm:text-xl text-[#F7C600] leading-tight block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigateToCategory(activeTech.recommendedCategory)}
                  className="px-6 py-3 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-base uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow"
                >
                  <span>Explore {activeTech.name} Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-xl">
                <img
                  src={activeTech.image}
                  alt={activeTech.name}
                  className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
