import React from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30',
  secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400/30',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400/30',
};

export default function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  loading = false,
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}