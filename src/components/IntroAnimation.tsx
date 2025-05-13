
import React, { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Reversed directions for each skill
  const skills = [
    { text: "AI Engineer", direction: "right" },
    { text: "Web Designer", direction: "left" },
    { text: "Robotics Engineer", direction: "right" },
    { text: "App Developer", direction: "left" }
  ];
  
  useEffect(() => {
    if (currentSkillIndex >= skills.length) {
      setTimeout(() => {
        setAnimationComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 500);
      return;
    }
    
    const timeout = setTimeout(() => {
      setCurrentSkillIndex(currentSkillIndex + 1);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [currentSkillIndex, skills.length, onComplete]);
  
  return (
    <div className={`intro-container ${animationComplete ? 'animate-fade-out' : ''}`}>
      {skills.map((skill, index) => {
        const isActive = index === currentSkillIndex;
        const hasAppeared = index < currentSkillIndex;
        const animationClass = isActive
          ? skill.direction === "left"
            ? "animate-slide-in-left"
            : "animate-slide-in-right"
          : hasAppeared
          ? skill.direction === "left"
            ? "animate-slide-out-left"
            : "animate-slide-out-right"
          : "opacity-0";
        
        return (
          <div
            key={index}
            className={`skill-text absolute ${animationClass} ${isActive ? "opacity-100" : ""}`}
            style={{ animationDuration: "1s", animationFillMode: "forwards" }}
          >
            {skill.text}
          </div>
        );
      })}
    </div>
  );
};

export default IntroAnimation;
