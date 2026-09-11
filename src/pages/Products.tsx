import React from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 capitalize">
            {search ? `Results for "${search}"` : `${category} Products`}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our catalog with live filtering, search, and sorting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-600">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters active in Phase 7 & 8</span>
          </div>
        </div>
      </div>

      <div className="py-12 text-center text-slate-500">
        <p className="text-base font-medium">
          Catalog loaded via Product Service in Phase 7.
        </p>
      </div>
    </div>
  );
};
