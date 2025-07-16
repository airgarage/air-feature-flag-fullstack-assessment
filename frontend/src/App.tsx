import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm/LoginForm";
import Header from "./components/Header/Header";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import FeatureMetrics from "./components/FeatureMetrics/FeatureMetrics";
import FeatureFlagWrapper from "./components/FeatureFlagWrapper/FeatureFlagWrapper";
import { Feature } from "./types/featureFlag";
import { FeatureFlagProvider } from "./contexts/FeatureFlagContext";
import styles from "./App.module.css";

function AppContent() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <FeatureFlagWrapper featureName={Feature.PROFILE}>
                    <ProfileCard user={user!} />
                </FeatureFlagWrapper>
                <FeatureFlagWrapper featureName={Feature.DYNAMIC_PRICE}>
                    <FeatureCard title="Dynamic Price" />
                </FeatureFlagWrapper>
                <FeatureFlagWrapper featureName={Feature.VISITOR_DASHBOARD}>
                    <FeatureCard title="Visitors" />
                </FeatureFlagWrapper>
                <FeatureMetrics user={user!} />
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <FeatureFlagProvider>
                <AppContent />
            </FeatureFlagProvider>
        </AuthProvider>
    );
}

export default App;
