from core.models import Post, Comment, UserProfile, Tag, Like, Post
from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.conf import settings


class CurrentUserProfile(object):
    def set_context(self, serializer_field):
        self.user_obj = UserProfile.objects.get(
            user=serializer_field.context['request'].user)

    def __call__(self):
        return self.user_obj


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
    # current_user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    tags = TagSerializer(source="tag", read_only=True, many=True)
    comment_count = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    def get_comment_count(self, obj):
        return Comment.objects.filter(post=obj).count()

    def get_likes(self, obj):
        return Like.objects.filter(post=obj).count()

    class Meta:
        model = Post
        fields = ("author", "id", "title", "content", "tag",
                  "created_at", "owner", "tags", "comment_count", "likes")
        extra_kwargs = {"tag": {"required": False}}

    def create(self, validated_data):
        owner = UserProfile.objects.get(user=serializers.CurrentUserDefault())
        tags = validated_data.pop('tag')
        post = Post.objects.create(owner=owner, **validated_data)
        post.tag.set(tags)
        post.save()
        return post


class CommentListSerializer(serializers.ModelSerializer):
    owner = UserProfileSerializer()

    class Meta:
        model = Comment
        fields = ("id", "content", "created_at", "owner", "post")


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=CurrentUserProfile()
    )

    class Meta:
        model = Comment
        fields = ("id", "content", "owner", "post")
