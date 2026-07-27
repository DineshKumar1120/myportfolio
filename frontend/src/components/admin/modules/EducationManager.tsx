import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Trash2, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Education } from '../../../types';

export const EducationManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    degree: '',
    college: '',
    duration: '',
    grade: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchEducations = async () => {
    try {
      const res = await api.get('/admin/education');
      if (res.data.success) setEducations(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (editingItem?._id) {
        await api.put(`/admin/education/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Education updated!' });
      } else {
        await api.post('/admin/education', formData);
        setMsg({ type: 'success', text: 'Education added!' });
      }
      resetForm();
      await fetchEducations();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to save' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete education item?')) return;
    try {
      await api.delete(`/admin/education/${id}`);
      fetchEducations();
      refreshContent();
    } catch (err) {}
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ degree: '', college: '', duration: '', grade: '', description: '' });
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <GraduationCap className="text-primary" size={24} /> Module 5: Education Manager
          </h4>
          <p className="text-muted small m-0">Add & edit academic degrees, college details, and grades.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-body-tertiary p-4 rounded-3 mb-4 border">
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Education' : 'Add New Education'}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Degree / Course *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. B.S. in Computer Science"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">College / University *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. University of California, Berkeley"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Duration *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2013 - 2017"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">GPA / Grade</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 3.92 / 4.0 GPA"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold">Description</label>
            <textarea
              className="form-control"
              rows={3}
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
              {editingItem ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Degree</th>
              <th>College</th>
              <th>Duration</th>
              <th>Grade</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educations.map((edu) => (
              <tr key={edu._id}>
                <td className="fw-bold text-primary">{edu.degree}</td>
                <td>{edu.college}</td>
                <td><span className="badge bg-primary-subtle text-primary font-monospace">{edu.duration}</span></td>
                <td className="small text-success font-monospace">{edu.grade}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingItem(edu); setFormData(edu); }}>
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(edu._id)}>
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
