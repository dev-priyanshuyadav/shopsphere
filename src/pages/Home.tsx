import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/common/Button";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section Placeholder */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover the Future of E-Commerce</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Curated Quality for Your Daily Lifestyle
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Shop modern electronics, trendsetting apparel, and home essentials
            built with premium craftsmanship.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/shop">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Catalog
              </Button>
            </Link>
            <Link to="/shop?category=electronics">
              <Button
                size="lg"
                variant="outline"
                className="text-white bg-slate-800/80 border-slate-700 hover:bg-slate-800"
              >
                Shop Electronics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Links */}
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
    </div>
  );
};
