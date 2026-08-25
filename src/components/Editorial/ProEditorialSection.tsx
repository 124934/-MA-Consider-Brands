import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award, Flame } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProEditorialSection: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#111111] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#181818] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
          
          {/* Left Column: Large Image */}
          <div className="lg:col-span-6 relative h-80 sm:h-[480px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"
              alt="Professional contractor grinding and cutting steel with power tool"
              className="w-full h-full object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#181818]" />
            
            {/* Overlay spec badge */}
            <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-neutral-700 max-w-xs">
              <div className="flex items-center gap-2 text-[#F7C600] font-bold text-xs uppercase mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Heavy-Duty Torque</span>
              </div>
              <span className="font-condensed font-black text-2xl text-white block">
                Up to 1,200 Ft-Lbs
              </span>
              <p className="text-[11px] text-neutral-400">
                Breakaway torque for high-demand structural and mechanical fasteners.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>BUILT FOR PROFESSIONALS</span>
            </div>

            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight mb-4">
              Tools That Work As Hard As You Do.
            </h2>

            <p className="text-base text-neutral-300 mb-6 leading-relaxed">
              From everyday repairs to demanding commercial jobsite work, discover professional tools designed to help you work with confidence. Engineered with precision brushless motors, all-metal gearboxes, and extreme battery longevity.
            </p>

            {/* Benefit Bullets */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5 text-[#F7C600]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Guaranteed Jobsite Tough</h4>
                  <p className="text-xs text-neutral-400">Built to withstand drops, harsh weather, dust, and continuous industrial duty cycles.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5 text-[#F7C600]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Full Battery Backwards Compatibility</h4>
                  <p className="text-xs text-neutral-400">Expand your kit seamlessly with 20V MAX* and FLEXVOLT® platform interchangeability.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigateToCategory('power-tools')}
              className="px-8 py-4 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-lg uppercase tracking-wider rounded-lg transition-all duration-200 shadow-xl inline-flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>SHOP PROFESSIONAL TOOLS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
