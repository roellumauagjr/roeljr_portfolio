import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, LayoutTemplate, ChevronLeft, ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: i * 0.03
    }
  }),
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

const ArtworkCard = ({ art, i, isSwitchOn, activeCategory, onOpenModal }) => {
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
      key={`${art.title}-${activeCategory}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={i}
      className="break-inside-avoid mb-8 w-full"
    >
      <motion.div 
        onClick={() => {
          onOpenModal(art);
        }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.98 }}
        layoutId={`artwork-frame-${activeCategory.replace(/\s+/g, '-')}-${i}`}
        className={`group relative flex flex-col rounded-[2rem] overflow-hidden border-2 ${isSwitchOn ? 'border-green-600/20 shadow-[0_8px_30px_rgba(34,197,94,0.1)] hover:border-green-600 hover:shadow-[0_30px_60px_rgba(34,197,94,0.25)]' : 'border-red-600/20 shadow-[0_8px_30px_rgba(220,38,38,0.1)] hover:border-red-600 hover:shadow-[0_30px_60px_rgba(220,38,38,0.25)]'} cursor-pointer bg-[#121212]`}
      >
        {/* Image area */}
        <div className="relative w-full overflow-hidden bg-[#121212]/5 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={hasMultipleImages ? art.images[currentImageIndex] : art.image}
              src={hasMultipleImages ? art.images[currentImageIndex] : art.image} 
              alt={art.title} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              decoding="async"
              className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
            />
          </AnimatePresence>

          {hasMultipleImages && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 z-10"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {art.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? (isSwitchOn ? 'bg-green-500 w-6' : 'bg-red-500 w-6') : 'bg-white/30 w-1.5'}`}
                  />
                ))}
              </div>
            </>
          )}

          {!art.image && !art.images && (
            <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
              <Icon size={48} className="text-white/10" />
            </div>
          )}
        </div>

        {/* Theme footer bar */}
        <div className={`${isSwitchOn ? 'bg-green-600' : 'bg-red-600'} px-6 py-5 flex items-center justify-between gap-4 transition-colors duration-700`}>
          <div className="flex flex-col">
            <h3 className="text-white font-black text-lg uppercase tracking-tight leading-none">{art.title}</h3>
            <p className="text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mt-1.5">{art.type || activeCategory}</p>
          </div>
          <div className="flex-shrink-0 text-white/40 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
            <Icon size={32} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArtworksView = ({ ARTWORKS, SectionHeader, isSwitchOn, onOpenModal }) => {
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

  // Memoize columns to prevent re-filtering during animations
  const columns = React.useMemo(() => {
    const items = ARTWORKS[activeCategory] || [];
    return [
      items.filter((_, i) => i % 3 === 0),
      items.filter((_, i) => i % 3 === 1),
      items.filter((_, i) => i % 3 === 2)
    ];
  }, [activeCategory, ARTWORKS]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <SectionHeader 
        title="Creative Gallery." 
        subtitle="A collection of my visual explorations across photography, cinematography, and digital design." 
        icon={isSwitchOn ? <LayoutTemplate size={32} /> : <Camera size={32} />} 
        isGreen={isSwitchOn}
      />

      {/* Category Tabs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-16 mt-8"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black tracking-widest text-[10px] uppercase transition-all duration-500 shadow-sm ${
              activeCategory === cat 
                ? (isSwitchOn ? 'bg-green-600 text-white shadow-lg shadow-green-600/30 -translate-y-1' : 'bg-red-600 text-white shadow-lg shadow-red-600/30 -translate-y-1') 
                : 'bg-white/60 backdrop-blur-md text-[#121212]/40 hover:text-[#121212] border border-white hover:bg-white transition-all'
            }`}
          >
            {getIcon(cat)}
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid - Optimized Masonry */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <AnimatePresence mode="popLayout">
          {columns.map((columnItems, colIdx) => (
            <motion.div 
              key={`${activeCategory}-${colIdx}-${isSwitchOn}`}
              className="flex-1 flex flex-col gap-8 w-full"
            >
              {columnItems.map((art) => {
                // Find original index for layoutId consistency
                const originalIndex = (ARTWORKS[activeCategory] || []).indexOf(art);
                return (
                  <ArtworkCard 
                    key={`${activeCategory}-${art.title}`} 
                    art={art} 
                    i={originalIndex} 
                    isSwitchOn={isSwitchOn} 
                    activeCategory={activeCategory} 
                    onOpenModal={(artwork) => {
                      onOpenModal(artwork, originalIndex, activeCategory);
                    }}
                  />
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ArtworksView;
