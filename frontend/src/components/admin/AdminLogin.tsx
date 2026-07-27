import React, { useState } from 'react';
import { Lock, Mail, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 10000 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-0 p-4 p-sm-5 shadow-lg">
          <div className="text-center mb-4">
            <div className="bg-primary text-white p-3 rounded-circle d-inline-flex mb-3 shadow">
              <Shield size={36} />
            </div>
            <h4 className="fw-bold">Admin Portal Login</h4>
            <p className="text-muted small">Enter your credentials to manage dynamic portfolio content.</p>
            <div className="bg-primary-subtle text-primary p-2 rounded small font-monospace">
              Default: admin@portfolio.com / Admin@123456
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-3">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium small">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-body text-muted"><Mail size={18} /></span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium small">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-body text-muted"><Lock size={18} /></span>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 rounded-pill shadow fw-bold mb-3">
              {loading ? <div className="spinner-border spinner-border-sm" /> : 'Login to Dashboard'}
            </button>

            <button type="button" className="btn btn-link text-secondary w-100 d-flex align-items-center justify-content-center gap-1 text-decoration-none" onClick={onClose}>
              <ArrowLeft size={16} /> Return to Portfolio Website
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
