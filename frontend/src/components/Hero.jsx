import React from 'react';
import { MapPin, Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary"></div>
      
      {/* Neon glow effect */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green opacity-5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Avatar */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-dark-tertiary border-2 border-neon-green/30 flex items-center justify-center text-4xl font-bold text-neon-green shadow-lg shadow-neon-green/20">
            GR
          </div>
        </div>
        
        {/* Name with neon glow */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 text-light-primary neon-glow-text">
          G.J. Rahul
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-neon-green font-semibold mb-6 tracking-wide">
          Building the Intelligence of Tomorrow
        </p>
        
        {/* Location */}
        <div className="flex items-center justify-center mb-8 text-light-secondary">
          <MapPin className="w-5 h-5 mr-2 text-neon-green" />
          <span className="text-lg">Bengaluru, Karnataka, India</span>
        </div>
        
        {/* Summary */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-light-secondary leading-relaxed text-justify">
            AI/ML Product Engineer building production-grade AI systems across ML models, pipelines, and agentic AI. 
            Experienced with Generative AI, LLMs, and retrieval-augmented generation (RAG), with a focus on 
            scalability, reasoning, and clean system design. Passionate about delivering knowledge-driven 
            applications that bridge ML fundamentals with next-gen AI.
          </p>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6">
          <a href="mailto:opentowork0621@gmail.com" 
             className="p-3 rounded-lg bg-dark-tertiary border border-neon-green/30 hover:border-neon-green hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group">
            <Mail className="w-6 h-6 text-light-secondary group-hover:text-neon-green transition-colors" />
          </a>
          <a href="https://github.com/gjrahul1" 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-3 rounded-lg bg-dark-tertiary border border-neon-green/30 hover:border-neon-green hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group">
            <Github className="w-6 h-6 text-light-secondary group-hover:text-neon-green transition-colors" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator - Removed for better alignment */}
    </section>
  );
};

export default Hero;