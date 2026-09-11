import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/common/Button";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Product Details
        </h1>
        <p className="text-slate-600 text-sm">
          Viewing Product ID:{" "}
          <span className="font-mono font-semibold text-primary-600">{id}</span>
        </p>
        <div className="mt-6">
          <Link to="/shop">
            <Button variant="outline">Browse More Items</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
