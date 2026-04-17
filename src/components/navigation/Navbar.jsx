import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-lg font-bold text-slate-900">
          SocialMini
        </Link>

        <nav className="flex items-center gap-2">
          {user && (
            <>
              <Link
                to="/"
                className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Feed
              </Link>
              <Link
                to="/create-post"
                className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Create
              </Link>
              <Link
                to="/profile"
                className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {user.username}
              </Link>
              <Button variant="secondary" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}