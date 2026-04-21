import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, X, Info } from 'lucide-react';
import axios from 'axios';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ['spiritual', 'wildlife', 'international', 'coastal', 'heritage'];

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTours = async () => {
    try {
      const res = await axios.get(`${API}/tours.php`);
      setTours(res.data.tours);
    } catch (err) {
      console.error('Fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      await axios.delete(`${API}/admin/tours.php`, { data: { id } });
      setTours(tours.filter(t => t.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingTour.isNew ? 'POST' : 'PUT';
    try {
      await axios({
        method,
        url: `${API}/admin/tours.php`,
        data: editingTour
      });
      setIsModalOpen(false);
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.error || 'Save failed');
    }
  };

  const openEdit = (tour) => {
    setEditingTour({ ...tour, isNew: false });
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingTour({
      id: '', slug: '', title: '', title_mr: '', category: 'spiritual', 
      duration: '', price: '', tagline: '', description: '', image: '',
      highlights: [], itinerary: [], variants: [], isNew: true
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-['Cormorant_Garamond',serif]">Manage Tours</h1>
          <p className="text-stone-500 text-sm mt-1">Add, edit or remove travel packages.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brand-primary)] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Tour
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400">ID / Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400">Price</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-stone-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-stone-900">{tour.title}</div>
                  <div className="text-xs text-stone-400">{tour.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase rounded border border-stone-200">
                    {tour.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{tour.price}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => openEdit(tour)} className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(tour.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                {editingTour.isNew ? 'Create New Tour' : `Edit: ${editingTour.title}`}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tour ID (Permanent)</Label>
                  <Input 
                    value={editingTour.id} 
                    onChange={e => setEditingTour({...editingTour, id: e.target.value})}
                    disabled={!editingTour.isNew}
                    placeholder="e.g., ashtavinayak"
                    required
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input 
                    value={editingTour.slug} 
                    onChange={e => setEditingTour({...editingTour, slug: e.target.value})}
                    placeholder="e.g., ashtavinayak-yatra"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Label>Title (English)</Label>
                  <Input 
                    value={editingTour.title} 
                    onChange={e => setEditingTour({...editingTour, title: e.target.value})}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Title (Marathi)</Label>
                  <Input 
                    value={editingTour.title_mr} 
                    onChange={e => setEditingTour({...editingTour, title_mr: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={editingTour.category} 
                    onValueChange={v => setEditingTour({...editingTour, category: v})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input 
                    value={editingTour.duration} 
                    onChange={e => setEditingTour({...editingTour, duration: e.target.value})}
                    placeholder="e.g., 2 Nights / 3 Days"
                  />
                </div>
              </div>

              <div>
                <Label>Price Text</Label>
                <Input 
                  value={editingTour.price} 
                  onChange={e => setEditingTour({...editingTour, price: e.target.value})}
                  placeholder="e.g., Starting from ₹8,999 per person"
                />
              </div>

              <div>
                <Label>Image URL</Label>
                <Input 
                  value={editingTour.image} 
                  onChange={e => setEditingTour({...editingTour, image: e.target.value})}
                  placeholder="/images/example.jpg or https://..."
                />
              </div>

              <div>
                <Label>Tagline</Label>
                <Input 
                  value={editingTour.tagline} 
                  onChange={e => setEditingTour({...editingTour, tagline: e.target.value})}
                />
              </div>

              <div>
                <Label>Description</Label>
                <textarea 
                  className="w-full h-32 p-3 border rounded-md text-sm"
                  value={editingTour.description} 
                  onChange={e => setEditingTour({...editingTour, description: e.target.value})}
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-xs text-amber-800 flex items-start gap-3">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Note: Editing highlights, itineraries, and variants requires more granular UI components. For now, the basic info can be updated here. To add highlights, use the database seed tool or edit the code.
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-stone-500 font-semibold hover:bg-stone-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-2 bg-[var(--brand-primary)] text-white font-bold rounded-lg shadow-md"
                >
                  <Save className="w-4 h-4" /> Save Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
