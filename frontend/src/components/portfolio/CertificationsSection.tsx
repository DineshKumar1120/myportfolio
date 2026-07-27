import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Eye } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Certification } from '../../types';

export const CertificationsSection: React.FC = () => {
  const { data } = useContent();
  const certifications: Certification[] = data?.certifications || [];
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-5 transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Credentials"
          title="Certifications & Accreditations"
          subtitle="Verified technical credentials and industry standard qualifications."
        />

        <div className="row g-4">
          {certifications.map((cert, index) => (
            <div key={cert._id || index} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-4 h-100 d-flex flex-column"
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <ShieldCheck className="text-primary" size={24} />
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small">
                      {cert.badge || 'Verified'}
                    </span>
                  </div>
                  <span className="small text-muted font-monospace">{cert.date}</span>
                </div>

                <h5 className="fw-bold mb-2">{cert.name}</h5>
                <p className="text-secondary small mb-4 flex-grow-1">
                  Issued by <strong className="text-body">{cert.organization}</strong>
                </p>

                <div className="d-flex gap-2 pt-3 border-top mt-auto">
                  <button
                    className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                    onClick={() => setActiveCert(cert)}
                  >
                    <Eye size={14} /> Preview Badge
                  </button>
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                    >
                      <ExternalLink size={14} /> Verify
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Image Preview Modal */}
      {activeCert && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-0 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold m-0">{activeCert.name}</h5>
                <button className="btn-close" onClick={() => setActiveCert(null)} />
              </div>
              <div className="text-center p-2">
                <img src={activeCert.image} alt={activeCert.name} className="img-fluid rounded-3 shadow-sm" />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-sm btn-secondary" onClick={() => setActiveCert(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
