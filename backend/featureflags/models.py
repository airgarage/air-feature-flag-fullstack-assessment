from django.db import models
from django.contrib.auth.models import AbstractUser
from .utils import get_deterministic_value


class UserRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    OWNER = "OWNER", "Owner"
    EMPLOYEE = "EMPLOYEE", "Employee"
    ENFORCER = "ENFORCER", "Enforcer"
    VISITOR = "VISITOR", "Visitor"
    DRIVER = "DRIVER", "Driver"


class Feature(models.TextChoices):
    PROFILE = "PROFILE", "Profile"
    DYNAMIC_PRICE = "DYNAMIC_PRICE", "Dynamic Price"
    REVENUE_METRICS = "REVENUE_METRICS", "Revenue Metrics"
    OCCUPANCY_METRICS = "OCCUPANCY_METRICS", "Occupancy Metrics"
    ENFORCEMENT_METRICS = "ENFORCEMENT_METRICS", "Enforcement Metrics"
    VISITOR_DASHBOARD = "VISITOR_DASHBOARD", "Visitor Dashboard"


class MetricType(models.TextChoices):
    REVENUE = "REVENUE", "Revenue"
    OCCUPANCY = "OCCUPANCY", "Occupancy"
    ENFORCEMENT = "ENFORCEMENT", "Enforcement"


class FeatureFlag(models.Model):
    name = models.CharField(max_length=50, choices=Feature.choices, unique=True)
    is_enabled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {'Enabled' if self.is_enabled else 'Disabled'}"

    def is_enabled_for_user(
        self, user_id: str | None, user_role: UserRole | None
    ) -> bool:
        # TODO: Implement logic to check if feature is enabled based on user_id and user_role

        return False

    class Meta:
        ordering = ["name"]


class FeatureFlagRole(models.Model):
    feature_flag = models.ForeignKey(
        FeatureFlag, on_delete=models.CASCADE, related_name="role_configs"
    )
    role = models.CharField(max_length=20, choices=UserRole.choices)
    rollout_percentage = models.FloatField(
        default=0.0,
        help_text="Percentage of users in this role who should see this feature (0.0-1.0)",
    )

    class Meta:
        unique_together = ["feature_flag", "role"]
        ordering = ["role"]

    def __str__(self):
        return (
            f"{self.feature_flag.name} - {self.role} ({self.rollout_percentage * 100}%)"
        )


class Metric(models.Model):
    name = models.CharField(max_length=60)
    type = models.CharField(choices=MetricType, max_length=60)
    last_month_total = models.IntegerField()
    current_month_total = models.IntegerField()
    current_year_total = models.IntegerField()


class User(AbstractUser):
    role = models.CharField(choices=UserRole, max_length=20)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
