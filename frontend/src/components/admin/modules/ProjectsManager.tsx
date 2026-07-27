import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2, Edit2, Upload, Star, CheckCircle2, AlertCircle, Tag } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Project } from '../../../types';

export const ProjectsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    technologies: [],
    liveDemoUrl: '#',
    githubUrl: '#',
    images: [],
    featured: false,
    category: 'Full Stack',
  });

  const [techInput, setTechInput] = useState('');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/admin/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Compute dynamic list of existing categories from current projects
  const existingCategories = Array.from(
    new Set([
      'Full Stack',
      'Web App',
      'DevOps',
      'Mobile',
      'AI & Machine Learning',
      'Cloud Native',
      ...projects.map((p) => p.category).filter(Boolean) as string[],
    ])
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImg(true);
    try {
      const file = e.target.files[0];
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), url],
      }));
    } catch (err) {
      alert('Failed to upload image.');
    } finally {
      setUploadingImg(false);
    }
  };

  const addTechTag = () => {
    if (!techInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), techInput.trim()],
    }));
    setTechInput('');
  };

  const removeTechTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    // Finalize dynamic category name
    const finalCategory = isCustomCategory ? customCategoryInput.trim() : formData.category;

    if (!finalCategory) {
      setMsg({ type: 'error', text: 'Please specify a category for the project.' });
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      category: finalCategory,
    };

    try {
      if (editingItem?._id) {
        await api.put(`/admin/projects/${editingItem._id}`, payload);
        setMsg({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await api.post('/admin/projects', payload);
        setMsg({ type: 'success', text: 'New Project created successfully!' });
      }
      resetForm();
      await fetchProjects();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save project' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete project?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      fetchProjects();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      technologies: [],
      liveDemoUrl: '#',
      githubUrl: '#',
      images: [],
      featured: false,
      category: 'Full Stack',
    });
    setTechInput('');
    setCustomCategoryInput('');
    setIsCustomCategory(false);
  };

  const startEdit = (proj: Project) => {
    setEditingItem(proj);
    setFormData(proj);
    if (!existingCategories.includes(proj.category || '')) {
      setIsCustomCategory(true);
      setCustomCategoryInput(proj.category || '');
    } else {
      setIsCustomCategory(false);
    }
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Briefcase className="text-primary" size={24} /> Module 7: Projects Manager
          </h4>
          <p className="text-muted small m-0">Manage projects with dynamic categories, tech tags, and screenshots.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      {/* Existing Dynamic Categories Overview */}
      <div className="bg-body-tertiary p-3 rounded-3 mb-4 border">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Tag size={16} className="text-primary" />
          <span className="fw-bold small text-uppercase text-muted">Active Dynamic Project Categories:</span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {existingCategories.map((cat, idx) => (
            <span key={idx} className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 rounded-pill font-monospace small">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Project' : 'Add New Project'}</h6>
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label small fw-bold">Project Name *</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Dynamic Category Selector */}
          <div className="col-md-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label small fw-bold m-0">Dynamic Category *</label>
              <button
                type="button"
                className="btn btn-link p-0 text-primary small text-decoration-none"
                onClick={() => {
                  setIsCustomCategory(!isCustomCategory);
                  if (!isCustomCategory) setCustomCategoryInput('');
                }}
              >
                {isCustomCategory ? '← Choose Existing' : '+ Add New Category'}
              </button>
            </div>

            {isCustomCategory ? (
              <input
                type="text"
                className="form-control"
                placeholder="Enter new category (e.g. AI & ML)..."
                value={customCategoryInput}
                onChange={(e) => setCustomCategoryInput(e.target.value)}
                required
              />
            ) : (
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {existingCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="featuredCheck"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label className="form-check-input-label fw-bold small ms-2" htmlFor="featuredCheck">
                <Star size={14} className="text-warning me-1" /> Featured Project
              </label>
            </div>
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

          <div className="col-md-6">
            <label className="form-label small fw-bold">Live Demo URL</label>
            <input
              type="url"
              className="form-control"
              value={formData.liveDemoUrl}
              onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">GitHub Repository URL</label>
            <input
              type="url"
              className="form-control"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </div>

          {/* Tech Tags */}
          <div className="col-12">
            <label className="form-label small fw-bold">Technologies Used</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="e.g. React 19, TypeScript, Docker"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <button type="button" className="btn btn-outline-primary" onClick={addTechTag}>
                Add Tag
              </button>
            </div>
            <div className="d-flex flex-wrap gap-1">
              {(formData.technologies || []).map((t, i) => (
                <span key={i} className="badge bg-primary-subtle text-primary font-monospace p-2">
                  {t} <span className="ms-1 cursor-pointer text-danger" onClick={() => removeTechTag(i)}>×</span>
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-12">
            <label className="form-label small fw-bold">Project Screenshots / Images</label>
            <div className="d-flex gap-2 mb-2">
              <label className="btn btn-outline-secondary btn-sm cursor-pointer mb-0">
                <Upload size={14} /> {uploadingImg ? 'Uploading...' : 'Upload Screenshot'}
                <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {(formData.images || []).map((img, i) => (
                <div key={i} className="position-relative">
                  <img src={img} width={80} height={60} className="rounded border object-fit-cover" alt="Thumb" />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle"
                    style={{ width: '18px', height: '18px', fontSize: '10px' }}
                    onClick={() => setFormData({ ...formData, images: (formData.images || []).filter((_, idx) => idx !== i) })}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>

      {/* Projects List Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Featured</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj._id}>
                <td className="fw-bold">{proj.name}</td>
                <td>
                  <span className="badge bg-secondary-subtle text-body border">{proj.category || 'Full Stack'}</span>
                </td>
                <td>
                  <small className="font-monospace text-muted">{proj.technologies.slice(0, 3).join(', ')}</small>
                </td>
                <td>{proj.featured ? <Star size={16} className="text-warning fill-warning" /> : '—'}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => startEdit(proj)}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(proj._id)}>
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
