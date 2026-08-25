export interface FAQItem {
  id: string;
  category: 'orders' | 'compatibility' | 'shipping' | 'returns' | 'warranty';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'compatibility',
    question: 'Are MA BRAND® FLEXVOLT® batteries compatible with standard 20V MAX* tools?',
    answer: 'Yes! MA BRAND® FLEXVOLT® batteries feature intelligent dual-voltage technology. When inserted into a 20V MAX* tool, the battery automatically steps down to 20V and provides massive amp-hour runtime (e.g. 9.0Ah or 12.0Ah equivalent). When inserted into a 60V MAX* tool, it delivers full 60V power.'
  },
  {
    id: 'f2',
    category: 'compatibility',
    question: 'What is the difference between XR® Brushless and standard brushed MA BRAND tools?',
    answer: 'MA BRAND® XR® (eXtreme Runtime) tools feature premium brushless motors. Brushless motors eliminate friction-causing carbon brushes, delivering up to 57% longer runtime per battery charge, cooler operating temperatures, and longer tool lifespan under heavy contractor duty.'
  },
  {
    id: 'f3',
    category: 'orders',
    question: 'How do I place an order or request a commercial quote?',
    answer: 'You can browse products on our store and checkout directly through our secure online checkout with instant card processing or PayPal. For bulk contractor orders, government/institutional purchasing, or instant direct ordering, you can also use our direct WhatsApp Order feature to receive an itemized quote with swift response.'
  },
  {
    id: 'f4',
    category: 'orders',
    question: 'Can I order directly via WhatsApp or Phone for fast assistance?',
    answer: 'Yes. We provide a direct WhatsApp ordering and inquiry line at +92 315 5959375. You can click the "Order via WhatsApp" button on any product or cart page to generate a pre-formatted tool order ready for instant coordination.'
  },
  {
    id: 'f5',
    category: 'shipping',
    question: 'What are your standard shipping times across the United States?',
    answer: 'Orders are processed promptly on business days. Standard US Ground transit generally takes 3–5 business days depending on destination. Expedited 2-Day Air is available for critical jobsite needs. All shipments include verifiable end-to-end tracking.'
  },
  {
    id: 'f6',
    category: 'returns',
    question: 'What is your return and exchange policy for tools?',
    answer: 'We want you completely confident with your gear. Eligible unopened and unused tools in their original factory packaging can be returned within 30 days of delivery. Please contact our support team with your order number to obtain a Return Merchandise Authorization (RMA).'
  },
  {
    id: 'f7',
    category: 'warranty',
    question: 'How does the MA BRAND® manufacturer warranty work?',
    answer: 'MA BRAND® power tools typically feature a 3-Year Limited Warranty, 1-Year Free Service Contract, and 90-Day Money-Back Guarantee from Stanley Black & Decker / MA BRAND. Keep your receipt and register your tool serial number at mabrand.com for service center coverage.'
  }
];
