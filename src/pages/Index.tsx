
import React, { useState, useEffect } from 'react';
import IntroAnimation from '../components/IntroAnimation';
import SmokyBackground from '../components/SmokyBackground';
import Navigation from '../components/Navigation';
import PortfolioContent from '../components/PortfolioContent';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowContent(true);
  };
  
  return (
    <div className="min-h-screen bg-theme-dark text-theme-light">
      {/* Smoky background effect (always present) */}
      <SmokyBackground />
      
      {/* Intro animation */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      {/* Main content (only shown after intro) */}
      {showContent && (
        <>
          <Navigation />
          <PortfolioContent />
        </>
      )}
    </div>
  );
};

export default Index;
