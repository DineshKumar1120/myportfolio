import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Award, BookOpen, Code2 } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';

export const AboutSection: React.FC = () => {
  const { data } = useContent();
  const personal = data?.personalInfo || {
    name: 'Dinesh Kumar',
    role: 'Technical Trainer & Full Stack Developer',
    longAbout: 'Senior Full Stack Developer and Certified Technical Trainer with 8+ years of experience architecting enterprise web applications and mentoring 5,000+ developers worldwide.',
    profilePicture: '/uploads/dinesh_avatar.jpg',
    location: 'San Francisco, CA & Remote Worldwide',
  };

  const highlights = [
    { title: 'Technical Leadership', desc: 'Guiding engineering teams in building robust cloud applications.', icon: Award },
    { title: 'Interactive Pedagogy', desc: 'Designing practical, live-coding curriculums for bootcamps & enterprises.', icon: BookOpen },
    { title: 'Clean Architecture', desc: 'Enforcing SOLID principles, modular patterns & type safety.', icon: Code2 },
    { title: 'Global Remote Training', desc: 'Delivered workshops across US, Europe, and APAC regions.', icon: MapPin },
  ];

  return (
    <section id="about" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="About Me"
          title="Bridging Technical Knowledge & Production Engineering"
          subtitle="Discover my story as a Technical Trainer and Senior Full Stack Developer."
        />

        <div className="row g-5 align-items-center">
          {/* Left Image Card */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="position-relative"
            >
              <div className="glass-card overflow-hidden p-2 shadow-lg rounded-4">
                <img
                  src={personal.profilePicture}
                  alt={personal.name}
                  className="img-fluid rounded-3 w-100 object-fit-cover"
                  style={{ maxHeight: '813px' }}
                />
              </div>

              {/* Decorative Float Badge */}
              <div className="position-absolute bottom-0 start-0 transform -translate-x-4 translate-y-4 bg-primary text-white p-3 rounded-4 shadow-lg d-none d-sm-block">
                <div className="d-flex align-items-center gap-3">
                  <Award size={32} />
                  <div>
                    <h6 className="fw-bold mb-0">Certified CTT+ Trainer</h6>
                    <small>CompTIA Accredited</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Detailed Bio */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="fw-bold mb-3">Hi, I'm {personal.name}</h3>
              <p className="text-secondary lead fs-6 mb-4 whitespace-pre-line">
                {personal.longAbout}
              </p>

              <div className="row g-3">
                {highlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div key={i} className="col-sm-6">
                      <div className="glass-card p-3 h-100 d-flex gap-3 align-items-start">
                        <div className="bg-primary-subtle text-primary p-2 rounded-3">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">{h.title}</h6>
                          <p className="small text-muted mb-0">{h.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
