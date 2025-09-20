import React from 'react';
import WordCloud from './WordCloud';

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-hero subtle-glow-text">
          Skills & Technologies
        </h2>
        
        {/* True NLP-Style Word Cloud */}
        <div className="relative w-full rounded-2xl bg-dark-primary border border-mint-tint/20 overflow-hidden">
          {/* Word Cloud Component */}
          <div className="p-8">
            <WordCloud />
          </div>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-dark-primary/90 backdrop-blur-sm rounded-lg p-4 border border-mint-tint/20">
            <h4 className="text-sm font-semibold text-accent-blue mb-3">Expertise Levels</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-mint-tint rounded mr-2 opacity-90"></div>
                <span className="text-body">All Skills</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-accent-blue rounded mr-2"></div>
                <span className="text-body">On Hover</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-mint-tint/20">
              <div className="text-xs text-muted">
                Size = Expertise Level<br />
                Click to filter projects
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-body text-lg">
            <span className="text-accent-blue font-semibold">Interactive NLP-Style Word Cloud</span> • 
            Hover to explore, click to filter portfolio
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;