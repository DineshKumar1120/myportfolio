import React, { useState } from 'react';
import { useContent } from './context/ContentContext';
import { useAuth } from './context/AuthContext';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BackToTop } from './components/common/BackToTop';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { CertificationsSection } from './components/portfolio/CertificationsSection';
import { AchievementsSection } from './components/portfolio/AchievementsSection';
import { GallerySection } from './components/portfolio/GallerySection';
import { TestimonialsSection } from './components/portfolio/TestimonialsSection';
import { BlogSection } from './components/portfolio/BlogSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';

export const AppContent: React.FC = () => {
  const { loading, error } = useContent();
  const { isAuthenticated } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLoginModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-body">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status" />
        <h5 className="fw-bold font-monospace text-primary">Loading Dynamic Portfolio...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-body p-4 text-center">
        <h4 className="fw-bold text-danger mb-2">Failed to load Portfolio Data</h4>
        <p className="text-muted mb-4">{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }

  if (showAdmin && isAuthenticated) {
    return <AdminLayout onCloseAdmin={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-body text-body">
      <ScrollProgress />
      <Navbar onOpenAdmin={handleOpenAdmin} />

      <main className="flex-grow-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <CertificationsSection />
        <AchievementsSection />
        <GallerySection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />

      {/* Admin Login Modal if not authenticated */}
      {showLoginModal && !isAuthenticated && (
        <AdminLogin onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};
