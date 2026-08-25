import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ToolCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  // Navigation
  activePage: 'home' | 'shop' | 'about' | 'contact' | 'faq' | 'checkout' | 'wishlist' | 'product-detail';
  setActivePage: (page: 'home' | 'shop' | 'about' | 'contact' | 'faq' | 'checkout' | 'wishlist' | 'product-detail') => void;
  activeProduct: Product | null;
  navigateToProduct: (product: Product) => void;
  selectedCategory: ToolCategory | null;
  navigateToCategory: (category: ToolCategory | null) => void;
  selectedTradeFilter: string | null;
  setSelectedTradeFilter: (trade: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;
  shippingCost: number;
  estimatedTax: number;
  total: number;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;

  // Wishlist & Compare
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  compareList: string[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  recentlyViewed: Product[];

  // Feedback Toast
  toastMessage: string | null;
  showToast: (message: string) => void;

  // WhatsApp Helpers
  sendWhatsAppOrder: (details?: {
    customerName?: string;
    customerPhone?: string;
    deliveryAddress?: string;
  }) => void;
  orderProductOnWhatsApp: (
    product: Product,
    quantity?: number,
    details?: { customerName?: string; customerPhone?: string; deliveryAddress?: string }
  ) => void;
  orderMultipleOnWhatsApp: (
    items: { product: Product; quantity: number }[],
    details?: { customerName?: string; customerPhone?: string; deliveryAddress?: string }
  ) => void;
  sendWhatsAppProductInquiry: (product: Product, customQuestion?: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_MIN = 199.0;
const WHATSAPP_PHONE = '923155959375';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'about' | 'contact' | 'faq' | 'checkout' | 'wishlist' | 'product-detail'>('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [selectedTradeFilter, setSelectedTradeFilter] = useState<string | null>(null);

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mac_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 },
        { product: PRODUCTS[1], quantity: 1 }
      ];
    } catch {
      return [
        { product: PRODUCTS[0], quantity: 1 },
        { product: PRODUCTS[1], quantity: 1 }
      ];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('PROTRADE10');
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mac_wishlist');
      return saved ? JSON.parse(saved) : ['dcd996b', 'dcb609-2'];
    } catch {
      return ['dcd996b', 'dcb609-2'];
    }
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(['dcd996b', 'dcf887b', 'dcs577b']);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('mac_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mac_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navigateToProduct = (product: Product) => {
    setActiveProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add to recently viewed
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  };

  const navigateToCategory = (category: ToolCategory | null) => {
    setSelectedCategory(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.modelNumber} (${product.brand}) to your cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PROTRADE10' || cleanCode === 'MA BRAND10' || cleanCode === 'USA2026') {
      setAppliedCoupon(cleanCode);
      showToast(`Promo code ${cleanCode} applied (-10% OFF)!`);
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (cleanCode === 'FLEXVOLT20' && subtotal >= 250) {
      setAppliedCoupon(cleanCode);
      showToast(`Promo code ${cleanCode} applied (-$20.00 OFF)!`);
      return { success: true, message: '$20.00 discount applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try PROTRADE10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed');
  };

  let discountAmount = 0;
  if (appliedCoupon === 'PROTRADE10' || appliedCoupon === 'MA BRAND10' || appliedCoupon === 'USA2026') {
    discountAmount = subtotal * 0.1;
  } else if (appliedCoupon === 'FLEXVOLT20') {
    discountAmount = Math.min(20.0, subtotal);
  }

  const shippingCost = subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0.0 : 14.99;
  const estimatedTax = (subtotal - discountAmount) * 0.065; // ~6.5% standard average state tax
  const total = Math.max(0, subtotal - discountAmount + shippingCost + (subtotal > 0 ? estimatedTax : 0));

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 tools at a time');
        return prev;
      }
      showToast('Tool added to side-by-side comparison');
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const recentlyViewed = recentlyViewedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Direct WhatsApp dispatch helper
  const sendWhatsAppOrder = (details?: {
    customerName?: string;
    customerPhone?: string;
    deliveryAddress?: string;
  }) => {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    const name = details?.customerName?.trim() || 'Valued Customer';
    const phoneNum = details?.customerPhone?.trim() || 'Not provided';
    const address = details?.deliveryAddress?.trim() || 'Not provided';

    const orderDetailsList = cart
      .map((item, index) => {
        const itemTotalPrice = `$${(item.product.price * item.quantity).toFixed(2)}`;
        return `${index + 1}. ${item.product.name} × ${item.quantity} = ${itemTotalPrice}`;
      })
      .join('\n');

    let message = `NEW ORDER\n\n`;
    message += `Customer Name: ${name}\n`;
    message += `Phone Number: ${phoneNum}\n`;
    message += `Delivery Address: ${address}\n\n`;
    message += `ORDER DETAILS:\n\n`;
    message += `${orderDetailsList}\n\n`;
    message += `TOTAL ORDER AMOUNT: $${total.toFixed(2)}\n\n`;
    message += `Please confirm this order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
  };

  const orderProductOnWhatsApp = (
    product: Product,
    quantity = 1,
    details?: { customerName?: string; customerPhone?: string; deliveryAddress?: string }
  ) => {
    const qty = Math.max(1, quantity);
    const name = details?.customerName?.trim() || 'Valued Customer';
    const phoneNum = details?.customerPhone?.trim() || 'Not provided';
    const address = details?.deliveryAddress?.trim() || 'Not provided';
    const itemTotal = (product.price * qty).toFixed(2);

    let message = `NEW ORDER\n\n`;
    message += `Customer Name: ${name}\n`;
    message += `Phone Number: ${phoneNum}\n`;
    message += `Delivery Address: ${address}\n\n`;
    message += `ORDER DETAILS:\n\n`;
    message += `1. ${product.name} × ${qty} = $${itemTotal}\n\n`;
    message += `TOTAL ORDER AMOUNT: $${itemTotal}\n\n`;
    message += `Please confirm this order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
  };

  const orderMultipleOnWhatsApp = (
    items: { product: Product; quantity: number }[],
    details?: { customerName?: string; customerPhone?: string; deliveryAddress?: string }
  ) => {
    if (!items || items.length === 0) {
      showToast('No items selected');
      return;
    }

    const name = details?.customerName?.trim() || 'Valued Customer';
    const phoneNum = details?.customerPhone?.trim() || 'Not provided';
    const address = details?.deliveryAddress?.trim() || 'Not provided';

    let totalAmount = 0;
    const orderDetailsList = items
      .map((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        totalAmount += itemTotal;
        return `${index + 1}. ${item.product.name} × ${item.quantity} = $${itemTotal.toFixed(2)}`;
      })
      .join('\n');

    let message = `NEW ORDER\n\n`;
    message += `Customer Name: ${name}\n`;
    message += `Phone Number: ${phoneNum}\n`;
    message += `Delivery Address: ${address}\n\n`;
    message += `ORDER DETAILS:\n\n`;
    message += `${orderDetailsList}\n\n`;
    message += `TOTAL ORDER AMOUNT: $${totalAmount.toFixed(2)}\n\n`;
    message += `Please confirm this order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
  };

  const sendWhatsAppProductInquiry = (product: Product, customQuestion?: string) => {
    let message = `*MA CONSIDER BRANDS - PRODUCT INQUIRY*\n`;
    message += `Tool: ${product.name}\n`;
    message += `Model / SKU: ${product.sku}\n`;
    message += `Price: $${product.price.toFixed(2)}\n`;
    message += `Platform: ${product.batteryPlatform}\n\n`;
    if (customQuestion) {
      message += `Question: ${customQuestion}\n\n`;
    } else {
      message += `I would like to inquire about stock availability, contractor pricing, and shipping for this item.\n`;
    }
    message += `Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        activeProduct,
        navigateToProduct,
        selectedCategory,
        navigateToCategory,
        selectedTradeFilter,
        setSelectedTradeFilter,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_MIN,
        shippingCost,
        estimatedTax,
        total,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        recentlyViewed,
        toastMessage,
        showToast,
        sendWhatsAppOrder,
        orderProductOnWhatsApp,
        orderMultipleOnWhatsApp,
        sendWhatsAppProductInquiry
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
