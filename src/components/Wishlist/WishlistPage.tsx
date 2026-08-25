import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../Product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, setActivePage, addToCart } = useShop();

  const savedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-24">
      {/* Top Banner */}
      <div className="bg-[#161616] border-b border-neutral-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setActivePage('shop')}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shopping</span>
            </button>
            <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              MY SAVED JOBSITE TOOLS ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleAddAllToCart}
                className="px-5 py-2 bg-[#F7C600] hover:bg-[#deb200] text-black rounded-lg text-xs font-black uppercase tracking-wider transition-colors shadow"
              >
                Add All to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {savedProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#181818] rounded-2xl border border-neutral-800 p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-condensed font-bold text-2xl uppercase tracking-wide mb-1">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Save tools you are interested in by clicking the heart icon on any product card.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-2.5 bg-[#F7C600] text-black font-condensed font-bold text-sm uppercase tracking-wider rounded-lg"
            >
              Explore Tools Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
