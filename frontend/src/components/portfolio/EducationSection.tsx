import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Education } from '../../types';

export const EducationSection: React.FC = () => {
  const { data } = useContent();
  const educations: Education[] = data?.education || [];

  return (
    <section id="education" className="py-5 transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Academia"
          title="Education & Credentials"
          subtitle="Academic foundation and continuous learning background."
        />

        <div className="row g-4 justify-content-center">
          {educations.map((edu, index) => (
            <div key={edu._id || index} className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-4 d-flex flex-column flex-sm-row align-items-start gap-4"
              >
                <div className="bg-primary text-white p-3 rounded-4 shadow-sm text-center">
                  <GraduationCap size={36} />
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                    <div>
                      <h4 className="fw-bold m-0 text-primary">{edu.degree}</h4>
                      <h6 className="fw-medium text-body m-0 mt-1">{edu.college}</h6>
                    </div>
                    <div className="text-sm-end">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill small">
                        <Calendar size={13} className="me-1" /> {edu.duration}
                      </span>
                      {edu.grade && (
                        <div className="small font-monospace text-success mt-1">
                          GPA / Grade: {edu.grade}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-secondary small m-0 pt-2 border-top">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
