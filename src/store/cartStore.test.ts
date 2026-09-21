import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cartStore";
import { Product } from "../types/product";

const mockProduct: Product = {
  id: "prod-cart-1",
  title: "Wireless Headphones",
  description: "Great sound",
  price: 99.99,
  category: "electronics",
  images: ["https://example.com/1.jpg"],
  rating: 4.8,
  reviewCount: 120,
  stock: 15,
  brand: "Acoustic",
};

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("adds, increases, decreases, and removes items from the cart", () => {
    useCartStore.getState().addItem(mockProduct, 1);
    expect(useCartStore.getState().getTotalCount()).toBe(1);

    useCartStore.getState().increaseQuantity(mockProduct.id);
    expect(useCartStore.getState().getItemQuantity(mockProduct.id)).toBe(2);

    useCartStore.getState().decreaseQuantity(mockProduct.id);
    expect(useCartStore.getState().getItemQuantity(mockProduct.id)).toBe(1);

    useCartStore.getState().removeItem(mockProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates subtotal across multiple quantities", () => {
    useCartStore.getState().addItem(mockProduct, 2);
    useCartStore
      .getState()
      .addItem({ ...mockProduct, id: "prod-cart-2", price: 49.5 }, 1);

    expect(useCartStore.getState().getSubtotal()).toBeCloseTo(249.48, 2);
  });

  it("returns zero for empty cart and clears items", () => {
    expect(useCartStore.getState().getSubtotal()).toBe(0);
    expect(useCartStore.getState().getTotalCount()).toBe(0);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
