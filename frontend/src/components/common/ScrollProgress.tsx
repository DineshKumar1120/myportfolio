import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const currentScroll = window.scrollY;
      const percentage = documentHeight > 0 ? (currentScroll / documentHeight) * 100 : 0;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollPercentage}%`,
        height: '4px',
        background: 'linear-gradient(90deg, #3B82F6, #06B6D4, #8B5CF6)',
        zIndex: 9999,
        transition: 'width 0.1s linear',
      }}
    />
  );
};
