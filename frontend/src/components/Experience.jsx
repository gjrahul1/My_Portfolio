import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { mockExperienceData } from '../data/mockData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-hero subtle-glow-text">
          Experience
        </h2>
        
        <div className="space-y-12">
          {mockExperienceData.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < mockExperienceData.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-32 bg-neon-green/30"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-neon-green rounded-full shadow-lg shadow-neon-green/50"></div>
              
              <div className="ml-16 p-8 rounded-2xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-light-primary mb-2 md:mb-0">
                    {exp.position}
                  </h3>
                  <div className="flex items-center text-neon-green font-semibold">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold text-neon-green mb-2">
                  {exp.company}
                </h4>
                
                <div className="flex items-center text-light-secondary mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{exp.location}</span>
                </div>
                
                <p className="text-light-secondary leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;