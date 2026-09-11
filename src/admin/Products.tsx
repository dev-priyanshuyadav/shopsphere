import React from "react";
import { Package, Plus } from "lucide-react";
import { Button } from "../components/common/Button";

export const AdminProducts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your store's inventory, stock, and pricing.
          </p>
        </div>
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500">
        <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <p className="text-sm">
          Responsive product management table with CRUD operations in Phase 18.
        </p>
      </div>
    </div>
  );
};
