import React from 'react';
import { ArrowRight, Wrench, Hammer, Ruler, Zap, Cog, Layers } from 'lucide-react';
import { TRADE_SOLUTIONS } from '../../data/tradeSolutions';
import { useShop } from '../../context/ShopContext';

export const TradeSolutionsSection: React.FC = () => {
  const { setSelectedTradeFilter, setActivePage } = useShop();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Hammer': return Hammer;
      case 'Ruler': return Ruler;
      case 'Zap': return Zap;
      case 'Wrench': return Wrench;
      case 'Cog': return Cog;
      case 'Layers': return Layers;
      default: return Wrench;
    }
  };

  const handleTradeClick = (tradeName: string) => {
    setSelectedTradeFilter(tradeName);
    setActivePage('shop');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#141414] border-t border-b border-neutral-800 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>TRADE-SPECIFIC SOLUTIONS</span>
          </div>
          <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            TOOLS FOR EVERY TRADE
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Engineered tool ecosystems designed to optimize workflow, precision, and endurance for specific commercial trades.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADE_SOLUTIONS.map((trade) => {
            const Icon = getIcon(trade.iconName);
            return (
              <div
                key={trade.id}
                onClick={() => handleTradeClick(trade.name)}
                className="group relative bg-[#1B1B1B] rounded-xl overflow-hidden border border-neutral-800 hover:border-[#F7C600] transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Visual Header Image */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={trade.image}
                    alt={trade.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-transparent to-black/40" />

                  {/* Floating Trade Icon & Name Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700">
                    <Icon className="w-4 h-4 text-[#F7C600]" />
                    <span className="font-condensed font-bold text-sm text-white uppercase tracking-wide">
                      {trade.name}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#F7C600] uppercase tracking-wider block mb-1.5">
                      {trade.tagline}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3 mb-4">
                      {trade.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-[#F7C600] uppercase tracking-wider flex items-center gap-1">
                      Explore Tools
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="w-8 h-0.5 bg-neutral-700 group-hover:w-16 group-hover:bg-[#F7C600] transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
