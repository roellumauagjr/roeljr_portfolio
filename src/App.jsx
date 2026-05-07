import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, ArrowRight, ExternalLink, Camera, Code, 
  Award, ChevronRight, Download, User, BadgeCheck, 
  Video, LayoutTemplate, GraduationCap, Users 
} from 'lucide-react';

// --- CUSTOM BRAND ICONS (Removed in Lucide v1.0) ---
const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- NEW ANIMATION COMPONENT ---
const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- SHARED DATA ---
const PROJECTS = [
  { title: 'The Spectrum', category: 'Web App / UI', desc: 'Lead front-end development for a modern platform using React and advanced CSS.', color: 'bg-[#121212]' },
  { title: 'AHON Game', category: 'Game Dev', desc: 'Interactive puzzle game exploring environmental themes with complex logic.', color: 'bg-red-600' },
  { title: 'Build A Bot', category: 'AI / OpenCV', desc: 'Computer vision application tracking hand gestures for virtual building.', color: 'bg-[#121212]' },
  { title: 'Portfolio V1', category: 'UI/UX', desc: 'Initial concept and design system for personal branding.', color: 'bg-red-600' }
];

const CERTS = [
  { title: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera', year: '2024' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2023' },
  { title: 'IT Fundamentals+', issuer: 'CompTIA', year: '2023' },
];

const ARTWORKS = {
  Photography: [
    { title: 'Urban Solitude', type: 'Street', icon: Camera },
    { title: 'Neon Reflections', type: 'Night', icon: Camera },
    { title: 'Golden Hour Stills', type: 'Portrait', icon: Camera }
  ],
  Video: [
    { title: 'Nature in Motion', type: 'Short Film', icon: Video },
    { title: 'Event Highlights 2023', type: 'Recap', icon: Video }
  ],
  Layout: [
    { title: 'Minimalist UI Concept', type: 'Web Design', icon: LayoutTemplate },
    { title: 'Magazine Spread', type: 'Print', icon: LayoutTemplate },
    { title: 'Brand Identity', type: 'Graphics', icon: LayoutTemplate }
  ]
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  // Scroll to top smoothly when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const navLinks = ['HOME', 'PROJECTS', 'ARTWORKS', 'CERTIFICATIONS', 'ABOUT ME'];

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col relative overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* --- INJECTED STYLES FOR CLEAN FONT & KEYFRAME ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        /* Custom Clean Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d4d4d4; }

        /* Floating Animations for Abstract Background */
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 10s ease-in-out 2s infinite; }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg) scale(1.02); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>

      {/* --- ENHANCED ABSTRACT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#121212 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Top Left Red Blur */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[120px] animate-float" />
        
        {/* Bottom Right Charcoal Blur */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#121212]/5 rounded-full blur-[140px] animate-float-delayed" />
        
        {/* Middle Left soft pink/red accent */}
        <div className="absolute top-[40%] left-[-20%] w-[40vw] h-[40vw] bg-red-600/5 rounded-[40rem] blur-[100px] animate-float" />

        {/* Abstract Outline Rings */}
        <div className="absolute top-[15%] right-[10%] w-[30vw] h-[30vw] border-[1px] border-[#121212]/[0.03] rounded-full animate-float-delayed" />
        <div className="absolute top-[17%] right-[12%] w-[26vw] h-[26vw] border-[1px] border-[#121212]/[0.02] rounded-full animate-float" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-3xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveTab('HOME')}
          >
            ROEL <span className="text-red-600">JR.</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center text-sm font-bold tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveTab(link)}
                className={`relative transition-colors duration-300 ${
                  activeTab === link ? 'text-red-600' : 'text-[#121212]/60 hover:text-[#121212]'
                }`}
              >
                {link}
                {activeTab === link && (
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
                )}
              </button>
            ))}
            <a 
              href="https://github.com/roellumauagjr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#121212] text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg shadow-[#121212]/20 hover:shadow-red-600/30 hover:-translate-y-0.5"
            >
              <Github size={16} />
              GITHUB
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-[#121212] focus:outline-none p-2 bg-[#121212]/5 rounded-full hover:bg-[#121212]/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow z-10 pt-32">
        {activeTab === 'HOME' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'PROJECTS' && <ProjectsView />}
        {activeTab === 'ARTWORKS' && <ArtworksView />}
        {activeTab === 'CERTIFICATIONS' && <CertificationsView />}
        {activeTab === 'ABOUT ME' && <AboutView />}
      </main>

      {/* Footer */}
      <footer className="z-10 bg-white/50 backdrop-blur-2xl border-t border-white/60 py-10 mt-20 shadow-[0_-4px_30px_rgba(0,0,0,0.03)] rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tighter">
            ROEL <span className="text-red-600">JR.</span>
          </div>
          <p className="text-[#121212]/50 text-sm font-bold tracking-wide uppercase">
            © {new Date().getFullYear()} Crafted with intent.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/roellumauagjr" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#121212]/5 rounded-full text-[#121212] hover:bg-[#121212] hover:text-white hover:-translate-y-1 transition-all duration-300"><Github size={20} /></a>
            <a href="#" className="p-3 bg-red-600/10 rounded-full text-red-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- REUSABLE UI COMPONENTS ---

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

const ProjectCard = ({ proj, index = 0 }) => (
  <ScrollReveal delay={index * 100} className="h-full">
    <GlassCard className="group cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] h-full flex flex-col">
      <div className={`h-56 ${proj.color} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>
         <span className="text-white/30 font-black text-2xl uppercase tracking-widest z-10">{proj.title}</span>
         <div className="absolute inset-0 bg-[#121212]/10 group-hover:bg-transparent transition-colors duration-500" />
         <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <div className="inline-block px-4 py-1.5 bg-red-600/10 text-red-600 rounded-full text-xs font-bold tracking-wider mb-4 uppercase self-start">
          {proj.category}
        </div>
        <h3 className="text-2xl font-black mb-3 flex items-center justify-between group-hover:text-red-600 transition-colors">
          {proj.title}
          <ExternalLink size={20} className="text-[#121212]/20 group-hover:text-red-600 transition-colors" />
        </h3>
        <p className="text-[#121212]/70 font-medium leading-relaxed">{proj.desc}</p>
      </div>
    </GlassCard>
  </ScrollReveal>
);

const CertCard = ({ cert, index = 0 }) => (
  <ScrollReveal delay={index * 100}>
    <GlassCard className="relative p-6 md:p-8 hover:border-red-600/30 transition-all duration-500 group flex flex-col md:flex-row items-start md:items-center gap-6 overflow-visible">
      {/* Decorative Ribbon Effect */}
      <div 
        className="hidden md:block absolute -top-4 right-10 w-12 h-20 bg-red-600 group-hover:bg-[#121212] transition-colors duration-500 shadow-lg z-20"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
      />
      
      {/* Certificate Seal/Icon */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
          <BadgeCheck size={32} />
        </div>
        {/* Dashed outer ring for seal effect */}
        <div className="absolute inset-[-6px] border-2 border-dashed border-red-600/20 rounded-full animate-[spin_15s_linear_infinite]" />
      </div>

      {/* Content */}
      <div className="flex-1 z-10">
        <div className="inline-block px-3 py-1 bg-[#121212]/5 text-[#121212]/60 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">
          Official Certification
        </div>
        <h3 className="text-xl md:text-2xl font-black group-hover:text-red-600 transition-colors leading-tight">{cert.title}</h3>
        <p className="text-[#121212]/50 font-medium mt-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#121212]/30 rounded-full" /> {cert.issuer}
        </p>
      </div>

      {/* Year / Stamp */}
      <div className="z-10 px-6 py-3 border-2 border-[#121212]/10 text-[#121212] font-black tracking-widest text-sm rounded-full group-hover:border-red-600 group-hover:text-red-600 transition-colors">
        {cert.year}
      </div>
    </GlassCard>
  </ScrollReveal>
);

const SectionHeader = ({ title, subtitle, icon }) => (
  <ScrollReveal>
    <div className="mb-12 flex flex-col items-center text-center">
      <div className="w-12 h-1.5 bg-red-600 rounded-full mb-8"></div>
      <div className="flex items-center gap-4 mb-4">
        <span className="p-4 bg-red-600/10 rounded-full text-red-600">{icon}</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h2>
      </div>
      <p className="text-lg text-[#121212]/60 font-medium max-w-2xl">{subtitle}</p>
    </div>
  </ScrollReveal>
);

// --- VIEWS ---

const HomeView = ({ setActiveTab }) => (
  <div className="space-y-32 pb-20">
    
    {/* 1. HERO SECTION */}
    <ScrollReveal>
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600/10 border border-red-600/20 text-red-600 text-sm font-bold tracking-widest uppercase rounded-full">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
            Available for Internship
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[1.05]">
            Bridging <span className="text-red-600">Code</span> <br />
            and Canvas.
          </h1>
          <p className="text-lg md:text-xl text-[#121212]/60 max-w-lg leading-relaxed font-medium mx-auto md:mx-0">
            I'm a multidisciplinary creative technologist specializing in front-end development, UI/UX design, and digital media.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <button 
              onClick={() => setActiveTab('PROJECTS')}
              className="px-8 py-4 bg-red-600 text-white font-bold tracking-wide rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
            >
              VIEW MY WORK
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="LUMAUAG_RESUME.pdf"
              download="LUMAUAG_RESUME.pdf"
              className="px-8 py-4 bg-white/60 backdrop-blur-md text-[#121212] border border-white font-bold tracking-wide rounded-full hover:bg-[#121212] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
            >
              RESUME <Download size={18} />
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md relative group">
          <div className="absolute inset-0 bg-red-600/20 translate-x-6 translate-y-6 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all duration-700 z-0 animate-float"></div>
          {/* HERO IMAGE CONTAINER */}
          <div className="relative aspect-square md:aspect-[4/5] bg-white/80 backdrop-blur-xl border-8 border-white shadow-2xl rounded-[3rem] md:rounded-[4rem] overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              src="ROEL ID PICTURE.png" 
              alt="Roel Jr." 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 bg-[#121212]/5 flex-col items-center justify-center text-[#121212]/40">
               <User size={80} className="mb-4 opacity-50" />
               <p className="font-bold tracking-widest uppercase">ID PICTURE</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>

    {/* 2. PREVIEW: PROJECTS */}
    <div className="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase flex items-center gap-3">
              <span className="p-2 bg-red-600/10 rounded-full text-red-600"><Code size={24} /></span>
              Latest Projects
            </h2>
          </div>
          <button 
            onClick={() => setActiveTab('PROJECTS')}
            className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm hover:-translate-y-1"
          >
            SEE ALL PROJECTS <ArrowRight size={18} />
          </button>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.slice(0, 3).map((proj, i) => <ProjectCard key={i} proj={proj} index={i} />)}
      </div>
    </div>

    {/* 3. PREVIEW: ARTWORKS */}
    <div className="max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase flex items-center gap-3">
              <span className="p-2 bg-[#121212]/10 rounded-full text-[#121212]"><Camera size={24} /></span>
              Latest Artworks
            </h2>
          </div>
          <button 
            onClick={() => setActiveTab('ARTWORKS')}
            className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full text-[#121212] font-bold hover:bg-[#121212] hover:text-white transition-all shadow-sm hover:-translate-y-1"
          >
            EXPLORE GALLERY <ArrowRight size={18} />
          </button>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[ARTWORKS.Photography[0], ARTWORKS.Video[0], ARTWORKS.Layout[0]].map((art, i) => {
          const Icon = art.icon;
          return (
            <ScrollReveal key={i} delay={i * 150}>
              <GlassCard className="group relative cursor-pointer aspect-video sm:aspect-square md:aspect-video flex items-center justify-center hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-[#121212]/5 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                  <Icon size={32} className="text-[#121212]/30 mb-3" />
                  <h3 className="text-xl font-black">{art.title}</h3>
                  <p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-2">{art.type}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>

    {/* 4. PREVIEW: CERTIFICATIONS */}
    <div className="max-w-5xl mx-auto px-6">
       <ScrollReveal>
         <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
          <h2 className="text-3xl font-black uppercase flex items-center gap-3">
            <span className="p-2 bg-red-600/10 rounded-full text-red-600"><Award size={24} /></span> 
            Certifications
          </h2>
          <button 
            onClick={() => setActiveTab('CERTIFICATIONS')}
            className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm hover:-translate-y-1"
          >
            VIEW ALL <ArrowRight size={18} />
          </button>
        </div>
      </ScrollReveal>
      <div className="space-y-6">
        {CERTS.slice(0, 2).map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
      </div>
    </div>

  </div>
);

const ProjectsView = () => (
  <div className="max-w-7xl mx-auto px-6 py-10">
    <SectionHeader title="All Projects." subtitle="A deep dive into my technical executions, spanning front-end web apps to Unity game development." icon={<Code size={32} />} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {PROJECTS.map((proj, i) => <ProjectCard key={i} proj={proj} index={i} />)}
    </div>
  </div>
);

const ArtworksView = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <SectionHeader title="Artworks." subtitle="Exploring the visual side of technology through lens, motion, and layout." icon={<Camera size={32} />} />
      
      <div className="space-y-20 mt-16">
        {Object.entries(ARTWORKS).map(([category, items], sectionIndex) => (
          <div key={category}>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-black tracking-tighter uppercase">{category}</h3>
                <div className="flex-1 h-px bg-[#121212]/10"></div>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((art, i) => {
                const Icon = art.icon;
                return (
                  <ScrollReveal key={i} delay={i * 100}>
                    <GlassCard className={`group relative cursor-pointer hover:-translate-y-2 transition-all duration-500 ${i === 0 && sectionIndex % 2 === 0 ? 'md:col-span-2 aspect-[21/9] md:aspect-auto' : 'aspect-[4/3]'}`}>
                      <div className="absolute inset-0 bg-[#121212]/5 flex flex-col items-center justify-center p-8 text-center group-hover:scale-105 transition-transform duration-700">
                        <div className="p-4 bg-white/50 backdrop-blur-md rounded-full mb-4">
                          <Icon size={28} className="text-[#121212]/40" />
                        </div>
                        <h3 className="text-2xl font-black">{art.title}</h3>
                        <p className="text-red-600 font-bold text-sm uppercase tracking-widest mt-2 px-4 py-1 bg-red-600/10 rounded-full inline-block">{art.type}</p>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#121212]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white font-black tracking-widest uppercase text-xl flex items-center gap-2">
                          View Details <ArrowRight size={24} className="text-red-600" />
                        </p>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificationsView = () => (
  <div className="max-w-4xl mx-auto px-6 py-10">
    <SectionHeader title="Certifications." subtitle="Continuous learning and professional validation in development, design, and security." icon={<Award size={32} />} />
    <div className="mt-16 space-y-6">
      {CERTS.map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
    </div>
  </div>
);

const AboutView = () => (
  <div className="max-w-6xl mx-auto px-6 py-10">
    <SectionHeader title="About Me." subtitle="A blend of logic, leadership, and creativity." icon={<User size={32} />} />

    {/* Bio & Photo Section */}
    <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center lg:items-start mt-16">
      <ScrollReveal className="w-full lg:w-1/3 relative group">
        <div className="absolute inset-0 bg-[#121212]/10 translate-x-4 translate-y-4 rounded-[3rem] blur-xl group-hover:bg-red-600/20 transition-all duration-700 z-0 animate-float"></div>
        <div className="relative aspect-square md:aspect-[4/5] bg-white border-8 border-white/80 shadow-xl rounded-[3rem] overflow-hidden z-10 transition-transform duration-700">
          <img 
            src="ROEL ID PICTURE.png" 
            alt="Roel Jr." 
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden absolute inset-0 bg-[#121212]/5 flex-col items-center justify-center text-[#121212]/40">
             <User size={80} className="mb-4 opacity-50" />
             <p className="font-bold tracking-widest uppercase">ID PICTURE</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200} className="w-full lg:w-2/3">
        <GlassCard className="p-8 md:p-12 h-full">
          <h3 className="text-3xl font-black mb-6">The Journey</h3>
          <p className="text-lg text-[#121212]/70 leading-relaxed font-medium mb-6">
            I am an undergraduate Computer Science student focusing on Game Development. But my curiosity doesn't stop at the code editor. My journey in tech is heavily influenced by my background in student leadership and campus journalism.
          </p>
          <p className="text-lg text-[#121212]/70 leading-relaxed font-medium">
            This means I don't just understand how to build systems; I understand how to communicate ideas, manage teams, and design experiences that resonate with actual users. Whether I'm mapping out a user flow in Figma, tweaking C# scripts in Unity, or color grading a portrait session, my goal is always to create something that feels intuitive, beautiful, and purposeful.
          </p>
        </GlassCard>
      </ScrollReveal>
    </div>
    
    {/* Education & Organizations */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <ScrollReveal delay={100}>
        <GlassCard className="p-8 md:p-10 h-full">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="p-3 bg-[#121212]/5 rounded-full text-[#121212]"><GraduationCap size={24} /></span>
            Education
          </h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[#121212]/10 hover:border-red-600 transition-colors duration-300">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-4 border-red-600 rounded-full" />
              <h4 className="text-lg font-bold">BS Computer Science</h4>
              <p className="text-[#121212]/60 font-medium">Specialization in Game Development</p>
              <p className="text-sm font-bold text-red-600 mt-1 uppercase tracking-wider">Expected 2027</p>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <GlassCard className="p-8 md:p-10 h-full">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="p-3 bg-[#121212]/5 rounded-full text-[#121212]"><Users size={24} /></span>
            Organizations
          </h3>
          <ul className="space-y-4 font-bold text-[#121212]/80">
            {[
              { role: 'Student Leader', org: 'University Student Council' },
              { role: 'Staff Writer / Photojournalist', org: 'Campus Official Publication' },
              { role: 'Active Member', org: 'Game Development Society' }
            ].map((item, i) => (
              <li key={i} className="flex flex-col bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/80 hover:border-red-600/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <span className="text-red-600 text-xs tracking-widest uppercase mb-1">{item.role}</span>
                <span>{item.org}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </ScrollReveal>
    </div>

    {/* Skills */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ScrollReveal delay={100}>
        <GlassCard className="p-8 md:p-10 h-full">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="p-3 bg-red-600/10 rounded-full text-red-600"><Code size={24} /></span>
            Technical Arsenal
          </h3>
          <ul className="space-y-4 font-bold text-[#121212]/70">
            {['React, Next.js, Tailwind CSS', 'Unity, C#, C++', 'Python, OpenCV', 'Git, Vercel, Node.js'].map((skill, i) => (
              <li key={i} className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-4 rounded-full border border-white/80 hover:border-red-600/30 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <ChevronRight size={18} className="text-red-600 group-hover:translate-x-1 transition-transform"/> {skill}
              </li>
            ))}
          </ul>
        </GlassCard>
      </ScrollReveal>
      
      <ScrollReveal delay={200}>
        <GlassCard className="p-8 md:p-10 h-full">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="p-3 bg-red-600/10 rounded-full text-red-600"><Camera size={24} /></span>
            Creative Suite
          </h3>
          <ul className="space-y-4 font-bold text-[#121212]/70">
            {['UI/UX Design (Figma)', 'Adobe Premiere Pro & After Effects', 'Portrait Photography & Lightroom', 'Video Direction & Editing'].map((skill, i) => (
              <li key={i} className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-4 rounded-full border border-white/80 hover:border-red-600/30 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <ChevronRight size={18} className="text-red-600 group-hover:translate-x-1 transition-transform"/> {skill}
              </li>
            ))}
          </ul>
        </GlassCard>
      </ScrollReveal>
    </div>
  </div>
);

export default App;
