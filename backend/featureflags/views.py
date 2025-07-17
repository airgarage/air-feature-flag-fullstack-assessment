from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .serializers import (
    FeatureFlagSerializer,
    UserSerializer,
    MetricSerializer,
    LoginSerializer,
)
from .models import FeatureFlag, Metric


class FeatureFlagViewSet(viewsets.ViewSet):
    def list(self, request):
        feature_flags = FeatureFlag.objects.all().prefetch_related("role_configs")

        user = request.user
        user_context = {
            "user_role": user.role if user.is_authenticated else None,
            "user_id": str(user.id) if user.is_authenticated else None,
        }

        serializer = FeatureFlagSerializer(
            feature_flags, many=True, context=user_context
        )

        return Response(serializer.data)


class MetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer
    lookup_field = "type"


class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)

            user_serializer = UserSerializer(user)
            return Response(
                {"success": True, "user": user_serializer.data},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"])
    def logout(self, request):
        logout(request)
        return Response(
            {
                "success": True,
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
