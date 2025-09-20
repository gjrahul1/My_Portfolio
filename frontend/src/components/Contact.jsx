import React, { useState } from 'react';
import { Mail, Github, MapPin, Send, MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { contactApi, handleApiError } from '../services/apiService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitStatus(null);
      setSubmitMessage('');

      const response = await contactApi.submitMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (response.status === 'success') {
        setSubmitStatus('success');
        setSubmitMessage(response.message || 'Thank you for your message! I\'ll get back to you soon.');
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      const errorInfo = handleApiError(error);
      setSubmitStatus('error');
      setSubmitMessage(errorInfo.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = () => {
    if (submitStatus === 'success') {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (submitStatus === 'error') {
      return <AlertTriangle className="w-5 h-5 text-red-400" />;
    }
    return null;
  };

  const getStatusMessage = () => {
    if (!submitStatus || !submitMessage) return null;

    const baseClasses = "mt-4 p-4 rounded-lg border text-sm";
    const statusClasses = submitStatus === 'success' 
      ? "bg-green-500/10 border-green-500/30 text-green-400"
      : "bg-red-500/10 border-red-500/30 text-red-400";

    return (
      <div className={`${baseClasses} ${statusClasses}`}>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-2">{submitMessage}</span>
        </div>
      </div>
    );
  };

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
          
          {/* Quick Message Form */}
          <div className="bg-dark-secondary rounded-2xl p-8 border border-neon-green/20">
            <h3 className="text-xl font-bold text-light-primary mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 text-neon-green mr-3" />
              Quick Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all"
                  placeholder="Your name"
                  disabled={submitting}
                  required
                />
              </div>
              
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all"
                  placeholder="your.email@example.com"
                  disabled={submitting}
                  required
                />
              </div>
              
              <div>
                <label className="block text-light-secondary mb-2 font-semibold">
                  Message *
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-dark-tertiary border border-neon-green/30 rounded-lg text-light-primary placeholder-light-secondary/60 focus:border-neon-green focus:outline-none focus:shadow-lg focus:shadow-neon-green/20 transition-all resize-none"
                  placeholder="Tell me about your project or idea..."
                  disabled={submitting}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-neon-green text-dark-primary font-bold py-4 px-6 rounded-lg hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Message */}
              {getStatusMessage()}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;