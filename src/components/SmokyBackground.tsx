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
      
      const speedX = (Math.random() - 0.5) * 0.3; // Reduced speed
      const speedY = forceLowerHalf 
        ? -Math.random() * 0.1 // Slower upward movement for bottom particles
        : (Math.random() - 0.5) * 0.2;
      
      const opacity = Math.random() * 0.03; // Reduced opacity
      const growthFactor = 0.002 + Math.random() * 0.005; // Slower pulsing
      
      element.style.width = `${baseSize}px`;
      element.style.height = `${baseSize}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity.toString();
      
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
    
    // Create fewer particles
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push(createMistParticle());
    }
    
    // Add more particles for the lower half
    for (let i = 0; i < 5; i++) {
      particlesRef.current.push(createMistParticle(true));
    }
    
    const animateMist = () => {
      particlesRef.current.forEach(particle => {
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
      particlesRef.current.forEach(particle => {
        container.removeChild(particle.element);
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