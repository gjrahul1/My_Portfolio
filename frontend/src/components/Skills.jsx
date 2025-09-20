import React from 'react';

const skillsData = {
  'Core Skills': [
    'Machine Learning', 'Deep Learning', 'LLMs & RAG', 'Agentic AI', 'System Design', 'Design Patterns'
  ],
  'Tools & Technologies': [
    'Python', 'TensorFlow', 'PyTorch', 'LangChain', 'FastAPI', 'React', 'Docker', 'Git', 'N8n', 'Zapier'
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-hero subtle-glow-text">
          Skills & Technologies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(skillsData).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-2xl font-bold text-accent-blue mb-6 text-center md:text-left">{title}</h3>
              <ul className="flex flex-wrap justify-center md:justify-start gap-3">
                {items.map(item => (
                  <li key={item} className="bg-dark-tertiary/60 text-body/90 px-4 py-2 rounded-lg border border-mint-tint/20 text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
