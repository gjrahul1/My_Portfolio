import React from 'react';
import { mockSkillsData } from '../data/mockData';

const Skills = () => {
  const getFontSize = (importance) => {
    const baseSize = 14;
    return baseSize + (importance * 4);
  };

  const getOpacity = (importance) => {
    return 0.4 + (importance * 0.07);
  };

  const renderSkillCloud = (skills, title) => (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-neon-green mb-6 text-center">{title}</h3>
      <div className="flex flex-wrap justify-center items-center gap-4 min-h-[200px]">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-block text-light-primary hover:text-neon-green transition-all duration-300 cursor-default hover:scale-110 font-semibold"
            style={{
              fontSize: `${getFontSize(skill.importance)}px`,
              opacity: getOpacity(skill.importance),
              textShadow: skill.importance > 7 ? '0 0 10px rgba(218, 255, 1, 0.3)' : 'none'
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Skills & Technologies
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {renderSkillCloud(mockSkillsData.primary, "Core Expertise")}
            {renderSkillCloud(mockSkillsData.tertiary, "Development Tools")}
          </div>
          
          <div className="space-y-8">
            {renderSkillCloud(mockSkillsData.secondary, "Frameworks & Libraries")}
            {renderSkillCloud(mockSkillsData.lowCode, "Low-Code Solutions")}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-light-secondary text-lg">
            <span className="text-neon-green font-semibold">Interactive Skills Cloud</span> • 
            Hover to explore technologies and expertise areas
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;