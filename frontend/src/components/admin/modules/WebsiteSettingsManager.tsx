import React, { useState, useEffect } from 'react';
import { Save, Globe, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';

export const WebsiteSettingsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [formData, setFormData] = useState({
    logoText: 'DineshKumar.dev',
    portfolioUrl: 'https://dineshkumar.dev',
    primaryColor: '#FFFFFF',
    secondaryColor: '#3B82F6',
    footerText: 'Empowering engineers through technical training and building modern scalable software.',
    copyrightText: '© 2026 Dinesh Kumar. All rights reserved.',
    googleAnalyticsCode: 'G-MEASUREMENT_ID',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/admin/website-settings');
        if (res.data.success && res.data.data) {
          setFormData(res.data.data);
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
      const res = await api.post('/admin/website-settings', formData);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Website Settings & Portfolio URL updated! Synced across Resume, QR Code, Footer, and Contact details.' });
        await refreshContent();
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || err.message || 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Globe className="text-primary" size={24} /> Module 14: Website Settings & Dynamic URL Sync
          </h4>
          <p className="text-muted small m-0">Manage website branding, primary colors, and master Portfolio URL.</p>
        </div>
      </div>

      <div className="alert alert-info border border-info-subtle mb-4">
        <h6 className="fw-bold mb-1">⚡ Automatic Portfolio URL Sync Engine</h6>
        <p className="small mb-0">
          Whenever you change the <strong>Portfolio URL</strong> below, the system automatically updates the Resume link, Contact section details, Share buttons, Footer, QR Code, and SEO Canonical URL dynamically!
        </p>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Portfolio URL (Dynamic Master Sync) *</label>
            <div className="input-group">
              <span className="input-group-text bg-body text-primary"><Globe size={18} /></span>
              <input
                type="url"
                className="form-control font-monospace"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://myportfolio.com"
                required
              />
            </div>
            <small className="text-muted">Example: https://myportfolio.com</small>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Logo Text</label>
            <input
              type="text"
              className="form-control"
              value={formData.logoText}
              onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Primary Theme Color</label>
            <div className="d-flex gap-2">
              <input
                type="color"
                className="form-control form-control-color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
              />
              <input
                type="text"
                className="form-control font-monospace"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Secondary Theme Color (Accent)</label>
            <div className="d-flex gap-2">
              <input
                type="color"
                className="form-control form-control-color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
              />
              <input
                type="text"
                className="form-control font-monospace"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Footer Text</label>
            <textarea
              className="form-control"
              rows={2}
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Copyright Statement</label>
            <input
              type="text"
              className="form-control"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Google Analytics Measurement ID</label>
            <input
              type="text"
              className="form-control font-monospace"
              value={formData.googleAnalyticsCode}
              onChange={(e) => setFormData({ ...formData, googleAnalyticsCode: e.target.value })}
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div className="col-12 pt-3">
            <button type="submit" disabled={loading} className="btn btn-primary px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
              {loading ? <div className="spinner-border spinner-border-sm" /> : <><Save size={18} /> Save & Sync Dynamic URL</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
