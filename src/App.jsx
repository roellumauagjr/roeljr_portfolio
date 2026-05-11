import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Mail, ExternalLink, Camera, Code, 
  Award, BadgeCheck, Video, LayoutTemplate
} from 'lucide-react';

import SmoothScroll from './components/animation/SmoothScroll';
import Background from './components/animation/Background';
import HomeView, { ScrollReveal } from './views/Home';
import ProjectsView from './views/Projects';
import AboutView from './views/About';
import ArtworksView from './views/Artworks';
import TiltCard from './components/animation/TiltCard';
import Magnetic from './components/animation/Magnetic';
import OpeningSequence from './components/animation/OpeningSequence';
import VoxelTransition from './components/animation/VoxelTransition';

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  { 
    title: 'LCC Press', 
    category: 'UI/UX Design', 
    desc: 'Digital system streamlining local printing press operations, providing an efficient platform for managing business receipt orders.', 
    image: '/LCCPRESS.png',
    link: 'https://www.figma.com/design/7bFpqw8EWDEfEnGnFfssuv/LCC-Press?t=BPb1tdP6D3GF6jSX-1'
  },
  { 
    title: 'Ahmoree Productions', 
    category: 'UI/UX Design', 
    desc: 'Comprehensive UI/UX design for a Dutch content creator, featuring responsive desktop and mobile layouts across multiple site pages.', 
    image: '/AHMOREE_PRODUCTIONS.png',
    link: 'https://www.figma.com/design/eoCMB5QWDHKW60tIxSeMoF/Ahmoree-Productions?node-id=0-1&t=2iqZFBAIyiirLyXx-1'
  },
  { title: 'LibraNet', category: 'Computer Programming 2', desc: 'Desktop library management system that automates book borrowing and inventory tracking. Developed using Java. Role: Solo Programmer.', color: 'bg-red-600/5' },
  { title: 'QuickServe', category: 'Software Engineering', desc: 'Web-based point-of-sale dashboard designed to streamline order-taking for restaurants using manual processes. Developed using HTML & CSS. Role: Partnered Programmer.', color: 'bg-red-600/5' },
  { title: 'Twin Fall', category: 'Game Programming', desc: 'Narrative-based game where a character travels between underworld and overworld realms to reunite with its twin, Luna. Role: Creative Director & Lead Artist.', color: 'bg-red-600/5' },
  { title: 'Mango Shake Simulator', category: 'Game Programming 2', desc: '3D simulator game where players act as a mango shake vendor and must meet daily order quotas to progress. Role: 3D Artist.', color: 'bg-red-600/5' },
  { title: 'Galaxias Mania', category: 'Game Technology', desc: '2D mobile space shooter focused on achieving high scores and surviving continuous enemy attacks. Role: Game Developer.', color: 'bg-red-600/5' },
  { title: 'HAVEN - Emergency Response', category: 'Full Stack Development', desc: 'Real-time emergency response system where mobile user reports instantly trigger alerts on a desktop dashboard. Role: Front-End Developer; assisted with Back-End.', color: 'bg-red-600/5' },
  { title: 'Renthing - Rental Marketplace', category: 'Startup Project', desc: 'Rental marketplace platform promoting access over ownership. Role: Front-End & Back-End Developer; UI/UX Designer.', color: 'bg-red-600/5' },
  { title: 'Prospera.AI', category: 'Technopreneurship', desc: 'AI-powered mobile wallet application promoting smarter financial management using artificial intelligence. Role: UI/UX Artist.', color: 'bg-red-600/5' },
  { title: 'MJIPHIL Construction', category: 'Cloud-Based App Development', desc: 'Web-based digital inventory and catalog system developed to replace manual inventory counting processes. Role: UI/UX Artist.', color: 'bg-red-600/5' },
];

const PROJECTS_GREEN = [
  { title: 'QuickServe', category: 'Software Engineering', desc: 'Web-based POS dashboard for restaurants. Role: Partnered Programmer.', color: 'bg-green-600/5' },
  { title: 'Galaxias Mania', category: 'Game Technology', desc: '2D mobile space shooter. Role: Game Developer.', color: 'bg-green-600/5' },
  { title: 'HAVEN - Emergency Response', category: 'Full Stack Development', desc: 'Real-time emergency response system. Role: Front-End & Back-End Developer.', color: 'bg-green-600/5' },
  { title: 'ParkWise', category: 'Computer Programming 2', desc: 'Smart parking management system using C++ (Qt). Role: Full Stack Developer.', color: 'bg-green-600/5' },
  { title: 'Renthing - Rental Marketplace', category: 'Startup Project', desc: 'DTI Moonshot Startup Competition finalist. Role: Front-End & Back-End Developer; UI/UX Designer.', color: 'bg-green-600/5' },
  { title: 'Prospera.AI', category: 'Technopreneurship', desc: 'AI-powered mobile wallet with expense tracking, AI chatbot, and savings envelopes. Role: UI/UX Artist.', color: 'bg-green-600/5' }
];

const CERTS = [
  { title: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera', year: '2026' },
  { title: 'Visual Graphic Design NC III: Developing Designs for User Interface', issuer: 'TESDA Online Program', year: '2024' },
  { title: 'Visual Graphic Design NC III: Intro to Visual Graphic Design', issuer: 'TESDA Online Program', year: '2024' },
  { title: 'SMART Technopreneurship 101', issuer: 'TESDA Online Program', year: '2024' },
  { title: 'Computer Hardware Basics', issuer: 'DICT-ITU DTC Initiative via Cisco', year: '2024' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2024' },
];

const CERTS_GREEN = [
  { title: 'Cisco C++ Essentials 2', issuer: 'Cisco Networking Academy', year: '2025' },
];

const ARTWORKS = {
  PHOTOS: [ { title: 'USLS 69th Graduation Rites', type: 'Photography', icon: Camera, image: '/USLS69THGraduationRites.jpg', link: 'https://www.facebook.com/share/p/1ECnSDSLkr/' }, { title: 'Urban Solitude', type: 'Street', icon: Camera }, { title: 'Neon Reflections', type: 'Night', icon: Camera }, { title: 'Golden Hour Stills', type: 'Portrait', icon: Camera } ],
  VIDEOS: [ { title: 'Nature in Motion', type: 'Short Film', icon: Video }, { title: 'Event Highlights 2023', type: 'Recap', icon: Video } ],
  'GRAPHIC DESIGN': [ { title: 'Minimalist UI Concept', type: 'Web Design', icon: LayoutTemplate }, { title: 'Magazine Spread', type: 'Print', icon: LayoutTemplate }, { title: 'Brand Identity', type: 'Graphics', icon: LayoutTemplate } ]
};

const ARTWORKS_GREEN = {
  PHOTOS: [],
  VIDEOS: [],
  'GRAPHIC DESIGN': [
    { 
      title: 'SCRIBE Vol. 29 - Chapter 3', 
      type: 'The Spectrum - Publication Design', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-scribe-29-ch3.png' 
    },
    { 
      title: 'SCRIBE Vol. 29 - Chapter 2', 
      type: 'The Spectrum - Publication Design', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-scribe-29-ch2.png' 
    },
    { 
      title: 'SCRIBE Vol. 29 - Chapter 1', 
      type: 'The Spectrum - Publication Design', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-scribe-29-ch1.png' 
    },
    { 
      title: 'Magazine Previews 3', 
      type: 'The Spectrum - Magazine Layout', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/spec-mag-preview-3-1.png',
        '/assets/artworks/green/spec-mag-preview-3-2.png',
        '/assets/artworks/green/spec-mag-preview-3-3.png',
        '/assets/artworks/green/spec-mag-preview-3-4.png'
      ] 
    },
    { 
      title: 'Magazine Previews 2', 
      type: 'The Spectrum - Magazine Layout', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/spec-mag-preview-2-1.png',
        '/assets/artworks/green/spec-mag-preview-2-2.png',
        '/assets/artworks/green/spec-mag-preview-2-3.png',
        '/assets/artworks/green/spec-mag-preview-2-4.png'
      ] 
    },
    { 
      title: 'Magazine Previews 1', 
      type: 'The Spectrum - Magazine Layout', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/spec-mag-preview-1-1.png',
        '/assets/artworks/green/spec-mag-preview-1-2.png',
        '/assets/artworks/green/spec-mag-preview-1-3.png',
        '/assets/artworks/green/spec-mag-preview-1-4.png'
      ] 
    },
    { 
      title: '#Ecologica', 
      type: 'The Spectrum - Digital Art', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/spec-ecologica-1.png',
        '/assets/artworks/green/spec-ecologica-2.png'
      ] 
    },
    { 
      title: '#resubSCRIBE', 
      type: 'The Spectrum - Branding', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-resubscribe.png' 
    },
    { 
      title: 'SOA 2025 Highlights', 
      type: 'The Spectrum - News Graphics', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-soa-2025.png' 
    },
    { 
      title: 'SONA 2025', 
      type: 'The Spectrum - Coverage Art', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/spec-sona-2025-1.png',
        '/assets/artworks/green/spec-sona-2025-2.png',
        '/assets/artworks/green/spec-sona-2025-3.png',
        '/assets/artworks/green/spec-sona-2025-4.png'
      ] 
    },
    { 
      title: 'Tiempo Muerto', 
      type: 'The Spectrum - Editorial Layout', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-tiempo-muerto.png' 
    },
    { 
      title: 'Maguindanao Massacre Commemoration', 
      type: 'The Spectrum - Editorial Art', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-maguindanao.png' 
    },
    { 
      title: 'Martial Law Commemoration', 
      type: 'The Spectrum - Editorial Art', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-martial-law.png' 
    },
    { 
      title: 'Martial Law Anniversary Pubmat', 
      type: 'Publication Material', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/rouen-martial-law.png' 
    },
    { 
      title: 'Ramadan', 
      type: 'The Spectrum - Social Media', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-ramadan.png' 
    },
    { 
      title: 'Magazine 2025 Spotify Playlist', 
      type: 'The Spectrum - Cover Art', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/spec-mag-spotify.png' 
    },
    { 
      title: 'Freshmen Walk 2023', 
      type: 'Event Graphics', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/usg-freshmen-walk-1.png',
        '/assets/artworks/green/usg-freshmen-walk-2.png',
        '/assets/artworks/green/usg-freshmen-walk-3.png'
      ] 
    },
    { 
      title: 'USPLASH Overall Champion Posting', 
      type: 'Social Media Post', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/usg-usplash-champion.png' 
    },
    { 
      title: 'USPLASH LIVE RESULTS POSTING TEMPLATES', 
      type: 'Social Media Templates', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/usg-usplash-template-1.png',
        '/assets/artworks/green/usg-usplash-template-2.png',
        '/assets/artworks/green/usg-usplash-template-3.png',
        '/assets/artworks/green/usg-usplash-template-4.png'
      ] 
    },
    { 
      title: 'Music Fest Promotional Poster', 
      type: 'Event Branding', 
      icon: LayoutTemplate, 
      image: '/assets/artworks/green/usg-music-fest.png' 
    },
    { 
      title: 'House of Rouen - House Merch Posting', 
      type: 'Social Media Assets', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/rouen-merch-1.png',
        '/assets/artworks/green/rouen-merch-2.png',
        '/assets/artworks/green/rouen-merch-3.png',
        '/assets/artworks/green/rouen-merch-4.png',
        '/assets/artworks/green/rouen-merch-5.png'
      ] 
    },
    { 
      title: 'Liceo de La Salle Yearbook 2023', 
      type: 'Yearbook Layout', 
      icon: LayoutTemplate, 
      images: [
        '/assets/artworks/green/yearbook-fb-cover.png',
        '/assets/artworks/green/yearbook-halloween.png',
        '/assets/artworks/green/yearbook-dp-frame.jpg'
      ] 
    }
  ]
};

const EDUCATION_GREEN = [
  { school: 'University of St. La Salle Bacolod', degree: 'BS Computer Science', period: 'August 2023 - June 2027', details: "Consistent Deans Lister since AY 2023" },
  { school: 'Liceo de La Salle - USLS Bacolod', degree: 'Senior High School STEM', period: 'August 2021 - June 2023', details: 'Graduated with High Honors' },
  { school: 'St. Joseph School - La Salle', degree: 'Junior High School', period: 'August 2017 - June 2021', details: 'Red Shield Awardee' },
];

const ORGS_GREEN = [
  { role: 'Layout Artist', org: 'The Spectrum - USLS', period: '2025 - Present' },
  { role: 'PR Vice Head', org: 'College of Engineering & Computing Studies Council', period: '2024 - 2025' },
  { role: 'Documentation Committee', org: 'USLS ISACA Student Groups', period: '2023 - 2024' },
  { role: 'Layout Artist', org: 'Tigris Publication', period: '2023 - 2024' },
  { role: 'Club Member', org: 'GDSC USLS', period: '2023 - 2024' },
  { role: 'Media Affairs', org: 'Computer Science Society', period: '2023 - 2024' },
  { role: 'Media Lab Volunteer', org: 'Center for Marketing & Communications', period: '2023 - 2024' },
  { role: 'PR Undersecretary', org: 'USLS Student Government', period: '2023' },
  { role: 'Head of Creatives', org: 'Liceo Yearbook Committee', period: '2022 - 2023' },
  { role: 'Media Head', org: 'House of Rouen Executives', period: '2022 - 2023' },
];

const EDUCATION_RED = [
  { school: 'University of St. La Salle Bacolod', degree: 'BS Computer Science, Major in Game Development', period: 'August 2023 - 2027', details: "Dean's Lister" },
  { school: 'Liceo De La Salle - USLS Bacolod', degree: 'Senior High School STEM', period: 'August 2021 - June 2023', details: 'Graduated with Highest Honors' },
  { school: 'Bata National High School', degree: 'Junior High School', period: 'June 2018 - July 2021', details: 'Batch Valedictorian, With High Honors' },
];

const ORGS_RED = [
  { role: 'Videographer', org: 'The Spectrum - USLS Media Corps', period: '2025 - Present' },
  { role: 'Department of Public Relations Head', org: 'College of Engineering and Computing Studies Council', period: '2024 - 2025' },
  { role: 'Documentation Committee Member', org: 'USLS ISACA Student Group', period: '2024 - 2025' },
  { role: 'Videographer', org: 'The Spectrum - USLS Media Corps', period: '2023 - 2024' },
  { role: 'Club Member', org: 'Google Developer Student Clubs - USLS', period: '2023 - 2024' },
  { role: 'Documentation Committee Member', org: 'USLS ISACA Student Group', period: '2023 - 2024' },
  { role: 'CMC Volunteer', org: 'Center for Marketing and Communications: Media Lab', period: '2023 - 2024' },
  { role: 'Department of Media Affairs Undersecretary', org: 'Computer Science Society - USLS', period: '2023 - 2024' },
  { role: 'Department of Public Relations Undersecretary', org: 'USLS Student Government', period: '2023 - 2024' },
  { role: 'Red Cross Volunteer', org: 'Senior Plus Red Cross Youth Council', period: '2022 - 2023' },
  { role: 'Videojournalist', org: 'Kapawa Official English Publication', period: '2022 - 2023' },
  { role: 'Department of Public Relations Secretary', org: 'House of Paris Executives - Liceo De La Salle', period: '2022 - 2023' },
  { role: 'Assistant Strand (STEM) Editor', org: 'The Liceo De La Salle Yearbook', period: '2021 - 2022' },
  { role: 'Media and Arts Videography Committee Member', org: 'STEM Council - Liceo De La Salle', period: '2021 - 2022' },
  { role: 'Department of Public Relations Undersecretary', org: 'House of Paris Executives - Liceo De La Salle', period: '2021 - 2022' },
];

const GlassCard = ({ children, className = "" }) => {
  const hasOverflow = className.includes('overflow-');
  return (
    <div className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2.5rem] ${!hasOverflow ? 'overflow-hidden' : ''} ${className}`}>
      {children}
    </div>
  );
};

const ProjectCard = ({ proj, index = 0, isGreen }) => (
  <ScrollReveal delay={index * 0.1}>
    <TiltCard className="h-full">
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        <GlassCard className={`group cursor-pointer h-full flex flex-col hover:shadow-[0_40px_80px_rgba(${isGreen ? '34,197,94' : '220,38,38'},0.15)] transition-all duration-700`}>
          <div onClick={() => proj.link && window.open(proj.link, '_blank')} className={`h-56 ${proj.color || (isGreen ? 'bg-green-600/5' : 'bg-red-600/5')} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>
            {proj.image ? (
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <span className="text-white/30 font-black text-2xl uppercase tracking-widest z-10">{proj.title}</span>
            )}
            <div className="absolute inset-0 bg-[#121212]/10 group-hover:bg-transparent transition-colors duration-500" />
            <motion.div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" whileHover={{ scale: 3, x: -20, y: -20 }} transition={{ type: "spring", stiffness: 100 }} />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <div className={`inline-block px-4 py-1.5 ${isGreen ? 'bg-green-600/10 text-green-600' : 'bg-red-600/10 text-red-600'} rounded-full text-xs font-bold tracking-wider mb-4 uppercase self-start`}>
              {proj.category}
            </div>
            <h3 onClick={() => proj.link && window.open(proj.link, '_blank')} className={`text-2xl font-black mb-3 flex items-center justify-between ${isGreen ? 'group-hover:text-green-600' : 'group-hover:text-red-600'} transition-colors`}>
              {proj.title}
              <Magnetic strength={0.2}><ExternalLink size={20} className={`text-[#121212]/20 ${isGreen ? 'group-hover:text-green-600' : 'group-hover:text-red-600'} transition-colors`} /></Magnetic>
            </h3>
            <p className="text-[#121212]/70 font-medium leading-relaxed">{proj.desc}</p>
          </div>
        </GlassCard>
      </motion.div>
    </TiltCard>
  </ScrollReveal>
);

const CertCard = ({ cert, index = 0, isGreen }) => (
  <ScrollReveal delay={index * 0.1}>
    <TiltCard className="h-full">
      <GlassCard className={`relative p-6 md:p-8 ${isGreen ? 'hover:border-green-600/30 hover:shadow-[0_40px_80px_rgba(34,197,94,0.1)]' : 'hover:border-red-600/30 hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)]'} transition-all duration-700 group flex flex-col md:flex-row items-start md:items-center gap-6 h-full`}>
        <div className="relative z-10 flex-shrink-0">
          <div className={`w-16 h-16 ${isGreen ? 'bg-green-600/10 text-green-600 group-hover:bg-green-600' : 'bg-red-600/10 text-red-600 group-hover:bg-red-600'} rounded-full flex items-center justify-center group-hover:text-white transition-colors duration-500`}>
            <BadgeCheck size={32} />
          </div>
          <div className={`absolute inset-[-6px] border-2 border-dashed ${isGreen ? 'border-green-600/20' : 'border-red-600/20'} rounded-full animate-[spin_15s_linear_infinite]`} />
        </div>
        <div className="flex-1 z-10">
          <div className="inline-block px-3 py-1 bg-[#121212]/5 text-[#121212]/60 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">Official Certification</div>
          <h3 className={`text-xl md:text-2xl font-black ${isGreen ? 'group-hover:text-green-600' : 'group-hover:text-red-600'} transition-colors leading-tight`}>{cert.title}</h3>
          <p className="text-[#121212]/50 font-medium mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#121212]/30 rounded-full" /> {cert.issuer}
          </p>
        </div>
        <div className="relative flex-shrink-0 self-center">
          <div className={`hidden md:block absolute top-[-60px] left-1/2 -translate-x-1/2 w-12 h-40 ${isGreen ? 'bg-green-600' : 'bg-red-600'} z-0 group-hover:h-48 transition-all duration-700`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)' }} />
          <div className={`relative z-10 px-6 py-3 border-2 border-[#121212]/10 bg-white/80 backdrop-blur-md text-[#121212] font-black tracking-widest text-sm rounded-full ${isGreen ? 'group-hover:border-green-600 group-hover:text-green-600' : 'group-hover:border-red-600 group-hover:text-red-600'} transition-colors shadow-sm`}>
            {cert.year}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  </ScrollReveal>
);

const SectionHeader = ({ title, subtitle, icon, isGreen }) => (
  <ScrollReveal>
    <div className="mb-12 flex flex-col items-center text-center">
      <div className={`w-12 h-1.5 ${isGreen ? 'bg-green-600' : 'bg-red-600'} rounded-full mb-8`}></div>
      <div className="flex items-center gap-4 mb-4">
        <span className={`p-4 ${isGreen ? 'bg-green-600/10 text-green-600' : 'bg-red-600/10 text-red-600'} rounded-full`}>{icon}</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h2>
      </div>
      <p className="text-lg text-[#121212]/60 font-medium max-w-2xl">{subtitle}</p>
    </div>
  </ScrollReveal>
);

const navLinks = ['home', 'projects', 'artworks', 'certifications', 'about'];

const ThemeLayout = ({ isGreen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const voxelTransitionRef = useRef(null);
  const [showOpening, setShowOpening] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(isGreen);

  const currentPage = useMemo(() => {
    const path = location.pathname.split('/').pop();
    return navLinks.includes(path) ? path : 'home';
  }, [location.pathname]);

  const setActiveTab = (tab) => {
    const basePath = isGreen ? '/adrian' : '/roeljr';
    navigate(`${basePath}/${tab}`);
  };

  useEffect(() => {
    document.title = isGreen ? 'Adrian Keith | Portfolio' : 'Roel Jr. | Portfolio';
  }, [isGreen]);

  const getThemeColor = () => isGreen ? 'text-green-600' : 'text-red-600';
  const getThemeBg = () => isGreen ? 'bg-green-600' : 'bg-red-600';
  const getThemeSelection = () => isGreen ? 'selection:bg-green-600' : 'selection:bg-red-600';

  const handleThemeSwitch = async (e) => {
    const nextState = !isSwitchOn;
    setIsSwitchOn(nextState);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (voxelTransitionRef.current) {
      await voxelTransitionRef.current.triggerTransition(e.clientX, e.clientY);
    }
    const newPath = nextState ? '/adrian' : '/roeljr';
    navigate(`${newPath}/${currentPage}`);
  };

  const PROJECTS_DATA = isGreen ? PROJECTS_GREEN : PROJECTS;
  const CERTS_DATA = isGreen ? CERTS_GREEN : CERTS;
  const ARTWORKS_DATA = isGreen ? ARTWORKS_GREEN : ARTWORKS;
  const EDUCATION_DATA = isGreen ? EDUCATION_GREEN : (EDUCATION_RED || null);
  const ORGS_DATA = isGreen ? ORGS_GREEN : (ORGS_RED || null);

  return (
    <SmoothScroll>
      <div className={`min-h-screen bg-white text-[#121212] flex flex-col relative overflow-x-hidden ${getThemeSelection()} selection:text-white transition-colors duration-1000 ${isGreen ? 'theme-green' : ''}`}>
        <style>{`
          * { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 0px; }
          .animate-float { animation: float 8s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(3deg) scale(1.02); } }
          @keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0px); } }
        `}</style>

        {showOpening && <OpeningSequence onComplete={() => setShowOpening(false)} isGreen={isGreen} />}
        <VoxelTransition ref={voxelTransitionRef} />

        <div className={`transition-all duration-700 delay-200 ${showOpening ? 'opacity-0 scale-95 h-screen overflow-hidden' : 'opacity-100 scale-100'}`}>
          <Background />

          <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <motion.div className="text-3xl font-black tracking-tighter cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => setActiveTab('home')}>
                {isGreen ? 'ADRIAN' : 'ROEL'} <span className={getThemeColor()}>{isGreen ? 'KEITH' : 'JR.'}</span>
              </motion.div>
              
              <div className="hidden md:flex space-x-2 items-center text-sm font-bold tracking-wide bg-[#121212]/5 p-1.5 rounded-full">
                {navLinks.map((link) => (
                  <Magnetic key={link} strength={0.2}>
                    <button onClick={() => setActiveTab(link)} className={`relative px-6 py-2.5 rounded-full transition-colors duration-300 ${currentPage === link ? 'text-white' : 'text-[#121212]/60 hover:text-[#121212]'}`}>
                      <span className="relative z-10 uppercase">{link}</span>
                      {currentPage === link && (
                        <motion.div layoutId="nav-pill" className={`absolute inset-0 ${getThemeBg()} rounded-full shadow-lg ${isGreen ? 'shadow-green-600/20' : 'shadow-red-600/20'}`} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                      )}
                    </button>
                  </Magnetic>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4">
                <Magnetic strength={0.3}>
                  <a href={isGreen ? "https://github.com/condeadriankeith" : "https://github.com/roellumauagjr"} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 bg-[#121212] text-white rounded-full hover:${getThemeBg()} transition-all duration-300 shadow-lg`}>
                    <Github size={16} /> GITHUB
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <button onClick={handleThemeSwitch} className={`relative w-24 h-[44px] rounded-full transition-all duration-500 flex items-center p-1.5 shadow-lg ${isSwitchOn ? 'bg-[#22c55e]' : 'bg-[#dc2626]'}`}>
                    <motion.div animate={{ x: isSwitchOn ? 52 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-8 h-8 bg-white rounded-full shadow-md" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </nav>

          <main className="flex-grow relative z-10 pt-32">
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <HomeView key="home" setActiveTab={setActiveTab} PROJECTS={PROJECTS_DATA} ARTWORKS={ARTWORKS_DATA} CERTS={CERTS_DATA} ProjectCard={(props) => <ProjectCard {...props} isGreen={isGreen} />} CertCard={(props) => <CertCard {...props} isGreen={isGreen} />} isSwitchOn={isGreen} />
              )}
              {currentPage === 'projects' && (
                <ProjectsView key="projects" PROJECTS={PROJECTS_DATA} SectionHeader={(props) => <SectionHeader {...props} isGreen={isGreen} />} ProjectCard={(props) => <ProjectCard {...props} isGreen={isGreen} />} isSwitchOn={isGreen} />
              )}
              {currentPage === 'about' && (
                <AboutView key="about" SectionHeader={(props) => <SectionHeader {...props} isGreen={isGreen} />} GlassCard={GlassCard} isSwitchOn={isGreen} EDUCATION={EDUCATION_DATA} ORGS={ORGS_DATA} />
              )}
              {currentPage === 'artworks' && (
                <ArtworksView key="artworks" ARTWORKS={ARTWORKS_DATA} SectionHeader={(props) => <SectionHeader {...props} isGreen={isGreen} />} isSwitchOn={isGreen} />
              )}
              {currentPage === 'certifications' && (
                <div key="certifications" style={{ animation: 'revealUp 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98) both' }} className="max-w-5xl mx-auto px-6 py-10">
                  <SectionHeader title="Certifications." subtitle="Professional certifications and credentials." icon={<Award size={32} />} isGreen={isGreen} />
                  <div className="space-y-6 mt-16">
                    {CERTS_DATA.map((cert, i) => <CertCard key={i} cert={cert} index={i} isGreen={isGreen} />)}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </main>

          <footer className="z-10 bg-white/50 backdrop-blur-2xl border-t border-white/60 py-10 mt-20 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-2xl font-black tracking-tighter">{isGreen ? 'ADRIAN' : 'ROEL'} <span className={getThemeColor()}>{isGreen ? 'KEITH' : 'JR.'}</span></div>
              <p className="text-[#121212]/50 text-sm font-bold tracking-wide uppercase">© {new Date().getFullYear()} Crafted with intent.</p>
              <div className="flex space-x-6">
                <a href={isGreen ? "https://github.com/condeadriankeith" : "https://github.com/roellumauagjr"} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#121212]/5 rounded-full hover:bg-[#121212] hover:text-white transition-all"><Github size={20} /></a>
                <a href={`mailto:${isGreen ? 'condeadriankeith@gmail.com' : 'roellumauagjr@gmail.com'}`} className={`p-3 ${isGreen ? 'bg-green-600/10 text-green-600 hover:bg-green-600' : 'bg-red-600/10 text-red-600 hover:bg-red-600'} rounded-full hover:text-white transition-all`}><Mail size={20} /></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SmoothScroll>
  );
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      navigate('/roeljr/home', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/roeljr/:page?" element={<ThemeLayout isGreen={false} />} />
      <Route path="/adrian/:page?" element={<ThemeLayout isGreen={true} />} />
    </Routes>
  );
};

export default App;