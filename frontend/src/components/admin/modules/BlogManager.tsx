import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Edit2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { BlogItem } from '../../../types';

export const BlogManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [editingItem, setEditingItem] = useState<BlogItem | null>(null);
  const [formData, setFormData] = useState<Partial<BlogItem>>({
    title: '',
    description: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Frontend',
    readTime: '5 min read',
    publishDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/admin/blogs');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchBlogs();
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
      const payload = {
        ...formData,
        slug: (formData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (editingItem?._id) {
        await api.put(`/admin/blogs/${editingItem._id}`, payload);
        setMsg({ type: 'success', text: 'Blog updated!' });
      } else {
        await api.post('/admin/blogs', payload);
        setMsg({ type: 'success', text: 'New Blog published!' });
      }
      resetForm();
      await fetchBlogs();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete blog article?')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      fetchBlogs();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: 'Frontend',
      readTime: '5 min read',
      publishDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <BookOpen className="text-primary" size={24} /> Module 11: Blog & Rich Text Content Manager
          </h4>
          <p className="text-muted small m-0">Publish technical articles, tutorial guides, and blog posts.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Blog Article' : 'Write New Article'}</h6>
        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label small fw-bold">Article Title *</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Category</label>
            <input
              type="text"
              className="form-control"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Short Excerpt / Description *</label>
            <input
              type="text"
              className="form-control"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Article Content (Supports Markdown & Formatting) *</label>
            <textarea
              className="form-control font-monospace"
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Cover Image URL / Upload</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <label className="btn btn-outline-secondary cursor-pointer mb-0">
                <Upload size={14} /> {uploadingImg ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-bold">Publish Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-bold">Read Time</label>
            <input
              type="text"
              className="form-control"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </div>
      </form>

      {/* Blogs List */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="fw-bold">{blog.title}</td>
                <td><span className="badge bg-primary-subtle text-primary">{blog.category}</span></td>
                <td className="small text-muted">{blog.publishDate}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      setEditingItem(blog);
                      setFormData(blog);
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog._id)}>
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
