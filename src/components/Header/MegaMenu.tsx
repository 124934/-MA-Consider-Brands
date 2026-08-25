import React from 'react';
import { ChevronRight, Zap, Shield, BatteryCharging, Wrench, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ToolCategory } from '../../types';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { navigateToCategory, setActivePage } = useShop();

  if (!isOpen) return null;

  const handleCategorySelect = (category: ToolCategory) => {
    navigateToCategory(category);
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#161616] border-b border-neutral-800 shadow-2xl z-50 text-neutral-200 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Column 1: Power Tools */}
          <div>
            <button
              onClick={() => handleCategorySelect('power-tools')}
              className="flex items-center gap-2 text-white font-condensed text-xl font-bold tracking-wide hover:text-[#F7C600] mb-4 text-left group"
            >
              <Zap className="w-4 h-4 text-[#F7C600]" />
              <span>POWER TOOLS</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <ul className="space-y-2 text-sm text-neutral-400">
              {['Drills & Hammer Drills', 'Impact Drivers & Fastening', 'High Torque Impact Wrenches', 'Angle Grinders & Polishers', 'Circular Saws & Worm Drives', 'Reciprocating & Jig Saws', 'Compound Miter & Table Saws', 'Rotary Hammers & Demolition', 'Oscillating Multi-Tools', 'Combo Kits (2-6 Tool)'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategorySelect('power-tools')}
                    className="hover:text-white hover:translate-x-1 transition-all text-left block w-full py-0.5"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Batteries & Power */}
          <div>
            <button
              onClick={() => handleCategorySelect('batteries-chargers')}
              className="flex items-center gap-2 text-white font-condensed text-xl font-bold tracking-wide hover:text-[#F7C600] mb-4 text-left group"
            >
              <BatteryCharging className="w-4 h-4 text-[#F7C600]" />
              <span>BATTERIES & POWER</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <ul className="space-y-2 text-sm text-neutral-400">
              {['20V MAX* Compact & XR (2.0Ah - 5.0Ah)', 'FLEXVOLT® 20V/60V (6.0Ah - 15.0Ah)', 'POWERSTACK™ Pouch Cell Batteries', 'Multi-Port Simultaneous Fast Chargers', 'Jobsite Power Stations & Inverters', 'High-Value Multi-Battery Packs'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategorySelect('batteries-chargers')}
                    className="hover:text-white hover:translate-x-1 transition-all text-left block w-full py-0.5"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
              <span className="text-xs font-semibold text-[#F7C600] block mb-1">PRO ADVICE</span>
              <p className="text-xs text-neutral-400">FLEXVOLT batteries automatically switch to 20V in standard cordless tools for up to 6X runtime.</p>
            </div>
          </div>

          {/* Column 3: Hand Tools & Storage */}
          <div>
            <button
              onClick={() => handleCategorySelect('hand-tools')}
              className="flex items-center gap-2 text-white font-condensed text-xl font-bold tracking-wide hover:text-[#F7C600] mb-4 text-left group"
            >
              <Wrench className="w-4 h-4 text-[#F7C600]" />
              <span>HAND TOOLS & STORAGE</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <ul className="space-y-2 text-sm text-neutral-400">
              {['ToughSeries™ 25ft / 35ft Tape Measures', 'Mechanics Tool & Socket Sets', 'Adjustable Wrenches & Pliers', 'Utility Knives & Heavy Blades', 'ToughSystem® 2.0 Mobile Rolling Boxes', 'TSTAK® Modular Organizers', 'Heavy-Duty Ballistic Contractor Bags'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategorySelect('hand-tools')}
                    className="hover:text-white hover:translate-x-1 transition-all text-left block w-full py-0.5"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Outdoor & Accessories */}
          <div>
            <button
              onClick={() => handleCategorySelect('accessories')}
              className="flex items-center gap-2 text-white font-condensed text-xl font-bold tracking-wide hover:text-[#F7C600] mb-4 text-left group"
            >
              <Layers className="w-4 h-4 text-[#F7C600]" />
              <span>OUTDOOR & ACCESSORIES</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <ul className="space-y-2 text-sm text-neutral-400">
              {['60V MAX* Commercial String Trimmers', 'Cordless Blowers & Chainsaws', 'IMPACT READY® Flextorq Bit Sets', 'Carbide Framing & Finish Saw Blades', 'SDS-Plus & Max Masonry Drill Bits', 'Diamond Grinding Cups & Wheels', 'Dust Extraction Attachments'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleCategorySelect('accessories')}
                    className="hover:text-white hover:translate-x-1 transition-all text-left block w-full py-0.5"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Featured Spotlight Card */}
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#F7C600] text-black uppercase tracking-wider mb-2">
                FEATURED SYSTEM
              </span>
              <h4 className="font-condensed text-lg font-bold text-white mb-1">
                FLEXVOLT® 60V MAX*
              </h4>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Experience the power of corded with the freedom of cordless. The only battery that automatically switches voltage.
              </p>
              <img
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80"
                alt="MA BRAND Flexvolt Cordless System"
                className="w-full h-28 object-cover rounded-lg mb-4 border border-neutral-800"
              />
            </div>

            <button
              onClick={() => {
                setActivePage('shop');
                onClose();
              }}
              className="w-full py-2 bg-[#F7C600] hover:bg-[#deb200] text-black text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore All Equipment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Mega Menu Footer Bar */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Shield className="w-3.5 h-3.5 text-[#F7C600]" /> Genuine MA BRAND® Compatibility Guaranteed
            </span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="hidden sm:inline">Bulk Trade Pricing Available for Commercial Contractors</span>
          </div>
          <button
            onClick={() => {
              setActivePage('shop');
              onClose();
            }}
            className="text-[#F7C600] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Shop Full Catalog</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
