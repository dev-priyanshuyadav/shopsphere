import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { formatCurrency } from "../utils/currency";
import { useCartStore } from "../store/cartStore";

export const Wishlist: React.FC = () => {
  const items = useWishlistStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <EmptyState
          icon={<Heart className="w-8 h-8" />}
          title="Your wishlist is empty"
          description="Save items you love by clicking the heart icon while browsing our catalog."
          action={
            <Link to="/shop">
              <Button>Explore Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">My Wishlist</h1>
        <p className="text-sm text-slate-500">
          {items.length} saved item(s) for later
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-56 w-full object-cover"
              />
            </Link>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {product.brand}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="text-rose-500 hover:text-rose-600"
                  aria-label={`Remove ${product.title} from wishlist`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <Link
                to={`/product/${product.id}`}
                className="mt-3 block text-lg font-bold text-slate-900 hover:text-primary-600"
              >
                {product.title}
              </Link>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <span>{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="line-through text-slate-400">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <Button
                onClick={() => addItem(product, 1)}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                className="mt-5 w-full"
              >
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
