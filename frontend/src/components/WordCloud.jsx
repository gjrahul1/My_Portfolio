import React, { useEffect, useRef, useState } from 'react';

const WordCloud = () => {
  const svgRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Skills data with weights
  const skillsData = [
    {"text":"Machine Learning","weight":9},
    {"text":"Python","weight":8},
    {"text":"LLMs","weight":7},
    {"text":"RAG","weight":6},
    {"text":"AI Agents","weight":6},
    {"text":"Deep Learning","weight":6},
    {"text":"TensorFlow","weight":5},
    {"text":"PyTorch","weight":5},
    {"text":"Docker","weight":4},
    {"text":"React","weight":4},
    {"text":"Design Patterns","weight":4},
    {"text":"Git","weight":4},
    {"text":"System Design","weight":3},
    {"text":"FastAPI","weight":3},
    {"text":"LangChain","weight":3},
    {"text":"N8n","weight":2},
    {"text":"Zapier","weight":2}
  ];

  // Calculate font size based on weight (20-72px range)
  const getFontSize = (weight) => {
    const minSize = 20;
    const maxSize = 72;
    const minWeight = 2;
    const maxWeight = 9;
    return minSize + ((weight - minWeight) / (maxWeight - minWeight)) * (maxSize - minSize);
  };

  // Simple spiral placement algorithm
  const generateWordCloudPositions = (words) => {
    const centerX = 400; // SVG center
    const centerY = 225;
    const positions = [];
    const usedRects = [];

    // Sort by weight (highest first for center placement)
    const sortedWords = [...words].sort((a, b) => b.weight - a.weight);

    sortedWords.forEach((word, index) => {
      const fontSize = getFontSize(word.weight);
      const textWidth = word.text.length * fontSize * 0.6; // Approximate text width
      const textHeight = fontSize;

      let positioned = false;
      let attempts = 0;
      let radius = index === 0 ? 0 : 30; // Start from center for highest weight
      let angle = 0;

      while (!positioned && attempts < 100) {
        let x, y;

        if (index === 0) {
          // Place highest weight at center
          x = centerX;
          y = centerY;
        } else {
          // Spiral placement
          x = centerX + radius * Math.cos(angle);
          y = centerY + radius * Math.sin(angle);
        }

        // Check for collisions
        const rect = {
          x: x - textWidth / 2,
          y: y - textHeight / 2,
          width: textWidth,
          height: textHeight
        };

        const hasCollision = usedRects.some(usedRect => 
          rect.x < usedRect.x + usedRect.width + 10 &&
          rect.x + rect.width + 10 > usedRect.x &&
          rect.y < usedRect.y + usedRect.height + 10 &&
          rect.y + rect.height + 10 > usedRect.y
        );

        if (!hasCollision && x > textWidth/2 && x < 800 - textWidth/2 && 
            y > textHeight/2 && y < 450 - textHeight/2) {
          positions.push({
            ...word,
            x: x,
            y: y,
            fontSize: fontSize,
            rotation: Math.random() * 10 - 5 // Small random rotation
          });
          usedRects.push(rect);
          positioned = true;
        }

        // Spiral parameters
        angle += 0.5;
        if (angle > Math.PI * 2) {
          angle = 0;
          radius += 20;
        }
        attempts++;
      }

      // Fallback positioning if spiral fails
      if (!positioned) {
        positions.push({
          ...word,
          x: centerX + (Math.random() - 0.5) * 400,
          y: centerY + (Math.random() - 0.5) * 300,
          fontSize: fontSize,
          rotation: Math.random() * 10 - 5
        });
      }
    });

    return positions;
  };

  const [wordPositions, setWordPositions] = useState([]);

  useEffect(() => {
    const positions = generateWordCloudPositions(skillsData);
    setWordPositions(positions);
  }, []);

  const handleMouseEnter = (skill, event) => {
    setHoveredSkill(skill);
    const rect = event.target.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  const handleSkillClick = (skill) => {
    // Emit custom event for portfolio filtering
    const event = new CustomEvent('skill-select', { 
      detail: { skill: skill.text, weight: skill.weight } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 800 450"
        className="w-full h-auto bg-transparent"
        preserveAspectRatio="xMidYMid meet"
        style={{ minHeight: '450px' }}
      >
        {/* Subtle background patterns */}
        <defs>
          <radialGradient id="bgGradient1" cx="30%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(196, 255, 215, 0.03)" />
            <stop offset="100%" stopColor="rgba(196, 255, 215, 0)" />
          </radialGradient>
          <radialGradient id="bgGradient2" cx="70%" cy="70%" r="30%">
            <stop offset="0%" stopColor="rgba(196, 255, 215, 0.02)" />
            <stop offset="100%" stopColor="rgba(196, 255, 215, 0)" />
          </radialGradient>
        </defs>
        
        <circle cx="240" cy="135" r="120" fill="url(#bgGradient1)" />
        <circle cx="560" cy="315" r="90" fill="url(#bgGradient2)" />

        {/* Word cloud text elements */}
        <g>
          {wordPositions.map((word, index) => (
            <text
              key={`${word.text}-${index}`}
              x={word.x}
              y={word.y}
              fontSize={word.fontSize}
              fontFamily="'Inter', sans-serif"
              fontWeight="700"
              fill="#C4FFD7"
              fillOpacity="0.9"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${word.rotation} ${word.x} ${word.y})`}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => handleMouseEnter(word, e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleSkillClick(word)}
              className="skill-word"
              aria-label={`${word.text} - Weight: ${word.weight}`}
            >
              {word.text}
            </text>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredSkill && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          Skill: {hoveredSkill.text} – Weight: {hoveredSkill.weight}
        </div>
      )}

      {/* CSS for hover effects */}
      <style jsx>{`
        .skill-word:hover {
          fill: #3A8BFF !important;
          fill-opacity: 1 !important;
          filter: drop-shadow(0 0 8px rgba(58, 139, 255, 0.6));
          transform-origin: center;
          animation: skillHover 0.3s ease forwards;
        }

        @keyframes skillHover {
          to {
            transform: scale(1.1);
          }
        }

        /* Ensure proper contrast ratios */
        .skill-word {
          filter: contrast(1.2);
        }
      `}</style>
    </div>
  );
};

export default WordCloud;