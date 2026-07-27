import React from 'react';
import { X, QrCode, Share2, Copy, Download } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const { data, qrCodeUrl } = useContent();
  const portfolioUrl = data?.websiteSettings?.portfolioUrl || window.location.origin;

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    alert('Portfolio URL copied to clipboard!');
  };

  return (
    <div className="modal show d-block modal-backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10000 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-0 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <QrCode className="text-primary" size={24} />
              <h5 className="modal-title fw-bold m-0">Portfolio QR Code</h5>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="text-center py-3">
            {qrCodeUrl ? (
              <div className="bg-white p-3 d-inline-block rounded-3 shadow-sm border mb-3">
                <img src={qrCodeUrl} alt="Portfolio QR Code" width={200} height={200} />
              </div>
            ) : (
              <div className="spinner-border text-primary" role="status"></div>
            )}
            <p className="small text-muted mb-2">Scan to open portfolio on mobile</p>
            <div className="bg-light dark-mode-card p-2 rounded d-flex align-items-center justify-content-between font-monospace small">
              <span className="text-truncate me-2">{portfolioUrl}</span>
              <button className="btn btn-sm btn-outline-primary" onClick={copyToClipboard}>
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-end mt-2">
            <a href={qrCodeUrl} download="Portfolio_QRCode.png" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
              <Download size={14} /> Download QR
            </a>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
