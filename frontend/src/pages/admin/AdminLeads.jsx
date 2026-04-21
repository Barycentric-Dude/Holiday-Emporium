import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API}/admin/leads.php`);
      setLeads(res.data.leads);
    } catch (err) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await axios.delete(`${API}/admin/leads.php`, { data: { id } });
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-['Cormorant_Garamond',serif]">Customer Leads</h1>
          <p className="text-stone-500 text-sm mt-1">Manage and track customer inquiries.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider">Package</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 text-xs text-stone-500 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString()}
                    <br />
                    {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-900">
                      {lead.first_name} {lead.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-600">{lead.phone}</div>
                    <div className="text-xs text-stone-400">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase rounded-full border border-stone-200">
                      {lead.package_interest}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-stone-500 truncate" title={lead.message}>
                      {lead.message || <span className="text-stone-300 italic">No message</span>}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-stone-400 italic">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
