const bcrypt = require('bcryptjs');
const {
  User, PersonalInfo, SocialLink, Skill, Experience, Education,
  Certification, Project, Achievement, Gallery, Testimonial, Blog,
  ContactDetail, SeoSetting, WebsiteSetting, ContactMessage
} = require('../models/Schemas');

async function seedDefaultData() {
  try {
    // 0. User Admin
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('Admin@123456', 10);
      await User.create({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('[Seed] Default Admin User Created: admin@portfolio.com / Admin@123456');
    }

    // 1. Personal Info
    const personalCount = await PersonalInfo.countDocuments();
    if (personalCount === 0) {
      await PersonalInfo.create({
        name: 'Dinesh Kumar',
        role: 'Technical Trainer & Senior Full Stack Developer',
        shortBio: 'Empowering software engineers through interactive technical training and architecting high-performance cloud applications.',
        longAbout: 'I am a passionate Senior Full Stack Software Engineer and Certified Technical Trainer with over 8 years of experience building modern web systems and mentoring tech teams worldwide. Having trained over 5,000+ developers across Fortune 500 corporations, tech bootcamps, and universities, I specialize in bridging complex computer science concepts with clean, maintainable, production-ready code. My core stack includes React, TypeScript, Node.js, Express, MongoDB, Docker, and AWS Cloud Architecture.',
        profilePicture: '/uploads/dinesh_avatar.jpg',
        resumeUrl: '/uploads/Dinesh_Kumar_Resume.pdf',
        heroBackground: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
        tagline: 'Bridging Technical Expertise & Scalable Full-Stack Engineering',
        location: 'San Francisco, CA & Remote Worldwide',
        yearsExperience: 8,
        studentsTrained: 5200,
        projectsCompleted: 48,
      });
    }

    // 2. Social Links
    const socialCount = await SocialLink.countDocuments();
    if (socialCount === 0) {
      await SocialLink.insertMany([
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/dineshkumardev', icon: 'Linkedin', sortOrder: 1 },
        { platform: 'GitHub', url: 'https://github.com/dineshkumardev', icon: 'Github', sortOrder: 2 },
        { platform: 'Twitter / X', url: 'https://x.com/dineshkumardev', icon: 'Twitter', sortOrder: 3 },
        { platform: 'YouTube', url: 'https://youtube.com/@dineshkumarcodes', icon: 'Youtube', sortOrder: 4 },
        { platform: 'Instagram', url: 'https://instagram.com/dineshkumarcodes', icon: 'Instagram', sortOrder: 5 },
      ]);
    }

    // 3. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        { name: 'React 19 & TypeScript', category: 'Frontend', percentage: 96, icon: 'Code', sortOrder: 1 },
        { name: 'Next.js & Modern SSR', category: 'Frontend', percentage: 92, icon: 'Layers', sortOrder: 2 },
        { name: 'Node.js & Express.js', category: 'Backend', percentage: 94, icon: 'Server', sortOrder: 3 },
        { name: 'MongoDB & PostgreSQL', category: 'Database', percentage: 90, icon: 'Database', sortOrder: 4 },
        { name: 'Docker & Kubernetes', category: 'DevOps', percentage: 85, icon: 'Box', sortOrder: 5 },
        { name: 'AWS & Cloud Architecture', category: 'DevOps', percentage: 88, icon: 'Cloud', sortOrder: 6 },
        { name: 'Curriculum Design & Corporate Training', category: 'Training & Mentorship', percentage: 98, icon: 'BookOpen', sortOrder: 7 },
        { name: 'Live Coding Workshops & Webinars', category: 'Training & Mentorship', percentage: 95, icon: 'Video', sortOrder: 8 },
      ]);
    }

    // 4. Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          company: 'Tech Academy Global',
          position: 'Lead Technical Trainer & Full Stack Lead',
          duration: '2022 - Present',
          location: 'San Francisco, CA (Hybrid)',
          description: 'Delivered intensive full-stack engineering bootcamps and corporate workshops for enterprise software teams. Architected training modules covering Advanced React, Node.js Microservices, and Cloud Native deployment.',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker'],
          isCurrent: true,
          sortOrder: 1,
        },
        {
          company: 'Nexus Software Systems',
          position: 'Senior Full Stack Developer',
          duration: '2019 - 2022',
          location: 'Remote',
          description: 'Led a distributed team of 6 engineers building real-time analytics platforms processing 2M+ daily requests. Improved application render speed by 40% using SSR and optimized database indexing.',
          technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
          isCurrent: false,
          sortOrder: 2,
        },
        {
          company: 'CodeCraft Learning Solutions',
          position: 'Full Stack Developer & Associate Instructor',
          duration: '2017 - 2019',
          location: 'Austin, TX',
          description: 'Developed interactive learning management UI components and taught introductory JavaScript, Web Fundamentals, and REST API development to over 1,200 aspiring developers.',
          technologies: ['JavaScript', 'HTML5/CSS3', 'Express.js', 'MongoDB', 'Bootstrap'],
          isCurrent: false,
          sortOrder: 3,
        },
      ]);
    }

    // 5. Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany([
        {
          degree: 'B.S. in Computer Science',
          college: 'University of California, Berkeley',
          duration: '2013 - 2017',
          grade: '3.92 / 4.0 GPA (Magna Cum Laude)',
          description: 'Specialized in Distributed Systems, Data Structures & Algorithms, and Human-Computer Interaction. President of Web Development Club.',
          sortOrder: 1,
        },
      ]);
    }

    // 6. Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany([
        {
          name: 'AWS Certified Solutions Architect – Associate',
          organization: 'Amazon Web Services',
          date: '2024',
          credentialUrl: 'https://aws.amazon.com/verification',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
          badge: 'AWS Certified',
          sortOrder: 1,
        },
        {
          name: 'MongoDB Certified Developer & Administrator',
          organization: 'MongoDB University',
          date: '2023',
          credentialUrl: 'https://university.mongodb.com',
          image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
          badge: 'MongoDB Certified',
          sortOrder: 2,
        },
        {
          name: 'Certified Technical Trainer (CTT+)',
          organization: 'CompTIA',
          date: '2022',
          credentialUrl: 'https://comptia.org',
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
          badge: 'Master Trainer',
          sortOrder: 3,
        },
      ]);
    }

    // 7. Projects
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
      await Project.insertMany([
        {
          name: 'EduStack LMS - Interactive Learning Platform',
          description: 'A full-featured learning management system equipped with live code execution environments, video streaming, quiz engines, and progress dashboards for software training.',
          technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker Engine'],
          liveDemoUrl: 'https://edustack-demo.vercel.app',
          githubUrl: 'https://github.com/dineshkumardev/edustack-lms',
          images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'],
          featured: true,
          category: 'Full Stack',
          sortOrder: 1,
        },
        {
          name: 'DevFlow - Real-time Collaborative Code Workspace',
          description: 'Web-based multi-user IDE featuring syntax highlighting, WebSockets collaboration, terminal execution sandbox, and GitHub repository sync.',
          technologies: ['React', 'Tailwind CSS', 'Node.js', 'Socket.io', 'Monaco Editor'],
          liveDemoUrl: 'https://devflow-collab.vercel.app',
          githubUrl: 'https://github.com/dineshkumardev/devflow-workspace',
          images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'],
          featured: true,
          category: 'Web App',
          sortOrder: 2,
        },
        {
          name: 'CloudMetrics - Enterprise Server Monitoring Dashboard',
          description: 'Scalable cloud telemetry and log monitoring dashboard with customizable chart widgets, automated Slack alerts, and server health tracking.',
          technologies: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Recharts', 'Redis'],
          liveDemoUrl: 'https://cloudmetrics-demo.vercel.app',
          githubUrl: 'https://github.com/dineshkumardev/cloudmetrics-dashboard',
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'],
          featured: true,
          category: 'DevOps',
          sortOrder: 3,
        },
      ]);
    }

    // 8. Achievements
    const achCount = await Achievement.countDocuments();
    if (achCount === 0) {
      await Achievement.insertMany([
        {
          title: 'Top Educator Award 2025',
          description: 'Recognized for outstanding teaching quality and student career outcomes by Tech Ed Foundation.',
          icon: 'Award',
          year: '2025',
          sortOrder: 1,
        },
        {
          title: 'Keynote Speaker at ReactDevConf',
          description: 'Delivered keynote session on "Architecting Scalable Full Stack Apps with React 19 & Node Services".',
          icon: 'Mic',
          year: '2024',
          sortOrder: 2,
        },
        {
          title: '5,000+ Engineers Trained',
          description: 'Crossed the benchmark of mentoring over 5,000 students into software engineering careers.',
          icon: 'Users',
          year: '2024',
          sortOrder: 3,
        },
      ]);
    }

    // 9. Gallery
    const galCount = await Gallery.countDocuments();
    if (galCount === 0) {
      await Gallery.insertMany([
        {
          title: 'React Dev Keynote Presentation',
          category: 'Tech Talks',
          imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
          description: 'Presenting modern web architecture patterns to a 1,200+ developer conference.',
          sortOrder: 1,
        },
        {
          title: 'Corporate Training Workshop at Enterprise Tech',
          category: 'Workshops',
          imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
          description: 'Conducting an intensive 3-day hands-on Node.js & Docker bootcamp.',
          sortOrder: 2,
        },
        {
          title: 'Dev Team Hackathon Mentorship',
          category: 'Events',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
          description: 'Mentoring top hackathon teams in building AI-powered web prototypes.',
          sortOrder: 3,
        },
      ]);
    }

    // 10. Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        {
          clientName: 'Sarah Jenkins',
          designation: 'Engineering Manager',
          company: 'Acme Software',
          feedback: 'Dinesh conducted a 2-week technical boot camp for our engineering team. His ability to break down complex full-stack concepts into actionable, clean code practices revolutionized how our team builds applications.',
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          rating: 5,
          sortOrder: 1,
        },
        {
          clientName: 'David Chen',
          designation: 'Senior Frontend Developer',
          company: 'Starlight Inc',
          feedback: 'Learning React, TypeScript, and Node.js from Dinesh was the single best career decision I ever made. His curriculum is crystal clear, production-oriented, and full of practical real-world patterns.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          rating: 5,
          sortOrder: 2,
        },
      ]);
    }

    // 11. Blog
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        {
          title: 'Mastering React 19: Actions, Optimistic UI & Server Components',
          slug: 'mastering-react-19',
          description: 'A comprehensive guide for developers transitioning to React 19 with practical examples of useActionState and useOptimistic hooks.',
          content: `React 19 brings fundamental enhancements to full-stack web development. In this article, we explore:
- **useActionState**: Streamlining form actions and state updates without manual boilerplate.
- **useOptimistic**: Providing instant UI updates before network requests complete.
- **Server Functions**: Seamless server-side execution directly bound to UI handlers.

Mastering these paradigms reduces client state bugs and produces hyper-responsive user interfaces.`,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
          category: 'Frontend',
          publishDate: '2026-06-15',
          readTime: '6 min read',
          tags: ['React 19', 'TypeScript', 'Web Development'],
          isPublished: true,
        },
        {
          title: 'Building Production-Ready Node.js REST APIs with Express & MongoDB',
          slug: 'building-production-node-apis',
          description: 'Best practices for structuring Express services, handling async errors, implementing JWT authorization, and MongoDB schema design.',
          content: `Building scalable REST APIs requires clear separation of concerns.

### Key Architectural Guidelines:
1. **Controller Pattern**: Keep HTTP logic isolated from domain data models.
2. **Global Error Handling**: Avoid unhandled promise rejections with middleware wrappers.
3. **JWT Authentication**: Secure endpoints with bearer tokens and payload validation.`,
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          category: 'Backend',
          publishDate: '2026-05-20',
          readTime: '8 min read',
          tags: ['Node.js', 'Express', 'MongoDB', 'Security'],
          isPublished: true,
        },
      ]);
    }

    // 12. Contact Details
    const contactDetailCount = await ContactDetail.countDocuments();
    if (contactDetailCount === 0) {
      await ContactDetail.create({
        address: '742 Market Street, Suite 400, San Francisco, CA 94103',
        phone: '+1 (555) 234-5678',
        email: 'dinesh.kumar@devtrainer.io',
        googleMapUrl: 'https://maps.google.com/maps?q=San+Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed',
        whatsappNumber: '+15552345678',
        workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM PST',
      });
    }

    // 13. SEO Settings
    const seoCount = await SeoSetting.countDocuments();
    if (seoCount === 0) {
      await SeoSetting.create({
        metaTitle: 'Dinesh Kumar | Technical Trainer & Senior Full Stack Developer',
        metaDescription: 'Portfolio of Dinesh Kumar, Technical Trainer and Senior Full Stack Developer specializing in React 19, TypeScript, Node.js, Express, MongoDB, and Cloud Architecture.',
        keywords: 'Technical Trainer, Full Stack Developer, React 19, TypeScript, Node.js, Express, MongoDB, Software Instructor, Cloud Architect',
        ogImage: '/uploads/profile_user.jpg',
        favicon: '/favicon.ico',
      });
    }

    // 14. Website Settings
    const websiteCount = await WebsiteSetting.countDocuments();
    if (websiteCount === 0) {
      await WebsiteSetting.create({
        logoText: 'DineshKumar.dev',
        portfolioUrl: 'https://dineshkumar.dev',
        primaryColor: '#FFFFFF',
        secondaryColor: '#3B82F6',
        footerText: 'Empowering engineers through technical training and building modern scalable software.',
        copyrightText: '© 2026 Dinesh Kumar. All rights reserved.',
        googleAnalyticsCode: 'G-MEASUREMENT_ID',
      });
    }

    console.log('[Seed] Database successfully populated with initial data.');
  } catch (err) {
    console.error('[Seed] Error populating default data:', err);
  }
}

module.exports = seedDefaultData;
