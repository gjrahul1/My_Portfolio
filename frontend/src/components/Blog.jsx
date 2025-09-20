import React from 'react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { mockBlogData } from '../data/mockData';

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neon-glow-text">
          Latest Insights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogData.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="h-full p-8 rounded-2xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:-translate-y-2">
                {/* Blog Icon */}
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                    <BookOpen className="w-6 h-6 text-neon-green" />
                  </div>
                  <span className="ml-3 px-3 py-1 text-xs font-semibold bg-dark-tertiary text-neon-green border border-neon-green/30 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-light-primary mb-4 group-hover:text-neon-green transition-colors leading-tight">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-light-secondary mb-6 leading-relaxed line-clamp-4">
                  {post.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-light-secondary mb-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-neon-green" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-neon-green" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>
                
                {/* Read More */}
                <div className="flex items-center text-neon-green font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coming Soon Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-neon-green/10 border border-neon-green/30 rounded-full">
            <div className="w-2 h-2 bg-neon-green rounded-full mr-3 animate-pulse"></div>
            <span className="text-neon-green font-semibold">
              More insights and tutorials coming soon!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;