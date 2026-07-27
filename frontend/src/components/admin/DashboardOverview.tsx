import React, { useState, useEffect } from 'react';
import { Briefcase, Code, BookOpen, Mail, Award, Eye, Users, Shield, Globe } from 'lucide-react';
import api from '../../services/api';
import { AnalyticsData } from '../../types';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProjects: 0,
    totalSkills: 0,
    totalBlogs: 0,
    totalCertifications: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalPageViews: 14850,
    monthlyVisitors: 3240,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/admin/analytics');
        if (res.data.success) {
          setAnalytics(res.data.analytics);
        }
      } catch (err) {}
    };
    fetchAnalytics();
  }, []);

  const cards = [
    { title: 'Total Projects', value: analytics.totalProjects, icon: Briefcase, color: 'text-primary', tab: 'projects' },
    { title: 'Skills Listed', value: analytics.totalSkills, icon: Code, color: 'text-info', tab: 'skills' },
    { title: 'Published Blogs', value: analytics.totalBlogs, icon: BookOpen, color: 'text-purple', tab: 'blogs' },
    { title: 'Certifications', value: analytics.totalCertifications, icon: Award, color: 'text-success', tab: 'certifications' },
    { title: 'Total Messages', value: analytics.totalMessages, icon: Mail, color: 'text-warning', tab: 'messages', badge: analytics.unreadMessages > 0 ? `${analytics.unreadMessages} New` : null },
    { title: 'Total Pageviews', value: analytics.totalPageViews.toLocaleString(), icon: Eye, color: 'text-primary', tab: 'website-settings' },
  ];

  return (
    <div className="d-flex flex-column gap-4">
      {/* Top Banner */}
      <div className="glass-card p-4 p-sm-5 bg-primary text-white shadow-sm border-0 position-relative overflow-hidden">
        <div className="position-relative z-1">
          <h3 className="fw-bold mb-2">Welcome to Admin Control Center</h3>
          <p className="lead fs-6 mb-0 opacity-90">
            Manage all 14 dynamic sections, update your Portfolio URL, upload PDF resumes, and read client messages.
          </p>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="row g-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="col-sm-6 col-lg-4">
              <div
                className="glass-card p-4 h-100 cursor-pointer hover-lift"
                onClick={() => onNavigate(card.tab)}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className={`p-3 rounded-circle bg-body-tertiary ${card.color}`}>
                    <Icon size={24} />
                  </div>
                  {card.badge && <span className="badge bg-danger rounded-pill px-2 py-1">{card.badge}</span>}
                </div>
                <h2 className="fw-bold m-0">{card.value}</h2>
                <span className="small text-muted">{card.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="glass-card p-4">
        <h5 className="fw-bold mb-3">Quick Actions</h5>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => onNavigate('personal-info')}>
            Upload Resume PDF
          </button>
          <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => onNavigate('website-settings')}>
            Update Portfolio URL
          </button>
          <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => onNavigate('projects')}>
            Add New Project
          </button>
          <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => onNavigate('blogs')}>
            Write Blog Article
          </button>
          <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => onNavigate('messages')}>
            Check Inquiries ({analytics.unreadMessages})
          </button>
          <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => onNavigate('backup')}>
            Backup Database
          </button>
        </div>
      </div>
    </div>
  );
};
