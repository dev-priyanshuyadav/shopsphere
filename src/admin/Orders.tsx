import React, { useState } from "react";

const initialOrders = [
  {
    id: "#1042",
    customer: "Mila Patel",
    date: "2026-09-10",
    amount: "$154.00",
    status: "Processing",
  },
  {
    id: "#1043",
    customer: "Theo Grant",
    date: "2026-09-09",
    amount: "$269.00",
    status: "Shipped",
  },
  {
    id: "#1044",
    customer: "Nora Lee",
    date: "2026-09-08",
    amount: "$89.99",
    status: "Confirmed",
  },
];

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id: string, status: string) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Order Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review customer orders, update tracking statuses, and fulfill
          shipments.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-slate-200/80 align-middle"
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{order.customer}</td>
                  <td className="px-4 py-3 text-slate-700">{order.date}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {order.amount}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(order.id, event.target.value)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      <option>Processing</option>
                      <option>Confirmed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="text-sm font-semibold text-primary-700 hover:text-primary-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
