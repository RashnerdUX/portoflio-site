# portfolio/admin.py
from django.contrib import admin
from .models import Skill, Experience, Education, Project, ProjectImage, Profile

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'category', 'order']
    list_filter = ['level', 'category']
    list_editable = ['order']
    ordering = ['category', 'order', 'name']

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'featured', 'start_date', 'order']
    list_filter = ['status', 'featured', 'technologies']
    list_editable = ['featured', 'order']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    inlines = [ProjectImageInline]
    date_hierarchy = 'start_date'
    ordering = ['-featured', '-start_date']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'start_date', 'end_date', 'current', 'order']
    list_filter = ['current', 'technologies']
    list_editable = ['order']
    filter_horizontal = ['technologies']
    date_hierarchy = 'start_date'
    ordering = ['-start_date', 'order']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree', 'start_date', 'end_date', 'current', 'order']
    list_filter = ['current']
    list_editable = ['order']
    date_hierarchy = 'start_date'
    ordering = ['-start_date', 'order']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email']
    
    def has_add_permission(self, request):
        # Only allow one profile instance
        return not Profile.objects.exists()
