import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6 md:px-6">
        <Sidebar />
        <section className="min-w-0 flex-1">{children}</section>
      </main>
    </div>
  );
}