import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Building2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Product Question');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill in all required fields');
      return;
    }

    // Trigger WhatsApp formatted text message as requested by user!
    const waText = encodeURIComponent(
      `*New Support Inquiry - MA Consider Brands*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Type:* ${inquiryType}\n` +
      `*Order #:* ${orderNumber || 'N/A'}\n\n` +
      `*Message:*\n${message}`
    );

    const waUrl = `https://wa.me/923155959375?text=${waText}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    showToast('Your message has been initiated via WhatsApp & logged with support.');
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-neutral-900 via-[#181818] to-[#111111] border-b border-neutral-800 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7C600]/10 border border-[#F7C600]/30 text-[#F7C600] text-xs font-bold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CONTRACTOR & CUSTOMER DESK</span>
          </div>
          <h1 className="font-condensed font-black text-4xl sm:text-6xl text-white uppercase tracking-tight mb-4">
            REACH OUR SUPPORT TEAM
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
            Need product advice, commercial quotes, order tracking, or warranty assistance? We're here to help keep your jobs moving forward.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form (Col 7) */}
          <div className="lg:col-span-7 bg-[#181818] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="font-condensed font-bold text-2xl uppercase tracking-wide text-white mb-2">
              SEND US A MESSAGE
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Fill out the form below to connect directly with our tool specialists or submit via WhatsApp (+92 315 5959375).
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-condensed font-bold text-2xl text-white uppercase">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your inquiry has been forwarded to our customer service and WhatsApp support line. We typically reply within minutes during business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Full Name*</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Miller"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Email Address*</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@construction.com"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 012-3456"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Inquiry Type</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                    >
                      <option>Product Question & Specifications</option>
                      <option>Order Status & Tracking</option>
                      <option>Bulk / Contractor Commercial Quote</option>
                      <option>Returns & Warranty Support</option>
                      <option>General Customer Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Order Number (If applicable)</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. MAC-849201"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Message or Requirements*</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify tool model numbers, jobsite quantities, or questions..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F7C600]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#F7C600] hover:bg-[#deb200] text-black font-condensed font-black text-lg uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE VIA WHATSAPP (+92 315 5959375)</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Cards (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Priority Desk */}
            <div className="p-6 bg-gradient-to-br from-[#1C2C22] to-[#121A15] border border-emerald-600/40 rounded-2xl">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <MessageSquare className="w-6 h-6" />
                <h3 className="font-condensed font-bold text-xl uppercase tracking-wide">
                  WHATSAPP DIRECT SUPPORT
                </h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Chat directly with our contractor liaison for instant stock checks, custom invoices, bulk order discounts, and quick shipping assistance.
              </p>
              <a
                href="https://wa.me/923155959375?text=Hello%20MA%20Consider%20Brands,%20I'd%20like%20to%20speak%20with%20contractor%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-lg transition-colors shadow"
              >
                <span>OPEN CHAT (+92 315 5959375)</span>
              </a>
            </div>

            {/* Email & Phone Card */}
            <div className="p-6 bg-[#181818] border border-neutral-800 rounded-2xl space-y-4">
              <h3 className="font-condensed font-bold text-lg uppercase tracking-wide text-white">
                DIRECT CONTACT CHANNELS
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Email Support</span>
                    <a href="mailto:support@maconsiderbrands.com" className="text-white font-semibold hover:text-[#F7C600]">
                      support@maconsiderbrands.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Toll-Free USA Phone</span>
                    <span className="text-white font-semibold">+1 (800) 555-TOOL (8665)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Operational Hours</span>
                    <span className="text-white font-semibold">Monday – Friday: 7:00 AM – 7:00 PM CST</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#F7C600] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Logistics & Dispatch</span>
                    <span className="text-white font-semibold">United States Nationwide Fulfillment Hubs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Accounts Info */}
            <div className="p-6 bg-[#181818] border border-neutral-800 rounded-2xl">
              <div className="flex items-center gap-2 text-[#F7C600] mb-1">
                <Building2 className="w-4 h-4" />
                <h4 className="font-condensed font-bold text-sm uppercase tracking-wide">
                  COMMERCIAL PURCHASE ORDERS
                </h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Qualified construction companies and commercial contractors can submit POs directly to <a href="mailto:commercial@maconsiderbrands.com" className="text-white underline">commercial@maconsiderbrands.com</a> for Net-30 invoice processing.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
