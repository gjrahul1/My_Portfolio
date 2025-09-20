import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary"></div>
      
      {/* Neon glow effect */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green opacity-5 rounded-full blur-3xl"></div>
      
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Avatar */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-dark-tertiary border-2 border-neon-green/30 flex items-center justify-center text-4xl font-bold text-neon-green shadow-lg shadow-neon-green/20">
            GR
          </div>
        </div>
        
        {/* Name with subtle glow */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 text-hero subtle-glow-text">
          G.J. Rahul
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-accent-blue font-semibold mb-6 tracking-wide">
          Building the Intelligence of Tomorrow
        </p>
        
        {/* Location */}
        <div className="flex items-center justify-center mb-8 text-body">
          <MapPin className="w-5 h-5 mr-2 text-mint-tint" />
          <span className="text-lg">Bengaluru, Karnataka, India</span>
        </div>
        
        {/* Summary */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-body leading-relaxed text-justify">
            AI/ML Product Engineer building production-grade AI systems across ML models, pipelines, and agentic AI. 
            Experienced with Generative AI, LLMs, and retrieval-augmented generation (RAG), with a focus on 
            scalability, reasoning, and clean system design. Passionate about delivering knowledge-driven 
            applications that bridge ML fundamentals with next-gen AI.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="mb-12">
          <a href="#experience" 
             className="inline-block bg-accent-blue text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg shadow-accent-blue/30">
            Discover my Journey
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6">
          <a href="mailto:opentowork0621@gmail.com" 
             className="p-3 rounded-lg bg-dark-tertiary border border-mint-tint/30 hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 group">
            <Mail className="w-6 h-6 text-body group-hover:text-accent-blue transition-colors" />
          </a>
          <a href="https://github.com/gjrahul1" 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-3 rounded-lg bg-dark-tertiary border border-mint-tint/30 hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 group">
            <Github className="w-6 h-6 text-body group-hover:text-accent-blue transition-colors" />
          </a>
        </div>
      </div>
      
      {/* Removed scroll indicator for cleaner look */}
    </section>
  );
};

export default Hero;
