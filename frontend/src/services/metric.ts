import { API_CONFIG, getApiUrl } from "../config/api";
import { type Metric, MetricType } from "../types/metric";


export class MetricService {
    private async query(type: MetricType): Promise<Metric | null> {
        try {
            const baseUrl = getApiUrl(`${API_CONFIG.ENDPOINTS.METRICS}/${type}`);

            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Metric = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching metrics:', error);
            return null;
        }
    }

    async getRevenueMetrics(): Promise<Metric | null> {
        return this.query(MetricType.REVENUE);
    }

    async getOccupancyMetrics(): Promise<Metric | null> {
        return this.query(MetricType.OCCUPANCY);
    }

    async getEnforcementMetrics(): Promise<Metric | null> {
        return this.query(MetricType.ENFORCEMENT);
    }
}
