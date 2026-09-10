export interface FleetVehicle {
  id: string;
  vehicle_id: string;
  truck_number: string; // e.g. "AP 07 TJ 4821"
  model: string;
  type: 'Heavy Hauler' | 'Reefer Van' | 'Urban Delivery EV' | 'Interstate Cargo' | 'Express Courier';
  driver: {
    name: string;
    avatar: string;
    phone: string;
    rating: number;
  };
  status: 'en_route' | 'idle' | 'charging' | 'alert';
  status_display: string;
  speed: number; // km/h
  fuel_used: string; // e.g. "42.5 L"
  cargo_weight: string; // e.g. "18,400 kg"
  heading: number; // deg
  fuel_type: 'electric' | 'cng' | 'diesel' | 'hydrogen';
  fuel_level: number; // percentage
  battery_temp_c?: number;
  eco_score: number; // 0 - 100
  payload_kg: number;
  max_payload_kg: number;
  current_location: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    name: string;
    lat: number;
    lng: number;
    eta: string;
    distance_remaining_km: number;
  };
  co2_rate_g_km: number;
  total_co2_saved_kg: number;
  route_waypoints: { lat: number; lng: number; name?: string }[];
  alerts?: {
    severity: 'info' | 'warning' | 'critical';
    message: string;
    time: string;
  }[];
}

export interface LogisticsHub {
  id: string;
  name: string;
  type: 'central_depot' | 'megawatt_charger' | 'cng_hub' | 'distribution_center';
  lat: number;
  lng: number;
  capacity: string;
  active_vehicles: number;
}

export interface RouteGeometry {
  id: 'original' | 'optimized';
  label: string;
  color: string;
  distance: string;
  duration: string;
  fuelEstimated: string;
  co2Impact: string;
  description: string;
  coordinates: [number, number][];
}

export interface CopilotRecommendation {
  id: string;
  title: string;
  description: string;
  targetVehicleId: string;
  badge: string;
  carbon_savings: string;
  time_savings: string;
  actionLabel: string;
  applied?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  metrics?: { label: string; val: string }[];
}

// Guntur City Center coordinates
export const GUNTUR_CENTER: [number, number] = [16.3067, 80.4365];

// Logistics Hubs around Guntur
export const DUMMY_HUBS: LogisticsHub[] = [
  {
    id: 'hub-1',
    name: 'Guntur Autonagar Terminal Hub',
    type: 'central_depot',
    lat: 16.3180,
    lng: 80.4720,
    capacity: '60 Truck Bays / Fuel Depot',
    active_vehicles: 14
  },
  {
    id: 'hub-2',
    name: 'Guntur Mirchi Yard Logistics Terminal',
    type: 'distribution_center',
    lat: 16.2780,
    lng: 80.4450,
    capacity: 'Asia\'s Largest Agri-Logistics Hub',
    active_vehicles: 22
  },
  {
    id: 'hub-3',
    name: 'Perecherla Industrial Freight Hub',
    type: 'distribution_center',
    lat: 16.3350,
    lng: 80.3720,
    capacity: '40 Loading Docks / Cold Storage',
    active_vehicles: 9
  },
  {
    id: 'hub-4',
    name: 'Mangalagiri Mega EV Charger Station',
    type: 'megawatt_charger',
    lat: 16.4250,
    lng: 80.5500,
    capacity: '350kW High-Power Clean DC MCS',
    active_vehicles: 5
  }
];

// 5 Dedicated Trucks in Guntur as required
export const DUMMY_VEHICLES: FleetVehicle[] = [
  {
    id: 'truck-1',
    vehicle_id: 'TRK-01',
    truck_number: 'AP 07 TJ 4821',
    model: 'BharatBenz 2823R Heavy Cargo',
    type: 'Heavy Hauler',
    driver: {
      name: 'Ramesh Reddy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      phone: '+91 98480 23145',
      rating: 4.9
    },
    status: 'en_route',
    status_display: 'En Route (On Schedule)',
    speed: 54,
    fuel_used: '42.5 L',
    cargo_weight: '18,400 kg',
    heading: 38,
    fuel_type: 'diesel',
    fuel_level: 68,
    eco_score: 95,
    payload_kg: 18400,
    max_payload_kg: 24000,
    current_location: {
      lat: 16.2820,
      lng: 80.4480,
      address: 'Near Mirchi Yard, NH16 Bypass Corridor'
    },
    destination: {
      name: 'Guntur Autonagar Terminal Hub',
      lat: 16.3180,
      lng: 80.4720,
      eta: '14 mins (14:35)',
      distance_remaining_km: 7.2
    },
    co2_rate_g_km: 195,
    total_co2_saved_kg: 184.2,
    route_waypoints: [
      { lat: 16.2650, lng: 80.4250 },
      { lat: 16.2820, lng: 80.4480, name: 'Current Location' },
      { lat: 16.3020, lng: 80.4600 },
      { lat: 16.3180, lng: 80.4720, name: 'Autonagar Hub' }
    ]
  },
  {
    id: 'truck-2',
    vehicle_id: 'TRK-02',
    truck_number: 'AP 07 TX 8920',
    model: 'Tata Prima 3530.K Heavy Carrier',
    type: 'Interstate Cargo',
    driver: {
      name: 'Suresh Varma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      phone: '+91 97012 34567',
      rating: 4.8
    },
    status: 'en_route',
    status_display: 'En Route (Eco Mode Active)',
    speed: 38,
    fuel_used: '28.2 L',
    cargo_weight: '12,800 kg',
    heading: 125,
    fuel_type: 'cng',
    fuel_level: 74,
    eco_score: 97,
    payload_kg: 12800,
    max_payload_kg: 16000,
    current_location: {
      lat: 16.3350,
      lng: 80.3720,
      address: 'Perecherla Industrial Zone, Guntur West'
    },
    destination: {
      name: 'Guntur South Freight Depot',
      lat: 16.2850,
      lng: 80.4350,
      eta: '22 mins (14:43)',
      distance_remaining_km: 11.4
    },
    co2_rate_g_km: 140,
    total_co2_saved_kg: 215.6,
    route_waypoints: [
      { lat: 16.3450, lng: 80.3550 },
      { lat: 16.3350, lng: 80.3720, name: 'Current Location' },
      { lat: 16.3100, lng: 80.4000 },
      { lat: 16.2850, lng: 80.4350, name: 'Destination' }
    ]
  },
  {
    id: 'truck-3',
    vehicle_id: 'TRK-03',
    truck_number: 'AP 16 TH 3314',
    model: 'Ashok Leyland 4220 HG Multi-Axle',
    type: 'Heavy Hauler',
    driver: {
      name: 'K. Venkatesh',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
      phone: '+91 94401 55678',
      rating: 4.7
    },
    status: 'idle',
    status_display: 'Idle / Unloading at Bay 4',
    speed: 0,
    fuel_used: '64.0 L',
    cargo_weight: '22,100 kg',
    heading: 0,
    fuel_type: 'diesel',
    fuel_level: 46,
    eco_score: 89,
    payload_kg: 22100,
    max_payload_kg: 26000,
    current_location: {
      lat: 16.3180,
      lng: 80.4720,
      address: 'Autonagar Logistics Terminal Bay 4'
    },
    destination: {
      name: 'Standby for Next QUBO Dispatch',
      lat: 16.3180,
      lng: 80.4720,
      eta: 'Standby (Docked)',
      distance_remaining_km: 0
    },
    co2_rate_g_km: 0,
    total_co2_saved_kg: 142.8,
    route_waypoints: [
      { lat: 16.3180, lng: 80.4720, name: 'Autonagar Bay 4' }
    ]
  },
  {
    id: 'truck-4',
    vehicle_id: 'TRK-04',
    truck_number: 'AP 07 EV 9012',
    model: 'Eicher Pro 2049 EV Clean Logistics',
    type: 'Urban Delivery EV',
    driver: {
      name: 'P. Ananya',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      phone: '+91 99890 11223',
      rating: 4.95
    },
    status: 'en_route',
    status_display: 'En Route (Fast Clean Transit)',
    speed: 62,
    fuel_used: '0 L (Clean EV - 54 kWh)',
    cargo_weight: '9,600 kg',
    heading: 210,
    fuel_type: 'electric',
    fuel_level: 82,
    battery_temp_c: 27,
    eco_score: 99,
    payload_kg: 9600,
    max_payload_kg: 12000,
    current_location: {
      lat: 16.3850,
      lng: 80.5180,
      address: 'NH16 Expressway, Guntur-Mangalagiri Corridor'
    },
    destination: {
      name: 'Guntur Central Logistics Depot',
      lat: 16.3067,
      lng: 80.4365,
      eta: '16 mins (14:37)',
      distance_remaining_km: 12.8
    },
    co2_rate_g_km: 0,
    total_co2_saved_kg: 388.4,
    route_waypoints: [
      { lat: 16.4250, lng: 80.5500 },
      { lat: 16.3850, lng: 80.5180, name: 'Current Location' },
      { lat: 16.3400, lng: 80.4750 },
      { lat: 16.3067, lng: 80.4365, name: 'Guntur Central Depot' }
    ]
  },
  {
    id: 'truck-5',
    vehicle_id: 'TRK-05',
    truck_number: 'AP 07 TA 1155',
    model: 'Mahindra Blazo X 28 Intercity',
    type: 'Reefer Van',
    driver: {
      name: 'Mohd. Imran',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      phone: '+91 98660 77889',
      rating: 4.6
    },
    status: 'alert',
    status_display: 'Congestion Alert (Inner City Gridlock)',
    speed: 22,
    fuel_used: '51.8 L',
    cargo_weight: '16,200 kg',
    heading: 260,
    fuel_type: 'diesel',
    fuel_level: 39,
    eco_score: 79,
    payload_kg: 16200,
    max_payload_kg: 20000,
    current_location: {
      lat: 16.3010,
      lng: 80.4320,
      address: 'Inner Ring Road, Old Bus Stand Junction'
    },
    destination: {
      name: 'Perecherla Industrial Freight Hub',
      lat: 16.3350,
      lng: 80.3720,
      eta: '38 mins (14:59) - Delayed',
      distance_remaining_km: 8.9
    },
    co2_rate_g_km: 345,
    total_co2_saved_kg: 92.1,
    alerts: [
      {
        severity: 'warning',
        message: 'Severe congestion along Guntur downtown market corridor. High stop-and-go fuel loss (+26 min delay).',
        time: '4m ago'
      },
      {
        severity: 'info',
        message: 'AI Copilot recommends switching to Guntur Bypass Optimized Route immediately.',
        time: '2m ago'
      }
    ],
    route_waypoints: [
      { lat: 16.3180, lng: 80.4720 },
      { lat: 16.3010, lng: 80.4320, name: 'Current Location (Congested)' },
      { lat: 16.3100, lng: 80.4000 },
      { lat: 16.3350, lng: 80.3720, name: 'Perecherla Hub' }
    ]
  }
];

// Original Route (Red) vs Optimized Route (Green) across Guntur
export const GUNTUR_ROUTES: {
  original: RouteGeometry;
  optimized: RouteGeometry;
} = {
  original: {
    id: 'original',
    label: 'Original Route',
    color: '#ef4444', // Red
    distance: '31.8 km',
    duration: '68 mins',
    fuelEstimated: '48.5 L',
    co2Impact: '128 kg CO₂',
    description: 'Routes directly through Guntur inner-city market intersections with 14 traffic lights and severe congestion.',
    coordinates: [
      [16.3180, 80.4720], // Autonagar Terminal (Start)
      [16.3140, 80.4580], // Etukuru Road
      [16.3080, 80.4460], // Arundelpet Commercial Core
      [16.3010, 80.4320], // Old Bus Stand / Market Junction (Heavy Congestion bottleneck)
      [16.2970, 80.4190], // Brodipet Main Road
      [16.3020, 80.4010], // Gujjanagundla Junction
      [16.3160, 80.3850], // Syamala Nagar Link
      [16.3350, 80.3720]  // Perecherla Industrial Hub (End)
    ]
  },
  optimized: {
    id: 'optimized',
    label: 'Optimized Route',
    color: '#10b981', // Green
    distance: '24.2 km',
    duration: '38 mins',
    fuelEstimated: '32.8 L',
    co2Impact: '86 kg CO₂ (-32%)',
    description: 'Bypasses downtown via Guntur North Outer Ring Road & NH16 expressway. Smooth traffic flow and lowest emissions.',
    coordinates: [
      [16.3180, 80.4720], // Autonagar Terminal (Start)
      [16.3320, 80.4760], // North Autonagar Link
      [16.3560, 80.4620], // NH16 Vijayawada Interchange
      [16.3680, 80.4320], // Guntur Outer Ring Expressway North
      [16.3620, 80.3990], // Amaravati Outer Link Road
      [16.3480, 80.3790], // Perecherla North Bypass Junction
      [16.3350, 80.3720]  // Perecherla Industrial Hub (End)
    ]
  }
};

export const INITIAL_COPILOT_RECOMMENDATIONS: CopilotRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Switch AP 07 TA 1155 to Optimized Green Route',
    description: 'Avoid inner Guntur market gridlock. Switching to the Outer Ring Bypass saves 15.7 L fuel and 30 mins.',
    targetVehicleId: 'AP 07 TA 1155',
    badge: 'Urgent Route Optimization',
    carbon_savings: '-42.0 kg CO₂',
    time_savings: '-30 mins',
    actionLabel: 'Apply Optimized Route',
    applied: false
  },
  {
    id: 'rec-2',
    title: 'Dispatch Standby Truck AP 16 TH 3314 via Bypass',
    description: 'Truck 3 is idle at Autonagar Bay 4. Assigning freight via the green bypass corridor saves 26% fuel vs baseline.',
    targetVehicleId: 'AP 16 TH 3314',
    badge: 'Fleet Dispatch',
    carbon_savings: '-38.4 kg CO₂',
    time_savings: 'Instant Dispatch',
    actionLabel: 'Assign Green Path',
    applied: false
  },
  {
    id: 'rec-3',
    title: 'EV Fast Charging Window at Mangalagiri',
    description: 'Truck AP 07 EV 9012 can utilize solar mega-charging off-peak tariff window at Mangalagiri Station.',
    targetVehicleId: 'AP 07 EV 9012',
    badge: 'Solar Tariff',
    carbon_savings: '100% Clean PPA',
    time_savings: 'Scheduled',
    actionLabel: 'Reserve Charger',
    applied: false
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Welcome to Guntur Fleet Intelligence! I'm tracking 5 trucks across Guntur. I've calculated two paths between Autonagar Hub and Perecherla: the Red Original Route (heavy congestion) and the Green Optimized Route (saving 32% fuel & 30 mins). Click on any truck to view its telematics popup.",
    timestamp: '14:02',
    metrics: [
      { label: 'Guntur Fleet', val: '5 Active Trucks' },
      { label: 'Green Path Fuel Saved', val: '15.7 Liters' },
      { label: 'Delay Avoided', val: '30 mins' }
    ]
  }
];

export const DUMMY_CARBON_PASSPORT = {
  passportId: 'CP-2026-IN-7741',
  issuedTo: 'GreenFleet Logistics (Guntur Division)',
  complianceStandard: 'IPCC Tier-3 & ISO 14064-1 Validated',
  validationHash: '0x8f2d...c3e9a',
  validThru: 'December 2026',
  ecoGrade: 'A+',
  overallScore: 96.4,
  monthlyProgress: 82, // percentage of target
  carbonSavingsThisMonth: '18.4 Metric Tons',
  metrics: {
    scope1: {
      label: 'Scope 1 (Direct Fleet Combustion)',
      value: '412 kg CO₂e',
      change: '-34% vs baseline',
      status: 'optimal'
    },
    scope2: {
      label: 'Scope 2 (EV Grid Charging)',
      value: '84 kg CO₂e',
      change: '-62% (100% Green PPA)',
      status: 'optimal'
    },
    scope3: {
      label: 'Scope 3 (Upstream Well-to-Wheel)',
      value: '126 kg CO₂e',
      change: '-18% supplier optimization',
      status: 'optimal'
    }
  },
  equivalents: [
    { label: 'Mature Trees Equivalent', value: '118 Trees', icon: 'tree' },
    { label: 'Diesel Fuel Avoided', value: '680 Liters', icon: 'fuel' },
    { label: 'Clean Solar Energy Consumed', value: '3.4 MWh', icon: 'zap' }
  ]
};

export interface CompletedTrip {
  id: string;
  trip_number: string; // "Trip #105"
  eco_grade: string;   // "A+"
  fuel_score: number;  // 92
  co2_score: number;   // 88
  route_name: string;
  distance_km: number;
  duration: string;
  truck_number: string;
  driver_name: string;
  co2_saved_kg: number;
  fuel_saved_liters: number;
  trees_equivalent: number;
  completed_at: string;
  verified_hash: string;
}

export const COMPLETED_TRIPS: CompletedTrip[] = [
  {
    id: 'trip-105',
    trip_number: 'Trip #105',
    eco_grade: 'A+',
    fuel_score: 92,
    co2_score: 88,
    route_name: 'Autonagar Hub -> Perecherla Freight Center (Green Bypass)',
    distance_km: 24.2,
    duration: '38 mins',
    truck_number: 'AP 07 TJ 4821',
    driver_name: 'Ramesh Reddy',
    co2_saved_kg: 34.2,
    fuel_saved_liters: 15.7,
    trees_equivalent: 4.8,
    completed_at: 'Today, 13:45',
    verified_hash: '0x7e4b...9a12'
  },
  {
    id: 'trip-104',
    trip_number: 'Trip #104',
    eco_grade: 'A',
    fuel_score: 89,
    co2_score: 86,
    route_name: 'Mangalagiri Mega Terminal -> Guntur Central Depot',
    distance_km: 16.8,
    duration: '26 mins',
    truck_number: 'AP 07 EV 9012',
    driver_name: 'P. Ananya',
    co2_saved_kg: 28.5,
    fuel_saved_liters: 12.4,
    trees_equivalent: 3.9,
    completed_at: 'Today, 12:10',
    verified_hash: '0x3c9d...f088'
  },
  {
    id: 'trip-103',
    trip_number: 'Trip #103',
    eco_grade: 'A+',
    fuel_score: 95,
    co2_score: 93,
    route_name: 'Mirchi Yard Terminal -> Autonagar Bay 2 (Clean CNG)',
    distance_km: 18.4,
    duration: '29 mins',
    truck_number: 'AP 07 TX 8920',
    driver_name: 'Suresh Varma',
    co2_saved_kg: 41.0,
    fuel_saved_liters: 18.2,
    trees_equivalent: 5.6,
    completed_at: 'Today, 10:30',
    verified_hash: '0x9a22...b71c'
  },
  {
    id: 'trip-102',
    trip_number: 'Trip #102',
    eco_grade: 'B+',
    fuel_score: 81,
    co2_score: 78,
    route_name: 'Guntur Inner Core -> Tenali Highway Link',
    distance_km: 22.5,
    duration: '44 mins',
    truck_number: 'AP 07 TA 1155',
    driver_name: 'Mohd. Imran',
    co2_saved_kg: 14.8,
    fuel_saved_liters: 6.5,
    trees_equivalent: 2.1,
    completed_at: 'Yesterday, 17:15',
    verified_hash: '0x1d44...88ee'
  }
];
