import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, Layers, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Project } from '../../types';

export const ProjectsSection: React.FC = () => {
  const { data } = useContent();
  const projects: Project[] = data?.projects || [];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Compute dynamic categories list from projects database
  const dynamicCategories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean) as string[])
  );
  const categories = ['All', 'Featured', ...dynamicCategories];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Featured'
        ? proj.featured
        : proj.category === activeCategory;

    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (proj.category && proj.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const openImageModal = (proj: Project) => {
    setSelectedProject(proj);
    setActiveImageIndex(0);
  };

  return (
    <section id="projects" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Featured Code"
          title="Projects & Applications"
          subtitle="Explore recent full stack web applications, developer platforms, and training tools."
        />

        {/* Dynamic Category Filter Pills & Live Search */}
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
                  {cat === 'Featured' && <Star size={14} className="me-1" />}
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
                placeholder="Search technology or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {filteredProjects.map((proj, index) => (
            <div key={proj._id || index} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden h-100 d-flex flex-column"
              >
                {/* Image Cover */}
                <div
                  className="position-relative overflow-hidden cursor-pointer"
                  style={{ height: '200px' }}
                  onClick={() => openImageModal(proj)}
                >
                  <img
                    src={proj.images[0] || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'}
                    alt={proj.name}
                    className="img-cover transition-all hover-scale"
                  />
                  {proj.featured && (
                    <span className="position-absolute top-0 end-0 m-3 badge bg-warning text-dark shadow-sm d-flex align-items-center gap-1">
                      <Star size={12} fill="currentColor" /> Featured
                    </span>
                  )}
                  {proj.category && (
                    <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white font-monospace small">
                      {proj.category}
                    </span>
                  )}
                  <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-50 text-white small text-center opacity-0 hover-opacity-100 transition-all">
                    Click to view screenshots
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="fw-bold mb-2">{proj.name}</h5>
                  <p className="text-secondary small mb-3 flex-grow-1">
                    {proj.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="d-flex flex-wrap gap-1 mb-4">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="badge bg-primary-subtle text-primary font-monospace small">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2 pt-3 border-top">
                    {proj.liveDemoUrl && proj.liveDemoUrl !== '#' && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                      >
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && proj.githubUrl !== '#' && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                      >
                        <Github size={15} /> Code Repository
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
              <p>No projects match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Image Slider Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content glass-card border-0 p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="modal-title fw-bold m-0">{selectedProject.name} Gallery</h5>
                  <button className="btn-close" onClick={() => setSelectedProject(null)} />
                </div>

                <div className="position-relative text-center bg-black rounded-3 overflow-hidden mb-3" style={{ maxHeight: '450px' }}>
                  <img
                    src={selectedProject.images[activeImageIndex] || selectedProject.images[0]}
                    alt="Project Screenshot"
                    className="img-fluid object-fit-contain"
                    style={{ maxHeight: '420px' }}
                  />

                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        className="btn btn-sm btn-light position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle p-2"
                        onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.images.length - 1))}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className="btn btn-sm btn-light position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle p-2"
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length)}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="small text-muted m-0">Image {activeImageIndex + 1} of {selectedProject.images.length}</p>
                  <div className="d-flex gap-2">
                    {selectedProject.liveDemoUrl && (
                      <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                        Visit Live Demo
                      </a>
                    )}
                    <button className="btn btn-sm btn-secondary" onClick={() => setSelectedProject(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
