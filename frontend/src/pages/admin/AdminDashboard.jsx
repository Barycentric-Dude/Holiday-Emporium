import React, { useState, useEffect } from 'react';
import { Package, MessageSquare, TrendingUp, Users } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toursRes, leadsRes] = await Promise.all([
          axios.get(`${API}/tours.php`),
          axios.get(`${API}/admin/leads.php`)
        ]);
        setStats({
          tours: toursRes.data.tours.length,
          leads: leadsRes.data.leads.length
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Tours', value: stats.tours, icon: Package, color: 'bg-blue-500' },
    { title: 'Total Leads', value: stats.leads, icon: MessageSquare, color: 'bg-emerald-500' },
    { title: 'Active Enquiries', value: stats.leads, icon: TrendingUp, color: 'bg-orange-500' },
    { title: 'Unique Visitors', value: '--', icon: Users, color: 'bg-stone-500' },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-['Cormorant_Garamond',serif]">Dashboard Overview</h1>
          <p className="text-stone-500 text-sm mt-1">Real-time business performance metrics.</p>
        </div>
        <div className="text-sm text-stone-400 font-medium italic">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">{card.title}</p>
                <h2 className="text-3xl font-bold text-stone-900 mt-2">{loading ? '...' : card.value}</h2>
              </div>
              <div className={`p-3 rounded-lg ${card.color} text-white`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-emerald-600 font-bold">↑ 12%</span>
              <span className="text-stone-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm h-64 flex items-center justify-center italic text-stone-400 text-sm">
          Analytics chart placeholder
        </div>
        <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm h-64 flex items-center justify-center italic text-stone-400 text-sm">
          Lead distribution placeholder
        </div>
      </div>
    </div>
  );
}
