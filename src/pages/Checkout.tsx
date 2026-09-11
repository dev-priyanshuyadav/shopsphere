import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "../components/common/Button";

export const Checkout: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Secure Checkout
            </h1>
            <p className="text-xs text-slate-500">
              Demo checkout with React Hook Form & Zod in Phase 14.
            </p>
          </div>
        </div>

        <Link to="/shop">
          <Button variant="outline">Continue Browsing</Button>
        </Link>
      </div>
    </div>
  );
};
