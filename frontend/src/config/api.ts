export const API_CONFIG = {
    BASE_URL: Object.prototype.hasOwnProperty.call(globalThis, "process") ? process.env.REACT_APP_API_URL : 'http://127.0.0.1:8000',
    ENDPOINTS: {
        FEATURE_FLAGS: '/api/feature-flags/',
        USERS: '/api/users',
        METRICS: '/api/metrics',
        AUTH_LOGIN: '/api/auth/login/',
        AUTH_LOGOUT: '/api/auth/logout/',
        AUTH_ME: '/api/auth/me/',
    }
} as const;

export function getApiUrl(endpoint: string): URL {
    return new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
}; 