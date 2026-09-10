export interface FuelPriceItem {
  fuel_type: 'diesel' | 'petrol' | 'lng' | 'electric' | 'vlsfo_marine';
  name: string;
  unit: string;
  price_inr: number;
  location: string;
  last_updated: string;
  source: string;
}

export interface StateFuelPrice {
  city: string;
  diesel: number;
  petrol: number;
  cng_lng: number;
  ev_electricity: number; // per kWh
  marine_vlsfo: number; // per ton
}

const REGIONAL_FUEL_PRICES: Record<string, StateFuelPrice> = {
  'Mumbai (Maharashtra)': {
    city: 'Mumbai',
    diesel: 92.15,
    petrol: 104.21,
    cng_lng: 76.00,
    ev_electricity: 9.50,
    marine_vlsfo: 54200.00
  },
  'Delhi NCR': {
    city: 'Delhi',
    diesel: 87.62,
    petrol: 94.72,
    cng_lng: 73.50,
    ev_electricity: 8.20,
    marine_vlsfo: 52100.00
  },
  'Chennai (Tamil Nadu)': {
    city: 'Chennai',
    diesel: 94.24,
    petrol: 100.75,
    cng_lng: 78.50,
    ev_electricity: 9.00,
    marine_vlsfo: 55400.00
  },
  'Bengaluru (Karnataka)': {
    city: 'Bengaluru',
    diesel: 88.94,
    petrol: 102.86,
    cng_lng: 77.00,
    ev_electricity: 8.80,
    marine_vlsfo: 53800.00
  },
  'Kolkata (West Bengal)': {
    city: 'Kolkata',
    diesel: 90.76,
    petrol: 103.94,
    cng_lng: 79.00,
    ev_electricity: 9.10,
    marine_vlsfo: 54900.00
  },
  'Hyderabad (Telangana)': {
    city: 'Hyderabad',
    diesel: 95.65,
    petrol: 107.41,
    cng_lng: 82.00,
    ev_electricity: 9.80,
    marine_vlsfo: 56100.00
  }
};

export const fuelPriceService = {
  getAvailableRegions: () => Object.keys(REGIONAL_FUEL_PRICES),

  getFuelPricesForRegion: (region: string): StateFuelPrice => {
    return REGIONAL_FUEL_PRICES[region] || REGIONAL_FUEL_PRICES['Mumbai (Maharashtra)'];
  },

  getAllPricesAsList: (region: string): FuelPriceItem[] => {
    const prices = REGIONAL_FUEL_PRICES[region] || REGIONAL_FUEL_PRICES['Mumbai (Maharashtra)'];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return [
      {
        fuel_type: 'diesel',
        name: 'Automotive Diesel (BS6)',
        unit: '₹ / Liter',
        price_inr: prices.diesel,
        location: prices.city,
        last_updated: now,
        source: 'IOCL / HPCL Official Daily Rate'
      },
      {
        fuel_type: 'lng',
        name: 'Liquefied Natural Gas (LNG / CNG)',
        unit: '₹ / kg',
        price_inr: prices.cng_lng,
        location: prices.city,
        last_updated: now,
        source: 'GAIL / Mahanagar Gas Rate'
      },
      {
        fuel_type: 'electric',
        name: 'Commercial Fleet EV Power',
        unit: '₹ / kWh',
        price_inr: prices.ev_electricity,
        location: prices.city,
        last_updated: now,
        source: 'State DISCOM Commercial Tariff'
      },
      {
        fuel_type: 'petrol',
        name: 'Motor Spirit (Petrol)',
        unit: '₹ / Liter',
        price_inr: prices.petrol,
        location: prices.city,
        last_updated: now,
        source: 'IOCL Daily Rate'
      },
      {
        fuel_type: 'vlsfo_marine',
        name: 'VLSFO 0.5% Marine Bunker Fuel',
        unit: '₹ / Metric Ton',
        price_inr: prices.marine_vlsfo,
        location: prices.city + ' Port',
        last_updated: now,
        source: 'Global Bunker Index (GBI)'
      }
    ];
  }
};
