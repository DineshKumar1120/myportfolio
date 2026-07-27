import React, { useState, useEffect } from 'react';
import { Image, Plus, Trash2, Edit2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { GalleryItem } from '../../../types';

export const GalleryManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Tech Talks',
    imageUrl: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/admin/gallery');
      if (res.data.success) setGallery(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImg(true);
    try {
      const file = e.target.files[0];
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
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
        await api.put(`/admin/gallery/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Gallery image updated!' });
      } else {
        await api.post('/admin/gallery', formData);
        setMsg({ type: 'success', text: 'New Gallery image added!' });
      }
      resetForm();
      await fetchGallery();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete gallery image?')) return;
    try {
      await api.delete(`/admin/gallery/${id}`);
      fetchGallery();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'Tech Talks', imageUrl: '', description: '' });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Image className="text-primary" size={24} /> Module 9: Photo Gallery Manager
          </h4>
          <p className="text-muted small m-0">Upload and manage workshop photos, keynote presentation snapshots, and event gallery images.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Gallery Photo' : 'Upload New Photo'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Photo Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React Keynote Presentation"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Category</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Tech Talks, Workshops, Events"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Image URL / Upload *</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control font-monospace"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
              />
              <label className="btn btn-outline-secondary cursor-pointer mb-0">
                <Upload size={14} /> {uploadingImg ? 'Uploading...' : 'Upload File'}
                <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Optional photo caption..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Photo' : 'Add Photo'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.imageUrl} width={60} height={45} className="rounded object-fit-cover shadow-sm" alt={item.title} />
                </td>
                <td className="fw-bold">{item.title}</td>
                <td><span className="badge bg-primary-subtle text-primary">{item.category}</span></td>
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
