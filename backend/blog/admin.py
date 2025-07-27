# blog/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Tag, Post, Interest, Quote

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color_preview', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    def color_preview(self, obj):
        return format_html(
            '<span style="background-color: {}; padding: 5px 10px; border-radius: 3px; color: white;">{}</span>',
            obj.color, obj.color
        )
    color_preview.short_description = 'Color'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'featured', 'category', 'published_at', 'view_count']
    list_filter = ['status', 'featured', 'category', 'tags', 'created_at']
    list_editable = ['status', 'featured']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    date_hierarchy = 'published_at'
    ordering = ['-featured', '-published_at', '-created_at']
    search_fields = ['title', 'excerpt', 'content']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Classification', {
            'fields': ('category', 'tags', 'status', 'featured')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Publishing', {
            'fields': ('published_at', 'reading_time')
        }),
        ('Analytics', {
            'fields': ('view_count',),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        if obj.status == 'published' and not obj.published_at:
            from django.utils import timezone
            obj.published_at = timezone.now()
        super().save_model(request, obj, form, change)

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'order']
    list_editable = ['featured', 'order']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['-featured', 'order']

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['text_preview', 'author', 'featured', 'created_at']
    list_filter = ['featured', 'created_at']
    list_editable = ['featured']
    ordering = ['-featured', '-created_at']
    
    def text_preview(self, obj):
        return obj.text[:100] + '...' if len(obj.text) > 100 else obj.text
    text_preview.short_description = 'Quote'