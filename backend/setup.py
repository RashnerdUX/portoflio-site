# Initial setup script - setup.py
import os
import django
from django.core.management import execute_from_command_line

def setup_project():
    """Initial project setup"""
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
    django.setup()
    
    # Create database tables
    print("Creating database tables...")
    execute_from_command_line(['manage.py', 'makemigrations'])
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Create superuser
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        print("Creating superuser...")
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')
        print("Superuser created: username=admin, password=admin")
    
    # Create initial data
    from portfolio.models import Profile, Skill
    from blog.models import Category
    from core.models import SiteConfiguration
    
    # Create site configuration
    if not SiteConfiguration.objects.exists():
        SiteConfiguration.objects.create(
            site_name="My Portfolio",
            tagline="Full Stack Developer & Creative Writer",
            meta_description="Portfolio showcasing my development work and creative interests"
        )
        print("Site configuration created")
    
    # Create sample categories
    categories = ['Technology', 'Creative Writing', 'Personal Thoughts', 'Tutorials']
    for cat_name in categories:
        if not Category.objects.filter(name=cat_name).exists():
            Category.objects.create(name=cat_name)
    print("Sample categories created")
    
    # Create sample skills
    sample_skills = [
        ('Python', 'advanced', 'backend'),
        ('Django', 'advanced', 'backend'),
        ('React', 'intermediate', 'frontend'),
        ('Tailwind CSS', 'intermediate', 'frontend'),
        ('PostgreSQL', 'intermediate', 'database'),
        ('Git', 'advanced', 'tools'),
    ]
    
    for name, level, category in sample_skills:
        if not Skill.objects.filter(name=name).exists():
            Skill.objects.create(name=name, level=level, category=category)
    print("Sample skills created")
    
    print("\nSetup complete!")
    print("You can now run: python manage.py runserver")
    print("Admin panel: http://localhost:8000/admin/")
    print("Login: admin / admin")

if __name__ == '__main__':
    setup_project()
