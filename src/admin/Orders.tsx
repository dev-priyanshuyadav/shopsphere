import React from "react";
import { ShoppingBag } from "lucide-react";

export const AdminOrders: React.FC = () => {
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

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500">
        <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <p className="text-sm">
          Admin order table and status manager in Phase 19.
        </p>
      </div>
    </div>
  );
};
