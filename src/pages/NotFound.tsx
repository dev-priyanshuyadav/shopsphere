import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Home as HomeIcon, ShoppingBag } from "lucide-react";
import { Button } from "../components/common/Button";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button leftIcon={<HomeIcon className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button
              variant="outline"
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              Explore Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
