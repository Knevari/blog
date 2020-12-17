from core.models import Post, Comment, UserProfile, Tag
from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.conf import settings


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'title', 'slug', 'color']


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email',
                  'groups', 'is_staff', 'is_superuser']


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user")
    email = serializers.CharField(source="user")

    class Meta:
        model = UserProfile
        fields = ("id", "username", "email", "avatar")


class UserSerializer(serializers.ModelSerializer):
    user = AdminSerializer()

    class Meta:
        model = UserProfile
        fields = ['user']

    def create(self, validated_data):
        user = validated_data.pop('user')
        groups = user.pop('groups')
        user_obj = User.objects.create(**user)

        if user_obj:
            user_obj.set_password(user['password'])
            user_obj.groups.set(groups)
            user_obj.save()
            return UserProfile.objects.create(user=user_obj, **validated_data)
        return None


class PostSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(source="owner")
    tag = TagSerializer(read_only=False, many=True)

    class Meta:
        model = Post
        fields = ("author", "id", "title", "content",
                  "likes", "tag", "created_at")


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
