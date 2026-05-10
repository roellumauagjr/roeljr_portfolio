import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Mail, ArrowRight, ExternalLink, Camera, Code, 
  Award, ChevronRight, Download, User, BadgeCheck, 
  Video, LayoutTemplate, GraduationCap, Users 
} from 'lucide-react';

// Components
import SmoothScroll from './components/animation/SmoothScroll';
import Background from './components/animation/Background';
import HomeView, { ScrollReveal } from './views/Home';
import ProjectsView from './views/Projects';
import AboutView from './views/About';
import ArtworksView from './views/Artworks';
import TiltCard from './components/animation/TiltCard';
import Magnetic from './components/animation/Magnetic';
import TextReveal from './components/animation/TextReveal';
import OpeningSequence from './components/animation/OpeningSequence';
import VoxelTransition from './components/animation/VoxelTransition';

// --- CUSTOM BRAND ICONS ---
const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- SHARED DATA ---
const PROJECTS = [
  { 
    title: 'LCC Press', 
    category: 'UI/UX Design', 
    desc: 'Digital system streamlining local printing press operations, providing an efficient platform for managing business receipt orders.', 
    image: 'LCCPRESS.png',
    link: 'https://www.figma.com/design/7bFpqw8EWDEfEnGnFfssuv/LCC-Press?t=BPb1tdP6D3GF6jSX-1'
  },
  { 
    title: 'Ahmoree Productions', 
    category: 'UI/UX Design', 
    desc: 'Comprehensive UI/UX design for a Dutch content creator, featuring responsive desktop and mobile layouts across multiple site pages.', 
    image: 'AHMOREE_PRODUCTIONS.png',
    link: 'https://www.figma.com/design/eoCMB5QWDHKW60tIxSeMoF/Ahmoree-Productions?node-id=0-1&t=2iqZFBAIyiirLyXx-1'
  }
];

const CERTS = [
  { title: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera', year: '2024' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2023' },
  { title: 'IT Fundamentals+', issuer: 'CompTIA', year: '2023' },
];

const ARTWORKS = {
  PHOTOS: [
    { 
      title: 'USLS 69th Graduation Rites', 
      type: 'Photography', 
      icon: Camera,
      image: 'USLS69THGraduationRites.jpg',
      link: 'https://www.facebook.com/share/p/1ECnSDSLkr/'
    },
    { title: 'Urban Solitude', type: 'Street', icon: Camera },
    { title: 'Neon Reflections', type: 'Night', icon: Camera },
    { title: 'Golden Hour Stills', type: 'Portrait', icon: Camera }
  ],
  VIDEOS: [
    { title: 'Nature in Motion', type: 'Short Film', icon: Video },
    { title: 'Event Highlights 2023', type: 'Recap', icon: Video }
  ],
  'GRAPHIC DESIGN': [
    { title: 'Minimalist UI Concept', type: 'Web Design', icon: LayoutTemplate },
    { title: 'Magazine Spread', type: 'Print', icon: LayoutTemplate },
    { title: 'Brand Identity', type: 'Graphics', icon: LayoutTemplate }
  ]
};

// --- REUSABLE UI COMPONENTS ---
const GlassCard = ({ children, className = "" }) => {
  const hasOverflow = className.includes('overflow-');
  return (
    <div className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] ${!hasOverflow ? 'overflow-hidden' : ''} ${className}`}>
      {children}
    </div>
  );
};

const ProjectCard = ({ proj, index = 0 }) => (
  <ScrollReveal delay={index * 0.1}>
    <TiltCard className="h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <GlassCard className="group cursor-pointer h-full flex flex-col hover:shadow-[0_40px_80px_rgba(220,38,38,0.15)] transition-all duration-700">
          <div 
            onClick={() => proj.link && window.open(proj.link, '_blank')}
            className={`h-56 ${proj.color || 'bg-red-600/5'} relative overflow-hidden flex items-center justify-center flex-shrink-0`}
          >
             {proj.image ? (
               <img 
                 src={proj.image} 
                 alt={proj.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
             ) : (
               <span className="text-white/30 font-black text-2xl uppercase tracking-widest z-10">{proj.title}</span>
             )}
             <div className="absolute inset-0 bg-[#121212]/10 group-hover:bg-transparent transition-colors duration-500" />
             <motion.div 
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
              whileHover={{ scale: 3, x: -20, y: -20 }}
              transition={{ type: "spring", stiffness: 100 }}
             />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <div className="inline-block px-4 py-1.5 bg-red-600/10 text-red-600 rounded-full text-xs font-bold tracking-wider mb-4 uppercase self-start">
              {proj.category}
            </div>
            <h3 
              onClick={() => proj.link && window.open(proj.link, '_blank')}
              className="text-2xl font-black mb-3 flex items-center justify-between group-hover:text-red-600 transition-colors"
            >
              {proj.title}
              <Magnetic strength={0.2}><ExternalLink size={20} className="text-[#121212]/20 group-hover:text-red-600 transition-colors" /></Magnetic>
            </h3>
            <p className="text-[#121212]/70 font-medium leading-relaxed">{proj.desc}</p>
          </div>
        </GlassCard>
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

const CertCard = ({ cert, index = 0 }) => (
  <ScrollReveal delay={index * 0.1}>
    <TiltCard className="h-full">
      <GlassCard className="relative p-6 md:p-8 hover:border-red-600/30 hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)] transition-all duration-700 group flex flex-col md:flex-row items-start md:items-center gap-6 h-full">
        <div className="relative z-10 flex-shrink-0">
          <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
            <BadgeCheck size={32} />
          </div>
          <div className="absolute inset-[-6px] border-2 border-dashed border-red-600/20 rounded-full animate-[spin_15s_linear_infinite]" />
        </div>
        <div className="flex-1 z-10">
          <div className="inline-block px-3 py-1 bg-[#121212]/5 text-[#121212]/60 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">Official Certification</div>
          <h3 className="text-xl md:text-2xl font-black group-hover:text-red-600 transition-colors leading-tight">{cert.title}</h3>
          <p className="text-[#121212]/50 font-medium mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#121212]/30 rounded-full" /> {cert.issuer}
          </p>
        </div>

        {/* Year Pill with Internal Ribbon */}
        <div className="relative flex-shrink-0 self-center">
          <div 
            className="hidden md:block absolute top-[-60px] left-1/2 -translate-x-1/2 w-12 h-40 bg-red-600 z-0 group-hover:h-48 transition-all duration-700" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)' }} 
          />
          <div className="relative z-10 px-6 py-3 border-2 border-[#121212]/10 bg-white/80 backdrop-blur-md text-[#121212] font-black tracking-widest text-sm rounded-full group-hover:border-red-600 group-hover:text-red-600 transition-colors shadow-sm">
            {cert.year}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
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

// --- MAIN APP COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState('HOME');
  const [showOpening, setShowOpening] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isThemeGreen, setIsThemeGreen] = useState(false);
  const navLinks = ['HOME', 'PROJECTS', 'ARTWORKS', 'CERTIFICATIONS', 'ABOUT ME'];
  const voxelTransitionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <SmoothScroll>
      <div className={`min-h-screen bg-white text-[#121212] flex flex-col relative overflow-x-hidden selection:bg-red-600 selection:text-white transition-colors duration-1000 ${isThemeGreen ? 'theme-green' : ''}`}>
        
        {/* Fonts & Global Styles */}
        <style>{`
          * { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 0px; }
          .animate-float { animation: float 8s ease-in-out infinite; }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(3deg) scale(1.02); }
          }
          @keyframes revealUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0px); }
          }
        `}</style>

        {showOpening && <OpeningSequence onComplete={() => setShowOpening(false)} />}
        <VoxelTransition ref={voxelTransitionRef} />

        <div className={`transition-all duration-700 delay-200 ${showOpening ? 'opacity-0 scale-95 h-screen overflow-hidden' : 'opacity-100 scale-100'}`}>
          {/* --- BACKGROUND --- */}
          <Background />

          {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div 
              className="text-3xl font-black tracking-tighter cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('HOME')}
            >
              ROEL <span className="text-red-600">JR.</span>
            </motion.div>
            
            <div className="hidden md:flex space-x-2 items-center text-sm font-bold tracking-wide bg-[#121212]/5 p-1.5 rounded-full">
              {navLinks.map((link) => (
                <Magnetic key={link} strength={0.2}>
                  <button
                    onClick={() => setActiveTab(link)}
                    className={`relative px-6 py-2.5 rounded-full transition-colors duration-300 ${
                      activeTab === link ? 'text-white' : 'text-[#121212]/60 hover:text-[#121212]'
                    }`}
                  >
                    <span className="relative z-10">{link}</span>
                    {activeTab === link && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-red-600 rounded-full shadow-lg shadow-red-600/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </Magnetic>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Magnetic strength={0.3}>
                <a href="https://github.com/roellumauagjr" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 px-6 py-3 bg-[#121212] text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg">
                  <Github size={16} /> GITHUB
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button 
                  onClick={async (e) => {
                    // 1. Click the switch -> update visual switch state
                    const nextState = !isSwitchOn;
                    setIsSwitchOn(nextState);
                    
                    // 2. Animate switch -> wait for the switch animation to finish
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // 3. Screen capture
                    if (voxelTransitionRef.current) {
                      await voxelTransitionRef.current.triggerTransition(e.clientX, e.clientY);
                    }
                    
                    // 4. Update the global theme behind the shattered glass
                    setIsThemeGreen(nextState);
                  }}
                  className={`relative w-24 h-[44px] rounded-full transition-all duration-500 flex items-center p-1.5 shadow-lg ${isSwitchOn ? 'bg-[#22c55e]' : 'bg-[#dc2626]'}`}
                >
                  <motion.div 
                    animate={{ x: isSwitchOn ? 52 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-8 h-8 bg-white rounded-full shadow-md"
                  />
                </button>
              </Magnetic>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow relative z-10 pt-32">
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <HomeView 
                key="home"
                setActiveTab={setActiveTab} 
                PROJECTS={PROJECTS} 
                ARTWORKS={ARTWORKS} 
                CERTS={CERTS} 
                ProjectCard={ProjectCard}
                CertCard={CertCard}
                isSwitchOn={isThemeGreen}
              />
            )}
            {activeTab === 'PROJECTS' && (
              <ProjectsView 
                key="projects"
                PROJECTS={PROJECTS} 
                SectionHeader={SectionHeader} 
                ProjectCard={ProjectCard} 
              />
            )}
            {activeTab === 'ABOUT ME' && (
              <AboutView 
                key="about"
                SectionHeader={SectionHeader} 
                GlassCard={GlassCard} 
                isSwitchOn={isThemeGreen}
              />
            )}
            {activeTab === 'ARTWORKS' && (
              <ArtworksView 
                key="artworks"
                ARTWORKS={ARTWORKS} 
                SectionHeader={SectionHeader} 
              />
            )}
            {activeTab === 'CERTIFICATIONS' && (
              <div 
                key={activeTab}
                style={{ animation: 'revealUp 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98) both' }}
                className="flex items-center justify-center h-[50vh] text-4xl font-black uppercase text-[#121212]/20"
              >
                {activeTab} VIEW COMING SOON
              </div>
            )}
          </AnimatePresence>
        </main>

        <footer className="z-10 bg-white/50 backdrop-blur-2xl border-t border-white/60 py-10 mt-20 rounded-t-[3rem]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-black tracking-tighter">ROEL <span className="text-red-600">JR.</span></div>
            <p className="text-[#121212]/50 text-sm font-bold tracking-wide uppercase">© {new Date().getFullYear()} Crafted with intent.</p>
            <div className="flex space-x-6">
              <a href="https://github.com/roellumauagjr" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#121212]/5 rounded-full hover:bg-[#121212] hover:text-white transition-all"><Github size={20} /></a>
              <a href="mailto:roellumauagjr@gmail.com" className="p-3 bg-red-600/10 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all"><Mail size={20} /></a>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default App;
