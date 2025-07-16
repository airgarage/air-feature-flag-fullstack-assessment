from django.contrib import admin
from .models import FeatureFlag, FeatureFlagRole


class FeatureFlagRoleInline(admin.TabularInline):
    model = FeatureFlagRole
    extra = 1


@admin.register(FeatureFlag)
class FeatureFlagAdmin(admin.ModelAdmin):
    list_display = ["name", "is_enabled", "created_at", "updated_at"]
    list_filter = ["is_enabled", "created_at"]
    search_fields = ["name"]
    inlines = [FeatureFlagRoleInline]


@admin.register(FeatureFlagRole)
class FeatureFlagRoleAdmin(admin.ModelAdmin):
    list_display = ["feature_flag", "role", "rollout_percentage"]
    list_filter = ["role", "feature_flag"]
    search_fields = ["feature_flag__name", "role"]
