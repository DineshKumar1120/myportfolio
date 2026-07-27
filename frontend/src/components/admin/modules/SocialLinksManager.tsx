import React, { useState, useEffect } from 'react';
import { Share2, Plus, Trash2, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { SocialLink } from '../../../types';

export const SocialLinksManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    platform: '',
    url: '',
    icon: 'Globe',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSocials = async () => {
    try {
      const res = await api.get('/admin/social-links');
      if (res.data.success) setSocials(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (editingItem?._id) {
        await api.put(`/admin/social-links/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Social link updated!' });
      } else {
        await api.post('/admin/social-links', formData);
        setMsg({ type: 'success', text: 'Social link added!' });
      }
      resetForm();
      await fetchSocials();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete social link?')) return;
    try {
      await api.delete(`/admin/social-links/${id}`);
      fetchSocials();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ platform: '', url: '', icon: 'Globe', isActive: true });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Share2 className="text-primary" size={24} /> Module 2: Social Links Manager
          </h4>
          <p className="text-muted small m-0">Add, edit, and toggle social media profile URLs (LinkedIn, GitHub, Twitter, YouTube, etc.).</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Social Link' : 'Add New Social Link'}</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold">Platform Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. LinkedIn, GitHub, Twitter"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Profile URL *</label>
            <input
              type="url"
              className="form-control font-monospace"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="socialActiveCheck"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <label className="form-check-input-label fw-bold small ms-2" htmlFor="socialActiveCheck">
                Active
              </label>
            </div>
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Social Link' : 'Add Social Link'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Platform</th>
              <th>URL</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {socials.map((s) => (
              <tr key={s._id}>
                <td className="fw-bold text-primary">{s.platform}</td>
                <td className="font-monospace small text-muted text-truncate" style={{ maxWidth: '300px' }}>{s.url}</td>
                <td>
                  <span className={`badge ${s.isActive ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-muted'}`}>
                    {s.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingItem(s); setFormData(s); }}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s._id)}>
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
