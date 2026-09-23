import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Order,
  OrderStatus,
  PaymentDetails,
  ShippingAddress,
} from "../types/order";

interface PlaceOrderInput {
  email: string;
  userId: string;
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: ShippingAddress;
  payment: PaymentDetails;
}

interface OrderState {
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],

      placeOrder: ({ email, userId, items, shippingAddress, payment }) => {
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const shipping = subtotal > 0 ? 12 : 0;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          userId,
          email,
          items: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          subtotal,
          shipping,
          tax,
          total,
          status: "Processing" as OrderStatus,
          createdAt: new Date().toISOString(),
          shippingAddress,
          payment,
        };

        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },
    }),
    {
      name: "shopsphere-order-storage",
    },
  ),
);
