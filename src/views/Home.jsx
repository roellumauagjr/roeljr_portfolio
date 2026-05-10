import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, User, Code, Camera, Award } from 'lucide-react';
import TiltCard from '../components/animation/TiltCard';
import TextReveal from '../components/animation/TextReveal';
import Magnetic from '../components/animation/Magnetic';

// Reusable ScrollReveal — uses CSS animation to avoid 3D stacking context conflicts
export const ScrollReveal = ({ children, delay = 0 }) => (
  <div
    style={{
      animation: `revealUp 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}s both`,
    }}
  >
    {children}
  </div>
);

const HomeView = ({ setActiveTab, PROJECTS, ARTWORKS, CERTS, ProjectCard, ArtworksView, CertCard, isSwitchOn }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="space-y-32 pb-20"
    >
      {/* 1. HERO SECTION */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div layout className="flex-1 text-center md:text-left z-10 flex flex-col items-center md:items-start">
            <motion.div layout className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600/10 border border-red-600/20 text-red-600 text-sm font-bold tracking-widest uppercase rounded-full mb-6">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              Available for Internship
            </motion.div>
            <motion.h1 layout className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[1.05] mb-6">
              <TextReveal text="Bridging Code" />
              <span className="text-red-600"><TextReveal text="and Canvas." delay={0.3} /></span>
            </motion.h1>
            <TextReveal 
              text="I'm a multidisciplinary creative technologist specializing in front-end development, UI/UX design, and digital media." 
              className="text-lg md:text-xl text-[#121212]/60 max-w-lg leading-relaxed font-medium mx-auto md:mx-0 mb-8"
              delay={0.5}
            />
            <motion.div layout className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start w-full">
              <Magnetic strength={0.3}>
                <motion.button 
                  layout
                  onClick={() => setActiveTab('PROJECTS')}
                  className="px-8 py-4 bg-red-600 text-white font-bold tracking-wide rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  VIEW MY WORK
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a 
                  layout
                  href="LUMAUAG_RESUME.pdf"
                  download="LUMAUAG_RESUME.pdf"
                  className="px-8 py-4 bg-white/60 backdrop-blur-md text-[#121212] border border-white font-bold tracking-wide rounded-full hover:bg-[#121212] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                >
                  RESUME <Download size={18} />
                </motion.a>
              </Magnetic>
            </motion.div>
          </motion.div>

          <TiltCard className="flex-1 w-full max-w-md relative group">
            <div className="absolute inset-0 bg-red-600/20 translate-x-6 translate-y-6 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all duration-700 z-0 animate-float"></div>
            <div className="relative aspect-square md:aspect-[4/5] bg-white/80 backdrop-blur-xl border-8 border-white shadow-2xl rounded-[3rem] md:rounded-[4rem] overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
              <img 
                src={isSwitchOn ? "ADRIAN ID PICTURE.png" : "ROEL ID PICTURE.png"} 
                alt="Roel Jr." 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="hidden absolute inset-0 bg-[#121212]/5 flex-col items-center justify-center text-[#121212]/40">
                 <User size={80} className="mb-4 opacity-50" />
                 <p className="font-bold tracking-widest uppercase">ID PICTURE</p>
              </div>
            </div>
          </TiltCard>
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
          {[
            { ...ARTWORKS.PHOTOS[0], label: 'PHOTOS' },
            { ...ARTWORKS.VIDEOS[0], label: 'VIDEOS' },
            { ...ARTWORKS['GRAPHIC DESIGN'][0], label: 'GRAPHIC DESIGN' }
          ].map((art, i) => {
            const Icon = art.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  onClick={() => art.link && window.open(art.link, '_blank')}
                  className="group relative flex flex-col rounded-[1.5rem] overflow-hidden border-2 border-red-600 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-[0_8px_30px_rgba(220,38,38,0.15)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
                >
                  {/* Image area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#121212]/10">
                    {art.image ? (
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
                        <Icon size={48} className="text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Red footer bar */}
                  <div className="bg-red-600 px-5 py-3.5 flex items-center justify-between gap-3 flex-shrink-0">
                    <div className="flex flex-col">
                      <h3 className="text-white font-black text-[15px] uppercase tracking-wide leading-tight">{art.title}</h3>
                      <p className="text-white/80 font-bold text-[11px] uppercase tracking-widest mt-0.5">{art.label}</p>
                    </div>
                    <div className="flex-shrink-0 text-white/90 group-hover:text-white transition-colors duration-300 ml-2">
                      <Icon size={28} />
                    </div>
                  </div>
                </div>
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

    </motion.div>
  );
};

export default HomeView;
