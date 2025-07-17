from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import Metric, User


class FeatureFlagSerializer(serializers.Serializer):
    featureName = serializers.CharField()
    is_enabled = serializers.BooleanField()

    def to_representation(self, instance):
        user_role = self.context.get("user_role", None)
        user_id = self.context.get("user_id", None)

        return {
            "featureName": instance.name,
            "is_enabled": instance.is_enabled_for_user(user_id, user_role),
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "role", "full_name", "email")
        read_only_fields = ("full_name",)


class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            try:
                user = User.objects.get(email=email)
                username = user.username
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid email or password.")

            user = authenticate(username=username, password=password)

            if not user:
                raise serializers.ValidationError("Invalid email or password.")

            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")

            data["user"] = user
        else:
            raise serializers.ValidationError("Must include email and password.")

        return data
