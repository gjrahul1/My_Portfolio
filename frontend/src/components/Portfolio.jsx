import React from 'react';
import LandingAnimation from './LandingAnimation';
import Hero from './Hero';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Blog from './Blog';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-light-primary">
      <LandingAnimation />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      {/* <Blog /> */}
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
