import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2, Edit2, Calendar, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Experience } from '../../../types';

export const ExperienceManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    duration: '',
    location: 'Remote',
    description: '',
    technologies: [],
    isCurrent: false,
    sortOrder: 0,
  });

  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/admin/experience');
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

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

    try {
      if (editingItem?._id) {
        await api.put(`/admin/experience/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Experience updated successfully!' });
      } else {
        await api.post('/admin/experience', formData);
        setMsg({ type: 'success', text: 'New Experience added successfully!' });
      }
      resetForm();
      await fetchExperiences();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save experience' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this work experience entry?')) return;
    try {
      await api.delete(`/admin/experience/${id}`);
      fetchExperiences();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      company: '',
      position: '',
      duration: '',
      location: 'Remote',
      description: '',
      technologies: [],
      isCurrent: false,
      sortOrder: 0,
    });
    setTechInput('');
  };

  const startEdit = (exp: Experience) => {
    setEditingItem(exp);
    setFormData(exp);
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Briefcase className="text-primary" size={24} /> Module 4: Professional Experience Manager
          </h4>
          <p className="text-muted small m-0">Add, edit, re-order, and manage work experience timeline entries.</p>
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
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Experience Entry' : 'Add New Experience Entry'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Position / Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Lead Technical Trainer & Full Stack Lead"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Company / Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Tech Academy Global"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Duration *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2022 - Present"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          <div className="col-md-5">
            <label className="form-label small fw-bold">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. San Francisco, CA (Hybrid)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="currentExpCheck"
                checked={formData.isCurrent}
                onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
              />
              <label className="form-check-input-label fw-bold small ms-2" htmlFor="currentExpCheck">
                Current Job
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Description & Responsibilities *</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Describe your role, key accomplishments, and training programs..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Tech Tags */}
          <div className="col-12">
            <label className="form-label small fw-bold">Technologies Used</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="e.g. React, TypeScript, Node.js"
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
                  #{t} <span className="ms-1 cursor-pointer text-danger" onClick={() => removeTechTag(i)}>×</span>
                </span>
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
              {editingItem ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </div>
      </form>

      {/* Experience List Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Position & Company</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Technologies</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp._id}>
                <td>
                  <div className="fw-bold text-primary">{exp.position}</div>
                  <div className="small text-muted">{exp.company}</div>
                </td>
                <td>
                  <span className="badge bg-primary-subtle text-primary font-monospace">{exp.duration}</span>
                </td>
                <td className="small text-muted">{exp.location}</td>
                <td>
                  <small className="font-monospace text-muted">
                    {(exp.technologies || []).slice(0, 3).join(', ')}
                  </small>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(exp)}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(exp._id)}>
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
