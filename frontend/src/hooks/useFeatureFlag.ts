import { Feature } from '../types/featureFlag';

interface FeatureFlagHookReturn {
  isEnabled: boolean;
  loading: boolean;
  error: string | null;
}

export function useFeatureFlag(featureName: Feature): FeatureFlagHookReturn {
  // TODO: Implement this hook

  console.log(featureName)
  return {
    isEnabled: false,
    loading: false,
    error: null
  };
}