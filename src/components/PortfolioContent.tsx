import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CursorFollow } from "@/components/animate-ui/components/animate/cursor";
import { 
  ArrowRight, 
  User, 
  Brain, 
  Palette, 
  Code, 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  Globe,
  Cpu,
  Star,
  Award,
  ExternalLink,
  Smartphone,
  Layout,
  Layers,
  Search,
  CheckCircle2,
  X,
  Database,
  Box
} from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  isLarge?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, image, isLarge, onClick }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    onClick={onClick}
    className={`glass-card overflow-hidden group cursor-pointer ${isLarge ? 'md:col-span-2' : ''}`}
  >
    <div className="aspect-video relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full translate-y-4 group-hover:translate-y-0 transition-transform">
          View Project
        </span>
      </div>
    </div>
    <div className="p-8">
      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 mb-2 block">{category}</span>
      <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4">{title}</h3>
      <p className="text-white/50 text-sm line-clamp-2">{description}</p>
    </div>
  </motion.div>
);

interface ProjectData {
  title: string;
  category: string;
  description: string;
  image: string;
  isLarge?: boolean;
  githubUrl?: string;
  demoUrl?: string;
}

const PortfolioContent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{ type: string; data: ProjectData } | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [0.4, 0]);

  const skills = [
    { name: 'React', icon: <Code className="w-6 h-6" /> },
    { name: 'Node.js', icon: <Cpu className="w-6 h-6" /> },
    { name: 'Redis', icon: <Layers className="w-6 h-6" /> },
    { name: 'AI/ML', icon: <Brain className="w-6 h-6" /> },
    { name: 'MongoDB', icon: <Database className="w-6 h-6" /> },
    { name: 'Docker', icon: <Box className="w-6 h-6" /> },
  ];

  const projects = [
    {
      title: "MicroServices",
      category: "Backend Architecture",
      description: "A production-grade microservices ecosystem featuring modular architecture, JWT auth, API Gateway, and Redis-powered asynchronous notifications.",
      image: "/images/smart_home_visual.png",
      isLarge: true,
      githubUrl: "https://github.com/shreyash-jain27/MicroServices",
      demoUrl: "https://gateway-production-60cf.up.railway.app/"
    },
    {
      title: "HookFlow",
      category: "Infrastructure",
      description: "High-performance webhook delivery engine featuring event fan-out, exponential backoff retries, and SHA256 HMAC security for reliable scale.",
      image: "/images/ai_image_gen_visual.png",
      githubUrl: "https://github.com/shreyash-jain27/HookFlow",
      demoUrl: "https://hookflow-2zxk.onrender.com"
    },
    {
      title: "DEVFLOW",
      category: "AI Platform",
      description: "Intelligent task management platform leveraging LLMs for autonomous subtask generation, priority suggestion, and real-time collaboration.",
      image: "/images/autonomous_drone_visual.png",
      githubUrl: "https://github.com/shreyash-jain27/DEVFLOW",
      demoUrl: "https://devflow-dg8m.onrender.com"
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        {/* Hero Image Container */}
        <motion.div 
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <img 
            src="/images/hero_portrait_architect.png" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.2] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          <motion.h1 
            className="text-[12vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter uppercase mb-8"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              color: "white"
            }}
          >
            SHREYASH<br />JAIN
          </motion.h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/60 font-medium tracking-widest uppercase"
            >
              Creative Developer & Solution Architect
            </motion.p>
            
            <div className="hidden md:block w-12 h-[1px] bg-white/20"></div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-neutral-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 14}`} alt="User" className="w-full h-full object-cover grayscale opacity-50" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-white/40 uppercase tracking-tighter">Trusted by AI Agents</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16"
            onMouseEnter={() => setCursorLabel('EXPLORE')}
            onMouseLeave={() => setCursorLabel(null)}
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="magnetic-button group"
            >
              Explore Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {cursorLabel && <CursorFollow>{cursorLabel}</CursorFollow>}

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold vertical-text">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Bento Grid: About & Skills */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-left mb-20 font-black tracking-tight flex items-baseline gap-4">
            <span className="text-stroke-sm text-transparent">01</span> ABOUT / SKILLS
          </h2>

          <div className="bento-grid">
            {/* Bio Card */}
            <div className="bento-item bento-wide bento-high bg-white/[0.02]">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">The Vision</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  I architect digital worlds that blend code with creativity. My mission is to push the boundaries of what's possible in the browser.
                </p>
              </div>
              <div className="flex gap-4 pt-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">9.3</span>
                  <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Global CGPA</span>
                </div>
                <div className="w-[1px] h-12 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">200+</span>
                  <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Coffee Cups</span>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bento-item bento-wide bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5" /> Tech Ecosystem
              </h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-white/30 font-black">Backend & Infra</span>
                  <p className="text-sm font-bold">Node, Redis, Docker, BullMQ</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-white/30 font-black">Data & AI</span>
                  <p className="text-sm font-bold">MongoDB, Socket.IO, LLMs</p>
                </div>
              </div>
            </div>

            {/* Design Card */}
            <div className="bento-item bg-neutral-900 border-none shadow-none overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Palette className="w-8 h-8 opacity-20 group-hover:rotate-12 transition-transform" />
              <span className="font-black uppercase tracking-tighter text-sm mt-auto">Interface Designer</span>
            </div>

            {/* Code Card */}
            <div className="bento-item bg-white/[0.01] hover:bg-white/[0.04] transition-colors">
              <Code className="w-8 h-8 opacity-20" />
              <span className="font-black uppercase tracking-tighter text-sm mt-auto">Neural Architect</span>
            </div>

            {/* Skills Mini-Grid */}
            <div className="bento-item bento-full bg-transparent border-none p-0">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full h-full">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 flex flex-col items-center justify-center gap-4 group cursor-default"
                  >
                    <div className="text-white group-hover:scale-125 transition-transform duration-500">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/30 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="section-title text-left mb-20 font-black tracking-tight flex items-baseline gap-4">
            <span className="text-stroke-sm text-transparent">02</span> CASE STUDIES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
            onMouseEnter={() => setCursorLabel('VIEW')}
            onMouseLeave={() => setCursorLabel(null)}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                onClick={() => setActiveModal({ type: 'project', data: project })}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square md:aspect-auto h-full">
                  <img src={activeModal.data.image} alt={activeModal.data.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-12 flex flex-col justify-center relative">
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-4 block">{activeModal.data.category}</span>
                  <h2 className="text-5xl font-black text-white italic tracking-tighter mb-8 leading-none">{activeModal.data.title}</h2>
                  <p className="text-white/60 text-lg leading-relaxed mb-12">
                    {activeModal.data.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {activeModal.data.demoUrl && activeModal.data.demoUrl !== "#" && (
                      <a 
                        href={activeModal.data.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="magnetic-button group flex-1 justify-center"
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {activeModal.data.githubUrl && activeModal.data.githubUrl !== "#" && (
                      <a 
                        href={activeModal.data.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="magnetic-button group flex-1 justify-center !bg-white/5 hover:!bg-white/10 border border-white/10"
                      >
                        Source Code
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center bg-white text-black rounded-[4rem] mx-4 mb-32">
        <h2 className="text-[10vw] font-black tracking-tighter uppercase leading-none mb-12">Start a<br />Project</h2>
        <div className="flex gap-8">
          <a href="mailto:hello@shreyash.dev" className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:opacity-100 opacity-60 transition-opacity">
            <Mail className="w-6 h-6" /> hello@shreyash.dev
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioContent;
