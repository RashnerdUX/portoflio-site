# blog/views.py
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Category, Tag, Post, Interest, Quote
from .serializers import (
    CategorySerializer, TagSerializer, PostListSerializer,
    PostDetailSerializer, InterestSerializer, QuoteSerializer
)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class PostListView(generics.ListAPIView):
    serializer_class = PostListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'tags', 'featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_at', 'view_count']
    ordering = ['-featured', '-published_at']
    
    def get_queryset(self):
        return Post.objects.filter(status='published', published_at__lte=timezone.now())

class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Post.objects.filter(status='published')
    
    def get_object(self):
        obj = super().get_object()
        # Increment view count
        obj.view_count += 1
        obj.save(update_fields=['view_count'])
        return obj

class InterestListView(generics.ListAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    ordering = ['-featured', 'order']

class QuoteListView(generics.ListAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    ordering = ['-featured', '-created_at']

@api_view(['GET'])
def blog_summary(request):
    """Summary endpoint for blog homepage"""
    featured_posts = Post.objects.filter(
        featured=True, 
        status='published',
        published_at__lte=timezone.now()
    )[:3]
    
    recent_posts = Post.objects.filter(
        status='published',
        published_at__lte=timezone.now()
    )[:5]
    
    categories = Category.objects.all()
    featured_quote = Quote.objects.filter(featured=True).first()
    
    return Response({
        'featured_posts': PostListSerializer(featured_posts, many=True).data,
        'recent_posts': PostListSerializer(recent_posts, many=True).data,
        'categories': CategorySerializer(categories, many=True).data,
        'featured_quote': QuoteSerializer(featured_quote).data if featured_quote else None,
        'total_posts': Post.objects.filter(status='published').count(),
    })