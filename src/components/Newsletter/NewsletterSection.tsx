import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Zap } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('General Contractor');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Success! Welcome to the MA Consider Brands Contractor Network.');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#141414] to-[#0F0F0F] border-t border-neutral-800 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#1C1C1C] border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        
        {/* Yellow top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F7C600]" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>PRO CONTRACTOR DISPATCH</span>
        </div>

        <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-3">
          STAY POWERED UP
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8">
          Subscribe for early access to MA BRAND® tool releases, bulk contractor tier discounts, and exclusive commercial promotions.
        </p>

        {subscribed ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-400 max-w-md mx-auto flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span className="font-bold text-sm">You are subscribed to contractor updates! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F7C600]"
                />
              </div>

              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-3 text-xs text-neutral-300 focus:outline-none focus:border-[#F7C600]"
              >
                <option>General Contractor</option>
                <option>Framing & Carpentry</option>
                <option>Electrical Specialist</option>
                <option>Plumbing & HVAC</option>
                <option>Automotive & Heavy</option>
              </select>

              <button
                type="submit"
                className="px-6 py-3 bg-[#F7C600] hover:bg-[#DEB200] text-black font-condensed font-black text-base uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer shrink-0"
              >
                SUBSCRIBE
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F7C600]" />
              We respect your inbox. No spam. Unsubscribe anytime.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
