import React from "react";
import { User, Shield, Mail, MapPin, ShoppingBag, Heart } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
import { useWishlistStore } from "../store/wishlistStore";

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const orders = useOrderStore((state) => state.orders);
  const wishlistCount = useWishlistStore((state) => state.getTotalCount());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        User Profile
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Manage your account information and preferences
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold">
              {user ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {user?.name || "Demo Customer"}
              </h2>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email || "customer@shopsphere.dev"}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-slate-100">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Membership
              </p>
              <p className="mt-2 text-base font-bold text-slate-900">
                Premium Member
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Status
              </p>
              <p className="mt-2 text-base font-bold text-emerald-700">
                Active
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>
              Demo profile session active. This is a frontend portfolio demo.
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">Address</h3>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-6">
              145 Pine Street
              <br />
              San Francisco, CA 94105
              <br />
              United States
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Order summary
              </h3>
            </div>
            <p className="mt-4 text-3xl font-black text-slate-900">
              {orders.length}
            </p>
            <p className="text-sm text-slate-500">Completed orders</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Wishlist summary
              </h3>
            </div>
            <p className="mt-4 text-3xl font-black text-slate-900">
              {wishlistCount}
            </p>
            <p className="text-sm text-slate-500">Saved items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
