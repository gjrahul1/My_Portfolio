import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { blogApi, handleApiError } from '../services/apiService';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const fetchBlogPosts = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await blogApi.getPosts(10);
      
      if (response.status === 'success' && response.data) {
        setBlogPosts(response.data.posts || []);
        setIsFallback(response.data.isFallback || false);
      } else {
        throw new Error(response.message || 'Failed to fetch blog posts');
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      
      // If we have no posts and there's an error, show empty state
      if (blogPosts.length === 0) {
        setBlogPosts([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleRefresh = () => {
    fetchBlogPosts(true);
  };

  const handlePostClick = (post) => {
    if (post.url && post.url !== '#') {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-full p-8 rounded-2xl bg-dark-secondary border border-neon-green/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-dark-tertiary rounded-lg"></div>
              <div className="ml-3 w-24 h-6 bg-dark-tertiary rounded"></div>
            </div>
            <div className="w-full h-6 bg-dark-tertiary rounded mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="w-full h-4 bg-dark-tertiary rounded"></div>
              <div className="w-4/5 h-4 bg-dark-tertiary rounded"></div>
              <div className="w-3/5 h-4 bg-dark-tertiary rounded"></div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="w-20 h-4 bg-dark-tertiary rounded"></div>
              <div className="w-24 h-4 bg-dark-tertiary rounded"></div>
            </div>
            <div className="w-28 h-4 bg-dark-tertiary rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-light-primary mb-2">
        Unable to Load Blog Posts
      </h3>
      <p className="text-light-secondary mb-6">
        {error || 'Something went wrong while fetching blog posts.'}
      </p>
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="inline-flex items-center px-6 py-3 bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-lg hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
        Try Again
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <BookOpen className="w-16 h-16 text-light-secondary mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-light-primary mb-2">
        No Blog Posts Yet
      </h3>
      <p className="text-light-secondary mb-6">
        Blog posts will appear here once they're published. Stay tuned for exciting AI/ML insights!
      </p>
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="inline-flex items-center px-6 py-3 bg-neon-green/10 text-neon-green border border-neon-green/30 rounded-lg hover:bg-neon-green/20 hover:border-neon-green transition-all duration-300 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
        Check Again
      </button>
    </div>
  );

  return (
    <section id="blog" className="py-20 px-6 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-bold neon-glow-text">
            Latest Insights
          </h2>
          
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="inline-flex items-center px-4 py-2 bg-dark-secondary border border-neon-green/30 rounded-lg text-light-secondary hover:text-neon-green hover:border-neon-green transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Fallback indicator */}
        {isFallback && !loading && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center text-yellow-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                Showing preview content. Blog integration requires Google API configuration.
              </span>
            </div>
          </div>
        )}
        
        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error && blogPosts.length === 0 ? (
          <ErrorState />
        ) : blogPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div 
                  key={post.id || index} 
                  className="group cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="h-full p-8 rounded-2xl bg-dark-secondary border border-neon-green/20 hover:border-neon-green/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:-translate-y-2">
                    {/* Blog Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                          <BookOpen className="w-6 h-6 text-neon-green" />
                        </div>
                        <span className="ml-3 px-3 py-1 text-xs font-semibold bg-dark-tertiary text-neon-green border border-neon-green/30 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* External link indicator */}
                      {post.url && post.url !== '#' && (
                        <ExternalLink className="w-4 h-4 text-light-secondary group-hover:text-neon-green transition-colors" />
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-light-primary mb-4 group-hover:text-neon-green transition-colors leading-tight line-clamp-3">
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
                      <span className="mr-2">
                        {post.url && post.url !== '#' ? 'Read on Blog' : 'Coming Soon'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Status Banner */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-neon-green/10 border border-neon-green/30 rounded-full">
                <div className="w-2 h-2 bg-neon-green rounded-full mr-3 animate-pulse"></div>
                <span className="text-neon-green font-semibold">
                  {isFallback 
                    ? 'Configure Google Blogger API for live posts!' 
                    : 'More insights and tutorials coming soon!'
                  }
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;