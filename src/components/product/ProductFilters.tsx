import React from "react";
import { Star, RotateCcw } from "lucide-react";
import { CategoryInfo } from "../../types/product";
import { Button } from "../common/Button";

export interface ProductFiltersProps {
  categories: CategoryInfo[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
  hasActiveFilters,
}) => {
  const totalCategoryCount = categories.reduce((sum, c) => sum + c.count, 0);

  const pricePresets = [
    { label: "Under $50", min: "", max: "50" },
    { label: "$50 to $100", min: "50", max: "100" },
    { label: "$100 to $250", min: "100", max: "250" },
    { label: "$250 & Above", min: "250", max: "" },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Category
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onCategoryChange("all")}
            className={`
              w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors
              ${
                selectedCategory.toLowerCase() === "all"
                  ? "bg-primary-50 text-primary-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }
            `}
          >
            <span>All Categories</span>
            <span className="text-slate-400 text-[11px]">
              {totalCategoryCount}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors
                  ${
                    isSelected
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <span>{cat.name}</span>
                <span className="text-slate-400 text-[11px]">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Price Range ($)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
          />
          <span className="text-slate-400 text-xs">-</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
          />
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {pricePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onMinPriceChange(preset.min);
                onMaxPriceChange(preset.max);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Customer Rating
        </label>
        <div className="space-y-1">
          {[4, 3, 2, 0].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`
                w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors
                ${
                  selectedRating === star
                    ? "bg-primary-50 text-primary-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              {star > 0 ? (
                <>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < star
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{star} Stars & Up</span>
                </>
              ) : (
                <span>All Ratings</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onResetFilters}
          >
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
};
