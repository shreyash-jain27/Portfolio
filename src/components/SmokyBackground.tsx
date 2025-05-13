
import React, { useEffect, useRef } from 'react';

interface MistParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  element: HTMLDivElement;
}

const SmokyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<MistParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const createMistParticle = (): MistParticle => {
      const element = document.createElement('div');
      element.className = 'mist-particle';
      
      const size = Math.random() * 100 + 50;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.3;
      const opacity = Math.random() * 0.07;
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity.toString();
      
      container.appendChild(element);
      
      return { x, y, size, speedX, speedY, opacity, element };
    };
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push(createMistParticle());
    }
    
    const animateMist = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset position if out of bounds
        if (particle.x < -particle.size) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = -particle.size;
        
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateMist);
    };
    
    animateMist();
    
    // Handle window resize
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
      
      // Clean up particles
      particlesRef.current.forEach(particle => {
        container.removeChild(particle.element);
      });
      particlesRef.current = [];
    };
  }, []);
  
  return <div ref={containerRef} className="smoky-bg" />;
};

export default SmokyBackground;
