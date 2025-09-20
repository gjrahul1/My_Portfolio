# Backend Integration Contracts - G.J. Rahul Portfolio

## Overview
This document outlines the API contracts and integration plan for the portfolio backend, specifically focusing on Google Blogger API integration for dynamic blog content.

## API Contracts

### 1. Blog Posts API

#### Endpoint: `GET /api/blog/posts`
**Purpose**: Fetch blog posts from Google Blogger API

**Response Format**:
```json
{
  "status": "success",
  "data": {
    "posts": [
      {
        "id": "string",
        "title": "string",
        "excerpt": "string",
        "content": "string",
        "publishDate": "ISO 8601 date string",
        "readTime": "string (calculated)",
        "category": "string",
        "url": "string (original blogger URL)",
        "author": "string",
        "featuredImage": "string (optional)"
      }
    ],
    "totalPosts": "number",
    "lastFetched": "ISO 8601 date string"
  }
}
```

**Error Response**:
```json
{
  "status": "error",
  "message": "Error description",
  "data": null
}
```

#### Endpoint: `GET /api/blog/posts/:id`
**Purpose**: Get single blog post details

**Response**: Same as above but single post object

### 2. Contact Form API

#### Endpoint: `POST /api/contact`
**Purpose**: Handle contact form submissions

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Message sent successfully"
}
```

## Google Blogger API Integration

### Required Configuration:
1. **Google API Key**: For accessing Blogger API v3
2. **Blog ID**: G.J. Rahul's blogger blog ID
3. **Caching Strategy**: Cache posts for 1 hour to avoid API limits

### API Details:
- **Base URL**: `https://www.googleapis.com/blogger/v3/blogs/{blogId}/posts`
- **Parameters**: 
  - `key`: API key
  - `maxResults`: Number of posts to fetch (default: 10)
  - `fields`: Specific fields to retrieve

### Content Processing:
1. **Read Time Calculation**: Estimate based on content length (200 words/minute)
2. **Excerpt Generation**: First 150 characters of content with HTML stripped
3. **Category Extraction**: Use first label from post labels
4. **Content Sanitization**: Clean HTML content for excerpt display

## Frontend Integration Changes

### Mock Data Replacement:
- Replace `mockBlogData` with real API calls
- Update `Blog.jsx` component to handle loading states
- Add error handling for failed API calls
- Implement click-to-redirect functionality

### New Features:
1. **Loading States**: Show skeleton loading while fetching
2. **Error States**: Display friendly error messages
3. **Refresh Button**: Allow manual refresh of blog posts
4. **External Link Icon**: Indicate posts redirect to blogger

## Database Schema

### Blog Posts Cache Table:
```javascript
{
  _id: ObjectId,
  blogId: String,
  postId: String,
  title: String,
  excerpt: String,
  content: String,
  publishDate: Date,
  readTime: String,
  category: String,
  url: String,
  author: String,
  featuredImage: String,
  cachedAt: Date,
  isActive: Boolean
}
```

### Contact Messages Table:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  submittedAt: Date,
  ipAddress: String (optional),
  status: String // 'new', 'read', 'responded'
}
```

## Implementation Steps

### Phase 1: Backend Setup
1. Install required packages (`axios`, `node-html-parser`)
2. Create blog service for Google API integration
3. Implement caching mechanism
4. Create API endpoints
5. Add error handling and logging

### Phase 2: Frontend Integration
1. Remove mock data imports
2. Create API service functions
3. Update Blog component with real data
4. Add loading and error states
5. Implement click-to-redirect functionality

### Phase 3: Contact Form
1. Implement backend contact endpoint
2. Add email notification (optional)
3. Update frontend form to use API
4. Add success/error feedback

## Environment Variables Required

```env
# Google Blogger API
GOOGLE_API_KEY=your_google_api_key_here
BLOGGER_BLOG_ID=your_blogger_blog_id_here

# Optional: Email configuration for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Error Handling Strategy

1. **API Failures**: Fall back to cached data if available
2. **Rate Limits**: Implement exponential backoff
3. **Network Issues**: Show user-friendly error messages
4. **Invalid Data**: Sanitize and validate all external content

## Security Considerations

1. **Rate Limiting**: Prevent API abuse
2. **Input Validation**: Sanitize contact form inputs
3. **CORS**: Configure for portfolio domain only
4. **API Key Protection**: Store in environment variables only

## Testing Strategy

1. **Unit Tests**: API functions and data processing
2. **Integration Tests**: Full API endpoints
3. **Manual Testing**: Blog post fetching and display
4. **Error Scenario Testing**: API failures, network issues

This contract ensures seamless integration between the frontend portfolio and Google Blogger backend, providing a professional, dynamic blog section that stays automatically updated.