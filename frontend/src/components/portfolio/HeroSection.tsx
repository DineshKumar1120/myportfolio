import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Briefcase, Award, Users, Code, ChevronDown } from 'lucide-react';
import { AnimatedAvatar } from '../avatar/AnimatedAvatar';
import { useContent } from '../../context/ContentContext';

export const HeroSection: React.FC = () => {
  const { data } = useContent();
  const personal = data?.personalInfo || {
    name: 'Dinesh Kumar',
    role: 'Technical Trainer & Senior Full Stack Developer',
    shortBio: 'Empowering engineers through technical training & architecting modern scalable web applications.',
    profilePicture: '/profile_user.jpg',
    resumeUrl: '/uploads/Dinesh_Kumar_Resume.pdf',
    yearsExperience: 8,
    studentsTrained: 5200,
    projectsCompleted: 48,
  };

  // Typing Effect
  const roles = [
    'Technical Trainer & Instructor',
    'Senior Full Stack Developer',
    'React 19 & TypeScript Architect',
    'Cloud Systems & DevOps Specialist',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText.length < targetText.length) {
        setDisplayedText(targetText.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === targetText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(targetText.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="hero" className="position-relative min-vh-100 d-flex align-items-center pt-5 pb-5 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="hero-radial-glow" />

      <div className="container position-relative z-1 pt-5">
        <div className="row g-5 align-items-center">
          {/* Left Text Intro */}
          <div className="col-lg-7 text-center text-lg-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary-subtle text-primary border border-primary-subtle font-monospace small mb-3">
                <span className="spinner-grow spinner-grow-sm text-primary" role="status" />
                Available for Training & Full-Stack Projects
              </div>

              <h1 className="display-4 fw-extrabold mb-3">
                Hello, I'm <span className="text-gradient">{personal.name}</span>
              </h1>

              <div className="fs-4 fw-semibold text-secondary mb-3 min-h-40 font-monospace">
                <span>{displayedText}</span>
                <span className="text-primary animate-pulse">|</span>
              </div>

              <p className="lead text-muted mb-4 max-w-xl">
                {personal.shortBio}
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-5">
                <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg px-4 py-3 rounded-pill shadow-lg d-flex align-items-center gap-2 hover-lift">
                  <Download size={20} /> Download Resume
                </a>
                <a href="#contact" className="btn btn-outline-primary btn-lg px-4 py-3 rounded-pill d-flex align-items-center gap-2 hover-lift">
                  <Mail size={20} /> Contact Me
                </a>
                <a href="#projects" className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-pill d-flex align-items-center gap-2 hover-lift">
                  <Briefcase size={20} /> View Projects
                </a>
              </div>

              {/* Statistics Counter Cards */}
              <div className="row g-3">
                <div className="col-4">
                  <div className="glass-card p-3 text-center">
                    <h3 className="fw-bold text-primary mb-1">{personal.yearsExperience}+</h3>
                    <p className="small text-muted mb-0">Years Exp.</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="glass-card p-3 text-center">
                    <h3 className="fw-bold text-info mb-1">{personal.studentsTrained}+</h3>
                    <p className="small text-muted mb-0">Students Trained</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="glass-card p-3 text-center">
                    <h3 className="fw-bold text-purple mb-1">{personal.projectsCompleted}+</h3>
                    <p className="small text-muted mb-0">Projects Built</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Animated Avatar */}
          <div className="col-lg-5 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedAvatar imageSrc={personal.profilePicture} size={340} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-5">
          <a href="#about" className="text-muted text-decoration-none d-inline-flex flex-column align-items-center gap-1 animate-bounce">
            <span className="small font-monospace">Scroll Down</span>
            <ChevronDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};
