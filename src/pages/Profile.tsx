import React from "react";
import { User, Shield, Mail } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export const Profile: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        User Profile
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Manage your account information and preferences
      </p>

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

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>
            Demo profile session active. Full profile features in Phase 16.
          </span>
        </div>
      </div>
    </div>
  );
};
