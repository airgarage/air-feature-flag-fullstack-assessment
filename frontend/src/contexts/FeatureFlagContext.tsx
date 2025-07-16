import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { featureFlagService } from '../services';
import type { FeatureFlag } from '../types/featureFlag';
import { useAuth } from './AuthContext';

interface FeatureFlagContextType {
  featureFlags: FeatureFlag[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchFeatureFlags = async () => {
    try {
      setLoading(true);
      setError(null);
      const flags = await featureFlagService.getFlags();
      setFeatureFlags(flags);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feature flags');
      console.error('Error fetching feature flags:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeatureFlags();
    } else {
      setFeatureFlags([]);
      setLoading(false);
      setError(null);
    }
  }, [isAuthenticated]);

  return (
    <FeatureFlagContext.Provider value={{ featureFlags, loading, error, refetch: fetchFeatureFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlagsContext() {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error('useFeatureFlagsContext must be used within a FeatureFlagProvider');
  }
  return context;
} 