import React, { useState } from 'react';
import IntroAnimation from '../components/IntroAnimation';
import SmokyBackground from '../components/SmokyBackground';
import Navigation from '../components/Navigation';
import PortfolioContent from '../components/PortfolioContent';
import GrainOverlay from '../components/GrainOverlay';
import { CursorProvider, Cursor } from "@/components/animate-ui/components/animate/cursor";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowContent(true);
  };
  
  return (
    <CursorProvider global>
      <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black overflow-x-hidden">
        <Cursor />
        <SmokyBackground />
        <GrainOverlay />
        
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
    </CursorProvider>
  );
};

export default Index;
