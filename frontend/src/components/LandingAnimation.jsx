import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LandingAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const fullText = 'From Insight to Actionable AI';
  const typingSpeed = 100; // milliseconds per character
  const cursorBlinkSpeed = 500; // milliseconds

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setAnimationComplete(true);
      }
    }, typingSpeed);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToContent = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green opacity-3 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Animated Typing Text */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-light-primary leading-tight">
            <span className="inline-block">
              {displayText}
              <span 
                className={`inline-block w-1 h-16 md:h-20 lg:h-24 bg-neon-green ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                style={{ animation: 'blink 1s infinite' }}
              ></span>
            </span>
          </h1>
        </div>
        
        {/* Scroll indicator - appears after typing is complete */}
        {animationComplete && (
          <div className="animate-fade-in">
            <button
              onClick={scrollToContent}
              className="group flex flex-col items-center space-y-4 mx-auto transition-all duration-300 hover:transform hover:scale-110"
            >
              <p className="text-light-secondary text-lg font-medium group-hover:text-neon-green transition-colors">
                Discover My Journey
              </p>
              <div className="p-3 rounded-full border-2 border-neon-green/30 group-hover:border-neon-green group-hover:shadow-lg group-hover:shadow-neon-green/20 transition-all duration-300">
                <ChevronDown className="w-6 h-6 text-neon-green animate-bounce" />
              </div>
            </button>
          </div>
        )}
      </div>
      
      {/* Custom keyframes for cursor blink */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default LandingAnimation;