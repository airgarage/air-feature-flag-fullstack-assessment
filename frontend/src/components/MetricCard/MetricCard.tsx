import { Metric } from "../../types/metric";
import styles from "./MetricCard.module.css";

type MetricCardProps = {
  metric: Metric | null;
};

export default function MetricCard({ metric }: MetricCardProps) {
  if (!metric) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Metrics - {metric.name}</h1>
      <p className={styles.info}>Current Month: {metric.current_month_total}</p>
      <p className={styles.info}>Last Month: {metric.last_month_total}</p>
      <p className={styles.info}>Current Year: {metric.current_year_total}</p>
    </div>
  );
}
