from core.models import Post, Comment
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    model = Post
    fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    model = Comment
    fields = '__all__'
