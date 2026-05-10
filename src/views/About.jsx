import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Users, Code, Camera, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './Home';
import TiltCard from '../components/animation/TiltCard';
import TextReveal from '../components/animation/TextReveal';
import Magnetic from '../components/animation/Magnetic';

const AboutView = ({ SectionHeader, GlassCard, isSwitchOn }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
    className="max-w-6xl mx-auto px-6 py-10"
  >
    <SectionHeader title="About Me." subtitle="A blend of logic, leadership, and creativity." icon={<User size={32} />} />

    <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center lg:items-start mt-16">
      <ScrollReveal className="w-full lg:w-1/3 relative group">
        <TiltCard>
          <div className="absolute inset-0 bg-red-600/20 translate-x-4 translate-y-4 rounded-[3rem] blur-2xl group-hover:bg-red-600/30 transition-all duration-700 z-0 animate-float"></div>
          <div className="relative aspect-square md:aspect-[4/5] bg-white/80 backdrop-blur-md border-8 border-white/80 shadow-xl rounded-[3rem] overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              src={isSwitchOn ? "ADRIAN ID PICTURE.png" : "ROEL ID PICTURE.png"} 
              alt="Roel Jr." 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </TiltCard>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="w-full lg:w-2/3">
        <TiltCard>
          <GlassCard className="p-8 md:p-12 h-full hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)] transition-all duration-700">
            <h3 className="text-3xl font-black mb-6">
              <TextReveal text="The Journey" delay={0.2} />
            </h3>
            <p className="text-lg text-[#121212]/70 leading-relaxed font-medium mb-6">
              I am an undergraduate Computer Science student focusing on Game Development. But my curiosity doesn't stop at the code editor. My journey in tech is heavily influenced by my background in student leadership and campus journalism.
            </p>
            <p className="text-lg text-[#121212]/70 leading-relaxed font-medium">
              This means I don't just understand how to build systems; I understand how to communicate ideas, manage teams, and design experiences that resonate with actual users.
            </p>
          </GlassCard>
        </TiltCard>
      </ScrollReveal>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <ScrollReveal delay={0.1}>
        <TiltCard>
          <GlassCard className="p-8 md:p-10 h-full hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)] transition-all duration-700">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="p-3 bg-red-600/10 rounded-full text-red-600"><GraduationCap size={24} /></span>
              <TextReveal text="Education" delay={0.3} />
            </h3>
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 10 }}
                className="relative pl-6 border-l-2 border-[#121212]/10 hover:border-red-600 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-4 border-red-600 rounded-full" />
                <h4 className="text-lg font-bold">BS Computer Science</h4>
                <p className="text-[#121212]/60 font-medium">Specialization in Game Development</p>
                <p className="text-sm font-bold text-red-600 mt-1 uppercase tracking-wider">Expected 2027</p>
              </motion.div>
            </div>
          </GlassCard>
        </TiltCard>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <TiltCard>
          <GlassCard className="p-8 md:p-10 h-full hover:shadow-[0_40px_80px_rgba(220,38,38,0.1)] transition-all duration-700">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="p-3 bg-red-600/10 rounded-full text-red-600"><Users size={24} /></span>
              <TextReveal text="Organizations" delay={0.4} />
            </h3>
            <ul className="space-y-4 font-bold text-[#121212]/80">
              {[
                { role: 'Student Leader', org: 'University Student Council' },
                { role: 'Staff Writer / Photojournalist', org: 'Campus Official Publication' },
                { role: 'Active Member', org: 'Game Development Society' }
              ].map((item, i) => (
                <Magnetic key={i} strength={0.05}>
                  <li className="flex flex-col bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/80 hover:border-red-600 hover:bg-white transition-all duration-300 shadow-sm cursor-pointer group">
                    <span className="text-red-600 text-xs tracking-widest uppercase mb-1 group-hover:scale-105 origin-left transition-transform">{item.role}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.org}</span>
                  </li>
                </Magnetic>
              ))}
            </ul>
          </GlassCard>
        </TiltCard>
      </ScrollReveal>
    </div>
  </motion.div>
);

export default AboutView;
