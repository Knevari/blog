from core.models import Post, Comment, UserProfile
from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.conf import settings


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email',
                  'groups', 'is_staff', 'is_superuser']


class UserSerializer(serializers.ModelSerializer):
    user = AdminSerializer()
    username = serializers.CharField(source="user_set__username")

    class Meta:
        model = UserProfile
        fields = ['user', 'username']

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
    expandable_fields = {
        "owner": (UserSerializer, {"source": "owner"}),
    }

    class Meta:
        model = Post
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
