import React, { useEffect, useRef } from 'react';

interface MistParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  element: HTMLDivElement;
  growthFactor: number;
  maxSize: number;
  minSize: number;
}

const SmokyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<MistParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const createMistParticle = (forceLowerHalf = false): MistParticle => {
      const element = document.createElement('div');
      element.className = 'mist-particle';
      
      const minSize = 50;
      const baseSize = Math.random() * 100 + minSize;
      const maxSize = baseSize * 1.5;
      
      const x = Math.random() * window.innerWidth;
      const y = forceLowerHalf 
        ? window.innerHeight * 0.5 + Math.random() * window.innerHeight * 0.5 
        : Math.random() * window.innerHeight;
      
      const speedX = (Math.random() - 0.5) * 0.3;
      const speedY = forceLowerHalf 
        ? -Math.random() * 0.1 
        : (Math.random() - 0.5) * 0.2;
      
      const opacity = Math.random() * 0.03;
      const growthFactor = 0.001 + Math.random() * 0.003;

      // New harmonic colors
      const isIndigo = Math.random() > 0.5;
      const color = isIndigo 
        ? 'rgba(99, 102, 241, 0.1)' // Soft Indigo
        : 'rgba(6, 182, 212, 0.1)'; // Soft Cyan
      
      element.style.width = `${baseSize}px`;
      element.style.height = `${baseSize}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity.toString();
      element.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      element.style.filter = 'blur(40px)';
      
      container.appendChild(element);
      
      return { 
        x, 
        y, 
        size: baseSize, 
        speedX, 
        speedY, 
        opacity, 
        element,
        growthFactor,
        maxSize,
        minSize
      };
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Create fewer but larger particles
    for (let i = 0; i < 12; i++) {
      particlesRef.current.push(createMistParticle());
    }
    
    const animateMist = () => {
      particlesRef.current.forEach(particle => {
        // Move towards/away from mouse proximity
        const dx = particle.x - mouseX.current;
        const dy = particle.y - mouseY.current;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 400) {
          const force = (400 - distance) / 400;
          particle.x += (dx / distance) * force * 2;
          particle.y += (dy / distance) * force * 2;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < -particle.maxSize) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = -particle.maxSize;
        if (particle.y < -particle.maxSize) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = -particle.maxSize;
        
        particle.size += particle.growthFactor;
        
        if (particle.size >= particle.maxSize || particle.size <= particle.minSize) {
          particle.growthFactor = -particle.growthFactor;
        }
        
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        particle.element.style.width = `${particle.size}px`;
        particle.element.style.height = `${particle.size}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateMist);
    };
    
    animateMist();
    
    const handleResize = () => {
      particlesRef.current.forEach(particle => {
        if (particle.x > window.innerWidth) {
          particle.x = Math.random() * window.innerWidth;
        }
        if (particle.y > window.innerHeight) {
          particle.y = Math.random() * window.innerHeight;
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      particlesRef.current.forEach(particle => {
        if (container.contains(particle.element)) {
          container.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, []);
  
  return (
    <>
      <div ref={containerRef} className="smoky-bg" />
      <div className="bottom-mist-overlay" />
    </>
  );
};

export default SmokyBackground;