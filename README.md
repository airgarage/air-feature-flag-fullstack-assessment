# Feature Flag Full-Stack Assessment

Django + React application with role-based feature flags, user authentication, and metrics.

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

## **Objective**
Build a feature flag system that controls feature availability based on:
- Global Toggles: Instantly enable or disable features across the entire system.
- User Roles: Define access levels and permissions based on a user's role.
- Percentage-Based Rollout: Gradually enable features for a percentage of users within specific roles.

Implementing the feature flag system will cover both the backend (Python/Django) and frontend (TypeScript/React)

Specific tasks you need to complete can be found below under the **Exercises** secion.


## **Features Overview**
| Feature | Access Rules |
|---------|--------------|
| Profile | All users |
| Visitor Dashboard | Admin, Owner, 60% of Employees |
| Dynamic Price | Admin, 30% of Owners |
| Revenue Metrics | Admin, Owner |
| Occupancy Metrics | Admin, 50% of Owners |
| Enforcement Metrics | Admin, Owner, Employee, Enforcer |

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

A superuser is created automatically for you under:

- **Username:** `admin`
- **Password:** `test`

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
- **Backend**: Protect `MetricViewSet` endpoints based on authentication instead of by using feature flags (return 403 if not enabled)
- **Frontend**: Handle 403 errors in `FeatureMetrics` component


---

## Key Files to Explore
- `backend/featureflags/models.py` - Data models
- `backend/featureflags/management/commands/seed.py` - The seed data which contains email/passwords for users you can login to the frontend with
- `frontend/src/contexts/` - React contexts
- `frontend/src/services/` - API layer
- `frontend/src/types/` - TypeScript definitions


**Time**: ~1 hour total