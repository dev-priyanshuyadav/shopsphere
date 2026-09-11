import React from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "../components/common/Button";

export const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-16 w-full">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Join ShopSphere to save items and track orders
          </p>
        </div>

        <div className="text-center py-4">
          <p className="text-sm text-slate-500 mb-4">
            Registration validation form in Phase 13.
          </p>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Already have an account? Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
