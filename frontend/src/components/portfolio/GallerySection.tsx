import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { GalleryItem } from '../../types';

export const GallerySection: React.FC = () => {
  const { data } = useContent();
  const gallery: GalleryItem[] = data?.gallery || [];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];

  const filteredGallery =
    activeCategory === 'All' ? gallery : gallery.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="py-5 transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Event Highlights"
          title="Photo & Workshop Gallery"
          subtitle="Snapshots from technical keynotes, coding bootcamps, and developer workshops."
        />

        {/* Category Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
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

        {/* Masonry / Grid Gallery */}
        <div className="row g-4">
          {filteredGallery.map((item, index) => (
            <div key={item._id || index} className="col-sm-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card overflow-hidden position-relative group cursor-pointer"
                onClick={() => setLightboxImage(item)}
              >
                <div style={{ height: '240px' }} className="overflow-hidden position-relative">
                  <img src={item.imageUrl} alt={item.title} className="img-cover transition-all hover-scale" />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40 opacity-0 hover-opacity-100 transition-all d-flex align-items-center justify-content-center">
                    <Maximize2 className="text-white" size={28} />
                  </div>
                </div>
                <div className="p-3">
                  <span className="badge bg-primary-subtle text-primary small mb-1">{item.category}</span>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  {item.description && <p className="small text-muted mb-0">{item.description}</p>}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 10000 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content glass-card border-0 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-bold m-0">{lightboxImage.title}</h5>
                <button className="btn-close" onClick={() => setLightboxImage(null)} />
              </div>
              <div className="text-center bg-black rounded-3 overflow-hidden">
                <img src={lightboxImage.imageUrl} alt={lightboxImage.title} className="img-fluid" style={{ maxHeight: '550px' }} />
              </div>
              {lightboxImage.description && (
                <p className="small text-muted mt-3 m-0">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
