import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LandingAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const fullText = 'From Insight to Actionable AI';
  const typingSpeed = 80; // Slightly faster for better UX
  const cursorBlinkSpeed = 600;

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
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-dark-primary">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-mint-tint to-transparent"></div>
      </div>
      
      {/* Improved hero glow - offset and reduced */}
      <div 
        className="absolute w-[480px] h-[480px] rounded-full blur-[180px] opacity-25"
        style={{
          background: '#9FFFBD',
          top: '45%',
          left: '55%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Improved Typography */}
        <div className="mb-16">
          <h1 className="font-black text-hero leading-tight hero-glow-text" style={{
            fontSize: 'clamp(3.6rem, 8vw, 4.5rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            lineHeight: 1.1
          }}>
            <span className="inline-block">
              From Insight
              <br className="hidden md:inline" />
              <span className="md:ml-2">to Actionable AI</span>
              <span 
                className={`inline-block w-1 bg-accent-blue ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                style={{ 
                  height: 'clamp(3.6rem, 8vw, 4.5rem)',
                  animation: 'blink 1s infinite'
                }}
              ></span>
            </span>
          </h1>
        </div>
        
        {/* Supporting Sub-Copy */}
        {animationComplete && (
          <div className="animate-fade-in mb-12">
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Secondary scroll cue */}
              <button
                onClick={scrollToContent}
                className="group flex flex-col items-center space-y-2 transition-all duration-300 hover:transform hover:scale-110"
              >
                <span className="text-muted text-sm font-medium group-hover:text-accent-blue transition-colors">
                  Discover My Journey
                </span>
                <div className="p-2 rounded-full border border-mint-tint/30 group-hover:border-accent-blue transition-all duration-300">
                  <ChevronDown className="w-4 h-4 text-mint-tint animate-bounce group-hover:text-accent-blue" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom keyframes */}
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
          animation: fade-in 800ms ease-out;
        }
      `}</style>
    </section>
  );
};

export default LandingAnimation;
