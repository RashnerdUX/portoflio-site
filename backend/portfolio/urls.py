# portfolio/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('skills/', views.SkillListView.as_view(), name='skill-list'),
    path('experience/', views.ExperienceListView.as_view(), name='experience-list'),
    path('education/', views.EducationListView.as_view(), name='education-list'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('profile/', views.ProfileDetailView.as_view(), name='profile-detail'),
    path('summary/', views.portfolio_summary, name='portfolio-summary'),
]