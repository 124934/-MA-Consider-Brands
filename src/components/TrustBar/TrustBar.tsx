import React from 'react';
import { ShieldCheck, Lock, PackageCheck, Headphones, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Professional-Grade Tools',
      subtitle: 'Engineered for demanding jobsites'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      subtitle: '256-bit encrypted transactions'
    },
    {
      icon: PackageCheck,
      title: 'Quality Equipment',
      subtitle: 'Carefully curated MA BRAND® inventory'
    },
    {
      icon: Headphones,
      title: 'Contractor Support',
      subtitle: 'Direct support & WhatsApp ordering'
    },
    {
      icon: Truck,
      title: 'Nationwide US Dispatch',
      subtitle: 'Free standard shipping over $199'
    }
  ];

  return (
    <section className="bg-[#181818] border-b border-neutral-800 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 group"
            >
              <div className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-[#F7C600] shrink-0 group-hover:border-[#F7C600] group-hover:bg-neutral-800 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-condensed font-bold text-sm sm:text-base text-white tracking-wide leading-tight truncate">
                  {item.title}
                </span>
                <span className="text-xs text-neutral-400 leading-tight mt-0.5 truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
