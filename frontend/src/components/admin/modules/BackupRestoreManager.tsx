import React, { useState } from 'react';
import { Download, Upload, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';
import { useContent } from '../../../context/ContentContext';

export const BackupRestoreManager: React.FC = () => {
  const { refreshContent } = useContent();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExportBackup = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/backup');
      if (res.data.success && res.data.backup) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data.backup, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        setMsg({ type: 'success', text: 'Database backup downloaded successfully!' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Failed to generate backup file.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backupData = JSON.parse(event.target?.result as string);
        setLoading(true);
        const res = await api.post('/admin/restore', { backup: backupData });
        if (res.data.success) {
          setMsg({ type: 'success', text: 'Database restored successfully from backup file!' });
          await refreshContent();
        }
      } catch (err: any) {
        setMsg({ type: 'error', text: 'Invalid backup file or restore failed.' });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-card p-4 p-sm-5 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
            <Database className="text-primary" size={24} /> Backup & Restore Data
          </h4>
          <p className="text-muted small m-0">Export your entire portfolio content as a JSON file or restore from a previous backup.</p>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      <div className="row g-4">
        {/* Export Backup Card */}
        <div className="col-md-6">
          <div className="bg-body-tertiary p-4 rounded-3 h-100 border text-center d-flex flex-column align-items-center justify-content-center">
            <Download className="text-primary mb-3" size={40} />
            <h5 className="fw-bold">Export JSON Backup</h5>
            <p className="small text-muted mb-4">Download a full snapshot of all 14 modules, skills, projects, and website settings.</p>
            <button className="btn btn-primary px-4 py-2 rounded-pill shadow-sm" onClick={handleExportBackup} disabled={loading}>
              Download JSON Backup
            </button>
          </div>
        </div>

        {/* Restore Backup Card */}
        <div className="col-md-6">
          <div className="bg-body-tertiary p-4 rounded-3 h-100 border text-center d-flex flex-column align-items-center justify-content-center">
            <Upload className="text-info mb-3" size={40} />
            <h5 className="fw-bold">Restore From JSON Backup</h5>
            <p className="small text-muted mb-4">Upload a previously downloaded `.json` backup file to restore your portfolio database.</p>
            <label className="btn btn-outline-info px-4 py-2 rounded-pill cursor-pointer mb-0">
              Select JSON Backup File
              <input type="file" accept=".json" className="d-none" onChange={handleRestoreBackup} disabled={loading} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
