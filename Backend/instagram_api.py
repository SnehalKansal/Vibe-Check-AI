import os
import requests
from typing import Dict, List, Any, Optional
from urllib.parse import urlencode
import json
import random

class InstagramBusinessAPI:
    """
    Instagram Business API integration for accessing business account data.
    This provides access to public business profiles and their media.
    """
    
    def __init__(self):
        self.app_id = os.getenv("INSTAGRAM_APP_ID")
        self.app_secret = os.getenv("INSTAGRAM_APP_SECRET")
        self.page_access_token = os.getenv("INSTAGRAM_PAGE_ACCESS_TOKEN")
        self.business_account_id = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")
        self.base_url = "https://graph.facebook.com/v18.0"
        
    def validate_page_access_token(self) -> Dict[str, Any]:
        """
        Validate the Page Access Token and check its permissions.
        Returns validation status and token info.
        """
        if not self.page_access_token:
            return {
                "valid": False,
                "error": "No page access token configured",
                "suggestion": "Add INSTAGRAM_PAGE_ACCESS_TOKEN to .env file"
            }
        
        try:
            # Test the token by making a simple API call
            url = f"{self.base_url}/me"
            params = {
                "access_token": self.page_access_token,
                "fields": "id,name"
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 190:
                return {
                    "valid": False,
                    "error": "Invalid or expired access token",
                    "suggestion": "Generate a new Page Access Token from Facebook Graph API Explorer",
                    "status_code": 190
                }
            elif response.status_code == 403:
                return {
                    "valid": False, 
                    "error": "Token lacks required permissions",
                    "suggestion": "Ensure token has pages_read_engagement and instagram_basic permissions",
                    "status_code": 403
                }
            
            response.raise_for_status()
            token_info = response.json()
            
            return {
                "valid": True,
                "token_info": token_info,
                "message": f"Token valid for: {token_info.get('name', 'Unknown')}"
            }
            
        except requests.exceptions.RequestException as e:
            return {
                "valid": False,
                "error": f"Token validation failed: {str(e)}",
                "suggestion": "Check internet connection and token format"
            }
        
    def validate_page_access_token(self) -> Dict[str, Any]:
        """
        Validate the Page Access Token and check its permissions.
        Returns validation status and token info.
        """
        if not self.page_access_token:
            return {
                "valid": False,
                "error": "No page access token configured",
                "suggestion": "Add INSTAGRAM_PAGE_ACCESS_TOKEN to .env file"
            }
        
        try:
            # Test the token by making a simple API call
            url = f"{self.base_url}/me"
            params = {
                "access_token": self.page_access_token,
                "fields": "id,name"
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 190:
                return {
                    "valid": False,
                    "error": "Invalid or expired access token",
                    "suggestion": "Generate a new Page Access Token from Facebook Graph API Explorer",
                    "status_code": 190
                }
            elif response.status_code == 403:
                return {
                    "valid": False, 
                    "error": "Token lacks required permissions",
                    "suggestion": "Ensure token has pages_read_engagement and instagram_basic permissions",
                    "status_code": 403
                }
            
            response.raise_for_status()
            token_info = response.json()
            
            return {
                "valid": True,
                "token_info": token_info,
                "message": f"Token valid for: {token_info.get('name', 'Unknown')}"
            }
            
        except requests.exceptions.RequestException as e:
            return {
                "valid": False,
                "error": f"Token validation failed: {str(e)}",
                "suggestion": "Check internet connection and token format"
            }
        """
        Get app access token for Instagram Business API.
        This token allows access to public business account data.
        """
        try:
            url = f"{self.base_url}/oauth/access_token"
            params = {
                "client_id": self.app_id,
                "client_secret": self.app_secret,
                "grant_type": "client_credentials"
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            
            token_data = response.json()
            return token_data.get("access_token")
            
        except Exception as e:
            print(f"App token fetch failed: {e}")
            return None
    
    def search_instagram_business_account(self, username: str, access_token: str) -> Optional[str]:
        """
        Search for Instagram Business Account ID by username.
        """
        try:
            
            url = f"{self.base_url}/ig_hashtag_search"
            params = {
                "user_id": self.app_id,  
                "q": username,
                "access_token": access_token
            }
            print(f"Instagram Business Account search for @{username} - requires page connection")
            return None
            
        except Exception as e:
            print(f"Business account search failed: {e}")
            return None
    
    def get_instagram_business_media(self, user_id: str, access_token: str, limit: int = 12) -> List[Dict[str, Any]]:
        """
        Get media from Instagram Business account.
        """
        try:
            url = f"{self.base_url}/{user_id}/media"
            params = {
                "fields": "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count",
                "limit": limit,
                "access_token": access_token
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()
            
            return response.json().get("data", [])
            
        except Exception as e:
            print(f"Business media fetch failed: {e}")
            return []
    
    async def get_business_account_data(self, username: str, max_posts: int = 12) -> Optional[Dict[str, Any]]:
        """
        Get Instagram Business account data.
        First tries using configured business account, then attempts search.
        """
        try:
            # Method 1: Use configured page access token and business account ID
            if self.page_access_token and self.business_account_id:
                print(f"Using configured Instagram Business Account for @{username}...")
                return await self._get_configured_business_data(username, max_posts)
            
            # Method 2: Try with app access token (limited functionality)
            access_token = self.get_app_access_token()
            if access_token:
                print(f"Attempting Instagram Business API search for @{username}...")
                return await self._search_business_account(username, access_token, max_posts)
            
            print("No valid Instagram Business API configuration found")
            return None
            
        except Exception as e:
            print(f"Instagram Business API failed: {e}")
            return None
    
    async def _get_configured_business_data(self, username: str, max_posts: int) -> Optional[Dict[str, Any]]:
        """
        Get data from a pre-configured Instagram Business account.
        """
        try:
            # First validate the access token
            validation_result = self.validate_page_access_token()
            if not validation_result["valid"]:
                print(f"❌ Instagram API Token Error: {validation_result['error']}")
                print(f"💡 Solution: {validation_result['suggestion']}")
                
                # Return None to trigger fallback to demo data
                return None
            
            print(f"✅ Instagram API Token Valid: {validation_result['message']}")
            
            # Try to get media data
            media_data = self.get_instagram_business_media(
                self.business_account_id, 
                self.page_access_token, 
                max_posts
            )
            
            if not media_data:
                print("⚠️ No media data returned from Instagram Business API")
                return None
            
            # Format data to match expected structure
            posts_data = []
            for media in media_data:
                post_data = {
                    "caption": media.get("caption", ""),
                    "url": media.get("permalink"),
                    "image_url": media.get("media_url") or media.get("thumbnail_url"),
                    "media_type": media.get("media_type", "IMAGE"),
                    "timestamp": media.get("timestamp"),
                    "likes": media.get("like_count", 0),
                    "comments": media.get("comments_count", 0)
                }
                posts_data.append(post_data)
            
            return {
                "username": username,
                "bio": f"Instagram Business profile for @{username}",
                "posts": posts_data,
                "source": "instagram_business_api",
                "note": f"Real data from Instagram Business API for @{username}"
            }
            
        except Exception as e:
            print(f"❌ Instagram Business API Error: {e}")
            if "190" in str(e) or "OAuthException" in str(e):
                print("💡 Token expired or invalid. Please regenerate your Page Access Token.")
            elif "403" in str(e):
                print("💡 Permission denied. Check if your token has Instagram Business permissions.")
            else:
                print("💡 Check your internet connection and API configuration.")
            return None
    
    async def _search_business_account(self, username: str, access_token: str, max_posts: int) -> Optional[Dict[str, Any]]:
        """
        Search for business account (limited functionality with app token).
        """
        try:
            # App access tokens have very limited functionality for Instagram Business API
            # They mainly work for webhook verification and basic app info
            print(f"App token search for @{username} has limited functionality")
            return None
            
        except Exception as e:
            print(f"Business account search failed: {e}")
            return None

def get_enhanced_demo_data(username: str, max_posts: int = 12) -> Dict[str, Any]:
    """
    Enhanced demo function that provides realistic sample data.
    This is used when Instagram API credentials are configured but actual API access is limited.
    Note: Real Instagram posts would be shown here if the user authorizes the app.
    """
    sample_posts = [
        {
            "caption": f"stuDYING",
            "url": f"https://www.instagram.com/p/DO3Nvysid1_/{username.replace('.', '_')}",
            "image_url": "https://i.pinimg.com/736x/ea/0b/a7/ea0ba70c5d5ec8340b21b8b9806fc281.jpg"
        },
        {
            "caption": f"Coffee it is ☕✨",
            "url": f"https://www.instagram.com/p/DO3Nm2RiQhG/{username.replace('.', '_')}",
            "image_url": "https://i.pinimg.com/200x/50/15/4b/50154b6309f5230aeb82503b7b189d99.jpg"
        }
    ]
    
    return {
        "username": username,
        "bio": f"One minute I'm the shit next minute I'm in shit",
        "posts": sample_posts[:max_posts],
        "source": "enhanced_demo",
        "note": f"🔧 Using enhanced demo data for @{username}. Instagram API credentials are configured but user authorization required for real posts."
    }

async def get_instagram_profile_data(username: str = None, max_posts: int = 12) -> Dict[str, Any]:
    """
    Get Instagram profile data using Instagram Business API or enhanced demo content.
    Tries Business API first, then falls back to enhanced demo data.
    """
    if not username:
        return get_enhanced_demo_data("demo_user", max_posts)
    
    # Clean username input
    username = username.strip()
    if username.startswith('https://') or username.startswith('http://'):
        # Extract username from Instagram URL
        try:
            if 'instagram.com/' in username:
                username = username.split('instagram.com/')[-1].strip('/')
        except:
            pass
    
    # Remove @ symbol if present
    username = username.lstrip('@')
    
    # Try Instagram Business API first
    business_api = InstagramBusinessAPI()
    if business_api.app_id and business_api.app_secret:
        print(f"Attempting to fetch Instagram Business data for @{username}...")
        business_data = await business_api.get_business_account_data(username, max_posts)
        if business_data:
            return business_data
    
    # Fallback to enhanced demo data
    print(f"Using enhanced demo data for @{username}...")
    return get_enhanced_demo_data(username, max_posts)