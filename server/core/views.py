from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.authentication import TokenAuthentication

from core.models import Post, Comment
from core.serializers import PostSerializer, CommentSerializer

from .permissions import IsOwner


class PostViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner,)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
