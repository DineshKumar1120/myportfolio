import React, { useState, useEffect } from 'react';
import { Save, User, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import api, { uploadMediaFile } from '../../../services/api';
import { useContent } from '../../../context/ContentContext';

export const PersonalInfoManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [formData, setFormData] = useState({
    name: 'Dinesh Kumar',
    role: 'Technical Trainer & Senior Full Stack Developer',
    shortBio: '',
    longAbout: '',
    profilePicture: '',
    resumeUrl: '',
    heroBackground: '',
    tagline: '',
    yearsExperience: 8,
    studentsTrained: 5000,
    projectsCompleted: 45,
  });

  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/admin/personal-info');
        if (res.data.success && res.data.data) {
          setFormData((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'resumeUrl' | 'profilePicture') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (field === 'resumeUrl') setUploadingResume(true);
    if (field === 'profilePicture') setUploadingPic(true);

    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, [field]: url }));
      setMsg({ type: 'success', text: `${field === 'resumeUrl' ? 'Resume PDF' : 'Profile Picture'} uploaded successfully!` });
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Upload failed.' });
    } finally {
      setUploadingResume(false);
      setUploadingPic(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await api.post('/admin/personal-info', formData);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Personal Information updated successfully! Resume Download button updated.' });
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
            <User className="text-primary" size={24} /> Module 1: Personal Information & Resume PDF Upload
          </h4>
          <p className="text-muted small m-0">Update name, bio, profile picture, and upload latest Resume PDF.</p>
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
            <label className="form-label fw-bold">Full Name *</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Professional Role / Title *</label>
            <input
              type="text"
              className="form-control"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Short Hero Bio *</label>
            <input
              type="text"
              className="form-control"
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Long About Me Description *</label>
            <textarea
              className="form-control"
              rows={4}
              value={formData.longAbout}
              onChange={(e) => setFormData({ ...formData, longAbout: e.target.value })}
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Profile Picture URL / Upload</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={formData.profilePicture}
                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
              />
              <label className="btn btn-outline-secondary mb-0 cursor-pointer">
                <Upload size={16} /> {uploadingPic ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="d-none" onChange={(e) => handleFileUpload(e, 'profilePicture')} />
              </label>
            </div>
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="Preview" width={60} height={60} className="rounded-circle shadow-sm" />
            )}
          </div>

          {/* Resume PDF Upload */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Resume PDF File Upload *</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control font-monospace"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                required
              />
              <label className="btn btn-outline-primary mb-0 cursor-pointer">
                <FileText size={16} /> {uploadingResume ? 'Uploading PDF...' : 'Upload PDF'}
                <input type="file" accept=".pdf" className="d-none" onChange={(e) => handleFileUpload(e, 'resumeUrl')} />
              </label>
            </div>
            <small className="text-muted">Uploading a new PDF automatically updates the Resume Download button!</small>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Years of Experience</label>
            <input
              type="number"
              className="form-control"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Students Trained</label>
            <input
              type="number"
              className="form-control"
              value={formData.studentsTrained}
              onChange={(e) => setFormData({ ...formData, studentsTrained: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Projects Built</label>
            <input
              type="number"
              className="form-control"
              value={formData.projectsCompleted}
              onChange={(e) => setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="col-12 pt-3">
            <button type="submit" disabled={loading} className="btn btn-primary px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
              {loading ? <div className="spinner-border spinner-border-sm" /> : <><Save size={18} /> Save Personal Information</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
