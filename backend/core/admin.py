# core/admin.py
from django.contrib import admin
from .models import ContactMessage, SiteConfiguration

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'read', 'replied']
    list_filter = ['read', 'replied', 'created_at']
    list_editable = ['read', 'replied']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    def has_add_permission(self, request):
        return False  # Prevent manual creation

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'maintenance_mode']
    
    def has_add_permission(self, request):
        return not SiteConfiguration.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False
