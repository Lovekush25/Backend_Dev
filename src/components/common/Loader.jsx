import React from 'react';

export default function Loader({ text = 'Loading...', className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 ${className}`}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}