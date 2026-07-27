import React, { useState } from 'react';
import {
  LayoutDashboard, User, Share2, Code, Briefcase, GraduationCap,
  Award, Trophy, Image, MessageSquare, BookOpen, Phone, Search,
  Globe, Mail, Database, LogOut, Sun, Moon, ArrowLeft, Key, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { DashboardOverview } from './DashboardOverview';
import { PersonalInfoManager } from './modules/PersonalInfoManager';
import { SocialLinksManager } from './modules/SocialLinksManager';
import { SkillsManager } from './modules/SkillsManager';
import { ExperienceManager } from './modules/ExperienceManager';
import { EducationManager } from './modules/EducationManager';
import { CertificationsManager } from './modules/CertificationsManager';
import { ProjectsManager } from './modules/ProjectsManager';
import { AchievementsManager } from './modules/AchievementsManager';
import { GalleryManager } from './modules/GalleryManager';
import { TestimonialsManager } from './modules/TestimonialsManager';
import { BlogManager } from './modules/BlogManager';
import { ContactDetailsManager } from './modules/ContactDetailsManager';
import { SeoSettingsManager } from './modules/SeoSettingsManager';
import { WebsiteSettingsManager } from './modules/WebsiteSettingsManager';
import { MessagesInbox } from './modules/MessagesInbox';
import { BackupRestoreManager } from './modules/BackupRestoreManager';

interface AdminLayoutProps {
  onCloseAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onCloseAdmin }) => {
  const { user, logout, changePassword } = useAuth();
  const { darkMode, toggleDarkMode } = useContent();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passData, setPassData] = useState({ current: '', next: '' });
  const [passStatus, setPassStatus] = useState<string | null>(null);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'personal-info', label: '1. Personal Info & Resume', icon: User },
    { id: 'social-links', label: '2. Social Links', icon: Share2 },
    { id: 'skills', label: '3. Skills Manager', icon: Code },
    { id: 'experience', label: '4. Work Experience', icon: Briefcase },
    { id: 'education', label: '5. Education Manager', icon: GraduationCap },
    { id: 'certifications', label: '6. Certifications', icon: Award },
    { id: 'projects', label: '7. Projects Manager', icon: Briefcase },
    { id: 'achievements', label: '8. Achievements', icon: Trophy },
    { id: 'gallery', label: '9. Photo Gallery', icon: Image },
    { id: 'testimonials', label: '10. Testimonials', icon: MessageSquare },
    { id: 'blogs', label: '11. Blog & Articles', icon: BookOpen },
    { id: 'contact-details', label: '12. Contact Details', icon: Phone },
    { id: 'seo-settings', label: '13. SEO Settings', icon: Search },
    { id: 'website-settings', label: '14. Website Settings & URL', icon: Globe },
    { id: 'messages', label: 'Contact Messages Inbox', icon: Mail },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
  ];

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus(null);
    try {
      await changePassword(passData.current, passData.next);
      setPassStatus('Password changed successfully!');
      setTimeout(() => setShowPasswordModal(false), 1500);
    } catch (err: any) {
      setPassStatus(err.message || 'Password update failed');
    }
  };

  return (
    <div className="min-vh-100 bg-body text-body d-flex flex-column">
      {/* Top Admin Header */}
      <header className="glass-nav border-bottom sticky-top py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-secondary d-md-none p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </button>
          <span className="fw-bold fs-5 text-primary font-monospace">Admin Dashboard</span>
          <span className="badge bg-primary-subtle text-primary d-none d-sm-inline">{user?.email}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-link text-body p-2" onClick={toggleDarkMode} title="Toggle Dark/Light Mode">
            {darkMode ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
          </button>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => setShowPasswordModal(true)}>
            <Key size={14} /> Password
          </button>
          <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={logout}>
            <LogOut size={14} /> Logout
          </button>
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm ms-2" onClick={onCloseAdmin}>
            <ArrowLeft size={14} /> Back to Website
          </button>
        </div>
      </header>

      <div className="container-fluid flex-grow-1 d-flex p-0">
        {/* Sidebar Navigation */}
        <aside
          className={`bg-body-tertiary border-end p-3 flex-shrink-0 transition-all ${
            sidebarOpen ? 'position-fixed start-0 top-0 h-100 z-50 shadow-lg overflow-y-auto' : 'd-none d-md-block overflow-y-auto'
          }`}
          style={{ width: '270px', maxHeight: 'calc(100vh - 65px)' }}
        >
          {sidebarOpen && (
            <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
              <span className="fw-bold text-primary">Admin Menu</span>
              <button className="btn-close" onClick={() => setSidebarOpen(false)} />
            </div>
          )}

          <div className="nav nav-pills flex-column gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`nav-link text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3 transition-all ${
                    isActive ? 'active bg-primary text-white shadow-sm' : 'text-body hover-primary'
                  }`}
                >
                  <Icon size={17} />
                  <span className="small fw-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow-1 p-4 p-sm-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 65px)' }}>
          {activeTab === 'overview' && <DashboardOverview onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'personal-info' && <PersonalInfoManager />}
          {activeTab === 'social-links' && <SocialLinksManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'certifications' && <CertificationsManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'blogs' && <BlogManager />}
          {activeTab === 'contact-details' && <ContactDetailsManager />}
          {activeTab === 'seo-settings' && <SeoSettingsManager />}
          {activeTab === 'website-settings' && <WebsiteSettingsManager />}
          {activeTab === 'messages' && <MessagesInbox />}
          {activeTab === 'backup' && <BackupRestoreManager />}
        </main>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold m-0">Change Admin Password</h5>
                <button className="btn-close" onClick={() => setShowPasswordModal(false)} />
              </div>

              {passStatus && (
                <div className={`alert ${passStatus.includes('success') ? 'alert-success' : 'alert-danger'} mb-3`}>
                  {passStatus}
                </div>
              )}

              <form onSubmit={handlePasswordChangeSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Current Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passData.current}
                    onChange={(e) => setPassData({ ...passData, current: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passData.next}
                    onChange={(e) => setPassData({ ...passData, next: e.target.value })}
                    required
                  />
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm px-4">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
