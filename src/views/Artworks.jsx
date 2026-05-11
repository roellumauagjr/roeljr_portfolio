import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, LayoutTemplate, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './Home';

const ArtworkCard = ({ art, i, isSwitchOn, activeCategory }) => {
  const Icon = art.icon;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = art.images && art.images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % art.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + art.images.length) % art.images.length);
  };

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
        className={`group relative flex flex-col rounded-[1.5rem] overflow-hidden border-2 ${isSwitchOn ? 'border-green-600 shadow-[0_8px_30px_rgba(34,197,94,0.15)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.3)]' : 'border-red-600 shadow-[0_8px_30px_rgba(220,38,38,0.15)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)]'} hover:-translate-y-2 transition-all duration-500 cursor-pointer break-inside-avoid mb-8`}
      >
        {/* Image area */}
        <div className="relative w-full overflow-hidden bg-[#121212]/10 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={hasMultipleImages ? art.images[currentImageIndex] : art.image}
              src={hasMultipleImages ? art.images[currentImageIndex] : art.image} 
              alt={art.title} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </AnimatePresence>

          {hasMultipleImages && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {art.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? (isSwitchOn ? 'bg-green-500 w-3' : 'bg-red-500 w-3') : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          {!art.image && !art.images && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
              <Icon size={48} className="text-white/20" />
            </div>
          )}
        </div>

        {/* Theme footer bar */}
        <div className={`${isSwitchOn ? 'bg-green-600' : 'bg-red-600'} px-5 py-3.5 flex items-center justify-between gap-3 flex-grow`}>
          <div className="flex flex-col">
            <h3 className="text-white font-black text-[15px] uppercase tracking-wide leading-tight">{art.title}</h3>
            <p className="text-white/80 font-bold text-[11px] uppercase tracking-widest mt-0.5">{art.type || activeCategory}</p>
          </div>
          <div className="flex-shrink-0 text-white/90 group-hover:text-white transition-colors duration-300 ml-2">
            <Icon size={28} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ArtworksView = ({ ARTWORKS, SectionHeader, isSwitchOn }) => {
  const categories = isSwitchOn ? ['GRAPHIC DESIGN'] : ['PHOTOS', 'VIDEOS', 'GRAPHIC DESIGN'];
  const [activeCategory, setActiveCategory] = useState(isSwitchOn ? 'GRAPHIC DESIGN' : 'PHOTOS');

  useEffect(() => {
    setActiveCategory(isSwitchOn ? 'GRAPHIC DESIGN' : 'PHOTOS');
  }, [isSwitchOn]);

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
        icon={isSwitchOn ? <LayoutTemplate size={32} /> : <Camera size={32} />} 
        isSwitchOn={isSwitchOn}
      />

      {/* Category Tabs */}
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

      {/* Gallery Grid - Masonry Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        <AnimatePresence mode="wait">
          {ARTWORKS[activeCategory].map((art, i) => (
            <ArtworkCard 
              key={`${activeCategory}-${i}`} 
              art={art} 
              i={i} 
              isSwitchOn={isSwitchOn} 
              activeCategory={activeCategory} 
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ArtworksView;
