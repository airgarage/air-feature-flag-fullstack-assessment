import FeatureFlagService from "./featureFlag";
import { MetricService } from "./metric";
import AuthService from "./auth";

export const authService = new AuthService();
export const featureFlagService = new FeatureFlagService();
export const metricService = new MetricService();
