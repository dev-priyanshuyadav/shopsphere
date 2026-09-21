import React from "react";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
} from "lucide-react";

const salesBars = [42, 60, 52, 78, 70, 88, 62, 96];

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,280",
      change: "+12.5%",
      icon: DollarSign,
    },
    { label: "Total Orders", value: "384", change: "+8.2%", icon: ShoppingBag },
    {
      label: "Active Customers",
      value: "1,240",
      change: "+18.1%",
      icon: Users,
    },
    {
      label: "Total Products",
      value: "28",
      change: "4 low stock",
      icon: Package,
    },
  ];

  const recentOrders = [
    {
      id: "#1042",
      customer: "Mila Patel",
      amount: "$154.00",
      status: "Processing",
    },
    {
      id: "#1043",
      customer: "Theo Grant",
      amount: "$269.00",
      status: "Shipped",
    },
    {
      id: "#1044",
      customer: "Nora Lee",
      amount: "$89.99",
      status: "Confirmed",
    },
  ];

  const topProducts = [
    { name: "Aura Wireless Headphones", sales: "142 sold" },
    { name: "Organic Hoodie", sales: "118 sold" },
    { name: "Smartwatch Series 5", sales: "96 sold" },
  ];

  const lowStock = [
    { name: "Lumix Camera", stock: 7 },
    { name: "Minimalist Overcoat", stock: 4 },
    { name: "Leather Wallet", stock: 3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Demo analytics for the ShopSphere storefront.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Sales overview
              </h2>
              <p className="text-xs text-slate-500">Last 8 weeks · Demo data</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              <ArrowUpRight className="w-3.5 h-3.5" />
              18.4%
            </span>
          </div>

          <div className="mt-6 flex items-end gap-2 h-40">
            {salesBars.map((height, index) => (
              <div key={index} className="flex-1 flex justify-center items-end">
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-primary-600 to-primary-400"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Top products</h2>
          <div className="mt-5 space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">{product.sales}</p>
                </div>
                <span className="text-xs font-semibold text-primary-700">
                  #1
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Recent orders</h2>
          <div className="mt-4 space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {order.customer}
                  </p>
                  <p className="text-xs text-slate-500">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {order.amount}
                  </p>
                  <p className="text-xs text-primary-700">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Low stock</h2>
          <div className="mt-4 space-y-3">
            {lowStock.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-100 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Inventory below threshold
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
