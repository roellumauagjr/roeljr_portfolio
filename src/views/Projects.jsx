import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { ScrollReveal } from './Home';

const ProjectsView = ({ PROJECTS, SectionHeader, ProjectCard, isSwitchOn }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -30 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="max-w-7xl mx-auto px-6 py-10"
  >
    <SectionHeader title="All Projects." subtitle="A deep dive into my technical executions, spanning front-end web apps to Unity game development." icon={<Code size={32} />} isSwitchOn={isSwitchOn} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {PROJECTS.map((proj, i) => <ProjectCard key={i} proj={proj} index={i} />)}
    </div>
  </motion.div>
);

export default ProjectsView;
