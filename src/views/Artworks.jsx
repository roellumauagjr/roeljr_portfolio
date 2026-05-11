import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, LayoutTemplate } from 'lucide-react';
import { ScrollReveal } from './Home';

const ArtworksView = ({ ARTWORKS, SectionHeader, isSwitchOn }) => {
  const categories = ['PHOTOS', 'VIDEOS', 'GRAPHIC DESIGN'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const getIcon = (cat) => {
    switch (cat) {
      case 'PHOTOS': return <Camera size={20} />;
      case 'VIDEOS': return <Video size={20} />;
      case 'GRAPHIC DESIGN': return <LayoutTemplate size={20} />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <SectionHeader 
        title="Creative Gallery." 
        subtitle="A collection of my visual explorations across photography, cinematography, and digital design." 
        icon={<Camera size={32} />} 
        isSwitchOn={isSwitchOn}
      />

      {/* Category Tabs */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-black tracking-widest text-xs uppercase transition-all duration-500 shadow-sm ${
                activeCategory === cat 
                  ? (isSwitchOn ? 'bg-green-600 text-white shadow-lg shadow-green-600/20 translate-y-[-2px]' : 'bg-red-600 text-white shadow-lg shadow-red-600/20 translate-y-[-2px]') 
                  : 'bg-white/60 backdrop-blur-md text-[#121212]/60 hover:text-[#121212] border border-white/80'
              }`}
            >
              {getIcon(cat)}
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {ARTWORKS[activeCategory].map((art, i) => {
            const Icon = art.icon;
            return (
              <motion.div
                key={`${activeCategory}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
                      <p className="text-white/80 font-bold text-[11px] uppercase tracking-widest mt-0.5">{activeCategory}</p>
                    </div>
                    <div className="flex-shrink-0 text-white/90 group-hover:text-white transition-colors duration-300 ml-2">
                      <Icon size={28} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ArtworksView;
