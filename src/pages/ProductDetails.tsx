import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { productService } from "../services/productService";
import { Product } from "../types/product";
import { formatCurrency, calculateDiscountPercentage } from "../utils/currency";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const isWishlistedItem = product ? isWishlisted(product.id) : false;

  useEffect(() => {
    if (!id) {
      setError("Product not found.");
      setIsLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const found = await productService.getProductById(id);
        setProduct(found);
        setSelectedImage(0);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "The requested product could not be loaded.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-[500px] bg-slate-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-6 w-48 bg-slate-200 rounded" />
              <div className="h-10 w-64 bg-slate-200 rounded" />
              <div className="h-5 w-40 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-rose-900">
            Product unavailable
          </h1>
          <p className="mt-2 text-sm text-rose-700">
            {error || "This product no longer exists in our catalog."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/shop">
              <Button>Browse products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = calculateDiscountPercentage(
    product.price,
    product.originalPrice,
  );
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <article className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 lg:p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="h-[420px] w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={`${product.id}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 ${selectedImage === index ? "border-primary-600" : "border-slate-200"}`}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} gallery ${index + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {product.brand}
              </span>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${isWishlistedItem ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-slate-600"}`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlistedItem ? "fill-rose-500" : ""}`}
                />
                {isWishlistedItem ? "Saved" : "Wishlist"}
              </button>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {product.title}
              </h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-slate-900">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span>({product.reviewCount} reviews)</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-slate-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  {discount && (
                    <span className="rounded-md bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-slate-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="p-3 text-slate-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={() => addItem(product, quantity)}
                disabled={isOutOfStock}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                className="flex-1 min-w-[180px]"
              >
                {isOutOfStock ? "Sold out" : "Add to cart"}
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Shipping
                  </p>
                  <p className="text-sm text-slate-700">
                    Free delivery over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Quality
                  </p>
                  <p className="text-sm text-slate-700">30-day returns</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                Specifications
              </h2>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
                <div className="flex justify-between gap-3 border-b border-slate-200 pb-2">
                  <dt>Category</dt>
                  <dd className="font-medium capitalize">{product.category}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-slate-200 pb-2">
                  <dt>Brand</dt>
                  <dd className="font-medium">{product.brand}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-slate-200 pb-2">
                  <dt>Stock</dt>
                  <dd className="font-medium">{product.stock}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-slate-200 pb-2">
                  <dt>Tags</dt>
                  <dd className="font-medium capitalize">
                    {product.tags?.slice(0, 2).join(", ") || "New"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Customer reviews
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Alicia",
                quote:
                  "Premium finish and the quality feels outstanding. Shipping was quick and the packaging was careful.",
                rating: 5,
              },
              {
                name: "Marcus",
                quote:
                  "The product looks even better in person and the value is excellent for what it includes.",
                rating: 5,
              },
              {
                name: "Priya",
                quote:
                  "Everything from the fit to the material feels thoughtfully designed. I would buy again.",
                rating: 4,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  “{review.quote}”
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
