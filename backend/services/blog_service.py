import requests
import re
import os
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import logging
from html import unescape
import math

logger = logging.getLogger(__name__)

class BlogService:
    def __init__(self):
        self.api_key = os.environ.get('GOOGLE_API_KEY')
        self.blog_id = os.environ.get('BLOGGER_BLOG_ID')
        self.base_url = "https://www.googleapis.com/blogger/v3/blogs"
        self.cache_duration = timedelta(hours=1)
        
    def calculate_read_time(self, content: str) -> str:
        """Calculate estimated read time based on content length"""
        # Remove HTML tags and count words
        clean_content = re.sub(r'<[^>]+>', '', content)
        word_count = len(clean_content.split())
        
        # Average reading speed: 200 words per minute
        read_time_minutes = math.ceil(word_count / 200)
        
        if read_time_minutes <= 1:
            return "1 min read"
        else:
            return f"{read_time_minutes} min read"
    
    def clean_html_content(self, html_content: str) -> str:
        """Clean HTML content and create excerpt"""
        # Remove HTML tags
        clean_text = re.sub(r'<[^>]+>', '', html_content)
        # Unescape HTML entities
        clean_text = unescape(clean_text)
        # Remove extra whitespace
        clean_text = ' '.join(clean_text.split())
        
        # Create excerpt (first 150 characters)
        if len(clean_text) > 150:
            excerpt = clean_text[:150] + "..."
        else:
            excerpt = clean_text
            
        return excerpt
    
    def process_blog_post(self, post_data: Dict) -> Dict:
        """Process raw blog post data from Google API"""
        try:
            # Extract basic information
            post_id = post_data.get('id', '')
            title = post_data.get('title', 'Untitled')
            content = post_data.get('content', '')
            url = post_data.get('url', '')
            
            # Process publish date
            published_str = post_data.get('published', '')
            try:
                published_date = datetime.fromisoformat(published_str.replace('Z', '+00:00'))
                publish_date = published_date.strftime('%B %d, %Y')
            except:
                publish_date = 'Date unavailable'
            
            # Generate excerpt
            excerpt = self.clean_html_content(content)
            
            # Calculate read time
            read_time = self.calculate_read_time(content)
            
            # Extract category from labels
            labels = post_data.get('labels', [])
            category = labels[0] if labels else 'AI/ML'
            
            # Get author info
            author_info = post_data.get('author', {})
            author = author_info.get('displayName', 'G.J. Rahul')
            
            # Look for featured image in content
            featured_image = None
            img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content)
            if img_match:
                featured_image = img_match.group(1)
            
            return {
                'id': post_id,
                'title': title,
                'excerpt': excerpt,
                'content': content,
                'publishDate': publish_date,
                'readTime': read_time,
                'category': category,
                'url': url,
                'author': author,
                'featuredImage': featured_image
            }
            
        except Exception as e:
            logger.error(f"Error processing blog post: {str(e)}")
            return None
    
    async def fetch_blog_posts(self, max_results: int = 10) -> Dict:
        """Fetch blog posts from Google Blogger API"""
        try:
            if not self.api_key or not self.blog_id:
                logger.warning("Google API key or Blog ID not configured")
                return {
                    'status': 'error',
                    'message': 'Blog configuration not available',
                    'data': None
                }
            
            # Construct API URL
            url = f"{self.base_url}/{self.blog_id}/posts"
            params = {
                'key': self.api_key,
                'maxResults': max_results,
                'fields': 'items(id,title,content,published,updated,url,author,labels),nextPageToken'
            }
            
            # Make API request
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                posts = []
                
                # Process each post
                if 'items' in data:
                    for post_data in data['items']:
                        processed_post = self.process_blog_post(post_data)
                        if processed_post:
                            posts.append(processed_post)
                
                return {
                    'status': 'success',
                    'data': {
                        'posts': posts,
                        'totalPosts': len(posts),
                        'lastFetched': datetime.utcnow().isoformat()
                    }
                }
            
            elif response.status_code == 403:
                logger.error("Google API access forbidden - check API key and permissions")
                return {
                    'status': 'error',
                    'message': 'API access denied - check credentials',
                    'data': None
                }
            
            elif response.status_code == 404:
                logger.error("Blog not found - check blog ID")
                return {
                    'status': 'error',
                    'message': 'Blog not found',
                    'data': None
                }
            
            else:
                logger.error(f"API request failed with status {response.status_code}: {response.text}")
                return {
                    'status': 'error',
                    'message': f'API request failed: {response.status_code}',
                    'data': None
                }
                
        except requests.exceptions.Timeout:
            logger.error("API request timed out")
            return {
                'status': 'error',
                'message': 'Request timed out',
                'data': None
            }
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error: {str(e)}")
            return {
                'status': 'error',
                'message': 'Network error occurred',
                'data': None
            }
            
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return {
                'status': 'error',
                'message': 'An unexpected error occurred',
                'data': None
            }
    
    async def get_fallback_posts(self) -> Dict:
        """Return fallback blog posts when API is unavailable"""
        fallback_posts = [
            {
                'id': 'fallback-1',
                'title': 'The Complete AI Playground: Concepts, Challenges, and Innovations',
                'excerpt': 'Exploring the fascinating world of AI/ML from fundamental concepts to cutting-edge innovations. A comprehensive guide through the challenges and breakthroughs shaping the future of artificial intelligence.',
                'content': '',
                'publishDate': 'Coming Soon',
                'readTime': '8 min read',
                'category': 'AI/ML Deep Dive',
                'url': '#',
                'author': 'G.J. Rahul',
                'featuredImage': None
            }
        ]
        
        return {
            'status': 'success',
            'data': {
                'posts': fallback_posts,
                'totalPosts': len(fallback_posts),
                'lastFetched': datetime.utcnow().isoformat(),
                'isFallback': True
            }
        }