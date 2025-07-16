import { User } from "../../types/user";
import styles from "./ProfileCard.module.css";

type ProfileProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileProps) {
  const { full_name, role, email } = user;

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.avatar}>
        <span className={styles.initials}>{getInitials(full_name)}</span>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.name}>{full_name}</div>
        <div className={styles.role}>{role}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
}
