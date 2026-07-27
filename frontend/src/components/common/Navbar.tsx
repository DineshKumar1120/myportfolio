import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Shield, Menu, X, QrCode } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { QRCodeModal } from './QRCodeModal';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { data, darkMode, toggleDarkMode } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active section on scroll
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoText = data?.websiteSettings?.logoText || 'DineshKumar.dev';
  const resumeUrl = data?.personalInfo?.resumeUrl || '/uploads/Dinesh_Kumar_Resume.pdf';

  return (
    <>
      <nav className={`navbar fixed-top transition-all py-2.5 ${scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'}`}>
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a className="navbar-brand fw-bold fs-5 d-flex align-items-center gap-1 text-decoration-none m-0" href="#hero">
            <span className="text-primary font-monospace">&lt;</span>
            <span className="text-body">{logoText}</span>
            <span className="text-primary font-monospace">/&gt;</span>
          </a>

          {/* Mobile Nav Toggle */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button className="btn btn-link text-body p-2" onClick={toggleDarkMode} title="Toggle Theme">
              {darkMode ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
            </button>
            <button className="btn btn-outline-primary p-2 border-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Horizontal Desktop Navbar */}
          <div className="d-none d-lg-flex align-items-center justify-content-center mx-2">
            <ul className="navbar-nav d-flex flex-row flex-wrap gap-1 m-0 p-0 list-unstyled">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <li className="nav-item" key={link.name}>
                    <a
                      className={`nav-link px-2.5 py-1 rounded-pill small fw-medium transition-all text-decoration-none ${
                        isActive ? 'bg-primary text-white shadow-sm' : 'text-body hover-primary'
                      }`}
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Action Buttons */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <button className="btn btn-link text-body p-1.5 border-0" onClick={toggleDarkMode} title="Toggle Dark/Light Mode">
              {darkMode ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
            </button>

            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={() => setQrModalOpen(true)} title="Portfolio QR Code">
              <QrCode size={15} />
            </button>

            <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1" onClick={onOpenAdmin} title="Admin Portal">
              <Shield size={15} /> Admin
            </button>

            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm">
              <Download size={15} /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="position-absolute top-0 end-0 h-100 bg-body p-4 shadow-lg d-flex flex-column"
            style={{ width: '280px', zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold fs-5 text-primary">{logoText}</span>
              <button className="btn btn-link text-body p-1" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <ul className="navbar-nav gap-2 mb-auto overflow-y-auto">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.name}>
                  <a
                    className="nav-link py-2 px-3 rounded text-body fw-medium"
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex flex-column gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => { setQrModalOpen(true); setMobileMenuOpen(false); }}>
                <QrCode size={16} /> QR Code
              </button>
              <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}>
                <Shield size={16} /> Admin Portal
              </button>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                <Download size={16} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Preview Modal */}
      <QRCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </>
  );
};
