from django.core.management.base import BaseCommand
from featureflags.models import (
    Feature,
    FeatureFlag,
    Metric,
    MetricType,
    UserRole,
    FeatureFlagRole,
    User,
)


class Command(BaseCommand):
    help = "Seeds the database"

    users = [
        {
            "first_name": "John",
            "last_name": "Smith",
            "username": "jsmith",
            "role": UserRole.ADMIN,
            "email": "admin@ag.com",
            "password": "pass123",
        },
        {
            "first_name": "Jane",
            "last_name": "Green",
            "username": "jgreen",
            "role": UserRole.OWNER,
            "email": "owner@ag.com",
            "password": "pass123",
        },
        {
            "first_name": "Alice",
            "last_name": "Paul",
            "username": "apaul",
            "role": UserRole.EMPLOYEE,
            "email": "employee@ag.com",
            "password": "pass123",
        },
        {
            "first_name": "Bob",
            "last_name": "Bobby",
            "username": "bbobby",
            "role": UserRole.ENFORCER,
            "email": "enforcer@ag.com",
            "password": "pass123",
        },
        {
            "first_name": "Charlie",
            "last_name": "White",
            "username": "cwhite",
            "role": UserRole.VISITOR,
            "email": "visitor@ag.com",
            "password": "pass123",
        },
        {
            "first_name": "David",
            "last_name": "Pope",
            "username": "dpope",
            "role": UserRole.DRIVER,
            "email": "driver@ag.com",
            "password": "pass123",
        },
    ]

    feature_flags = [
        {
            "name": Feature.PROFILE,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.DRIVER, 1),
                (UserRole.EMPLOYEE, 1),
                (UserRole.OWNER, 1),
                (UserRole.ENFORCER, 1),
                (UserRole.VISITOR, 1),
            ],
        },
        {
            "name": Feature.VISITOR_DASHBOARD,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.OWNER, 1),
                (UserRole.EMPLOYEE, 0.6),
            ],
        },
        {
            "name": Feature.DYNAMIC_PRICE,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.OWNER, 0.3),
            ],
        },
        {
            "name": Feature.REVENUE_METRICS,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.OWNER, 1),
            ],
        },
        {
            "name": Feature.OCCUPANCY_METRICS,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.OWNER, 0.5),
            ],
        },
        {
            "name": Feature.ENFORCEMENT_METRICS,
            "is_enabled": True,
            "roles": [
                (UserRole.ADMIN, 1),
                (UserRole.OWNER, 1),
                (UserRole.EMPLOYEE, 1),
                (UserRole.ENFORCER, 1),
            ],
        },
    ]

    metrics = [
        {
            "name": "Revenue",
            "type": MetricType.REVENUE,
            "last_month_total": 15234,
            "current_month_total": 12433,
            "current_year_total": 103406,
        },
        {
            "name": "Occupancy",
            "type": MetricType.OCCUPANCY,
            "last_month_total": 1053,
            "current_month_total": 987,
            "current_year_total": 8705,
        },
        {
            "name": "Enforcement",
            "type": MetricType.ENFORCEMENT,
            "last_month_total": 315,
            "current_month_total": 288,
            "current_year_total": 4590,
        },
    ]

    def handle(self, *args, **options):
        for user in self.users:
            User.objects.create_user(**user)

        for metric in self.metrics:
            Metric.objects.create(**metric)

        for feature_flag in self.feature_flags:
            flag = FeatureFlag.objects.create(
                name=feature_flag["name"],
                is_enabled=feature_flag["is_enabled"],
            )
            for role in feature_flag["roles"]:
                FeatureFlagRole.objects.create(
                    feature_flag=flag, role=role[0], rollout_percentage=role[1]
                )
