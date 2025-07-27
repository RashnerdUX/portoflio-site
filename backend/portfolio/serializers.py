# portfolio/serializers.py
from rest_framework import serializers
from .models import Skill, Experience, Education, Project, ProjectImage, Profile

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level', 'category']

class ExperienceSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'location', 'start_date', 
            'end_date', 'current', 'description', 'technologies'
        ]

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'institution', 'degree', 'field_of_study', 
            'start_date', 'end_date', 'current', 'gpa', 'description'
        ]

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']

class ProjectListSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'image', 
            'technologies', 'github_url', 'live_url', 'status', 
            'featured', 'start_date', 'end_date'
        ]

class ProjectDetailSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'technologies', 'github_url', 'live_url', 'image', 'images',
            'status', 'featured', 'start_date', 'end_date'
        ]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'bio', 'email', 'phone', 'location',
            'website', 'linkedin', 'github', 'twitter', 'resume', 'profile_image'
        ]
