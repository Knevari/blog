from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from core.views import CommentViewSet, PostViewSet

app_name = "core"

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = router.urls
# urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])
