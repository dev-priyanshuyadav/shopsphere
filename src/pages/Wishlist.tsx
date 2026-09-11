import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";

export const Wishlist: React.FC = () => {
  const items = useWishlistStore((state) => state.items);

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
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        My Wishlist
      </h1>
      <p className="text-slate-600 text-sm">
        Wishlist with {items.length} items. Full grid in Phase 12.
      </p>
    </div>
  );
};
