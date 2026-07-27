import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code, Layers, Server, Database, Box, Cloud, BookOpen, Video } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Skill } from '../../types';

export const SkillsSection: React.FC = () => {
  const { data } = useContent();
  const skills: Skill[] = data?.skills || [];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Training & Mentorship'];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-5 transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Technical Skills"
          title="Skills & Engineering Proficiency"
          subtitle="Explore my tech stack across frontend, backend, cloud infrastructure, and instruction."
        />

        {/* Filter Pills & Search */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-lg-8">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm rounded-pill px-3 py-2 transition-all ${
                    activeCategory === cat ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search skill (e.g. React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="row g-4">
          {filteredSkills.map((skill, index) => (
            <div key={skill._id || index} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-4 h-100 position-relative"
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="p-2 rounded-3 bg-primary-subtle text-primary">
                      <Code size={20} />
                    </div>
                    <h6 className="fw-bold m-0">{skill.name}</h6>
                  </div>
                  <span className="badge bg-primary rounded-pill px-2 py-1">{skill.percentage}%</span>
                </div>

                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Category: {skill.category}</span>
                  <span>Mastery Level</span>
                </div>

                {/* Animated Progress Bar */}
                <div className="progress bg-secondary-subtle rounded-pill" style={{ height: '8px' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="progress-bar progress-bar-animated"
                  />
                </div>
              </motion.div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
              <p>No skills found matching "{searchQuery}" in category "{activeCategory}".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
