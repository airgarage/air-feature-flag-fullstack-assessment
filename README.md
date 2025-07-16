# Feature Flag Full-Stack Assessment

Django + React application with role-based feature flags, user authentication, and metrics.

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn

## Setup

### Backend
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed
python manage.py runserver 127.0.1:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://127.0.1:3000
- Backend API: http://127.0.1:8000

__Note: Avoid localhost so cookies work properly__

---

## Exercises

### 1. Backend: Feature Flag Logic
**File**: `backend/featureflags/models.py`

Implement `is_enabled_for_user(self, user_id: str | None, user_role: UserRole | None) -> bool` method in the `FeatureFlag` model.

**Utility available**: `get_deterministic_value(key: str, seed: str) -> float`

### 2. Frontend: Custom Hook
**File**: `frontend/src/hooks/useFeatureFlag.ts`

Implement `useFeatureFlag(featureName: Feature)` hook that returns `{isEnabled, loading, error}`.

### 3. Frontend: Wrapper Component (HOC)
**File**: `frontend/src/components/FeatureFlagWrapper/FeatureFlagWrapper.tsx`

Complete the component to conditionally render children based on feature flags.

### 4. Full-Stack: API Protection + Error Handling
- **Backend**: Protect `MetricViewSet` endpoints based on feature flags (return 403 if not enabled)
- **Frontend**: Handle 403 errors in `FeatureMetrics` component

---

## Key Files to Explore
- `backend/featureflags/models.py` - Data models
- `frontend/src/contexts/` - React contexts
- `frontend/src/services/` - API layer
- `frontend/src/types/` - TypeScript definitions

**Time**: ~1 hour total