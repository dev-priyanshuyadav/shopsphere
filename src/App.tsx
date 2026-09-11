import React from "react";
import { ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-2">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1 — Setup Complete</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            ShopSphere
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Production-quality, accessible e-commerce platform built with React,
            TypeScript, Vite, Tailwind CSS, Zustand, and React Router.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left pt-2 border-t border-slate-100">
          {[
            "React 18 + TypeScript",
            "Tailwind CSS v3",
            "Zustand State Store",
            "React Router v7",
            "React Hook Form + Zod",
            "Vitest + RTL Testing",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs font-medium text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
