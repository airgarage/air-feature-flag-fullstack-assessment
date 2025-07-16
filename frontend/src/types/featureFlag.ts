import { UserRole } from "./user";

export type RoleConfig = {
    role: UserRole;
    rollout_percentage: number;
}

export type FeatureFlag = {
    featureName: string;
    is_enabled: boolean;
}

export enum Feature {
    PROFILE = 'PROFILE',
    DYNAMIC_PRICE = 'DYNAMIC_PRICE',
    REVENUE_METRICS = 'REVENUE_METRICS',
    OCCUPANCY_METRICS = 'OCCUPANCY_METRICS',
    ENFORCEMENT_METRICS = 'ENFORCEMENT_METRICS',
    VISITOR_DASHBOARD = 'VISITOR_DASHBOARD',
}