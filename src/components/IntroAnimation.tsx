import React, { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Reversed directions for each skill
  const skills = [
    { text: "Architecting Intelligence", direction: "right" },
    { text: "Sculpting Experiences", direction: "left" },
    { text: "Engineering the Future", direction: "right" },
  ];

  useEffect(() => {
    if (currentSkillIndex >= skills.length) {
      setTimeout(() => {
        setAnimationComplete(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 300);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentSkillIndex(currentSkillIndex + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSkillIndex, skills.length, onComplete]);

  return (
    <div
      className={`intro-container ${animationComplete ? "animate-fade-out" : ""}`}
    >
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
            className={`skill-text absolute text-center px-10 ${animationClass} ${isActive ? "opacity-100" : ""}`}
            style={{ animationDuration: "0.6s", animationFillMode: "forwards" }}
          >
            {skill.text}
          </div>
        );
      })}
    </div>
  );
};

export default IntroAnimation;
