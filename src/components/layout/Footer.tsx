import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Mail,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "../common/Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const trustBadges = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders over $50",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description: "Protected with 256-bit encryption",
    },
    {
      icon: RotateCcw,
      title: "Easy 30-Day Returns",
      description: "Hassle-free return policy",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 Customer assistance",
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Trust Badges Section */}
      <div className="border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-primary-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span>
                Shop<span className="text-primary-500">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Discover everyday essentials, thoughtful gifts, and fresh finds
              delivered right to your door.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-medium text-slate-500">
                Follow our latest finds
              </span>
              <a
                href="https://www.facebook.com"
                aria-label="ShopSphere on Facebook"
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="ShopSphere on Instagram"
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.twitter.com"
                aria-label="ShopSphere on Twitter"
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=clothing"
                  className="hover:text-white transition-colors"
                >
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=accessories"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=home"
                  className="hover:text-white transition-colors"
                >
                  Home & Living
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@shopsphere.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Stay In The Loop
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for fresh arrivals, seasonal drops, and insider sales.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/80 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-800 text-white placeholder:text-slate-500 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  fullWidth
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()} ShopSphere.</p>
            <a
              href="mailto:support@shopsphere.com"
              className="hover:text-white transition-colors"
            >
              Privacy & Security
            </a>
            <a
              href="mailto:support@shopsphere.com"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Secure payments accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
