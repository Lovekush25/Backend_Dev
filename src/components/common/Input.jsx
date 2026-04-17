import React from 'react';
import clsx from 'clsx';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition',
          error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}