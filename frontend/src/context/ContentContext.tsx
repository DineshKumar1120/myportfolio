import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicPortfolioData, fetchQRCode } from '../services/api';
import { PublicPortfolioData } from '../types';

interface ContentContextType {
  data: PublicPortfolioData | null;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  qrCodeUrl: string;
  refreshContent: (silent?: boolean) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PublicPortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_theme') === 'dark';
  });

  const loadData = async (silent: boolean = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError(null);
    try {
      const publicData = await fetchPublicPortfolioData();
      setData(publicData);

      // Auto Generate QR Code whenever Portfolio URL changes in Website Settings
      const portfolioUrl = publicData?.websiteSettings?.portfolioUrl || window.location.origin;
      const qr = await fetchQRCode(portfolioUrl);
      setQrCodeUrl(qr);
    } catch (err: any) {
      if (!silent) {
        setError(err.message || 'Failed to load website content.');
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const refreshContent = async (silent: boolean = true) => {
    await loadData(silent);
  };

  return (
    <ContentContext.Provider
      value={{
        data,
        loading,
        error,
        darkMode,
        toggleDarkMode,
        qrCodeUrl,
        refreshContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
