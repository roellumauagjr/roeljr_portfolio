import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OpeningSequence = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hold the opening sequence, then animate out with a massive blast
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) setTimeout(onComplete, 800); // Faster exit animation
    }, 2000); // Trigger exit sooner (2s hold)
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Cinematic Shockwave Variants
  const shockwaveVariants = {
    initial: { scale: 0.5, opacity: 1, borderWidth: "8px" },
    animate: (i) => ({
      scale: [0.5, 3 + i * 2, 8 + i * 3],
      opacity: [1, 0.5, 0],
      borderWidth: ["8px", "2px", "0px"],
      transition: {
        duration: 2, // Sped up shockwaves
        repeat: Infinity,
        repeatDelay: 0.1,
        delay: i * 0.4,
        ease: [0.16, 1, 0.3, 1] // Custom cinematic spring-like ease
      }
    })
  };

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0, 0.8, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-sequence"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 2.5, 
            filter: "blur(20px) brightness(2)",
            transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] } // Fast zoom in exit
          }}
          className="fixed inset-0 z-[100] bg-[#121212] flex items-center justify-center overflow-hidden"
        >
          {/* Central Anchor */}
          <div className="relative flex items-center justify-center w-64 h-64">
            
            {/* Deep Ambient Glow */}
            <motion.div 
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-red-600 rounded-full blur-[80px] z-0"
            />

            {/* 3 High-Fidelity Shockwaves */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`shockwave-${i}`}
                custom={i}
                variants={shockwaveVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 rounded-full border-red-600 z-10 shadow-[0_0_40px_rgba(220,38,38,0.8)] mix-blend-screen"
                style={{ filter: `blur(${i}px)` }}
              />
            ))}

            {/* Precision Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-dashed border-red-600/30 z-20"
            />

            {/* Profile Photo - The Core */}
            <motion.div
              initial={{ scale: 0, filter: "blur(20px) brightness(2)" }}
              animate={{ scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 15,
                mass: 0.5,
                delay: 0.3
              }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-red-600/50 shadow-[0_0_50px_rgba(220,38,38,0.5)] z-30 bg-[#121212]"
            >
              <img 
                src="ROEL ID PICTURE.png" 
                alt="Roel Jr." 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningSequence;

