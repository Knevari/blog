from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters

from core.models import Post, Comment, UserProfile, Tag, Like
from core.serializers import PostSerializer, CommentSerializer, UserSerializer, TagSerializer, LikeSerializer

from .permissions import IsOwner, IsUser


class PostViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    serializer_class = PostSerializer
    queryset = Post.objects.all().select_related('owner').prefetch_related('tag').order_by("-created_at")
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'tag__title']


class CommentViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class UserViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUser,)


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = TagSerializer

class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwner)
    serializer_class = LikeSerializer