import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCurrency, calculateDiscountPercentage } from '../../utils/currency';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { Badge } from '../common/Badge';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isAdded, setIsAdded] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);
  const discount = calculateDiscountPercentage(product.price, product.originalPrice);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItemToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className={`
        group relative flex flex-col bg-white rounded-2xl border border-slate-200/80
        overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300
        ${className}
      `.trim()}
    >
      {/* Product Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-slate-100 block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount && !isOutOfStock && (
            <Badge variant="danger" size="sm">
              -{discount}%
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="default" size="sm">
              Out of Stock
            </Badge>
          )}
          {product.featured && !isOutOfStock && !discount && (
            <Badge variant="success" size="sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={`
            absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-150 shadow-xs focus-visible:ring-2 focus-visible:ring-primary-500
            ${
              wishlisted
                ? 'bg-rose-50 text-rose-500'
                : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white backdrop-blur-xs'
            }
          `}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-slate-400">
            {product.brand}
          </span>
          <span className="capitalize">{product.category}</span>
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 hover:text-primary-600 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
        >
          {product.title}
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ml-1 font-bold text-slate-800">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            className={`
              inline-flex items-center justify-center p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold
              transition-all duration-150 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
              ${
                isOutOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-white hover:bg-primary-600 active:bg-primary-700'
              }
            `}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
