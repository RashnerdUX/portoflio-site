# portfolio/views.py
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Skill, Experience, Education, Project, Profile
from .serializers import (
    SkillSerializer, ExperienceSerializer, EducationSerializer,
    ProjectListSerializer, ProjectDetailSerializer, ProfileSerializer
)

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'level']

class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(status='completed')
    serializer_class = ProjectListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['featured', 'status']
    search_fields = ['title', 'short_description', 'technologies__name']
    ordering_fields = ['start_date', 'title']
    ordering = ['-featured', '-start_date']

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = 'slug'

class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get_object(self):
        # Return the first (and should be only) profile
        return Profile.objects.first()

@api_view(['GET'])
def portfolio_summary(request):
    """Summary endpoint for homepage"""
    profile = Profile.objects.first()
    featured_projects = Project.objects.filter(featured=True, status='completed')[:3]
    skills_by_category = {}
    
    for skill in Skill.objects.all():
        if skill.category not in skills_by_category:
            skills_by_category[skill.category] = []
        skills_by_category[skill.category].append(SkillSerializer(skill).data)
    
    return Response({
        'profile': ProfileSerializer(profile).data if profile else None,
        'featured_projects': ProjectListSerializer(featured_projects, many=True).data,
        'skills_by_category': skills_by_category,
        'experience_count': Experience.objects.count(),
        'project_count': Project.objects.filter(status='completed').count(),
    })