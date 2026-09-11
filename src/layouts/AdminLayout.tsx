import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { SkipToContent } from "../components/layout/SkipToContent";
import { Badge } from "../components/common/Badge";

export const AdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 font-sans">
      <SkipToContent targetId="admin-main-content" />

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300
          flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <Link
            to="/admin"
            className="flex items-center gap-2.5 font-bold text-white text-lg tracking-tight"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span>ShopSphere</span>
            <Badge variant="success" size="sm">
              Admin
            </Badge>
          </Link>

          <button
            type="button"
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Management
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-primary-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Return to Customer Store CTA */}
        <div className="p-4 border-t border-slate-800">
          <Link
            to="/"
            className="
              flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl
              text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700
              hover:text-white transition-colors border border-slate-700
            "
          >
            <Store className="w-4 h-4 text-primary-400" />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open sidebar navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Mode (Live Demo)</span>
            </div>
          </div>
        </header>

        {/* Admin Page Content */}
        <main
          id="admin-main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 focus:outline-none overflow-y-auto"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
