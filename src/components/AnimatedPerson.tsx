import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const AnimatedPerson: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for head and eyes
  const headX = useSpring(0, { stiffness: 100, damping: 20 });
  const headY = useSpring(0, { stiffness: 100, damping: 20 });
  
  const eyeX = useSpring(0, { stiffness: 150, damping: 15 });
  const eyeY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate relative distance (-1 to 1)
      const relX = (e.clientX - centerX) / (window.innerWidth / 2);
      const relY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Limit range
      const headRange = 25;
      const eyeRange = 8;
      
      headX.set(relX * headRange);
      headY.set(relY * headRange);
      
      eyeX.set(relX * eyeRange);
      eyeY.set(relY * eyeRange);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [headX, headY, eyeX, eyeY]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center select-none">
      {/* Glow effect behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Floating Platform (The "Dock") */}
      <motion.div 
        className="absolute bottom-10 z-10 floating-platform"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="glass-dock w-64 md:w-96 h-12 md:h-16 rounded-full flex items-center justify-center gap-6 px-10 border-b-2 border-primary/20">
          {[ 'terminal', 'code', 'view_in_ar', 'bolt' ].map((icon, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.2, color: '#fff' }}
              className="size-8 md:size-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm md:text-base">{icon}</span>
            </motion.div>
          ))}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-4 bg-primary/40 blur-2xl rounded-full" />
      </motion.div>

      {/* The Character (SVG for precise control) */}
      <motion.div 
        className="relative z-20 w-64 md:w-80 h-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {/* Sitting Legs/Body Base */}
          <path d="M50 160C50 160 30 150 20 170C10 190 40 195 60 190C80 185 100 185 120 190C140 195 190 190 180 170C170 150 150 160 150 160" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
          <path d="M60 140C60 140 80 145 100 145C120 145 140 140 140 140L150 180C150 180 130 185 100 185C70 185 50 180 50 180L60 140Z" fill="#14141A" />
          
          {/* Torso (Hoodie) */}
          <rect x="70" y="100" width="60" height="50" rx="10" fill="#1A1A24" />
          <path d="M70 100C70 100 75 90 100 90C125 90 130 100 130 100V140H70V100Z" fill="#1A1A24" />
          <path d="M90 90V110M110 90V110" stroke="white" strokeOpacity="0.1" />
          
          {/* Animated Head Group */}
          <motion.g style={{ x: headX, y: headY, originX: '100px', originY: '70px' }}>
            {/* Hoodie Hood */}
            <circle cx="100" cy="70" r="35" fill="#1A1A24" />
            
            {/* Face Mask/Shadow Area */}
            <circle cx="100" cy="70" r="28" fill="#0D0D12" />
            
            {/* Skin/Face */}
            <path d="M85 60C85 50 115 50 115 60V80C115 90 85 90 85 80V60Z" fill="#2D2D3A" />
            
            {/* Eyes Group */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <circle cx="92" cy="70" r="3" fill="white" />
              <circle cx="108" cy="70" r="3" fill="white" />
              {/* Eye Glow */}
              <circle cx="92" cy="70" r="5" fill="white" fillOpacity="0.2" className="blur-[2px]" />
              <circle cx="108" cy="70" r="5" fill="white" fillOpacity="0.2" className="blur-[2px]" />
            </motion.g>
            
            {/* Glasses Frame (Minimalist) */}
            <rect x="85" y="67" width="30" height="8" rx="2" stroke="#4725f4" strokeWidth="1.5" fill="transparent" />
            <line x1="97" y1="71" x2="103" y2="71" stroke="#4725f4" strokeWidth="1" />
          </motion.g>
          
          {/* Arms (Resting on lap) */}
          <path d="M70 110C50 120 50 140 75 145" stroke="#1A1A24" strokeWidth="12" strokeLinecap="round" />
          <path d="M130 110C150 120 150 140 125 145" stroke="#1A1A24" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedPerson;
