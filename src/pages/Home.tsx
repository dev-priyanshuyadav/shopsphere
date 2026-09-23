import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { ProductCard } from "../components/product/ProductCard";
import { productService } from "../services/productService";
import { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";

const benefits = [
  {
    icon: Truck,
    title: "Free shipping",
    description: "On every order over $50, with tracking included.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Protected checkout and transparent order updates.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "30-day returns on eligible items and simple exchanges.",
  },
  {
    icon: Headphones,
    title: "Support desk",
    description: "Help with setup, delivery questions, and product care.",
  },
];

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const productsSliderRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: "next" | "previous") => {
    const slider = productsSliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "next" ? slider.clientWidth : -slider.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productService.getProducts({
          limit: 8,
          sortBy: "featured",
        });
        setFeaturedProducts(response.data);
      } catch {
        setFeaturedProducts([]);
      }
    };

    void loadProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover the Future of E-Commerce</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Curated quality for your daily lifestyle
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Shop modern electronics, trendsetting apparel, and home essentials
              built with thoughtful design and everyday utility.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/shop">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Catalog
                </Button>
              </Link>
              <Link to="/shop?category=electronics">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Electronics
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-32 w-full rounded-xl object-cover"
                />
                <div className="mt-3">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-white">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white line-clamp-2">
                    {product.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse our top selected departments
            </p>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              name: "Electronics",
              count: "18 Items",
              path: "/shop?category=electronics",
            },
            {
              name: "Fashion & Apparel",
              count: "24 Items",
              path: "/shop?category=clothing",
            },
            {
              name: "Accessories",
              count: "12 Items",
              path: "/shop?category=accessories",
            },
            {
              name: "Home & Living",
              count: "16 Items",
              path: "/shop?category=home",
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-100/80 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Featured picks
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Selected items our customers keep coming back for
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollProducts("previous")}
                aria-label="Show previous featured products"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center transition hover:border-primary-500 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollProducts("next")}
                aria-label="Show next featured products"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center transition hover:border-primary-500 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={productsSliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none"
            aria-label="Featured products carousel"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-full sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] snap-start"
              >
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="rounded-3xl bg-white border border-slate-200/80 p-8 lg:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">
                Why ShopSphere
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Built for thoughtful shopping
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-slate-50 p-5 border border-slate-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
