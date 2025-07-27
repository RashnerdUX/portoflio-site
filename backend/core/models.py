# core/models.py
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    replied = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"

class SiteConfiguration(models.Model):
    """Global site settings"""
    site_name = models.CharField(max_length=100, default="My Portfolio")
    tagline = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    meta_keywords = models.CharField(max_length=200, blank=True)
    google_analytics_id = models.CharField(max_length=20, blank=True)
    maintenance_mode = models.BooleanField(default=False)
    
    def __str__(self):
        return "Site Configuration"
    
    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"
