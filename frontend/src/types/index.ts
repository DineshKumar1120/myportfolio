export interface PersonalInfo {
  _id?: string;
  name: string;
  role: string;
  shortBio: string;
  longAbout: string;
  profilePicture: string;
  resumeUrl: string;
  heroBackground: string;
  tagline: string;
  location?: string;
  yearsExperience?: number;
  studentsTrained?: number;
  projectsCompleted?: number;
}

export interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
  sortOrder?: number;
}

export interface Skill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Training & Mentorship' | 'Tools';
  percentage: number;
  icon: string;
  sortOrder?: number;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string;
  technologies: string[];
  isCurrent?: boolean;
  sortOrder?: number;
}

export interface Education {
  _id?: string;
  degree: string;
  college: string;
  duration: string;
  grade: string;
  description: string;
  sortOrder?: number;
}

export interface Certification {
  _id?: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
  image: string;
  badge?: string;
  sortOrder?: number;
}

export interface Project {
  _id?: string;
  name: string;
  description: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  images: string[];
  featured: boolean;
  category?: string;
  sortOrder?: number;
}

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  year?: string;
  sortOrder?: number;
}

export interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  sortOrder?: number;
}

export interface Testimonial {
  _id?: string;
  clientName: string;
  designation: string;
  company?: string;
  feedback: string;
  photo: string;
  rating?: number;
  sortOrder?: number;
}

export interface BlogItem {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  content: string;
  image: string;
  category?: string;
  publishDate: string;
  readTime?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface ContactDetail {
  _id?: string;
  address: string;
  phone: string;
  email: string;
  googleMapUrl: string;
  whatsappNumber: string;
  workingHours?: string;
}

export interface SeoSetting {
  _id?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  favicon: string;
}

export interface WebsiteSetting {
  _id?: string;
  logoText: string;
  portfolioUrl: string;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  copyrightText: string;
  googleAnalyticsCode: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}

export interface PublicPortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  blogs: BlogItem[];
  contactDetails: ContactDetail;
  seoSettings: SeoSetting;
  websiteSettings: WebsiteSetting;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AnalyticsData {
  totalProjects: number;
  totalSkills: number;
  totalBlogs: number;
  totalCertifications: number;
  totalMessages: number;
  unreadMessages: number;
  totalPageViews: number;
  monthlyVisitors: number;
}
