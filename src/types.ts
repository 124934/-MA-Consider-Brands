export type ToolCategory =
  | 'power-tools'
  | 'hand-tools'
  | 'batteries-chargers'
  | 'outdoor'
  | 'accessories'
  | 'storage'
  | 'combo-kits'
  | 'specialty';

export type BatteryPlatform = '20V MAX*' | 'FLEXVOLT® (20V/60V MAX*)' | 'ATOMIC Compact 20V' | 'XR® Brushless' | '12V MAX*' | 'Corded (120V)' | 'Manual';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  trade: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  modelNumber: string;
  category: ToolCategory;
  subcategory: string;
  voltage: string;
  batteryPlatform: BatteryPlatform;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  shortDescription: string;
  description: string;
  primaryImage: string;
  galleryImages: string[];
  features: string[];
  specifications: ProductSpecification[];
  whatsIncluded: string[];
  compatibility: string[];
  tags: string[];
  suitableTrades: string[];
  warranty: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface FilterState {
  searchQuery: string;
  categories: ToolCategory[];
  batteryPlatforms: BatteryPlatform[];
  voltages: string[];
  trades: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'best-selling' | 'price-low' | 'price-high' | 'highest-rated' | 'newest';
}

export interface TradeSolution {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  image: string;
  recommendedCategory: ToolCategory;
  primaryToolIds: string[];
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
}
