import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-5 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fs-7 mb-2 text-uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h2 className="display-6 fw-bold mb-3">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === 1 || i === 2 ? 'text-gradient' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      {subtitle && <p className="text-secondary lead fs-6 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
};
