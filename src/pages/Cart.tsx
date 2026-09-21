import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { formatCurrency } from "../utils/currency";

export const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());

  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <EmptyState
          icon={<ShoppingCart className="w-8 h-8" />}
          title="Your cart is empty"
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
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500">
            {items.length} item(s) ready to checkout
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-semibold text-rose-600 hover:text-rose-700"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-base font-semibold text-slate-900 hover:text-primary-600"
                    >
                      {product.title}
                    </Link>
                    <p className="text-xs text-slate-500">{product.brand}</p>
                  </div>
                  <p className="text-base font-bold text-slate-900">
                    {formatCurrency(product.price * quantity)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product.id)}
                      className="p-2 text-slate-700"
                      aria-label={`Decrease quantity of ${product.title}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(product.id)}
                      className="p-2 text-slate-700"
                      aria-label={`Increase quantity of ${product.title}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 h-fit">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated tax</span>
              <span>{formatCurrency(0)}</span>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-4 flex items-center justify-between text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="mt-6 space-y-3">
            <Link to="/checkout">
              <Button fullWidth>Proceed to Checkout</Button>
            </Link>
            <Link to="/shop">
              <Button fullWidth variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};
