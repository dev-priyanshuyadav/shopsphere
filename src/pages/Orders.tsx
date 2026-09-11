import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "../components/common/Button";

export const Orders: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Orders</h1>
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
};
