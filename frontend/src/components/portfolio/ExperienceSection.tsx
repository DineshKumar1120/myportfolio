import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Experience } from '../../types';

export const ExperienceSection: React.FC = () => {
  const { data } = useContent();
  const experiences: Experience[] = data?.experience || [];

  return (
    <section id="experience" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Work History"
          title="Professional Experience"
          subtitle="My journey in corporate technical training and senior full stack software development."
        />

        <div className="timeline-container max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="position-relative mb-5"
            >
              {/* Timeline Dot */}
              <div className="timeline-dot" />

              {/* Content Card */}
              <div className="glass-card p-4 ms-3">
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                  <div>
                    <h5 className="fw-bold text-primary mb-1">{exp.position}</h5>
                    <h6 className="fw-semibold text-body mb-0 d-flex align-items-center gap-2">
                      <Briefcase size={16} /> {exp.company}
                    </h6>
                  </div>

                  <div className="d-flex flex-column align-items-end gap-1">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill small d-flex align-items-center gap-1">
                      <Calendar size={13} /> {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="small text-muted d-flex align-items-center gap-1">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-secondary small mb-3 whitespace-pre-line">
                  {exp.description}
                </p>

                {/* Technologies Tech Tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 pt-2 border-top">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="badge bg-secondary-subtle text-body font-monospace small px-2 py-1">
                        #{tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
