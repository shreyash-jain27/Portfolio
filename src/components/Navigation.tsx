import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, GraduationCap, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'achievements', label: 'Skills', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const sectionIds = navItems.map(item => item.id);
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = window.innerHeight * 0.4;
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="glass-dock">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`relative p-3 rounded-full transition-all duration-300 group ${
            activeSection === item.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
          }`}
          aria-label={item.label}
        >
          {item.icon}
          
          {/* Tooltip */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold uppercase rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {item.label}
          </span>

          {activeSection === item.id && (
            <motion.div
              layoutId="nav-active"
              className="absolute inset-0 border border-white/20 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
