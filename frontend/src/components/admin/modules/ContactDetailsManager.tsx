import React, { useState, useEffect } from 'react';
import { Save, Phone, MapPin, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';

export const ContactDetailsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [formData, setFormData] = useState({
    address: '742 Market Street, Suite 400, San Francisco, CA 94103',
    phone: '+1 (555) 234-5678',
    email: 'dinesh.kumar@devtrainer.io',
    googleMapUrl: 'https://maps.google.com/maps?q=San+Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed',
    whatsappNumber: '+15552345678',
    workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM PST',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/admin/contact-details');
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
      const res = await api.post('/admin/contact-details', formData);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Contact Details updated successfully!' });
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
            <Phone className="text-primary" size={24} /> Module 12: Contact Details Manager
          </h4>
          <p className="text-muted small m-0">Update address, phone, email, Google Maps embed, and WhatsApp contact link.</p>
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
          <div className="col-md-6">
            <label className="form-label fw-bold">Office Address *</label>
            <input
              type="text"
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Direct Phone Number *</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Contact Email *</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">WhatsApp Number *</label>
            <input
              type="text"
              className="form-control"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Google Map Embed Iframe URL *</label>
            <input
              type="url"
              className="form-control font-monospace"
              value={formData.googleMapUrl}
              onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })}
              required
            />
            <small className="text-muted">Paste your Google Maps embed src URL</small>
          </div>

          <div className="col-12 pt-3">
            <button type="submit" disabled={loading} className="btn btn-primary px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
              {loading ? <div className="spinner-border spinner-border-sm" /> : <><Save size={18} /> Save Contact Details</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
