import React from 'react';
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, MessageSquare, LogOut, Loader2 } from 'lucide-react';

export default function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Tours', icon: Package, path: '/admin/tours' },
    { name: 'Leads', icon: MessageSquare, path: '/admin/leads' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-6">
          <Link to="/admin/dashboard" className="text-xl font-bold font-['Cormorant_Garamond',serif]">
            Holiday <span className="text-[var(--brand-secondary)]">Emporium</span>
          </Link>
          <div className="mt-2 text-stone-400 text-xs uppercase tracking-widest font-bold">Admin Panel</div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-[var(--brand-secondary)] text-white shadow-lg'
                  : 'text-stone-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <div className="px-4 py-3 mb-4 bg-stone-800 rounded-lg">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-tight">Logged in as</p>
            <p className="text-sm font-semibold truncate">{admin.username}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
