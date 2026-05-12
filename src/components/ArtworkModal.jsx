import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArtworkModal = ({ art, isOpen, onClose, isSwitchOn, activeCategory, id }) => {
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setModalImageIndex(0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!art) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      data-lenis-prevent
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
      />
      
      <motion.div
        layoutId={`artwork-frame-${activeCategory?.replace(/\s+/g, '-')}-${id.split('-').pop()}`}
        transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className="relative w-auto h-auto max-w-full max-h-full flex items-center justify-center z-[110] will-change-[transform,opacity]"
      >
        <motion.div 
          initial={{ borderRadius: '2rem' }}
          animate={{ borderRadius: '2.5rem' }}
          className="relative group/modal overflow-hidden bg-[#121212] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-4 rounded-full bg-black/20 backdrop-blur-md text-white/50 hover:text-white hover:bg-black/40 transition-all z-50 border border-white/10"
          >
            <ChevronRight size={24} className="rotate-[-45deg]" />
          </button>

          <div className="relative flex items-center justify-center bg-[#121212] min-h-[400px] min-w-[300px] w-full h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={art.images ? art.images[modalImageIndex] : (art.image || 'empty')}
                src={art.images ? art.images[modalImageIndex] : art.image}
                alt={art.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.05,
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
                decoding="async"
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain block [backface-visibility:hidden] [transform:translateZ(0)]"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {art.images && art.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setModalImageIndex((prev) => (prev - 1 + art.images.length) % art.images.length); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/60 transition-all z-30 opacity-0 group-hover/modal:opacity-100 border border-white/10"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setModalImageIndex((prev) => (prev + 1) % art.images.length); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-black/20 backdrop-blur-md text-white/40 hover:text-white hover:bg-black/60 transition-all z-30 opacity-0 group-hover/modal:opacity-100 border border-white/10"
                >
                  <ChevronRight size={28} />
                </button>
              </motion.div>
            )}

            {/* INFO OVERLAY (TOP LEFT) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
              className="absolute top-8 left-8 z-40 max-w-sm pointer-events-none"
            >
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className={`inline-block px-3 py-1 ${isSwitchOn ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'} rounded-full text-[9px] font-black tracking-[0.2em] uppercase mb-2 border border-white/5`}>
                  {art.type || art.label || activeCategory}
                </div>
                <h2 className="text-white text-2xl font-black tracking-tight uppercase leading-none drop-shadow-lg">
                  {art.title}
                </h2>
              </div>
            </motion.div>

            {/* ACTIONS OVERLAY (BOTTOM CENTER) */}
            {(art.link || art.links) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-full flex flex-col items-center gap-4 px-8"
              >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-2 max-w-[90vw] md:max-w-md">
                  {art.links ? (
                    <div className="flex items-center gap-1.5 p-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory max-w-full">
                      {art.links.map((link, idx) => {
                        const isSelected = modalImageIndex === idx;
                        return (
                          <button
                            key={idx}
                            ref={(el) => {
                              if (isSelected && el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalImageIndex(idx);
                            }}
                            className={`px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 border snap-center flex-shrink-0 ${
                              isSelected 
                              ? (isSwitchOn ? 'bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]')
                              : 'bg-black/20 border-white/10 text-white/50 hover:text-white hover:bg-black/40'
                            }`}
                          >
                            {idx + 1}/{art.links.length}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(art.link, '_blank'); }}
                      className={`px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500 ${isSwitchOn ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-600/20' : 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20'}`}
                    >
                      VIEW SOURCE <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ArtworkModal;
