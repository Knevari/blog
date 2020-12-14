from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.authentication import TokenAuthentication

from core.models import Post, Comment, UserProfile
from core.serializers import PostSerializer, CommentSerializer, UserSerializer

from .permissions import IsOwner, IsUser


class PostViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    serializer_class = PostSerializer
    queryset = Post.objects.all().select_related('owner')


class CommentViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner, IsAuthenticatedOrReadOnly)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class UserViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUser,)
