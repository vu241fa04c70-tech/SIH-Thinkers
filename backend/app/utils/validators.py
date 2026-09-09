def validate_vehicle_payload(payload_kg: float, max_payload_kg: float) -> bool:
    if payload_kg < 0:
        raise ValueError("Payload weight cannot be negative.")
    if payload_kg > max_payload_kg * 1.5:
        raise ValueError("Payload exceeds maximum safe vehicle capacity.")
    return True

def validate_coordinates(lat: float, lng: float) -> bool:
    if not (-90.0 <= lat <= 90.0):
        raise ValueError(f"Invalid latitude value: {lat}")
    if not (-180.0 <= lng <= 180.0):
        raise ValueError(f"Invalid longitude value: {lng}")
    return True
