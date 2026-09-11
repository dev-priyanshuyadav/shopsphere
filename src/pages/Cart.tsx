import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";

export const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <EmptyState
          icon={<ShoppingCart className="w-8 h-8" />}
          title="Your shopping cart is empty"
          description="Explore our product catalog and discover amazing items to add to your cart."
          action={
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        Shopping Cart
      </h1>
      <p className="text-slate-600 text-sm">
        Cart with {items.length} items. Full cart table in Phase 10 & 11.
      </p>
    </div>
  );
};
