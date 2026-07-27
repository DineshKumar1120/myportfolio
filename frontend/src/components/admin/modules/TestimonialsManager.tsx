import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Edit2, Upload, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Testimonial } from '../../../types';

export const TestimonialsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    clientName: '',
    designation: '',
    company: '',
    feedback: '',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/admin/testimonials');
      if (res.data.success) setTestimonials(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImg(true);
    try {
      const file = e.target.files[0];
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, photo: url }));
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
        await api.put(`/admin/testimonials/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Testimonial updated!' });
      } else {
        await api.post('/admin/testimonials', formData);
        setMsg({ type: 'success', text: 'Testimonial added!' });
      }
      resetForm();
      await fetchTestimonials();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete testimonial?')) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      fetchTestimonials();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      designation: '',
      company: '',
      feedback: '',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating: 5,
    });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <MessageSquare className="text-primary" size={24} /> Module 10: Testimonials Manager
          </h4>
          <p className="text-muted small m-0">Add, edit, upload client avatar photos, and manage student reviews.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold">Client / Student Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Sarah Jenkins"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Engineering Manager"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Company / Organization</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Acme Software"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Feedback / Review *</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Client's review or endorsement..."
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Photo URL / Upload</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              />
              <label className="btn btn-outline-secondary cursor-pointer mb-0">
                <Upload size={14} /> {uploadingImg ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Star Rating (1 - 5)</label>
            <input
              type="number"
              className="form-control"
              min={1}
              max={5}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Client</th>
              <th>Designation</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t._id}>
                <td className="fw-bold">{t.clientName}</td>
                <td className="small text-muted">{t.designation} {t.company && `(${t.company})`}</td>
                <td>
                  <div className="d-flex text-warning">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </td>
                <td className="small text-muted text-truncate" style={{ maxWidth: '250px' }}>{t.feedback}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingItem(t); setFormData(t); }}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t._id)}>
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
