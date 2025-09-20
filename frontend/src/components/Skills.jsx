import React, { useEffect, useState } from 'react';
import { mockSkillsData } from '../data/mockData';

const Skills = () => {
  const [cloudPositions, setCloudPositions] = useState([]);

  // Generate random positions for word cloud
  const generateCloudPositions = (skills) => {
    const positions = [];
    const usedPositions = new Set();
    
    skills.forEach((skill, index) => {
      let position;
      let attempts = 0;
      
      do {
        // Generate random position within bounds
        const x = Math.random() * 80 + 10; // 10% to 90% of container width
        const y = Math.random() * 80 + 10; // 10% to 90% of container height
        const positionKey = `${Math.floor(x/5)}-${Math.floor(y/5)}`; // Grid-based collision detection
        
        if (!usedPositions.has(positionKey) || attempts > 20) {
          position = { x, y };
          usedPositions.add(positionKey);
          break;
        }
        attempts++;
      } while (attempts < 25);
      
      positions.push({
        ...skill,
        x: position.x,
        y: position.y,
        index
      });
    });
    
    return positions;
  };

  useEffect(() => {
    // Combine all skills into one array for cloud layout
    const allSkills = [
      ...mockSkillsData.primary,
      ...mockSkillsData.secondary,
      ...mockSkillsData.tertiary,
      ...mockSkillsData.lowCode
    ];
    
    const positions = generateCloudPositions(allSkills);
    setCloudPositions(positions);
  }, []);

  const getFontSize = (importance) => {
    const baseSize = 14;
    return baseSize + (importance * 6); // Increased multiplier for better visibility
  };

  const getOpacity = (importance) => {
    return 0.5 + (importance * 0.06);
  };

  const getSkillColor = (importance) => {
    if (importance >= 8) return 'text-neon-green';
    if (importance >= 6) return 'text-light-primary';
    if (importance >= 4) return 'text-light-secondary';
    return 'text-light-muted';
  };

  return (
    <section id="skills" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Skills & Technologies
        </h2>
        
        {/* Word Cloud Container */}
        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-2xl bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-neon-green/20">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-green rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-green rounded-full blur-3xl"></div>
          </div>
          
          {/* Skills Cloud */}
          <div className="relative w-full h-full p-8">
            {cloudPositions.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10 ${getSkillColor(skill.importance)} font-semibold select-none`}
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  fontSize: `${getFontSize(skill.importance)}px`,
                  opacity: getOpacity(skill.importance),
                  textShadow: skill.importance > 7 ? '0 0 8px rgba(204, 255, 210, 0.4)' : 'none',
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = `translate(-50%, -50%) scale(1.2) rotate(0deg)`;
                  e.target.style.textShadow = '0 0 12px rgba(204, 255, 210, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = `translate(-50%, -50%) scale(1) rotate(${Math.random() * 20 - 10}deg)`;
                  e.target.style.textShadow = skill.importance > 7 ? '0 0 8px rgba(204, 255, 210, 0.4)' : 'none';
                }}
                title={`${skill.name} - Importance: ${skill.importance}/10`}
              >
                {skill.name}
              </div>
            ))}
          </div>
          
          {/* Cloud Legend */}
          <div className="absolute top-4 right-4 bg-dark-primary/80 backdrop-blur-sm rounded-lg p-4 border border-neon-green/20">
            <h4 className="text-sm font-semibold text-neon-green mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-neon-green rounded mr-2"></div>
                <span className="text-light-secondary">Core Expertise</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-light-primary rounded mr-2"></div>
                <span className="text-light-secondary">Advanced</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-light-secondary rounded mr-2"></div>
                <span className="text-light-secondary">Proficient</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-light-muted rounded mr-2"></div>
                <span className="text-light-secondary">Familiar</span>
              </div>
            </div>
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