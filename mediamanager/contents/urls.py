from rest_framework import routers
from . import views
from django.urls import path, include

router = routers.DefaultRouter()
router.register("api/contents", views.ContentViewSet, "contents")
router.register("api/media", views.MediaViewSet, "media")
urlpatterns = router.urls
