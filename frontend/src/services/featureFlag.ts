import { API_CONFIG, getApiUrl } from "../config/api";
import type { FeatureFlag } from "../types/featureFlag";

export default class FeatureFlagService {
  private readonly baseUrl = getApiUrl(API_CONFIG.ENDPOINTS.FEATURE_FLAGS);

  async getFlags(): Promise<FeatureFlag[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FeatureFlag[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feature flags:', error);
      // Return empty array as fallback - all features disabled
      return [];
    }
  }
}
