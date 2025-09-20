import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { mockEducationData } from '../data/mockData';

const Education = () => {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Education
        </h2>
        
        <div className="space-y-8">
          {mockEducationData.map((edu, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < mockEducationData.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-24 bg-neon-green/30"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-neon-green rounded-full shadow-lg shadow-neon-green/50"></div>
              
              <div className="ml-16 p-8 rounded-2xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/10">
                {/* Education Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start mb-4 md:mb-0">
                    <GraduationCap className="w-6 h-6 text-neon-green mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-light-primary mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-neon-green font-semibold">
                        {edu.field}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-light-secondary">
                    <Calendar className="w-4 h-4 mr-2 text-neon-green" />
                    <span className="font-semibold">{edu.duration}</span>
                  </div>
                </div>
                
                {/* Institution */}
                <h4 className="text-lg font-semibold text-light-primary mb-4 ml-9">
                  {edu.institution}
                </h4>
                
                {/* Description */}
                <p className="text-light-secondary leading-relaxed ml-9">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;