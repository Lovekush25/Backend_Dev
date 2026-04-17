import React from 'react';

export function PostSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="flex-1">
          <div className="h-3 w-32 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
        </div>
      </div>
      <div className="h-3 w-full rounded bg-slate-200" />
      <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />
      <div className="mt-4 h-9 w-full rounded-xl bg-slate-200" />
    </div>
  );
}

export default function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}