import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footerText, footerLinkText, footerLinkTo }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          </div>

          {children}

          <p className="mt-6 text-center text-sm text-slate-600">
            {footerText}{' '}
            <Link to={footerLinkTo} className="font-medium text-blue-600 hover:text-blue-700">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}