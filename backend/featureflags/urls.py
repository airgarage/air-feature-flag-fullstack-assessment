from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"feature-flags", views.FeatureFlagViewSet, basename="feature-flags")
router.register(r"metrics", views.MetricViewSet, basename="metrics")
router.register(r"auth", views.AuthViewSet, basename="auth")
