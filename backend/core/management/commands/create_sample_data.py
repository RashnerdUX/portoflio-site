from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from portfolio.models import Profile, Project, Experience, Education
from blog.models import Post, Interest, Quote

class Command(BaseCommand):
    help = 'Create sample data for development'
    
    def handle(self, *args, **options):
        # Create sample profile
        if not Profile.objects.exists():
            Profile.objects.create(
                name="Your Name",
                title="Full Stack Developer",
                bio="<p>Passionate developer with expertise in Python, Django, and React. I love creating efficient solutions and exploring new technologies.</p>",
                email="your.email@example.com",
                location="Your City",
                github="https://github.com/yourusername",
                linkedin="https://linkedin.com/in/yourusername"
            )
        
        # Create sample posts
        sample_posts = [
            {
                'title': 'My Journey into Web Development',
                'excerpt': 'How I started my career in web development and what I learned along the way.',
                'content': '<p>This is where I share my journey into web development...</p>',
                'status': 'published',
                'published_at': timezone.now() - timedelta(days=5)
            },
            {
                'title': 'Building Modern APIs with Django REST Framework',
                'excerpt': 'A comprehensive guide to building robust APIs using Django REST Framework.',
                'content': '<p>Django REST Framework is a powerful toolkit for building APIs...</p>',
                'status': 'published',
                'published_at': timezone.now() - timedelta(days=2)
            }
        ]
        
        for post_data in sample_posts:
            if not Post.objects.filter(title=post_data['title']).exists():
                Post.objects.create(**post_data)
        
        # Create sample interests
        sample_interests = [
            {
                'title': 'Creative Writing',
                'description': '<p>I enjoy writing short stories and exploring different narrative styles.</p>',
                'icon': 'pen-tool'
            },
            {
                'title': 'Photography',
                'description': '<p>Capturing moments and exploring the world through my lens.</p>',
                'icon': 'camera'
            }
        ]
        
        for interest_data in sample_interests:
            if not Interest.objects.filter(title=interest_data['title']).exists():
                Interest.objects.create(**interest_data)
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
