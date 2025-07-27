# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    path('posts/', views.PostListView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', views.PostDetailView.as_view(), name='post-detail'),
    path('interests/', views.InterestListView.as_view(), name='interest-list'),
    path('quotes/', views.QuoteListView.as_view(), name='quote-list'),
    path('summary/', views.blog_summary, name='blog-summary'),
]