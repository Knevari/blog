from core.models import Post, Comment, UserProfile, Tag, Like, Post
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


class LikeSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(source="owner")

    class Meta:
        model = Like
        fields = ("id", "post", "author", "created_at")


class PostSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(source="owner", read_only=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Post
        fields = ("author", "id", "title", "content", "tag", "created_at", "owner")
        extra_kwargs = {"tag": {"required": False}}

    def create(self, validated_data):
        print(validated_data)
        author_post = validated_data.pop('owner')
        print(author_post)

        owner = User.objects.get(username=author_post)
        tags = validated_data.pop('tag')
        post = Post.objects.create(owner=owner, **validated_data)
        post.tag.set(tags)
        post.save()
        return post


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
