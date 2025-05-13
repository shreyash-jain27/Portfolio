
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Skills list to display in typewriter effect
  const skills = [
    'AI Engineer',
    'Web Designer',
    'Robotics Engineer',
    'App Developer'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update scrolled state for navbar background
      setScrolled(scrollPosition > 50);

      // Determine which section is in view
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = window.innerHeight * 0.3;
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 50; // milliseconds per character
    const pauseDuration = 1500; // pause at full text display

    let timeout: ReturnType<typeof setTimeout>;
    
    if (isTyping) {
      // Typing effect
      if (displayText.length < skills[currentSkillIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(skills[currentSkillIndex].substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next skill
        setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentSkillIndex, skills]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-theme-dark/80 backdrop-blur-md py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-theme-light text-2xl font-bold">Shreyash Jain</div>
          <div className="text-theme-light/80 text-sm font-light h-6">
            {displayText}
            <span className="inline-block w-1 h-4 bg-white/70 ml-0.5 animate-pulse" />
          </div>
        </div>
        
        <div className="hidden md:flex space-x-2">
          {['home', 'about', 'projects', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`nav-link ${activeSection === section ? 'active-nav-link' : ''}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />}
            </button>)}
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button - simplified for now */}
          <button className="text-theme-light">Menu</button>
        </div>
      </div>
    </nav>;
};

export default Navigation;
