import React from 'react';
import { Mail, Github, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Let's Connect
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-light-primary mb-6">
                Get in Touch
              </h3>
              <p className="text-light-secondary text-lg leading-relaxed mb-8">
                Ready to collaborate on AI/ML projects or discuss innovative solutions? 
                I'm always excited to work on challenging problems and build cutting-edge AI systems.
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-4">
              <a 
                href="mailto:opentowork0621@gmail.com"
                className="flex items-center p-4 rounded-xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 group"
              >
                <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30 mr-4">
                  <Mail className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-light-primary font-semibold group-hover:text-neon-green transition-colors">
                    Email
                  </h4>
                  <p className="text-light-secondary">opentowork0621@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/gjrahul1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 group"
              >
                <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30 mr-4">
                  <Github className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-light-primary font-semibold group-hover:text-neon-green transition-colors">
                    GitHub
                  </h4>
                  <p className="text-light-secondary">@gjrahul1</p>
                </div>
              </a>
              
              <div className="flex items-center p-4 rounded-xl bg-dark-secondary border border-neon-green/20">
                <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30 mr-4">
                  <MapPin className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-light-primary font-semibold">Location</h4>
                  <p className="text-light-secondary">Bengaluru, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Message */}
          <div className="bg-dark-secondary rounded-2xl p-8 border border-neon-green/20">
            <h3 className="text-xl font-bold text-light-primary mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 text-neon-green mr-3" />
              Quick Message
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all resize-none"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-neon-green text-dark-primary font-bold py-4 px-6 rounded-lg hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300 flex items-center justify-center group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;