export enum MetricType {
  REVENUE = "REVENUE",
  OCCUPANCY = "OCCUPANCY",
  ENFORCEMENT = "ENFORCEMENT",
}

export interface Metric {
  name: string;
  type: MetricType;
  last_month_total: number;
  current_month_total: number;
  current_year_total: number;
}
