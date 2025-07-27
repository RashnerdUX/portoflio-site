# core/serializers.py
from rest_framework import serializers
from .models import ContactMessage, SiteConfiguration

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            'site_name', 'tagline', 'meta_description', 
            'meta_keywords', 'maintenance_mode'
        ]
