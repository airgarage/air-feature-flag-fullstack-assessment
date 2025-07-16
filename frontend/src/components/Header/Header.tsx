import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <span className={styles.welcomeText}>
            Welcome, {user.full_name || user.email}
          </span>
          <span className={styles.userRole}>
            {user.role}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};