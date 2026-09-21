import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden p-0">
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" className="aspect-square w-full rounded-none" />

      {/* Content Skeletons */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-16 h-3" />
          <Skeleton variant="text" className="w-12 h-3" />
        </div>

        <Skeleton variant="text" className="w-3/4 h-5" />

        <div className="flex items-center gap-2 pt-1">
          <Skeleton variant="circular" className="w-4 h-4" />
          <Skeleton variant="text" className="w-10 h-3" />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <Skeleton variant="text" className="w-20 h-6" />
          <Skeleton variant="rectangular" className="w-16 h-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
