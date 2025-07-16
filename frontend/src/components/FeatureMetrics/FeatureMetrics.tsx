import { useEffect, useState } from "react";
import { User } from "../../types/user";
import Carousel from "../Carousel/Carousel";
import MetricCard from "../MetricCard/MetricCard";
import { Feature } from "../../types/featureFlag";
import { Metric } from "../../types/metric";
import { metricService } from "../../services";
import { useFeatureFlag } from "../../hooks/useFeatureFlag";

type FeatureMetricsProps = {
  user: User;
};

type MetricsState = { [key in Feature]?: Metric | null };

export default function FeatureMetrics({ user }: FeatureMetricsProps) {
  const [metrics, setMetrics] = useState<MetricsState>({});
  const { isEnabled: isRevenueMetricsEnabled } = useFeatureFlag(Feature.REVENUE_METRICS);
  const { isEnabled: isOccupancyMetricsEnabled } = useFeatureFlag(Feature.OCCUPANCY_METRICS);
  const { isEnabled: isEnforcementMetricsEnabled } = useFeatureFlag(Feature.ENFORCEMENT_METRICS);

  useEffect(() => {
    async function fetchMetrics() {
      const results: MetricsState = {};

      // TODO: throw a 403 from the backend if the feature is not enabled and handle that error from the frontend.
      if (isRevenueMetricsEnabled) {
        results[Feature.REVENUE_METRICS] = await metricService.getRevenueMetrics();
      }
      if (isOccupancyMetricsEnabled) {
        results[Feature.OCCUPANCY_METRICS] = await metricService.getOccupancyMetrics();
      }
      if (isEnforcementMetricsEnabled) {
        results[Feature.ENFORCEMENT_METRICS] = await metricService.getEnforcementMetrics();
      }

      setMetrics(results);
    }

    fetchMetrics();
  }, [user, isRevenueMetricsEnabled, isOccupancyMetricsEnabled, isEnforcementMetricsEnabled]);

  return (
    <Carousel
      elements={Object.values(metrics)
        .filter(Boolean) // Removes null values
        .map((metric, index) => <MetricCard key={index} metric={metric!} />)}
    />
  );
}
