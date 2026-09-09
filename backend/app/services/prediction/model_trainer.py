import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor
from backend.app.utils.data_generator import generate_fleet_data, generate_trip_data
from backend.app.services.prediction.feature_engineering import FeatureEngineering

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "ml_models", "trained")

def train_and_save_ensemble_models():
    os.makedirs(MODEL_DIR, exist_ok=True)
    
    fleet_df = generate_fleet_data(60)
    trip_df = generate_trip_data(fleet_df, 1500)
    
    # Feature extraction
    feature_list = []
    y_target = []
    
    for _, row in trip_df.iterrows():
        input_dict = {
            "distance_km": row["distance_km"],
            "payload_weight_kg": row["payload_weight"],
            "average_speed_kmh": row["average_speed"],
            "temperature_celsius": row["temperature_celsius"],
            "driver_behavior_score": 8.5,
            "route_type": row["route_type"],
            "traffic_condition": row["traffic_condition"],
            "weather_condition": row["weather_condition"],
            "vehicle_type": "Heavy Truck",
            "fuel_type": "diesel"
        }
        df_feat = FeatureEngineering.extract_features(input_dict)
        feature_list.append(df_feat.iloc[0])
        y_target.append(row["fuel_consumed_liters"])
        
    X_train = pd.DataFrame(feature_list)
    y_train = np.array(y_target)
    
    # Fit XGBoost Model (Primary)
    xgb = XGBRegressor(n_estimators=100, learning_rate=0.08, max_depth=5, random_state=42)
    xgb.fit(X_train, y_train)
    joblib.dump(xgb, os.path.join(MODEL_DIR, "xgboost_fuel_model.joblib"))
    
    # Fit LightGBM Model
    lgb = LGBMRegressor(n_estimators=100, learning_rate=0.08, max_depth=5, random_state=42, verbose=-1)
    lgb.fit(X_train, y_train)
    joblib.dump(lgb, os.path.join(MODEL_DIR, "lightgbm_fuel_model.joblib"))
    
    # Fit RandomForest Model
    rf = RandomForestRegressor(n_estimators=80, max_depth=6, random_state=42)
    rf.fit(X_train, y_train)
    joblib.dump(rf, os.path.join(MODEL_DIR, "rf_fuel_model.joblib"))
    
    print("Models trained and saved successfully in:", MODEL_DIR)
    return xgb, lgb, rf

if __name__ == "__main__":
    train_and_save_ensemble_models()
