import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedAvatarProps {
  imageSrc?: string;
  size?: number;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  imageSrc = '/dinesh_avatar.jpg',
  size = 350,
}) => {
  return (
    <div className="position-relative d-inline-block text-center select-none my-3">
      {/* Outer Glowing Pulsing Halo Ring */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.95, 0.7],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: -18,
          left: -18,
          right: -18,
          bottom: -18,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #3B82F6, #06B6D4, #8B5CF6, #EC4899, #3B82F6)',
          filter: 'blur(16px)',
          zIndex: 0,
        }}
      />

      {/* Secondary Inner Cyan Glow */}
      <div
        className="position-absolute rounded-circle"
        style={{
          top: -6,
          left: -6,
          right: -6,
          bottom: -6,
          background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />

      {/* Floating Particle Badge 1: React 19 */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="position-absolute bg-primary text-white rounded-pill px-3 py-1.5 shadow-lg border border-2 border-white d-flex align-items-center gap-1"
        style={{ top: '8%', right: '-15px', zIndex: 4 }}
      >
        <span className="fw-bold fs-7">💻 React 19 Architect</span>
      </motion.div>

      {/* Floating Particle Badge 2: Node.js */}
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="position-absolute bg-info text-dark rounded-pill px-3 py-1.5 shadow-lg border border-2 border-white d-flex align-items-center gap-1"
        style={{ bottom: '18%', left: '-20px', zIndex: 4 }}
      >
        <span className="fw-bold fs-7">⚡ Full Stack Lead</span>
      </motion.div>

      {/* Floating Particle Badge 3: Certified Trainer */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="position-absolute bg-dark text-white rounded-pill px-3 py-1.5 shadow-lg border border-2 border-info"
        style={{ bottom: '-12px', right: '15%', zIndex: 4 }}
      >
        <span className="small font-monospace text-info">🎓 Certified Technical Trainer</span>
      </motion.div>

      {/* Main Circular Face Avatar Frame */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="position-relative overflow-hidden rounded-circle shadow-lg border border-4 border-white bg-dark"
        style={{
          width: size,
          height: size,
          zIndex: 2,
        }}
      >
        <img
          src={imageSrc}
          alt="Technical Trainer & Full Stack Developer Avatar"
          className="avatar-img"
          loading="eager"
        />

        {/* Subtle Bottom Vignette Gradient */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(15,23,42,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  );
};
