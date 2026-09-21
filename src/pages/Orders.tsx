import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "../components/common/Button";
import { useOrderStore } from "../store/orderStore";
import { formatCurrency } from "../utils/currency";

export const Orders: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          My Orders
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          View and track all your previous purchases
        </p>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
          <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-600 mb-4">
            No recent orders placed yet.
          </p>
          <Link to="/shop">
            <Button size="sm">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Orders</h1>
      <p className="text-sm text-slate-500 mb-8">
        Your recent activity and order history
      </p>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Order ID
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {order.id}
                </p>
              </div>
              <div className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {order.status}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
              <div>
                <span className="block text-xs uppercase tracking-[0.1em] text-slate-400">
                  Date
                </span>
                <span className="mt-1 block font-medium text-slate-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.1em] text-slate-400">
                  Total
                </span>
                <span className="mt-1 block font-medium text-slate-800">
                  {formatCurrency(order.total)}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.1em] text-slate-400">
                  Items
                </span>
                <span className="mt-1 block font-medium text-slate-800">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
