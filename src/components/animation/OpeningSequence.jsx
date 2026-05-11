import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OpeningSequence = ({ onComplete, isGreen = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const themeColor = isGreen ? '#22c55e' : '#dc2626';
  const themeColorRGB = isGreen ? '34,197,94' : '220,38,38';
  const profileImage = isGreen ? "/ADRIAN ID PICTURE.png" : "/ROEL ID PICTURE.png";
  const name = isGreen ? "Adrian Keith" : "Roel Jr.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) setTimeout(onComplete, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const shockwaveVariants = {
    initial: { scale: 0.5, opacity: 1, borderWidth: "8px" },
    animate: (i) => ({
      scale: [0.5, 3 + i * 2, 8 + i * 3],
      opacity: [1, 0.5, 0],
      borderWidth: ["8px", "2px", "0px"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.1,
        delay: i * 0.4,
        ease: [0.16, 1, 0.3, 1]
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
            transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
          }}
          className="fixed inset-0 z-[100] bg-[#121212] flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex items-center justify-center w-64 h-64">
            <motion.div 
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 rounded-full blur-[80px] z-0"
              style={{ backgroundColor: themeColor }}
            />

            {[0, 1, 2].map((i) => (
              <motion.div
                key={`shockwave-${i}`}
                custom={i}
                variants={shockwaveVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 rounded-full z-10 mix-blend-screen"
                style={{ 
                  borderColor: themeColor,
                  boxShadow: `0 0 40px rgba(${themeColorRGB},0.8)`,
                  filter: `blur(${i}px)` 
                }}
              />
            ))}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-dashed z-20"
              style={{ borderColor: `${themeColor}4D` }}
            />

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
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 z-30 bg-[#121212]"
              style={{ 
                borderColor: `${themeColor}80`,
                boxShadow: `0 0 50px rgba(${themeColorRGB},0.5)` 
              }}
            >
              <img 
                src={profileImage} 
                alt={name} 
                className="w-full h-full object-cover object-top"
              />
              <div 
                className="absolute inset-0 mix-blend-overlay"
                style={{ backgroundColor: `${themeColor}1A` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningSequence;