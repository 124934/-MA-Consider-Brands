import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Mail } from 'lucide-react';
import { FAQS } from '../../data/faqs';
import { useShop } from '../../context/ShopContext';

export const FAQSection: React.FC = () => {
  const { setActivePage } = useShop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#111111] px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7C600] mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CONTRACTOR & BUYER CLARITY</span>
          </div>
          <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Clear answers regarding shipping, genuine MA BRAND® tooling, payment methods, returns, and direct contractor support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-[#181818] border border-neutral-800 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-800/40 transition-colors"
                >
                  <span className="font-condensed font-bold text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#F7C600] text-black' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-10 p-6 bg-[#161616] border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-condensed font-bold text-lg text-white">Still have a specific question about your jobsite order?</h4>
            <p className="text-xs text-neutral-400">Our customer support specialists and contractor liaison team are standing by.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('contact')}
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold uppercase transition-colors"
            >
              Contact Us
            </button>
            <a
              href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I%20have%20a%20question%20about%20a%20tool%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
