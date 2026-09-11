import React from "react";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics and operations for ShopSphere store management.
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

      <div className="p-8 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-500 text-sm">
        <p>
          Interactive analytics charts and recent transactions will be populated
          in Phase 17.
        </p>
      </div>
    </div>
  );
};
