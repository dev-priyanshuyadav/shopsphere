import React, { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  PackageOpen,
  X,
  Search,
} from 'lucide-react';
import { productService } from '../services/productService';
import { Product, CategoryInfo, ProductSortOption } from '../types/product';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/product/ProductSkeleton';
import { ProductFilters } from '../components/product/ProductFilters';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, startTransition] = useTransition();

  // URL state
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const ratingParam = Number(searchParams.get('rating')) || 0;
  const sortParam = (searchParams.get('sort') as ProductSortOption) || 'featured';
  const pageParam = Number(searchParams.get('page')) || 1;

  // Local state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search input local state
  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  // Fetch categories once on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catData = await productService.getCategories();
        setCategories(catData);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch filtered products whenever search params change
  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productService.getProducts({
          category: categoryParam,
          search: searchParam,
          minPrice: minPriceParam ? Number(minPriceParam) : undefined,
          maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
          rating: ratingParam > 0 ? ratingParam : undefined,
          sortBy: sortParam,
          page: pageParam,
          limit: 12,
        });

        if (!isCancelled) {
          setProducts(response.data);
          setTotalProducts(response.total);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to retrieve products. Please check your connection and try again.'
          );
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [
    categoryParam,
    searchParam,
    minPriceParam,
    maxPriceParam,
    ratingParam,
    sortParam,
    pageParam,
  ]);

  // Helper to update query params while preserving others
  const updateParam = (key: string, value: string | null) => {
    startTransition(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === '' || value === 'all' || value === '0') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        // Reset to page 1 whenever filters or search change
        if (key !== 'page') {
          next.delete('page');
        }
        return next;
      });
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchParams(new URLSearchParams());
      setSearchInput('');
      setIsMobileFilterOpen(false);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('search', searchInput.trim() || null);
  };

  const hasActiveFilters = Boolean(
    categoryParam !== 'all' ||
      searchParam ||
      minPriceParam ||
      maxPriceParam ||
      ratingParam > 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
            {searchParam
              ? `Results for "${searchParam}"`
              : categoryParam !== 'all'
              ? `${categoryParam} Collection`
              : 'Explore All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <span className="font-semibold text-slate-800">{totalProducts}</span> items
            across our catalog
          </p>
        </div>

        {/* Controls: Search, Sort, Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Inline Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:flex-initial">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search in catalog..."
              className="w-full sm:w-56 text-xs pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium hidden sm:inline">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortParam}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 text-slate-700 shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs hover:bg-slate-50"
            aria-label="Open product filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary-600 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <ProductFilters
              categories={categories}
              selectedCategory={categoryParam}
              onCategoryChange={(cat) => updateParam('category', cat)}
              minPrice={minPriceParam}
              maxPrice={maxPriceParam}
              onMinPriceChange={(val) => updateParam('minPrice', val)}
              onMaxPriceChange={(val) => updateParam('maxPrice', val)}
              selectedRating={ratingParam}
              onRatingChange={(r) => updateParam('rating', r > 0 ? String(r) : null)}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-3" aria-label="Product Catalog">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400 font-medium">Active:</span>

              {categoryParam !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                  Category: {categoryParam}
                  <button
                    type="button"
                    onClick={() => updateParam('category', null)}
                    className="hover:text-primary-900"
                    aria-label={`Remove category filter ${categoryParam}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchParam && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  Search: "{searchParam}"
                  <button
                    type="button"
                    onClick={() => updateParam('search', null)}
                    className="hover:text-slate-900"
                    aria-label="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {(minPriceParam || maxPriceParam) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  Price: ${minPriceParam || '0'} - ${maxPriceParam || '∞'}
                  <button
                    type="button"
                    onClick={() => {
                      updateParam('minPrice', null);
                      updateParam('maxPrice', null);
                    }}
                    className="hover:text-slate-900"
                    aria-label="Remove price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {ratingParam > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  {ratingParam}★ & Above
                  <button
                    type="button"
                    onClick={() => updateParam('rating', null)}
                    className="hover:text-amber-900"
                    aria-label="Remove rating filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div
              data-testid="products-loading-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="text-lg font-bold text-rose-900">Failed to Load Products</h3>
              <p className="text-sm text-rose-700 max-w-md mx-auto">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  // triggers refetch
                  updateParam('page', '1');
                }}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <EmptyState
              icon={<PackageOpen className="w-10 h-10" />}
              title="No products found"
              description="We couldn't find any products matching your specific filters. Try expanding your price range or clearing selected categories."
              action={
                hasActiveFilters ? (
                  <Button variant="primary" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                ) : undefined
              }
            />
          )}

          {/* Product Grid */}
          {!isLoading && !error && products.length > 0 && (
            <>
              <div
                data-testid="products-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Page <span className="font-semibold text-slate-800">{pageParam}</span> of{' '}
                    <span className="font-semibold text-slate-800">{totalPages}</span>
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={pageParam <= 1}
                      onClick={() => updateParam('page', String(pageParam - 1))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isCurrent = pageNum === pageParam;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => updateParam('page', String(pageNum))}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`
                            min-w-[36px] h-9 px-3 rounded-xl text-xs font-semibold transition-colors
                            ${
                              isCurrent
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }
                          `}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={pageParam >= totalPages}
                      onClick={() => updateParam('page', String(pageParam + 1))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col z-10 animate-slideLeft">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">
              <ProductFilters
                categories={categories}
                selectedCategory={categoryParam}
                onCategoryChange={(cat) => updateParam('category', cat)}
                minPrice={minPriceParam}
                maxPrice={maxPriceParam}
                onMinPriceChange={(val) => updateParam('minPrice', val)}
                onMaxPriceChange={(val) => updateParam('maxPrice', val)}
                selectedRating={ratingParam}
                onRatingChange={(r) => updateParam('rating', r > 0 ? String(r) : null)}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6">
              <Button fullWidth onClick={() => setIsMobileFilterOpen(false)}>
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
