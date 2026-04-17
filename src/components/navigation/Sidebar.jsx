import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const links = [
  { label: 'Home Feed', path: '/' },
  { label: 'Create Post', path: '/create-post' },
  { label: 'My Profile', path: '/profile' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:block lg:w-64">
      <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-3">
        <ul className="space-y-1">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={clsx(
                    'block rounded-lg px-3 py-2 text-sm font-medium',
                    active ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}