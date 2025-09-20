import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { mockProjectsData } from '../data/mockData';

const Projects = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-neon-green';
      case 'Completed': return 'text-blue-400';
      case 'In Development': return 'text-yellow-400';
      default: return 'text-light-secondary';
    }
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjectsData.map((project, index) => (
            <div key={index} className="group">
              <div className="h-full p-8 rounded-2xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:-translate-y-2">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Code className="w-6 h-6 text-neon-green mr-3" />
                    <h3 className="text-xl font-bold text-light-primary group-hover:text-neon-green transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className={`text-sm font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-light-secondary mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-dark-tertiary text-neon-green border border-neon-green/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-lg hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 group"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Code</span>
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-dark-tertiary text-light-primary border border-light-primary/30 rounded-lg hover:border-neon-green hover:text-neon-green transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Future Projects Note */}
        <div className="mt-12 text-center">
          <p className="text-light-secondary">
            More exciting projects coming soon! 
            <span className="text-neon-green ml-2">Stay tuned →</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;