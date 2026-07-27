const mongoose = require('mongoose');

// User / Admin Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

// 1. Personal Information
const personalInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'Dinesh Kumar' },
  role: { type: String, default: 'Technical Trainer & Full Stack Developer' },
  shortBio: { type: String, default: 'Empowering engineers through technical training & building modern scalable web applications.' },
  longAbout: { type: String, default: 'Senior Full Stack Developer and Certified Technical Trainer with 8+ years of experience architecting enterprise web applications and mentoring 5,000+ developers worldwide. Specialized in React, Node.js, Cloud Architecture, and Modern DevOps.' },
  profilePicture: { type: String, default: '/uploads/dinesh_avatar.jpg' },
  resumeUrl: { type: String, default: '/uploads/Dinesh_Kumar_Resume.pdf' },
  heroBackground: { type: String, default: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)' },
  tagline: { type: String, default: 'Bridging Knowledge & Scalable Code' },
  location: { type: String, default: 'San Francisco, CA & Remote' },
  yearsExperience: { type: Number, default: 8 },
  studentsTrained: { type: Number, default: 5000 },
  projectsCompleted: { type: Number, default: 45 },
}, { timestamps: true });

// 2. Social Links
const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: 'Globe' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 3. Skills
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Training & Mentorship', 'Tools'] },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: 'Code' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 4. Experience
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  isCurrent: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 5. Education
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  college: { type: String, required: true },
  duration: { type: String, required: true },
  grade: { type: String, default: '3.9 / 4.0' },
  description: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 6. Certifications
const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  credentialUrl: { type: String, default: '#' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
  badge: { type: String, default: 'Verified' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 7. Projects
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  liveDemoUrl: { type: String, default: '#' },
  githubUrl: { type: String, default: '#' },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  category: { type: String, default: 'Full Stack' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 8. Achievements
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Trophy' },
  year: { type: String, default: '2025' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 9. Gallery
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Tech Talks' },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 10. Testimonials
const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  designation: { type: String, required: true },
  company: { type: String, default: '' },
  feedback: { type: String, required: true },
  photo: { type: String, default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  rating: { type: Number, default: 5 },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// 11. Blog
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  category: { type: String, default: 'Web Development' },
  publishDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  readTime: { type: String, default: '5 min read' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

// 12. Contact Details
const contactDetailSchema = new mongoose.Schema({
  address: { type: String, default: '742 Market Street, Suite 400, San Francisco, CA 94103' },
  phone: { type: String, default: '+1 (555) 234-5678' },
  email: { type: String, default: 'alex.rivera@devtrainer.io' },
  googleMapUrl: { type: String, default: 'https://maps.google.com/maps?q=San+Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed' },
  whatsappNumber: { type: String, default: '+15552345678' },
  workingHours: { type: String, default: 'Mon - Fri: 9:00 AM - 6:00 PM PST' },
}, { timestamps: true });

// 13. SEO Settings
const seoSettingSchema = new mongoose.Schema({
  metaTitle: { type: String, default: 'Dinesh Kumar | Technical Trainer & Full Stack Developer Portfolio' },
  metaDescription: { type: String, default: 'Portfolio of Dinesh Kumar, Senior Technical Trainer & Full Stack Developer specializing in React, Node.js, TypeScript, and Enterprise Architecture.' },
  keywords: { type: String, default: 'Technical Trainer, Full Stack Developer, React, Node.js, TypeScript, Web Development, Software Engineering Instructor' },
  ogImage: { type: String, default: '/uploads/profile_user.jpg' },
  favicon: { type: String, default: '/favicon.ico' },
}, { timestamps: true });

// 14. Website Settings (Include dynamic Portfolio URL!)
const websiteSettingSchema = new mongoose.Schema({
  logoText: { type: String, default: 'DineshKumar.dev' },
  portfolioUrl: { type: String, default: 'https://dineshkumar.dev' },
  primaryColor: { type: String, default: '#FFFFFF' },
  secondaryColor: { type: String, default: '#3B82F6' },
  footerText: { type: String, default: 'Crafting exceptional digital experiences & mentoring the next generation of engineers.' },
  copyrightText: { type: String, default: '© 2026 Dinesh Kumar. All rights reserved.' },
  googleAnalyticsCode: { type: String, default: 'G-MEASUREMENT_ID' },
}, { timestamps: true });

// Contact Messages submitted from website contact form
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  PersonalInfo: mongoose.model('PersonalInfo', personalInfoSchema),
  SocialLink: mongoose.model('SocialLink', socialLinkSchema),
  Skill: mongoose.model('Skill', skillSchema),
  Experience: mongoose.model('Experience', experienceSchema),
  Education: mongoose.model('Education', educationSchema),
  Certification: mongoose.model('Certification', certificationSchema),
  Project: mongoose.model('Project', projectSchema),
  Achievement: mongoose.model('Achievement', achievementSchema),
  Gallery: mongoose.model('Gallery', gallerySchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  Blog: mongoose.model('Blog', blogSchema),
  ContactDetail: mongoose.model('ContactDetail', contactDetailSchema),
  SeoSetting: mongoose.model('SeoSetting', seoSettingSchema),
  WebsiteSetting: mongoose.model('WebsiteSetting', websiteSettingSchema),
  ContactMessage: mongoose.model('ContactMessage', contactMessageSchema),
};
