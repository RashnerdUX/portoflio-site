# core/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, SiteConfiguration
from .serializers import ContactMessageSerializer, SiteConfigurationSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def perform_create(self, serializer):
        message = serializer.save()
        
        # Send email notification (optional)
        try:
            send_mail(
                subject=f"New Contact Message: {message.subject}",
                message=f"From: {message.name} ({message.email})\n\n{message.message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass  # Don't fail if email sending fails

@api_view(['GET'])
def site_configuration(request):
    """Get site configuration"""
    config = SiteConfiguration.objects.first()
    if config:
        return Response(SiteConfigurationSerializer(config).data)
    return Response({
        'site_name': 'My Portfolio',
        'tagline': '',
        'meta_description': '',
        'meta_keywords': '',
        'maintenance_mode': False
    })
