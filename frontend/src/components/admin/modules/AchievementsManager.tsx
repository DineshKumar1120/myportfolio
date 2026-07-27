import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Trash2, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Achievement } from '../../../types';

export const AchievementsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({
    title: '',
    description: '',
    icon: 'Award',
    year: '2025',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/admin/achievements');
      if (res.data.success) setAchievements(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (editingItem?._id) {
        await api.put(`/admin/achievements/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Achievement updated!' });
      } else {
        await api.post('/admin/achievements', formData);
        setMsg({ type: 'success', text: 'Achievement added!' });
      }
      resetForm();
      await fetchAchievements();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete achievement?')) return;
    try {
      await api.delete(`/admin/achievements/${id}`);
      fetchAchievements();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', icon: 'Award', year: '2025' });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Trophy className="text-primary" size={24} /> Module 8: Achievements & Honors Manager
          </h4>
          <p className="text-muted small m-0">Manage career milestones, awards, and keynote speaker recognitions.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Achievement' : 'Add New Achievement'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Top Educator Award 2025"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-bold">Year</label>
            <input
              type="text"
              className="form-control"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-bold">Icon Type</label>
            <select
              className="form-select"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            >
              <option value="Award">Award</option>
              <option value="Mic">Mic / Keynote</option>
              <option value="Users">Users / Mentorship</option>
              <option value="Trophy">Trophy</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Description *</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Achievement' : 'Add Achievement'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Icon</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((item) => (
              <tr key={item._id}>
                <td className="fw-bold text-primary">{item.title}</td>
                <td><span className="badge bg-primary-subtle text-primary font-monospace">{item.year}</span></td>
                <td className="small text-muted">{item.icon}</td>
                <td className="small text-muted">{item.description}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingItem(item); setFormData(item); }}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
