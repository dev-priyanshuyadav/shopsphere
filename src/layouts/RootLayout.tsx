import React from "react";
import { Outlet } from "react-router-dom";
import { SkipToContent } from "../components/layout/SkipToContent";
import { ScrollToTop } from "./ScrollToTop";

export interface RootLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ header, footer }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-primary-500 selection:text-white">
      <SkipToContent targetId="main-content" />
      <ScrollToTop />

      {/* Header Container */}
      {header && <header className="sticky top-0 z-40 w-full">{header}</header>}

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col focus:outline-none"
      >
        <Outlet />
      </main>

      {/* Footer Container */}
      {footer && <footer className="w-full mt-auto">{footer}</footer>}
    </div>
  );
};
