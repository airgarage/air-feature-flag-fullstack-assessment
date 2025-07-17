from django.contrib import admin
from .models import FeatureFlag, FeatureFlagRole, User, Metric


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


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ["name", "type", "last_month_total", "current_year_total"]
    list_filter = ["type"]
    search_fields = ["name"]


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "full_name", "role"]
    list_filter = ["email", "role"]
    search_fields = ["email", "role"]
    exclude = ("password", "user_permissions")
