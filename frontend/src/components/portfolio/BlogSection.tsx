import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { BlogItem } from '../../types';

export const BlogSection: React.FC = () => {
  const { data } = useContent();
  const blogs: BlogItem[] = data?.blogs || [];
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <section id="blog" className="py-5 transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Technical Publications"
          title="Articles & Tutorials"
          subtitle="Deep dives into React 19, TypeScript, Node.js microservices, and software instruction."
        />

        <div className="row g-4">
          {blogs.map((blog, index) => (
            <div key={blog._id || index} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden h-100 d-flex flex-column"
              >
                <div style={{ height: '180px' }} className="overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="img-cover hover-scale transition-all" />
                </div>
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-2 small text-muted">
                    <span className="badge bg-primary-subtle text-primary font-monospace">{blog.category || 'Article'}</span>
                    <span className="d-flex align-items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                  </div>

                  <h5 className="fw-bold mb-2">{blog.title}</h5>
                  <p className="text-secondary small mb-3 flex-grow-1">{blog.description}</p>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                    <span className="small text-muted d-flex align-items-center gap-1">
                      <Calendar size={12} /> {blog.publishDate}
                    </span>
                    <button
                      className="btn btn-sm btn-link text-primary p-0 fw-bold d-flex align-items-center gap-1 text-decoration-none"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Read Article <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedBlog && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content glass-card border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary text-white font-monospace">{selectedBlog.category}</span>
                <button className="btn-close" onClick={() => setSelectedBlog(null)} />
              </div>

              <h3 className="fw-bold mb-2">{selectedBlog.title}</h3>
              <p className="text-muted small mb-3">Published on {selectedBlog.publishDate} • {selectedBlog.readTime}</p>

              <div className="mb-4 overflow-hidden rounded-3" style={{ maxHeight: '350px' }}>
                <img src={selectedBlog.image} alt={selectedBlog.title} className="img-fluid w-100 object-fit-cover" />
              </div>

              <div className="text-body whitespace-pre-line lh-lg mb-4">
                {selectedBlog.content}
              </div>

              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary" onClick={() => setSelectedBlog(null)}>
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
