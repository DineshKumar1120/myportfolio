import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, QrCode, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { submitContactForm } from '../../services/api';
import { QRCodeModal } from '../common/QRCodeModal';

export const ContactSection: React.FC = () => {
  const { data, qrCodeUrl } = useContent();
  const contactDetails = data?.contactDetails || {
    address: '742 Market Street, Suite 400, San Francisco, CA 94103',
    phone: '+1 (555) 234-5678',
    email: 'alex.rivera@devtrainer.io',
    googleMapUrl: 'https://maps.google.com/maps?q=San+Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed',
    whatsappNumber: '+15552345678',
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setSuccessMsg(res.message || 'Message submitted successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        // Trigger celebration confetti animation
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Get in Touch"
          title="Contact Me & Inquiries"
          subtitle="Interested in technical training workshops, corporate consulting, or full-stack software development? Send me a message."
        />

        <div className="row g-5">
          {/* Left Contact Form */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-4 p-sm-5 shadow-lg"
            >
              <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <Send className="text-primary" size={24} /> Send a Direct Message
              </h4>

              {successMsg && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                  <CheckCircle2 size={20} /> {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                  <AlertCircle size={20} /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="contactName"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <label htmlFor="contactName">Your Full Name *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="contactEmail"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <label htmlFor="contactEmail">Email Address *</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="contactPhone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <label htmlFor="contactPhone">Phone Number (Optional)</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="contactSubject"
                        placeholder="Training Session Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                      <label htmlFor="contactSubject">Subject *</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="contactMessage"
                        placeholder="Write your message..."
                        style={{ height: '140px' }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                      <label htmlFor="contactMessage">Message *</label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg w-100 py-3 rounded-pill shadow d-flex align-items-center justify-content-center gap-2 hover-lift"
                    >
                      {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status" />
                      ) : (
                        <>
                          <Send size={18} /> Submit Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Direct Info & Google Map */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="d-flex flex-column gap-4 h-100"
            >
              {/* Contact Details Card */}
              <div className="glass-card p-4">
                <h5 className="fw-bold mb-4">Contact Information</h5>

                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-3">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Office & Location</h6>
                    <p className="small text-muted mb-0">{contactDetails.address}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-3">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email Address</h6>
                    <a href={`mailto:${contactDetails.email}`} className="small text-decoration-none text-primary fw-medium">
                      {contactDetails.email}
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-3">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Direct Phone & WhatsApp</h6>
                    <a href={`https://wa.me/${contactDetails.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="small text-decoration-none text-primary fw-medium">
                      {contactDetails.phone}
                    </a>
                  </div>
                </div>

                {/* QR Code Quick Card */}
                <div className="bg-primary-subtle p-3 rounded-3 d-flex align-items-center justify-content-between mt-4">
                  <div className="d-flex align-items-center gap-3">
                    <QrCode size={28} className="text-primary" />
                    <div>
                      <h6 className="fw-bold mb-0">Portfolio QR Code</h6>
                      <small className="text-muted">Scan or share website link</small>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary" onClick={() => setQrModalOpen(true)}>
                    View QR
                  </button>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="glass-card overflow-hidden flex-grow-1" style={{ minHeight: '220px' }}>
                <iframe
                  title="Location Map"
                  src={contactDetails.googleMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '220px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <QRCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </section>
  );
};
