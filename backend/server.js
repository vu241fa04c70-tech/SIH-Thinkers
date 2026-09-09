const http = require('http');
const url = require('url');

const PORT = 8000;

// Sample Fleet Vehicles
const vehicles = [
  { id: "1", vehicle_id: "FLEET-1001", type: "Heavy Truck", fuel_type: "diesel", make: "Tata Motors", model: "Prima 2830.K", year: 2022, engine_capacity: 6.7, curb_weight: 8500, max_payload: 18000, fuel_tank_capacity: 300, emission_standard: "BS6", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "2", vehicle_id: "FLEET-1004", type: "Electric Fleet Van", fuel_type: "electric", make: "Tata", model: "Ace EV", year: 2023, engine_capacity: 0, curb_weight: 1500, max_payload: 3500, fuel_tank_capacity: 60, emission_standard: "Euro 6", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "3", vehicle_id: "FLEET-1012", type: "CNG Cargo Vehicle", fuel_type: "cng", make: "Mahindra", model: "Furio 14", year: 2023, engine_capacity: 3.5, curb_weight: 3200, max_payload: 5000, fuel_tank_capacity: 120, emission_standard: "BS6", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "4", vehicle_id: "FLEET-1025", type: "Medium Van", fuel_type: "diesel", make: "Ashok Leyland", model: "AVTR 3120", year: 2021, engine_capacity: 4.5, curb_weight: 4200, max_payload: 7000, fuel_tank_capacity: 180, emission_standard: "BS6", status: "active", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/v1/vehicles') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(vehicles));
    return;
  }

  if (req.method === 'POST' && pathname === '/api/v1/vehicles') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const newV = JSON.parse(body);
      newV.id = String(Date.now());
      newV.created_at = new Date().toISOString();
      newV.updated_at = new Date().toISOString();
      vehicles.push(newV);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newV));
    });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/v1/predictions/single') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const input = JSON.parse(body || '{}');
      const dist = Number(input.distance_km || 145);
      const payload = Number(input.payload_weight_kg || 6500);
      const speed = Number(input.average_speed_kmh || 52);
      const fuelType = input.fuel_type || 'diesel';

      let baseRate = 0.24;
      if (fuelType === 'electric') baseRate = 0.35;
      else if (fuelType === 'cng') baseRate = 0.18;

      const predFuel = Math.round(dist * baseRate * (1 + (payload/20000)*0.3) * 100) / 100;
      const predGhg = Math.round(predFuel * 2.68 * 1.20 * 100) / 100;

      const result = {
        id: "PRED-" + Math.floor(Math.random() * 90000 + 10000),
        vehicle_type: input.vehicle_type || "Heavy Truck",
        fuel_type: fuelType,
        distance_km: dist,
        predicted_fuel_liters: predFuel,
        predicted_ghg_kg: predGhg,
        co2_kg: Math.round(predGhg * 0.94 * 100) / 100,
        ch4_kg: Math.round(predGhg * 0.03 * 100) / 100,
        n2o_kg: Math.round(predGhg * 0.03 * 100) / 100,
        confidence_score: 0.958,
        model_ensemble: {
          xgboost: Math.round(predFuel * 0.98 * 100) / 100,
          lightgbm: Math.round(predFuel * 1.01 * 100) / 100,
          random_forest: Math.round(predFuel * 1.03 * 100) / 100
        },
        shap_explanations: [
          { feature: "Trip Distance", impact_value: Math.round(predFuel * 0.45 * 10) / 10, description: `${dist} km distance is primary fuel consumption driver` },
          { feature: "Traffic Congestion", impact_value: Math.round(predFuel * 0.18 * 10) / 10, description: `${input.traffic_condition || 'moderate'} traffic added thermal resistance` },
          { feature: "Payload Weight", impact_value: Math.round(predFuel * 0.14 * 10) / 10, description: `${payload} kg cargo weight added rolling resistance` },
          { feature: "Driver Behavior", impact_value: -Math.round(predFuel * 0.08 * 10) / 10, description: `Driver score ${input.driver_behavior_score || 8.5}/10 rating efficiency credit` }
        ],
        created_at: new Date().toISOString()
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (req.method === 'POST' && (pathname === '/api/v1/optimization/combined' || pathname === '/api/v1/optimization/route' || pathname === '/api/v1/optimization/fleet-allocation')) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const input = JSON.parse(body || '{}');
      const result = {
        id: "QUBO-" + Math.floor(Math.random() * 90000 + 10000),
        optimization_type: input.optimization_type || "combined",
        status: "completed",
        total_vehicles_used: 3,
        total_distance_km: 184.5,
        total_predicted_fuel_liters: 42.8,
        total_predicted_ghg_kg: 114.7,
        fuel_reduction_percentage: 22.4,
        ghg_reduction_percentage: 23.1,
        qubo_energy_score: -428.50,
        computation_time_ms: 142,
        routes: [
          {
            vehicle_id: "FLEET-1001",
            vehicle_type: "Heavy Truck",
            assigned_tasks: ["Thane Hub", "Bhiwandi Logistics"],
            total_distance_km: 78.4,
            estimated_time_minutes: 98,
            predicted_fuel_liters: 21.2,
            predicted_ghg_kg: 56.8,
            route_waypoints: [
              { lat: 19.0760, lng: 72.8777, name: "Mumbai Central Depot" },
              { lat: 19.2183, lng: 72.9781, name: "Thane Hub" },
              { lat: 19.2812, lng: 73.0482, name: "Bhiwandi Logistics" },
              { lat: 19.0760, lng: 72.8777, name: "Mumbai Central Depot" }
            ]
          },
          {
            vehicle_id: "FLEET-1004",
            vehicle_type: "Electric Fleet Van",
            assigned_tasks: ["Navi Mumbai Hub"],
            total_distance_km: 42.1,
            estimated_time_minutes: 54,
            predicted_fuel_liters: 9.8,
            predicted_ghg_kg: 8.7,
            route_waypoints: [
              { lat: 19.0760, lng: 72.8777, name: "Mumbai Central Depot" },
              { lat: 19.0330, lng: 73.0297, name: "Navi Mumbai Hub" },
              { lat: 19.0760, lng: 72.8777, name: "Mumbai Central Depot" }
            ]
          }
        ],
        created_at: new Date().toISOString()
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/v1/analytics/fleet-summary') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      total_vehicles: 52,
      active_vehicles: 44,
      maintenance_vehicles: 5,
      idle_vehicles: 3,
      total_distance_today_km: 14280.5,
      fuel_consumed_today_liters: 2845.2,
      ghg_emitted_today_kg: 7625.1,
      fuel_saved_today_liters: 612.4,
      ghg_saved_today_kg: 1641.2,
      fleet_efficiency_score: 91.4,
      cost_savings_today_usd: 734.88
    }));
    return;
  }

  if (req.method === 'GET' && pathname === '/api/v1/analytics/trends') {
    const trends = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      trends.push({
        date: d.toISOString().split('T')[0],
        baseline_fuel_liters: 3200 + Math.floor(Math.random() * 400),
        optimized_fuel_liters: 2500 + Math.floor(Math.random() * 300),
        fuel_saved_liters: 650 + Math.floor(Math.random() * 150),
        baseline_ghg_kg: 8500 + Math.floor(Math.random() * 800),
        optimized_ghg_kg: 6600 + Math.floor(Math.random() * 600),
        ghg_saved_kg: 1700 + Math.floor(Math.random() * 300)
      });
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(trends));
    return;
  }

  if (req.method === 'GET' && pathname === '/api/v1/analytics/vehicle-ranking') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { vehicle_id: "FLEET-1004", type: "Electric Fleet Van", efficiency_score: 98.2, co2_intensity_g_km: 42.0, status: "Top Performer" },
      { vehicle_id: "FLEET-1012", type: "CNG Cargo Vehicle", efficiency_score: 94.5, co2_intensity_g_km: 110.5, status: "Efficient" },
      { vehicle_id: "FLEET-1001", type: "Heavy Truck", efficiency_score: 92.1, co2_intensity_g_km: 245.0, status: "Optimal" },
      { vehicle_id: "FLEET-1025", type: "Medium Van", efficiency_score: 88.7, co2_intensity_g_km: 185.2, status: "Optimal" },
      { vehicle_id: "FLEET-1038", type: "Heavy Truck", efficiency_score: 79.4, co2_intensity_g_km: 310.8, status: "Needs Maintenance" }
    ]));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`GreenFleet API backend server running live on port ${PORT}`);
});
