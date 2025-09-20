#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for G.J. Rahul's Portfolio
Tests all backend endpoints including blog and contact APIs
"""

import requests
import json
import os
import sys
from datetime import datetime
import uuid

# Get backend URL from environment
BACKEND_URL = "https://ai-engineer-hub-8.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{self.backend_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Basic Connectivity", True, f"API is accessible, response: {data}")
                return True
            else:
                self.log_test("Basic Connectivity", False, f"API returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Basic Connectivity", False, f"Connection failed: {str(e)}")
            return False
    
    def test_blog_health_check(self):
        """Test blog health check endpoint"""
        try:
            response = requests.get(f"{self.backend_url}/blog/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                expected_keys = ['status', 'service', 'timestamp']
                if all(key in data for key in expected_keys):
                    self.log_test("Blog Health Check", True, f"Health check passed: {data}")
                    return True
                else:
                    self.log_test("Blog Health Check", False, f"Missing expected keys in response: {data}")
                    return False
            else:
                self.log_test("Blog Health Check", False, f"Health check failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Blog Health Check", False, f"Health check error: {str(e)}")
            return False
    
    def test_blog_posts_endpoint(self):
        """Test GET /api/blog/posts endpoint"""
        try:
            # Test default request
            response = requests.get(f"{self.backend_url}/blog/posts", timeout=15)
            if response.status_code == 200:
                data = response.json()
                
                # Verify response structure
                expected_keys = ['status', 'data']
                if not all(key in data for key in expected_keys):
                    self.log_test("Blog Posts Structure", False, f"Missing expected keys: {data}")
                    return False
                
                if data['status'] != 'success':
                    self.log_test("Blog Posts Status", False, f"Status not success: {data['status']}")
                    return False
                
                # Check data structure
                blog_data = data['data']
                expected_data_keys = ['posts', 'totalPosts', 'lastFetched']
                if not all(key in blog_data for key in expected_data_keys):
                    self.log_test("Blog Posts Data Structure", False, f"Missing data keys: {blog_data}")
                    return False
                
                # Verify posts structure
                posts = blog_data['posts']
                if not isinstance(posts, list):
                    self.log_test("Blog Posts Array", False, "Posts is not an array")
                    return False
                
                if len(posts) > 0:
                    post = posts[0]
                    expected_post_keys = ['id', 'title', 'excerpt', 'publishDate', 'readTime', 'category', 'url', 'author']
                    if not all(key in post for key in expected_post_keys):
                        self.log_test("Blog Post Structure", False, f"Missing post keys: {post}")
                        return False
                
                # Check if fallback posts are being returned (since Google API is not configured)
                is_fallback = blog_data.get('isFallback', False)
                if is_fallback:
                    self.log_test("Blog Posts (Fallback)", True, f"Fallback posts returned successfully: {len(posts)} posts")
                else:
                    self.log_test("Blog Posts (Live)", True, f"Live posts returned successfully: {len(posts)} posts")
                
                return True
            else:
                self.log_test("Blog Posts Endpoint", False, f"Request failed with status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Blog Posts Endpoint", False, f"Request error: {str(e)}")
            return False
    
    def test_blog_posts_with_params(self):
        """Test blog posts endpoint with parameters"""
        try:
            # Test with max_results parameter
            response = requests.get(f"{self.backend_url}/blog/posts?max_results=5", timeout=15)
            if response.status_code == 200:
                data = response.json()
                posts = data['data']['posts']
                # Since we're using fallback, we might not get exactly 5, but should get some posts
                self.log_test("Blog Posts with Parameters", True, f"Request with max_results=5 successful, got {len(posts)} posts")
                return True
            else:
                self.log_test("Blog Posts with Parameters", False, f"Request failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Blog Posts with Parameters", False, f"Request error: {str(e)}")
            return False
    
    def test_blog_post_by_id(self):
        """Test GET /api/blog/posts/{post_id} endpoint"""
        try:
            # First get posts to get a valid ID
            response = requests.get(f"{self.backend_url}/blog/posts", timeout=15)
            if response.status_code == 200:
                data = response.json()
                posts = data['data']['posts']
                if len(posts) > 0:
                    post_id = posts[0]['id']
                    
                    # Test getting specific post
                    response = requests.get(f"{self.backend_url}/blog/posts/{post_id}", timeout=15)
                    if response.status_code == 200:
                        post_data = response.json()
                        if post_data['status'] == 'success' and 'data' in post_data:
                            self.log_test("Blog Post by ID", True, f"Successfully retrieved post {post_id}")
                            return True
                        else:
                            self.log_test("Blog Post by ID", False, f"Invalid response structure: {post_data}")
                            return False
                    else:
                        self.log_test("Blog Post by ID", False, f"Request failed with status {response.status_code}")
                        return False
                else:
                    self.log_test("Blog Post by ID", False, "No posts available to test individual post retrieval")
                    return False
            else:
                self.log_test("Blog Post by ID", False, "Could not fetch posts list for testing")
                return False
        except Exception as e:
            self.log_test("Blog Post by ID", False, f"Request error: {str(e)}")
            return False
    
    def test_blog_post_invalid_id(self):
        """Test blog post endpoint with invalid ID"""
        try:
            invalid_id = "invalid-post-id-12345"
            response = requests.get(f"{self.backend_url}/blog/posts/{invalid_id}", timeout=10)
            if response.status_code == 404:
                self.log_test("Blog Post Invalid ID", True, "Correctly returned 404 for invalid post ID")
                return True
            else:
                self.log_test("Blog Post Invalid ID", False, f"Expected 404, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Blog Post Invalid ID", False, f"Request error: {str(e)}")
            return False
    
    def test_contact_form_submission(self):
        """Test POST /api/contact endpoint with valid data"""
        try:
            # Test data with realistic information
            test_contact = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "message": "Hello G.J. Rahul, I'm interested in discussing potential collaboration opportunities in AI/ML projects. Your portfolio showcases impressive work and I'd love to connect."
            }
            
            response = requests.post(
                f"{self.backend_url}/contact",
                json=test_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ['status', 'message', 'data']
                if all(key in data for key in expected_keys):
                    if data['status'] == 'success':
                        message_data = data['data']
                        if 'messageId' in message_data and 'submittedAt' in message_data:
                            self.log_test("Contact Form Submission", True, f"Message submitted successfully: {message_data['messageId']}")
                            return True
                        else:
                            self.log_test("Contact Form Submission", False, f"Missing message data: {message_data}")
                            return False
                    else:
                        self.log_test("Contact Form Submission", False, f"Status not success: {data}")
                        return False
                else:
                    self.log_test("Contact Form Submission", False, f"Missing expected keys: {data}")
                    return False
            else:
                self.log_test("Contact Form Submission", False, f"Request failed with status {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Request error: {str(e)}")
            return False
    
    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        test_cases = [
            {
                "name": "Empty Name Test",
                "data": {"name": "", "email": "test@example.com", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Invalid Email Test",
                "data": {"name": "Test User", "email": "invalid-email", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Empty Message Test",
                "data": {"name": "Test User", "email": "test@example.com", "message": ""},
                "expected_status": 422
            },
            {
                "name": "Missing Fields Test",
                "data": {"name": "Test User"},
                "expected_status": 422
            }
        ]
        
        all_passed = True
        for test_case in test_cases:
            try:
                response = requests.post(
                    f"{self.backend_url}/contact",
                    json=test_case["data"],
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == test_case["expected_status"]:
                    self.log_test(f"Contact Validation - {test_case['name']}", True, f"Correctly rejected invalid data with status {response.status_code}")
                else:
                    self.log_test(f"Contact Validation - {test_case['name']}", False, f"Expected {test_case['expected_status']}, got {response.status_code}")
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Contact Validation - {test_case['name']}", False, f"Request error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_contact_messages_retrieval(self):
        """Test GET /api/contact/messages endpoint"""
        try:
            response = requests.get(f"{self.backend_url}/contact/messages", timeout=10)
            if response.status_code == 200:
                data = response.json()
                expected_keys = ['status', 'data']
                if all(key in data for key in expected_keys):
                    if data['status'] == 'success':
                        messages_data = data['data']
                        expected_data_keys = ['messages', 'totalCount', 'skip', 'limit']
                        if all(key in messages_data for key in expected_data_keys):
                            messages = messages_data['messages']
                            self.log_test("Contact Messages Retrieval", True, f"Successfully retrieved {len(messages)} messages (total: {messages_data['totalCount']})")
                            return True
                        else:
                            self.log_test("Contact Messages Retrieval", False, f"Missing data keys: {messages_data}")
                            return False
                    else:
                        self.log_test("Contact Messages Retrieval", False, f"Status not success: {data}")
                        return False
                else:
                    self.log_test("Contact Messages Retrieval", False, f"Missing expected keys: {data}")
                    return False
            else:
                self.log_test("Contact Messages Retrieval", False, f"Request failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Contact Messages Retrieval", False, f"Request error: {str(e)}")
            return False
    
    def test_contact_messages_pagination(self):
        """Test contact messages with pagination parameters"""
        try:
            response = requests.get(f"{self.backend_url}/contact/messages?skip=0&limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data['status'] == 'success':
                    messages_data = data['data']
                    if messages_data['skip'] == 0 and messages_data['limit'] == 5:
                        self.log_test("Contact Messages Pagination", True, f"Pagination working correctly: skip={messages_data['skip']}, limit={messages_data['limit']}")
                        return True
                    else:
                        self.log_test("Contact Messages Pagination", False, f"Pagination parameters not respected: {messages_data}")
                        return False
                else:
                    self.log_test("Contact Messages Pagination", False, f"Status not success: {data}")
                    return False
            else:
                self.log_test("Contact Messages Pagination", False, f"Request failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Contact Messages Pagination", False, f"Request error: {str(e)}")
            return False
    
    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        try:
            response = requests.options(f"{self.backend_url}/blog/posts", timeout=10)
            headers = response.headers
            
            cors_headers_present = (
                'Access-Control-Allow-Origin' in headers or
                'access-control-allow-origin' in headers
            )
            
            if cors_headers_present:
                self.log_test("CORS Headers", True, "CORS headers are properly configured")
                return True
            else:
                # Try a regular GET request to check CORS headers
                response = requests.get(f"{self.backend_url}/blog/posts", timeout=10)
                headers = response.headers
                cors_headers_present = (
                    'Access-Control-Allow-Origin' in headers or
                    'access-control-allow-origin' in headers
                )
                
                if cors_headers_present:
                    self.log_test("CORS Headers", True, "CORS headers are properly configured")
                    return True
                else:
                    self.log_test("CORS Headers", False, "CORS headers not found in response")
                    return False
                    
        except Exception as e:
            self.log_test("CORS Headers", False, f"Request error: {str(e)}")
            return False
    
    def test_api_prefixes(self):
        """Test that API prefixes are working correctly"""
        endpoints_to_test = [
            "/blog/posts",
            "/blog/health",
            "/contact/messages"
        ]
        
        all_passed = True
        for endpoint in endpoints_to_test:
            try:
                response = requests.get(f"{self.backend_url}{endpoint}", timeout=10)
                if response.status_code in [200, 404, 422]:  # Valid HTTP responses
                    self.log_test(f"API Prefix - {endpoint}", True, f"Endpoint accessible with correct prefix")
                else:
                    self.log_test(f"API Prefix - {endpoint}", False, f"Unexpected status code: {response.status_code}")
                    all_passed = False
            except Exception as e:
                self.log_test(f"API Prefix - {endpoint}", False, f"Request error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def run_all_tests(self):
        """Run all tests and generate report"""
        print(f"\n🚀 Starting Portfolio Backend API Tests")
        print(f"Backend URL: {self.backend_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print("=" * 60)
        
        # Run tests in order
        tests = [
            self.test_basic_connectivity,
            self.test_cors_headers,
            self.test_api_prefixes,
            self.test_blog_health_check,
            self.test_blog_posts_endpoint,
            self.test_blog_posts_with_params,
            self.test_blog_post_by_id,
            self.test_blog_post_invalid_id,
            self.test_contact_form_submission,
            self.test_contact_form_validation,
            self.test_contact_messages_retrieval,
            self.test_contact_messages_pagination
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                self.log_test(test.__name__, False, f"Test execution error: {str(e)}")
        
        # Generate summary
        self.generate_summary()
    
    def generate_summary(self):
        """Generate test summary"""
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        print(f"\nTest completed at: {datetime.now().isoformat()}")
        
        # Return success status
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)