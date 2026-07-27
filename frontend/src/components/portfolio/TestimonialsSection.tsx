import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Testimonial } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const { data } = useContent();
  const testimonials: Testimonial[] = data?.testimonials || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Endorsements"
          title="Client & Student Feedback"
          subtitle="Real reviews from corporate training partners, engineering leads, and students."
        />

        <div className="max-w-3xl mx-auto position-relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-5 text-center position-relative shadow-lg"
          >
            <Quote className="text-primary opacity-25 position-absolute top-0 start-50 translate-middle-x mt-3" size={60} />

            <p className="lead fs-5 mb-4 position-relative z-1 fst-italic text-body">
              "{current.feedback}"
            </p>

            <div className="d-flex justify-content-center gap-1 mb-3">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} size={18} className="text-warning fill-warning" />
              ))}
            </div>

            <div className="d-flex flex-column align-items-center">
              <img
                src={current.photo}
                alt={current.clientName}
                className="rounded-circle mb-2 shadow-sm border border-2 border-primary"
                width={70}
                height={70}
              />
              <h5 className="fw-bold m-0">{current.clientName}</h5>
              <small className="text-muted">{current.designation} {current.company && `at ${current.company}`}</small>
            </div>
          </motion.div>

          {/* Carousel Control Buttons */}
          {testimonials.length > 1 && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-outline-primary rounded-circle p-2" onClick={handlePrev}>
                <ChevronLeft size={20} />
              </button>
              <span className="align-self-center text-muted font-monospace small">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <button className="btn btn-outline-primary rounded-circle p-2" onClick={handleNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
