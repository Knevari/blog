from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework import filters, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from core.models import Post, Comment, UserProfile, Tag, Like
from core.serializers import PostSerializer, CommentSerializer, CommentListSerializer, UserSerializer, TagSerializer, LikeSerializer

from .permissions import IsOwner, IsUser


class PostViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by("-created_at")
    print("aqui")
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'tag__title']

    @action(detail=True, methods=['get'])
    def comments(self, request, pk):
        comments = Comment.objects.all().filter(post=pk).order_by("-created_at")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    queryset = Comment.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return CommentListSerializer
        else:
            return CommentSerializer


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
