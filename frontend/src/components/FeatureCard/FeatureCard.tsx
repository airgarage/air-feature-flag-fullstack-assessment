import styles from './FeatureCard.module.css';

type FeatureProps = {
  title: string;
}

export default function FeatureCard({ title }: FeatureProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
