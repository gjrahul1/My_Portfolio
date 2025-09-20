from fastapi import APIRouter, HTTPException, Depends
from typing import List
import logging
from datetime import datetime
from services.blog_service import BlogService
from models.blog_models import BlogPost, BlogPostsResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/blog", tags=["blog"])

def get_blog_service():
    return BlogService()

@router.get("/posts", response_model=dict)
async def get_blog_posts(
    max_results: int = 10,
    blog_service: BlogService = Depends(get_blog_service)
):
    """
    Fetch blog posts from Google Blogger API
    
    - **max_results**: Maximum number of posts to fetch (default: 10)
    """
    try:
        logger.info(f"Fetching {max_results} blog posts")
        
        result = await blog_service.fetch_blog_posts(max_results)
        
        if result['status'] == 'error':
            logger.warning(f"Blog API error: {result['message']}")
            # Return fallback posts on error
            fallback_result = await blog_service.get_fallback_posts()
            return fallback_result
        
        logger.info(f"Successfully fetched {result['data']['totalPosts']} blog posts")
        return result
        
    except Exception as e:
        logger.error(f"Unexpected error in get_blog_posts: {str(e)}")
        # Return fallback posts on any unexpected error
        blog_service = BlogService()
        fallback_result = await blog_service.get_fallback_posts()
        return fallback_result

@router.get("/posts/{post_id}", response_model=dict)
async def get_blog_post_by_id(
    post_id: str,
    blog_service: BlogService = Depends(get_blog_service)
):
    """
    Get a specific blog post by ID
    
    - **post_id**: The ID of the blog post to retrieve
    """
    try:
        logger.info(f"Fetching blog post with ID: {post_id}")
        
        # For now, we'll fetch all posts and filter
        # In a production app, you'd want to implement single post fetching
        result = await blog_service.fetch_blog_posts(50)  # Fetch more to find the specific post
        
        if result['status'] == 'error':
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Find the specific post
        posts = result['data']['posts']
        post = next((p for p in posts if p['id'] == post_id), None)
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return {
            'status': 'success',
            'data': post
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in get_blog_post_by_id: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/health")
async def blog_health_check():
    """Health check endpoint for blog service"""
    return {
        "status": "healthy",
        "service": "blog",
        "timestamp": datetime.utcnow().isoformat()
    }