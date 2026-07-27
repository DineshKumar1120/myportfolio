import React from 'react';
import { motion } from 'framer-motion';
import { Award, Mic, Users, Trophy, Star } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { useContent } from '../../context/ContentContext';
import { Achievement } from '../../types';

export const AchievementsSection: React.FC = () => {
  const { data } = useContent();
  const achievements: Achievement[] = data?.achievements || [];

  const getIcon = (iconName: string) => {
    if (iconName === 'Mic') return <Mic size={24} />;
    if (iconName === 'Users') return <Users size={24} />;
    if (iconName === 'Trophy') return <Trophy size={24} />;
    return <Award size={24} />;
  };

  return (
    <section id="achievements" className="py-5 bg-body-tertiary transition-all">
      <div className="container py-4">
        <SectionHeader
          badge="Honors & Recognition"
          title="Milestones & Achievements"
          subtitle="Notable career accolades, keynote speaker invitations, and mentoring milestones."
        />

        <div className="row g-4 justify-content-center">
          {achievements.map((item, index) => (
            <div key={item._id || index} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-4 h-100 text-center d-flex flex-column align-items-center"
              >
                <div className="bg-primary text-white p-3 rounded-circle mb-3 shadow-sm">
                  {getIcon(item.icon)}
                </div>
                {item.year && (
                  <span className="badge bg-primary-subtle text-primary font-monospace px-3 py-1 rounded-pill mb-2">
                    {item.year}
                  </span>
                )}
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-secondary small m-0">{item.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
