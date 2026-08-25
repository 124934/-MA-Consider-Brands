import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, BatteryCharging, Wrench, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const ToolBatteryAdvisor: React.FC = () => {
  const { navigateToProduct, orderProductOnWhatsApp } = useShop();

  const [step, setStep] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<string>('framing');
  const [selectedPowerNeed, setSelectedPowerNeed] = useState<string>('maximum-power');
  const [selectedMobility, setSelectedMobility] = useState<string>('all-day');

  const taskOptions = [
    { id: 'framing', title: 'Heavy Framing & Demolition', desc: 'Cutting 2x10 lumber, ripping plywood, concrete anchors' },
    { id: 'electrical', title: 'Electrical, Conduit & HVAC', desc: 'Tight studs, overhead drilling, wire pulling, junction boxes' },
    { id: 'finish', title: 'Finish Carpentry & Cabinetry', desc: 'Precision miter cuts, trim fasteners, delicate hole boring' },
    { id: 'mechanical', title: 'Heavy Mechanical & Auto', desc: 'High torque lug nuts, rusted bolts, suspension tear downs' }
  ];

  const powerOptions = [
    { id: 'maximum-power', title: 'FLEXVOLT® 60V MAX*', desc: 'True corded power for high-draw heavy saws and grinders' },
    { id: 'balanced-xr', title: '20V MAX* XR® Brushless', desc: 'Standard contractor platform balancing runtime and compact size' },
    { id: 'ultra-compact', title: 'ATOMIC Compact Series', desc: 'Ultra-lightweight for overhead and tight space maneuverability' }
  ];

  // Derive recommended products based on user choice
  let recommendedProduct: Product = PRODUCTS[0];
  if (selectedTask === 'framing' || selectedPowerNeed === 'maximum-power') {
    recommendedProduct = PRODUCTS.find((p) => p.id === 'dcs577b') || PRODUCTS[2];
  } else if (selectedTask === 'finish') {
    recommendedProduct = PRODUCTS.find((p) => p.id === 'dws780') || PRODUCTS[6];
  } else if (selectedTask === 'mechanical') {
    recommendedProduct = PRODUCTS.find((p) => p.id === 'dcf899b') || PRODUCTS[3];
  } else {
    recommendedProduct = PRODUCTS.find((p) => p.id === 'dck299p2') || PRODUCTS[7];
  }

  return (
    <section className="py-16 sm:py-24 bg-[#141414] border-t border-b border-neutral-800 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-[#1C1C1C] border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE TOOL SELECTOR</span>
          </div>
          <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            NOT SURE WHICH SYSTEM YOU NEED?
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Answer 2 quick questions to get an instant tailored tool & battery recommendation for your exact workload.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Question 1 */}
          <div>
            <span className="text-xs font-bold text-[#F7C600] uppercase tracking-wider block mb-2">
              STEP 1: PRIMARY APPLICATION
            </span>
            <div className="space-y-2.5">
              {taskOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTask(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedTask === opt.id
                      ? 'bg-[#242424] border-[#F7C600] ring-1 ring-[#F7C600]'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white block">{opt.title}</span>
                    {selectedTask === opt.id && <Check className="w-4 h-4 text-[#F7C600]" />}
                  </div>
                  <span className="text-xs text-neutral-400 mt-0.5 block">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <span className="text-xs font-bold text-[#F7C600] uppercase tracking-wider block mb-2">
              STEP 2: POWER & BATTERY PREFERENCE
            </span>
            <div className="space-y-2.5">
              {powerOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedPowerNeed(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedPowerNeed === opt.id
                      ? 'bg-[#242424] border-[#F7C600] ring-1 ring-[#F7C600]'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white block">{opt.title}</span>
                    {selectedPowerNeed === opt.id && <Check className="w-4 h-4 text-[#F7C600]" />}
                  </div>
                  <span className="text-xs text-neutral-400 mt-0.5 block">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Tailored Recommendation Card */}
        <div className="p-6 bg-gradient-to-r from-neutral-900 to-black rounded-xl border-2 border-[#F7C600]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={recommendedProduct.primaryImage}
              alt={recommendedProduct.name}
              className="w-20 h-20 object-cover rounded-lg border border-neutral-700 shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F7C600] block mb-1">
                TOP RECOMMENDED SYSTEM FOR YOU
              </span>
              <h4 className="font-condensed font-bold text-xl text-white line-clamp-1">
                {recommendedProduct.name}
              </h4>
              <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                <span className="text-white font-black font-condensed text-lg">${recommendedProduct.price.toFixed(2)}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">In Stock & Ships Fast</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigateToProduct(recommendedProduct)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
            >
              View Details
            </button>
            <button
              onClick={() => orderProductOnWhatsApp(recommendedProduct, 1)}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
