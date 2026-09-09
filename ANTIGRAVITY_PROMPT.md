# GreenFleet AI - Production SaaS Platform Build Prompt

## Project Overview
Build a complete, production-ready **GreenFleet AI** - an interactive web platform for fleet fuel consumption prediction and green optimization. This should be a multi-user SaaS application that real fleet owners, logistics companies, and drivers can actually use daily.

---

## Core Concept
**"Save Fuel. Save Money. Drive Greener Every Trip."**

An easy-to-use platform where users can:
1. Add their vehicles to a virtual garage
2. Plan trips and get instant fuel consumption predictions
3. Get optimized route recommendations to save fuel
4. Track their savings and environmental impact over time
5. Compare their efficiency with benchmarks

---

## Target Users & Use Cases

### Primary Users:
1. **Small Fleet Owners** (3-20 vehicles) - delivery services, taxi operators
2. **Individual Drivers** - truck drivers, ride-share drivers
3. **Logistics Companies** - medium fleets (20-500 vehicles)
4. **Government Transport Departments** - large fleets, buses

### Key User Journeys:
- **Journey 1:** New user signs up → adds first vehicle → plans a trip → sees predicted fuel cost → saves 15% on first trip
- **Journey 2:** Fleet manager logs in → sees dashboard with all vehicles → identifies inefficient vehicle → gets maintenance alert
- **Journey 3:** Driver gets route assignment → app suggests better route → completes trip → logs actual fuel used → earns "eco-driver" badge

---

## Technical Stack

### Frontend:
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand or Redux Toolkit
- **Charts:** Recharts + Chart.js
- **Maps:** React-Leaflet with OpenStreetMap
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router v6
- **API Client:** Axios or TanStack Query

### Backend:
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+ with TimescaleDB extension
- **Cache:** Redis 7+
- **Authentication:** JWT + OAuth2 (Google, email)
- **ML/AI:** 
  - scikit-learn
  - XGBoost
  - SHAP (explainability)
  - pandas, numpy
- **Optimization:** 
  - scipy.optimize
  - python-mip (for QUBO)
  - OR-Tools (Google)
- **API Documentation:** FastAPI auto-generated Swagger/OpenAPI
- **Task Queue:** Celery + Redis (for async operations)

### DevOps:
- **Containerization:** Docker + Docker Compose
- **Environment:** .env configuration
- **Logging:** structlog + loguru

---

## Database Schema

### Users & Authentication
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),
    full_name VARCHAR(255),
    phone VARCHAR(20),
    user_type VARCHAR(20) DEFAULT 'individual', -- individual, fleet_owner, enterprise
    organization_name VARCHAR(255),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Organizations (for fleet owners)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    owner_id UUID REFERENCES users(id),
    subscription_tier VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
    max_vehicles INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Organization members (multi-user access)
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    user_id UUID REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'viewer', -- admin, manager, driver, viewer
    invited_at TIMESTAMP DEFAULT NOW(),
    joined_at TIMESTAMP
);
```

### Vehicles
```sql
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    
    -- Basic info
    nickname VARCHAR(100), -- "My Truck", "Delivery Van 1"
    registration_number VARCHAR(50),
    
    -- Vehicle specifications
    vehicle_type VARCHAR(50) NOT NULL, -- truck, van, car, bus, motorcycle
    fuel_type VARCHAR(30) NOT NULL, -- diesel, petrol, cng, electric, hybrid
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    
    -- Technical specs
    engine_capacity_cc INTEGER,
    fuel_tank_capacity_liters DECIMAL(6,2),
    mileage_claimed_kmpl DECIMAL(5,2), -- manufacturer claimed
    curb_weight_kg DECIMAL(8,2),
    
    -- Current status
    odometer_reading_km DECIMAL(10,2),
    last_service_date DATE,
    status VARCHAR(20) DEFAULT 'active', -- active, maintenance, inactive
    
    -- Images
    vehicle_image_url TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Trips & Predictions
```sql
-- Trip plans (before trip)
CREATE TABLE trip_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    vehicle_id UUID REFERENCES vehicles(id),
    
    -- Route info
    origin_address TEXT NOT NULL,
    origin_lat DECIMAL(10,8),
    origin_lng DECIMAL(11,8),
    destination_address TEXT NOT NULL,
    destination_lat DECIMAL(10,8),
    destination_lng DECIMAL(11,8),
    
    -- Trip parameters
    planned_date DATE,
    distance_km DECIMAL(8,2),
    estimated_duration_minutes INTEGER,
    cargo_weight_kg DECIMAL(8,2),
    num_passengers INTEGER DEFAULT 1,
    
    -- Predictions
    predicted_fuel_liters DECIMAL(8,4),
    predicted_fuel_cost_inr DECIMAL(10,2),
    predicted_ghg_kg DECIMAL(10,4),
    confidence_score DECIMAL(4,3),
    
    -- Recommendations
    recommended_route JSONB, -- array of waypoints
    alternative_routes JSONB,
    fuel_saving_tips TEXT[],
    
    status VARCHAR(20) DEFAULT 'planned', -- planned, in_progress, completed, cancelled
    created_at TIMESTAMP DEFAULT NOW()
);

-- Completed trips (after trip - actual data)
CREATE TABLE trips_completed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_plan_id UUID REFERENCES trip_plans(id),
    vehicle_id UUID REFERENCES vehicles(id),
    user_id UUID REFERENCES users(id),
    
    -- Actual trip data
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    actual_distance_km DECIMAL(8,2),
    actual_fuel_consumed_liters DECIMAL(8,4) NOT NULL,
    actual_fuel_cost_inr DECIMAL(10,2),
    
    -- Trip conditions
    weather_condition VARCHAR(30), -- sunny, rainy, foggy
    traffic_level VARCHAR(20), -- light, moderate, heavy
    route_type VARCHAR(30), -- highway, city, mixed
    
    -- Driver feedback
    driver_rating INTEGER CHECK (driver_rating BETWEEN 1 AND 5),
    driver_notes TEXT,
    
    -- Calculated metrics
    actual_mileage_kmpl DECIMAL(5,2),
    fuel_efficiency_vs_predicted DECIMAL(6,2), -- percentage
    cost_saved_inr DECIMAL(10,2),
    ghg_actual_kg DECIMAL(10,4),
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for quick lookups
CREATE INDEX idx_trips_vehicle_date ON trips_completed(vehicle_id, start_time DESC);
CREATE INDEX idx_trips_user_date ON trips_completed(user_id, start_time DESC);
```

### Analytics & Gamification
```sql
-- User achievements
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    achievement_type VARCHAR(50), -- eco_warrior, cost_saver, 100_trips, etc.
    earned_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);

-- Savings tracking
CREATE TABLE savings_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    month DATE NOT NULL,
    total_trips INTEGER,
    total_fuel_saved_liters DECIMAL(10,2),
    total_cost_saved_inr DECIMAL(12,2),
    total_ghg_reduced_kg DECIMAL(12,2),
    avg_efficiency_improvement_percent DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Feature Requirements (Priority Order)

### PHASE 1: MVP (Must Have) 🔴

#### 1. User Authentication
- Email/password signup & login
- Google OAuth login
- Email verification
- Password reset flow
- JWT token-based auth
- Protected routes

#### 2. Vehicle Management
- Add vehicle form (simple, wizard-style)
- Vehicle list view (card grid)
- Vehicle detail page
- Edit vehicle info
- Upload vehicle image
- Delete vehicle (with confirmation)

#### 3. Trip Fuel Calculator (Core Feature)
**Interactive Form:**
- Select vehicle from dropdown
- Origin input (with autocomplete using OpenStreetMap Nominatim API)
- Destination input (with autocomplete)
- Date picker
- Cargo weight slider (0-5000 kg)
- Number of passengers
- "Calculate Fuel" button

**Results Display:**
- Predicted fuel consumption (liters)
- Estimated fuel cost (₹) with current fuel price
- Predicted CO2 emissions (kg)
- Confidence level indicator
- Route visualization on map
- Alternative routes comparison
- Fuel-saving tips (e.g., "Avoid peak hours", "Maintain 60-80 kmph")

#### 4. Dashboard
**Today's Summary Card:**
- Total vehicles
- Trips today
- Fuel used today
- Money saved this month

**Charts:**
- Fuel consumption trend (last 7 days)
- Cost savings over time
- Top efficient vehicles

**Recent Trips List:**
- Last 5 trips with quick stats

#### 5. Trip History
- Paginated list of all completed trips
- Filters: date range, vehicle, status
- Search by destination
- Export to CSV

### PHASE 2: Enhanced Features (Should Have) 🟡

#### 6. Smart Route Finder
- Multi-stop route optimization
- Input multiple waypoints
- Drag-and-drop waypoint reordering
- Show optimized order vs original
- Display fuel saved by optimization
- "Use This Route" button

#### 7. Fleet Dashboard (Multi-vehicle view)
- Fleet overview metrics
- Vehicle comparison chart
- Identify inefficient vehicles
- Maintenance alerts
- Bulk operations

#### 8. Real-time Trip Tracking
- Start trip from planned trip
- Log actual fuel consumed after trip
- Compare predicted vs actual
- Rate your trip experience
- Photo upload of fuel receipt (optional)

#### 9. Analytics & Reports
- Monthly summary report
- Cost savings calculator
- Efficiency leaderboard (compare with anonymized users)
- Environmental impact report (trees equivalent)
- Downloadable PDF reports

#### 10. Notifications
- Low fuel efficiency alert
- Maintenance reminder
- Monthly savings report email
- Achievement unlocked toast

### PHASE 3: Advanced Features (Nice to Have) 🟢

#### 11. Team Collaboration
- Invite team members (drivers, managers)
- Role-based access control
- Shared vehicle pool
- Trip assignment to drivers

#### 12. Gamification
- Achievements/badges system
- Eco-driving score
- Monthly challenges
- Leaderboard
- Share achievements on social media

#### 13. Integration & API
- REST API for third-party access
- Webhook support
- Mobile app export (React Native)
- CSV bulk upload

#### 14. AI Insights
- Predictive maintenance suggestions
- Driver behavior analysis
- Personalized fuel-saving recommendations
- Anomaly detection (unusual fuel consumption)

---

## ML/AI Implementation Details

### Fuel Prediction Model

**Training Data Features:**
```python
features = [
    # Vehicle features
    'vehicle_type_encoded',
    'fuel_type_encoded',
    'engine_capacity_cc',
    'vehicle_age_years',
    'curb_weight_kg',
    
    # Trip features
    'distance_km',
    'cargo_weight_kg',
    'num_passengers',
    'estimated_duration_minutes',
    'avg_speed_kmph',
    
    # Route features
    'route_type_encoded',  # highway, city, mixed
    'elevation_gain_m',
    'num_turns',
    'num_traffic_signals',
    
    # Environmental features
    'temperature_celsius',
    'weather_condition_encoded',
    'traffic_level_encoded',
    'time_of_day_encoded',
    'day_of_week',
    
    # Historical features
    'vehicle_avg_mileage_kmpl',
    'vehicle_recent_efficiency_trend'
]

target = 'fuel_consumed_liters'
```

**Model Pipeline:**
```python
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
import shap

# Ensemble of models
models = {
    'xgboost': XGBRegressor(n_estimators=100, max_depth=6),
    'random_forest': RandomForestRegressor(n_estimators=100),
}

# Model explainability
explainer = shap.TreeExplainer(best_model)
shap_values = explainer.shap_values(X_test)
```

**Prediction Function:**
```python
def predict_fuel_consumption(trip_data: dict) -> dict:
    """
    Returns:
    {
        'predicted_fuel_liters': 45.2,
        'confidence_interval': [42.1, 48.3],
        'confidence_score': 0.87,
        'top_factors': [
            {'feature': 'distance_km', 'impact': 35.2},
            {'feature': 'cargo_weight_kg', 'impact': 18.5},
            {'feature': 'traffic_level', 'impact': 12.3}
        ],
        'tips': [
            'Heavy cargo detected. Consider splitting into two trips.',
            'Peak traffic hours. Delay by 1 hour to save 8% fuel.'
        ]
    }
    """
```

### Route Optimization (Quantum-Inspired)

**For Multi-Stop Routes:**
```python
def optimize_route(waypoints: list, vehicle: dict, constraints: dict) -> dict:
    """
    Uses Simulated Annealing + Tabu Search
    
    Objective: Minimize total_fuel + penalty_violations
    
    Returns:
    {
        'optimized_order': [0, 2, 1, 3, 4],  # waypoint indices
        'total_distance_km': 125.3,
        'predicted_fuel_liters': 18.7,
        'fuel_saved_vs_original': 2.4,  # liters
        'cost_saved_inr': 216.0,
        'route_geometry': [...],  # for map display
    }
    """
```

---

## UI/UX Design Guidelines

### Design System
- **Colors:**
  - Primary: Emerald green (#10b981) - eco-friendly theme
  - Secondary: Dark blue (#1e293b) - trust, professionalism
  - Accent: Amber (#f59e0b) - warnings, tips
  - Success: Green (#22c55e)
  - Danger: Red (#ef4444)

- **Typography:**
  - Headings: Inter, bold
  - Body: Inter, regular
  - Monospace: JetBrains Mono (for numbers, stats)

- **Components:**
  - Use shadcn/ui for consistency
  - Smooth animations (framer-motion)
  - Loading skeletons
  - Toast notifications
  - Modal confirmations

### Key Pages Layout

#### 1. Landing Page (Public)
```
┌──────────────────────────────────────────┐
│  [Logo] GreenFleet    [Login] [Sign Up]  │
├──────────────────────────────────────────┤
│                                          │
│     Save Fuel. Save Money.               │
│     Drive Greener Every Trip.            │
│                                          │
│   [Start Saving Today →]  [Watch Demo]   │
│                                          │
│   ✓ Super Simple   ✓ Accurate   ✓ Free  │
├──────────────────────────────────────────┤
│  How It Works (3 Steps)                  │
│  [1] Add Vehicle  [2] Plan Trip  [3] Save│
├──────────────────────────────────────────┤
│  Features Section                         │
│  Testimonials                            │
│  Pricing                                 │
└──────────────────────────────────────────┘
```

#### 2. Dashboard (Authenticated)
```
┌───────┬──────────────────────────────────┐
│ MENU  │  Dashboard                       │
│       ├──────────────────────────────────┤
│ 🏠Home│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│
│ 🚗Vehi│  │ 12  │ │ 45  │ │ ₹2.3│ │ 84  ││
│ 🗺️Trip│  │Vehic│ │Trips│ │k Sav│ │kg CO││
│ 📊Anal│  │les  │ │Month│ │ed   │ │2 ↓  ││
│ ⚙️Sett│  └─────┘ └─────┘ └─────┘ └─────┘│
│       │                                  │
│ [+New]│  📈 Fuel Trend (Last 7 Days)     │
│  Trip │  [Chart showing daily fuel]      │
│       │                                  │
│       │  🚙 Recent Trips                 │
│       │  ├─ Mumbai → Pune  [View]        │
│       │  ├─ Delhi → Agra   [View]        │
│       │  └─ ...                          │
└───────┴──────────────────────────────────┘
```

#### 3. Trip Fuel Calculator
```
┌──────────────────────────────────────────┐
│  Plan Your Trip & Calculate Fuel         │
├──────────────────────────────────────────┤
│                                          │
│  Step 1: Select Vehicle                  │
│  [Dropdown: My Tata Ace ▼]              │
│                                          │
│  Step 2: Enter Route                     │
│  From: [Mumbai, Maharashtra     🔍]      │
│  To:   [Pune, Maharashtra       🔍]      │
│                                          │
│  Step 3: Trip Details                    │
│  Date: [📅 Select date]                  │
│  Cargo: [━━━●────] 500 kg               │
│  Passengers: [2]                         │
│                                          │
│  [Calculate Fuel & Get Route →]          │
└──────────────────────────────────────────┘

After calculation:
┌──────────────────────────────────────────┐
│  🎯 Your Trip Prediction                 │
├──────────────────────────────────────────┤
│  Distance: 148 km                        │
│  Duration: 2h 45m                        │
│                                          │
│  💧 Predicted Fuel: 12.4 liters          │
│  💰 Estimated Cost: ₹1,116              │
│  🌱 CO2 Emissions: 33.2 kg              │
│  📊 Confidence: 89%                      │
│                                          │
│  🗺️ [Interactive Map with Route]         │
│                                          │
│  💡 Fuel Saving Tips:                    │
│  • Maintain 60-80 kmph for best mileage │
│  • Avoid peak hours (save 6%)            │
│  • Check tire pressure before trip       │
│                                          │
│  [Save Trip Plan] [Share] [Navigate Now] │
└──────────────────────────────────────────┘
```

---

## API Endpoints Structure

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify-email/{token}

Users:
GET    /api/users/me
PUT    /api/users/me
POST   /api/users/me/avatar
DELETE /api/users/me

Vehicles:
GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/{id}
PUT    /api/vehicles/{id}
DELETE /api/vehicles/{id}
POST   /api/vehicles/{id}/image

Trip Planning:
POST   /api/trips/predict
POST   /api/trips/plan
GET    /api/trips/plans
GET    /api/trips/plans/{id}
DELETE /api/trips/plans/{id}

Trip Execution:
POST   /api/trips/{plan_id}/start
POST   /api/trips/{trip_id}/complete
GET    /api/trips/completed
GET    /api/trips/completed/{id}

Route Optimization:
POST   /api/routes/optimize
POST   /api/routes/alternatives

Analytics:
GET    /api/analytics/dashboard
GET    /api/analytics/savings
GET    /api/analytics/trends
GET    /api/analytics/vehicle-efficiency
GET    /api/analytics/export/pdf
GET    /api/analytics/export/csv

Organizations (Multi-user):
POST   /api/organizations
GET    /api/organizations/me
POST   /api/organizations/invite
GET    /api/organizations/members
PUT    /api/organizations/members/{id}/role

Achievements:
GET    /api/achievements
GET    /api/achievements/user/{user_id}

Public (No Auth):
GET    /api/public/fuel-prices
GET    /api/public/stats
```

---

## Development Instructions

### 1. Project Setup
```bash
# Create project structure
mkdir greenfleet-ai
cd greenfleet-ai

# Backend
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose passlib bcrypt python-multipart aiofiles redis celery pandas scikit-learn xgboost shap

# Frontend
cd ..
npx create-react-app frontend --template typescript
cd frontend
npm install tailwindcss @headlessui/react react-router-dom axios react-hook-form zod @hookform/resolvers zustand recharts react-leaflet leaflet framer-motion lucide-react
```

### 2. Environment Variables
```env
# Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/greenfleet
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email (for verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# External APIs
OPENSTREETMAP_API_URL=https://nominatim.openstreetmap.org
FUEL_PRICE_API_KEY=your-api-key
```

### 3. Implementation Order

**Week 1: Backend Foundation**
- Database schema setup
- User authentication (JWT)
- CRUD APIs for users & vehicles
- Basic prediction endpoint (mock response)

**Week 2: ML Model**
- Generate synthetic training data
- Train initial prediction model
- Integrate model into API
- Add SHAP explainability

**Week 3: Frontend Foundation**
- Setup React + routing
- Authentication pages
- Dashboard layout
- Vehicle management pages

**Week 4: Core Feature**
- Trip fuel calculator UI
- Map integration (Leaflet)
- Connect to prediction API
- Results display with charts

**Week 5: Trip Management**
- Trip history page
- Trip detail view
- Complete trip flow
- Analytics dashboard

**Week 6: Optimization**
- Route optimization algorithm
- Multi-stop route planner UI
- Performance optimization
- Testing & bug fixes

**Week 7: Polish & Deploy**
- UI/UX refinements
- Responsive design
- Error handling
- Documentation
- Docker containerization
- Deployment

---

## Sample Code Structure

### Backend: Prediction Endpoint
```python
# backend/app/api/v1/endpoints/predictions.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.prediction.fuel_predictor import FuelPredictor
from app.models.schemas.prediction_schema import TripPredictionRequest, TripPredictionResponse

router = APIRouter()
predictor = FuelPredictor()

@router.post("/predict", response_model=TripPredictionResponse)
async def predict_fuel(
    request: TripPredictionRequest,
    current_user = Depends(get_current_user)
):
    """
    Predict fuel consumption for a planned trip
    """
    try:
        # Get vehicle details
        vehicle = await get_vehicle_by_id(request.vehicle_id)
        
        # Get route details from OSM
        route_info = await get_route_info(
            request.origin_lat, request.origin_lng,
            request.destination_lat, request.destination_lng
        )
        
        # Prepare features
        features = prepare_features(vehicle, route_info, request)
        
        # Predict
        prediction = predictor.predict(features)
        
        # Calculate costs
        fuel_price = await get_current_fuel_price(vehicle.fuel_type)
        estimated_cost = prediction['fuel_liters'] * fuel_price
        
        # Calculate GHG
        ghg_kg = calculate_ghg_emissions(
            prediction['fuel_liters'],
            vehicle.fuel_type
        )
        
        # Get recommendations
        tips = generate_fuel_saving_tips(features, prediction)
        
        return TripPredictionResponse(
            predicted_fuel_liters=prediction['fuel_liters'],
            confidence_score=prediction['confidence'],
            estimated_cost_inr=estimated_cost,
            predicted_ghg_kg=ghg_kg,
            distance_km=route_info['distance'],
            duration_minutes=route_info['duration'],
            route_geometry=route_info['geometry'],
            top_factors=prediction['shap_values'],
            fuel_saving_tips=tips
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Frontend: Trip Calculator Component
```typescript
// frontend/src/components/prediction/TripCalculator.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { predictionService } from '@/services/predictionService';

export function TripCalculator() {
  const { register, handleSubmit } = useForm();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await predictionService.predictTrip(data);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Plan Your Trip</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Select Vehicle</label>
            <select {...register('vehicleId')} className="w-full">
              {/* Vehicle options */}
            </select>
          </div>
          
          <div>
            <label>From</label>
            <input 
              type="text" 
              {...register('origin')} 
              placeholder="Enter origin"
              className="w-full"
            />
          </div>
          
          <div>
            <label>To</label>
            <input 
              type="text" 
              {...register('destination')} 
              placeholder="Enter destination"
              className="w-full"
            />
          </div>
          
          <div>
            <label>Cargo Weight (kg)</label>
            <input 
              type="range" 
              {...register('cargoWeight')} 
              min="0" 
              max="5000"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded"
          >
            {loading ? 'Calculating...' : 'Calculate Fuel'}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {prediction && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Prediction</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Predicted Fuel</p>
              <p className="text-2xl font-bold">{prediction.fuel_liters} L</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Estimated Cost</p>
              <p className="text-2xl font-bold">₹{prediction.cost}</p>
            </div>
          </div>
          
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5}
            className="h-64 rounded"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={prediction.route_geometry} />
          </MapContainer>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">💡 Fuel Saving Tips:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {prediction.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Testing Requirements

### Unit Tests
- Test all API endpoints
- Test ML prediction functions
- Test authentication flows
- Test data validation

### Integration Tests
- End-to-end user flows
- Database operations
- External API mocking

### Performance Tests
- API response time < 200ms
- Prediction latency < 500ms
- Handle 100+ concurrent users

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] ML models trained and saved
- [ ] Frontend production build tested
- [ ] Security audit completed
- [ ] Performance optimization done

### Deployment
- [ ] Docker images built
- [ ] Database deployed
- [ ] Backend API deployed
- [ ] Frontend deployed
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Monitoring setup (logs, errors)

### Post-Deployment
- [ ] Smoke tests on production
- [ ] User acceptance testing
- [ ] Analytics tracking enabled
- [ ] Backup strategy in place
- [ ] Documentation updated

---

## Success Criteria

The project is complete when:
1. ✅ A user can sign up, add a vehicle, and calculate fuel in < 2 minutes
2. ✅ Prediction accuracy is > 85% on test data
3. ✅ Dashboard loads in < 1 second
4. ✅ Mobile responsive (works on phones)
5. ✅ 10 sample users can use simultaneously without issues
6. ✅ All MVP features implemented and tested
7. ✅ Documentation complete (README, API docs)
8. ✅ Deployed and accessible via URL

---

## Additional Notes

### Monetization Strategy (Optional)
- **Free Tier:** 5 vehicles, 50 predictions/month
- **Pro Tier (₹499/month):** Unlimited vehicles, predictions, advanced analytics
- **Enterprise:** Custom pricing, API access, white-label

### Future Enhancements
- Mobile app (React Native)
- AI-powered maintenance scheduling
- Integration with fleet management systems
- Real-time GPS tracking
- Driver behavior coaching
- Carbon offset marketplace

---

## Questions to Ask During Development
1. Should we use real fuel price API or manual input?
2. Which countries/regions to support initially?
3. Do we need payment integration in MVP?
4. Should historical data be importable via CSV?
5. What's the minimum supported browser version?

---

## FINAL REQUEST TO AI

Build this complete application with:
- Clean, production-ready code
- Comprehensive error handling
- Security best practices (SQL injection prevention, XSS protection)
- Responsive design
- Loading states and user feedback
- Proper TypeScript types
- API documentation
- README with setup instructions
- Docker Compose for easy local development

**Start with Phase 1 MVP features and ensure each feature is fully functional before moving to the next.**

Focus on making it actually usable by real people, not just a demo.
