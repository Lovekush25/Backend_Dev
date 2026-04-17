import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-sm text-slate-600">Page not found</p>
        <Link to="/" className="mt-4 inline-block">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}