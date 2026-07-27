import React, { useState, useEffect } from 'react';
import { Award, Plus, Trash2, Edit2, Upload, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Certification } from '../../../types';

export const CertificationsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingItem, setEditingItem] = useState<Certification | null>(null);
  const [formData, setFormData] = useState<Partial<Certification>>({
    name: '',
    organization: '',
    date: '2025',
    credentialUrl: '#',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    badge: 'Verified',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchCertifications = async () => {
    try {
      const res = await api.get('/admin/certifications');
      if (res.data.success) setCertifications(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImg(true);
    try {
      const file = e.target.files[0];
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (editingItem?._id) {
        await api.put(`/admin/certifications/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Certification updated successfully!' });
      } else {
        await api.post('/admin/certifications', formData);
        setMsg({ type: 'success', text: 'New Certification added successfully!' });
      }
      resetForm();
      await fetchCertifications();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this certification entry?')) return;
    try {
      await api.delete(`/admin/certifications/${id}`);
      fetchCertifications();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      organization: '',
      date: '2025',
      credentialUrl: '#',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      badge: 'Verified',
    });
  };

  const startEdit = (cert: Certification) => {
    setEditingItem(cert);
    setFormData(cert);
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Award className="text-primary" size={24} /> Module 6: Certifications & Accreditations Manager
          </h4>
          <p className="text-muted small m-0">Add, edit, upload certificate badges, and manage credential verification URLs.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Certification' : 'Add New Certification'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Certification Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. AWS Certified Solutions Architect"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Issuing Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Amazon Web Services"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Issue Date / Year *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2025"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Badge Tag / Label</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. AWS Certified / Master Trainer"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Credential Verification URL</label>
            <input
              type="url"
              className="form-control font-monospace"
              placeholder="https://verification.com"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
            />
          </div>

          {/* Certificate Image Upload */}
          <div className="col-12">
            <label className="form-label small fw-bold">Certificate Badge / Image URL</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control font-monospace"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <label className="btn btn-outline-secondary cursor-pointer mb-0">
                <Upload size={14} /> {uploadingImg ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} />
              </label>
            </div>
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Preview" width={80} height={60} className="rounded border object-fit-cover shadow-sm" />
              </div>
            )}
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Certification' : 'Add Certification'}
            </button>
          </div>
        </div>
      </form>

      {/* Certifications Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Certificate Name</th>
              <th>Organization</th>
              <th>Date</th>
              <th>Badge</th>
              <th>Credential URL</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((cert) => (
              <tr key={cert._id}>
                <td className="fw-bold text-primary">{cert.name}</td>
                <td>{cert.organization}</td>
                <td><span className="badge bg-primary-subtle text-primary font-monospace">{cert.date}</span></td>
                <td><span className="badge bg-success-subtle text-success">{cert.badge || 'Verified'}</span></td>
                <td>
                  {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="small text-decoration-none">
                      <ExternalLink size={14} /> Verify
                    </a>
                  ) : '—'}
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(cert)}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cert._id)}>
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
