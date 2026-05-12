import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, User, Code, Camera, Award, Video, LayoutTemplate } from 'lucide-react';
import TiltCard from '../components/animation/TiltCard';
import TextReveal from '../components/animation/TextReveal';
import Magnetic from '../components/animation/Magnetic';


const HomeView = ({ setActiveTab, PROJECTS, ARTWORKS, CERTS, ProjectCard, ArtworksView, CertCard, isSwitchOn }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="space-y-32 pb-20"
    >
      {/* 1. HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div layout layoutId="hero-content-container" className="flex-1 text-center md:text-left z-10 flex flex-col items-center md:items-start">
            <motion.div layout layoutId="hero-badge" className={`inline-flex items-center gap-2 px-5 py-2.5 ${isSwitchOn ? 'bg-green-600/10 border-green-600/20 text-green-600' : 'bg-red-600/10 border-red-600/20 text-red-600'} text-sm font-bold tracking-widest uppercase rounded-full mb-6`}>
              <motion.span layout layoutId="hero-badge-dot" className={`w-2.5 h-2.5 ${isSwitchOn ? 'bg-green-600' : 'bg-red-600'} rounded-full animate-pulse`} />
              Available for Internship
            </motion.div>
            <motion.h1 layout layoutId="hero-title" className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[1.05] mb-6">
              <TextReveal text={isSwitchOn ? "Designing Web" : "Bridging Code"} />
              <span className={isSwitchOn ? 'text-green-600' : 'text-red-600'}><TextReveal text={isSwitchOn ? "and Experiences." : "and Canvas."} delay={0.3} /></span>
            </motion.h1>
            <TextReveal 
              text={isSwitchOn ? "I am a creative and technically driven CS undergraduate specializing in web development and UI/UX design, crafting seamless applications from wireframe to deployment." : "I'm a multidisciplinary creative technologist specializing in front-end development, UI/UX design, and digital media."}
              className="text-lg md:text-xl text-[#121212]/60 max-w-lg leading-relaxed font-medium mx-auto md:mx-0 mb-8"
              delay={0.5}
            />
            <motion.div layout layoutId="hero-actions" className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start w-full">
              <Magnetic strength={0.3}>
                <motion.button 
                  layout
                  layoutId="hero-btn-work"
                  onClick={() => setActiveTab('projects')}
                  className={`px-8 py-4 ${isSwitchOn ? 'bg-green-600 shadow-green-600/30 hover:shadow-green-600/50' : 'bg-red-600 shadow-red-600/30 hover:shadow-red-600/50'} text-white font-bold tracking-wide rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group`}
                >
                  VIEW MY WORK
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a 
                  layout
                  layoutId="hero-btn-resume"
                  href={isSwitchOn ? "/CONDE_RESUME.pdf" : "/LUMAUAG_RESUME.pdf"}
                  download={isSwitchOn ? "/CONDE_RESUME.pdf" : "/LUMAUAG_RESUME.pdf"}
                  className="px-8 py-4 bg-white/60 backdrop-blur-md text-[#121212] border border-white font-bold tracking-wide rounded-full hover:bg-[#121212] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                >
                  RESUME <Download size={18} />
                </motion.a>
              </Magnetic>
            </motion.div>
          </motion.div>

          <TiltCard className="flex-1 w-full max-w-md relative group">
            <motion.div layout layoutId="hero-image-glow" className={`absolute inset-0 ${isSwitchOn ? 'bg-green-600/20 group-hover:bg-green-600/30' : 'bg-red-600/20 group-hover:bg-red-600/30'} translate-x-6 translate-y-6 rounded-full blur-2xl transition-all duration-700 z-0 animate-float`}></motion.div>
            <motion.div layout layoutId="hero-image-container" className="relative aspect-square md:aspect-[4/5] bg-white/80 backdrop-blur-xl border-8 border-white shadow-2xl rounded-[3rem] md:rounded-[4rem] overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
              <motion.img 
                layout
                layoutId="hero-image-source"
                src={isSwitchOn ? "/ADRIAN ID PICTURE.png" : "/ROEL ID PICTURE.png"} 
                alt={isSwitchOn ? "Adrian Keith Conde" : "Roel Jr Lumauag"} 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="hidden absolute inset-0 bg-[#121212]/5 flex-col items-center justify-center text-[#121212]/40">
                 <User size={80} className="mb-4 opacity-50" />
                 <p className="font-bold tracking-widest uppercase">ID PICTURE</p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </motion.div>

      {/* 2. PREVIEW: PROJECTS */}
      {PROJECTS.length > 0 && (
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6"
          >
            <div>
              <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                <span className={`p-2 ${isSwitchOn ? 'bg-green-600/10 text-green-600' : 'bg-red-600/10 text-red-600'} rounded-full`}><Code size={24} /></span>
                Latest Projects
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full ${isSwitchOn ? 'text-green-600 hover:bg-green-600' : 'text-red-600 hover:bg-red-600'} font-bold hover:text-white transition-all shadow-sm hover:-translate-y-1`}
            >
              SEE ALL PROJECTS <ArrowRight size={18} />
            </button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((proj, i) => <ProjectCard key={i} proj={proj} index={i} />)}
          </div>
        </div>
      )}

      {/* 3. PREVIEW: ARTWORKS */}
      {Object.values(ARTWORKS).some(cat => cat && cat.length > 0) && (
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6"
          >
            <div>
              <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                <span className={`p-2 ${isSwitchOn ? 'bg-green-600/10 text-green-600' : 'bg-[#121212]/10 text-[#121212]'} rounded-full`}>{isSwitchOn ? <LayoutTemplate size={24} /> : <Camera size={24} />}</span>
                Latest Artworks
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('artworks')}
              className={`flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full ${isSwitchOn ? 'text-green-600 hover:bg-green-600' : 'text-[#121212] hover:bg-[#121212]'} font-bold hover:text-white transition-all shadow-sm hover:-translate-y-1`}
            >
              EXPLORE GALLERY <ArrowRight size={18} />
            </button>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(isSwitchOn 
              ? ARTWORKS['GRAPHIC DESIGN']?.slice(0, 3).map(art => ({ ...art, label: 'GRAPHIC DESIGN' }))
              : [
                  ARTWORKS.PHOTOS?.[0] && { ...ARTWORKS.PHOTOS[0], label: 'PHOTOS' },
                  ARTWORKS.VIDEOS?.[0] && { ...ARTWORKS.VIDEOS[0], label: 'VIDEOS' },
                  ARTWORKS['GRAPHIC DESIGN']?.[0] && { ...ARTWORKS['GRAPHIC DESIGN'][0], label: 'GRAPHIC DESIGN' }
                ].filter(Boolean)
            ).map((art, i) => {
              const Icon = art.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
                >
                  <div 
                    onClick={() => art.link && window.open(art.link, '_blank')}
                    className={`group relative flex flex-col rounded-[1.5rem] overflow-hidden border-2 ${isSwitchOn ? 'border-green-600 shadow-[0_8px_30px_rgba(34,197,94,0.15)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.3)]' : 'border-red-600 shadow-[0_8px_30px_rgba(220,38,38,0.15)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)]'} hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
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
  
                    {/* Theme footer bar */}
                    <div className={`${isSwitchOn ? 'bg-green-600' : 'bg-red-600'} px-5 py-3.5 flex items-center justify-between gap-3 flex-shrink-0`}>
                      <div className="flex flex-col">
                        <h3 className="text-white font-black text-[15px] uppercase tracking-wide leading-tight">{art.title}</h3>
                        <p className="text-white/80 font-bold text-[11px] uppercase tracking-widest mt-0.5">{art.label}</p>
                      </div>
                      <div className="flex-shrink-0 text-white/90 group-hover:text-white transition-colors duration-300 ml-2">
                        <Icon size={28} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. PREVIEW: CERTIFICATIONS */}
      {CERTS.length > 0 && (
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6"
          >
            <h2 className="text-3xl font-black uppercase flex items-center gap-3">
              <span className={`p-2 ${isSwitchOn ? 'bg-green-600/10 text-green-600' : 'bg-red-600/10 text-red-600'} rounded-full`}><Award size={24} /></span> 
              Certifications
            </h2>
            <button 
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-full ${isSwitchOn ? 'text-green-600 hover:bg-green-600' : 'text-red-600 hover:bg-red-600'} font-bold hover:text-white transition-all shadow-sm hover:-translate-y-1`}
            >
              VIEW ALL <ArrowRight size={18} />
            </button>
          </motion.div>
          <div className="space-y-6">
            {CERTS.slice(0, 2).map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default HomeView;
