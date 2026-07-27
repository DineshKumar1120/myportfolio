import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Code, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';
import { Skill } from '../../../types';

export const SkillsManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'Frontend',
    percentage: 90,
    icon: 'Code',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/admin/skills');
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (editingItem?._id) {
        await api.put(`/admin/skills/${editingItem._id}`, formData);
        setMsg({ type: 'success', text: 'Skill updated successfully!' });
      } else {
        await api.post('/admin/skills', formData);
        setMsg({ type: 'success', text: 'New Skill added!' });
      }
      setFormData({ name: '', category: 'Frontend', percentage: 90, icon: 'Code' });
      setEditingItem(null);
      await fetchSkills();
      await refreshContent();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/admin/skills/${id}`);
      fetchSkills();
      refreshContent();
    } catch (err) {}
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Code className="text-primary" size={24} /> Module 3: Skills Manager
          </h4>
          <p className="text-muted small m-0">Add, edit, category filter, and re-order technical skills.</p>
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
        <h6 className="fw-bold mb-3">{editingItem ? 'Edit Skill' : 'Add New Skill'}</h6>
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label small fw-bold">Skill Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React 19 & TypeScript"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Category *</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Training & Mentorship">Training & Mentorship</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-bold">Mastery Level (%) *</label>
            <input
              type="number"
              className="form-control"
              min={10}
              max={100}
              value={formData.percentage}
              onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="col-12 d-flex gap-2 justify-content-end mt-3">
            {editingItem && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setEditingItem(null);
                  setFormData({ name: '', category: 'Frontend', percentage: 90, icon: 'Code' });
                }}
              >
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm px-4">
              {editingItem ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </div>
      </form>

      {/* List Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Percentage</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id}>
                <td className="fw-bold">{skill.name}</td>
                <td><span className="badge bg-primary-subtle text-primary">{skill.category}</span></td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="progress flex-grow-1" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: `${skill.percentage}%` }} />
                    </div>
                    <span className="small font-monospace">{skill.percentage}%</span>
                  </div>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      setEditingItem(skill);
                      setFormData(skill);
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(skill._id)}>
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
