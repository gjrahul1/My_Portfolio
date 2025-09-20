import React from 'react';
import { Github, Mail, Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-secondary border-t border-neon-green/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-light-primary">
              G.J. Rahul
            </h3>
            <p className="text-light-secondary">
              AI/ML Product Engineer passionate about building next-generation AI systems 
              that bridge innovation with real-world impact.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:opentowork0621@gmail.com"
                className="p-2 rounded-lg bg-dark-tertiary border border-neon-green/30 hover:border-neon-green hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-light-secondary group-hover:text-neon-green transition-colors" />
              </a>
              <a 
                href="https://github.com/gjrahul1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-tertiary border border-neon-green/30 hover:border-neon-green hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-light-secondary group-hover:text-neon-green transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-neon-green">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#experience" className="text-light-secondary hover:text-neon-green transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-light-secondary hover:text-neon-green transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-light-secondary hover:text-neon-green transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="text-light-secondary hover:text-neon-green transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light-secondary hover:text-neon-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Current Status */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-neon-green">Current Status</h4>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-neon-green rounded-full mr-3 animate-pulse"></div>
              <span className="text-light-secondary">Available for new opportunities</span>
            </div>
            <div className="flex items-center text-light-secondary">
              <Coffee className="w-4 h-4 mr-2 text-neon-green" />
              <span>Building the future with AI</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-neon-green/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center text-light-secondary mb-4 md:mb-0">
              <span>© {currentYear} G.J. Rahul. Built with</span>
              <Heart className="w-4 h-4 mx-2 text-neon-green animate-pulse" />
              <span>and</span>
              <Code className="w-4 h-4 ml-2 text-neon-green" />
            </div>
            
            <div className="text-light-secondary text-sm">
              <span className="text-neon-green">Powered by React & AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;