import React, { useState, useEffect } from 'react';
import { Save, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';

export const SeoSettingsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [formData, setFormData] = useState({
    metaTitle: 'Dinesh Kumar | Technical Trainer & Full Stack Developer',
    metaDescription: 'Portfolio of Dinesh Kumar, Senior Technical Trainer & Full Stack Developer.',
    keywords: 'Technical Trainer, Full Stack Developer, React 19, TypeScript, Node.js',
    ogImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    favicon: '/favicon.ico',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/admin/seo-settings');
        if (res.data.success && res.data.data) {
          setFormData((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await api.post('/admin/seo-settings', formData);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'SEO Settings saved successfully!' });
        await refreshContent();
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Search className="text-primary" size={24} /> Module 13: SEO Settings & Meta Tags
          </h4>
          <p className="text-muted small m-0">Optimize search engine visibility, meta descriptions, and social preview images.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12">
            <label className="form-label fw-bold">Meta Title *</label>
            <input
              type="text"
              className="form-control"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Meta Description *</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Keywords (Comma Separated)</label>
            <input
              type="text"
              className="form-control"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Open Graph (OG) Social Image URL</label>
            <input
              type="text"
              className="form-control"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Favicon URL</label>
            <input
              type="text"
              className="form-control"
              value={formData.favicon}
              onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
            />
          </div>

          <div className="col-12 pt-3">
            <button type="submit" disabled={loading} className="btn btn-primary px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
              {loading ? <div className="spinner-border spinner-border-sm" /> : <><Save size={18} /> Save SEO Settings</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
