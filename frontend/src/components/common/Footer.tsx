import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Youtube, Instagram, Share2, QrCode } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Footer: React.FC = () => {
  const { data } = useContent();

  const websiteSettings = data?.websiteSettings || {
    logoText: 'DineshKumar.dev',
    portfolioUrl: 'https://dineshkumar.dev',
    footerText: 'Crafting exceptional digital experiences & mentoring the next generation of engineers.',
    copyrightText: '© 2026 Dinesh Kumar. All rights reserved.',
  };

  const socialLinks = data?.socialLinks || [];

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(websiteSettings.portfolioUrl);
    const title = encodeURIComponent(`Check out ${data?.personalInfo?.name || 'Dinesh Kumar'}'s Technical Portfolio!`);

    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;

    if (shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <footer className="bg-body-tertiary border-top py-5 transition-all">
      <div className="container">
        <div className="row g-4 justify-content-between align-items-center">
          {/* Logo & Tagline */}
          <div className="col-lg-4 text-center text-lg-start">
            <a className="fw-bold fs-4 d-inline-flex align-items-center gap-2 text-decoration-none text-body mb-2" href="#hero">
              <span className="text-primary font-monospace">&lt;</span>
              <span>{websiteSettings.logoText}</span>
              <span className="text-primary font-monospace">/&gt;</span>
            </a>
            <p className="text-muted small mb-0 max-w-sm">{websiteSettings.footerText}</p>
          </div>

          {/* Share Links */}
          <div className="col-lg-4 text-center">
            <h6 className="fw-bold mb-3 small text-uppercase tracking-wider text-muted">Share Portfolio</h6>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-sm btn-outline-secondary rounded-circle p-2" onClick={() => handleShare('twitter')} title="Share on Twitter / X">
                <Twitter size={16} />
              </button>
              <button className="btn btn-sm btn-outline-secondary rounded-circle p-2" onClick={() => handleShare('linkedin')} title="Share on LinkedIn">
                <Linkedin size={16} />
              </button>
              <button className="btn btn-sm btn-outline-secondary rounded-circle p-2" onClick={() => handleShare('whatsapp')} title="Share on WhatsApp">
                <Share2 size={16} />
              </button>
            </div>
            <div className="small text-muted font-monospace mt-2">{websiteSettings.portfolioUrl}</div>
          </div>

          {/* Social Links */}
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-flex justify-content-center justify-content-lg-end gap-3 mb-2">
              {socialLinks.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover-primary transition-all">
                  {s.platform.includes('LinkedIn') && <Linkedin size={20} />}
                  {s.platform.includes('GitHub') && <Github size={20} />}
                  {s.platform.includes('Twitter') && <Twitter size={20} />}
                  {s.platform.includes('YouTube') && <Youtube size={20} />}
                  {s.platform.includes('Instagram') && <Instagram size={20} />}
                </a>
              ))}
            </div>
            <p className="text-muted small mb-0">{websiteSettings.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
