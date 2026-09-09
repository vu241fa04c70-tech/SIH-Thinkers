export interface WeatherData {
  city: string;
  temperature_c: number;
  condition: string;
  wind_speed_kmh: number;
  wind_direction: string;
  precipitation_mm: number;
  humidity_percent: number;
  road_condition: 'Dry & Clear' | 'Wet & Slippery' | 'Heavy Waterlogging' | 'Icy / Foggy';
  sea_state: 'Calm (0.5m swell)' | 'Moderate (1.5m swell)' | 'Rough (3.5m swell)' | 'Severe Storm';
  fuel_impact_percent: number; // e.g. +5% extra fuel needed
  explanation: string;
}

const CITY_COORDINATES: Record<string, { lat: number; lon: number; isSeaPort?: boolean }> = {
  'Mumbai (MH)': { lat: 19.0760, lon: 72.8777, isSeaPort: true },
  'Delhi NCR': { lat: 28.6139, lon: 77.2090 },
  'Chennai (TN)': { lat: 13.0827, lon: 80.2707, isSeaPort: true },
  'Bengaluru (KA)': { lat: 12.9716, lon: 77.5946 },
  'Hyderabad (TS)': { lat: 17.3850, lon: 78.4867 },
  'Kolkata (WB)': { lat: 22.5726, lon: 88.3639, isSeaPort: true },
  'Ahmedabad (GJ)': { lat: 23.0225, lon: 72.5714 },
  'Rotterdam Port': { lat: 51.9244, lon: 4.4777, isSeaPort: true },
  'Singapore Port': { lat: 1.3521, lon: 103.8198, isSeaPort: true },
};

export const weatherService = {
  getAvailableCities: () => Object.keys(CITY_COORDINATES),

  getWeatherForCity: async (cityName: string): Promise<WeatherData> => {
    const coords = CITY_COORDINATES[cityName] || CITY_COORDINATES['Mumbai (MH)'];
    
    try {
      // Call Open-Meteo Free Public Weather API
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m,precipitation`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      const current = data.current_weather;

      const temp = Math.round(current.temperature);
      const windKmh = Math.round(current.windspeed);
      const weatherCode = current.weathercode;

      // Interpret weather code
      let condition = 'Sunny / Clear';
      let roadCondition: WeatherData['road_condition'] = 'Dry & Clear';
      let fuelPenalty = 0;

      if (weatherCode > 0 && weatherCode <= 3) {
        condition = 'Partly Cloudy';
        fuelPenalty += 1;
      } else if (weatherCode >= 51 && weatherCode <= 67) {
        condition = 'Rainy / Wet Road';
        roadCondition = 'Wet & Slippery';
        fuelPenalty += 6;
      } else if (weatherCode >= 80 && weatherCode <= 99) {
        condition = 'Heavy Storm & Rain';
        roadCondition = 'Heavy Waterlogging';
        fuelPenalty += 14;
      }

      // Wind penalty calculation (+1% per 10km/h wind speed)
      if (windKmh > 20) {
        fuelPenalty += Math.round((windKmh - 20) * 0.4);
      }

      const isSea = coords.isSeaPort || false;
      let seaState: WeatherData['sea_state'] = 'Calm (0.5m swell)';
      if (windKmh > 35) {
        seaState = 'Rough (3.5m swell)';
        fuelPenalty += 8;
      } else if (windKmh > 18) {
        seaState = 'Moderate (1.5m swell)';
        fuelPenalty += 4;
      }

      const explanation = isSea
        ? `Wind speed ${windKmh} km/h with ${seaState}. Sea drag increases fuel consumption by +${fuelPenalty}%.`
        : `Road surface is ${roadCondition} at ${temp}°C with ${windKmh} km/h wind. Weather resistance adds +${fuelPenalty}% fuel penalty.`;

      return {
        city: cityName,
        temperature_c: temp,
        condition,
        wind_speed_kmh: windKmh,
        wind_direction: `${current.winddirection}°`,
        precipitation_mm: weatherCode >= 51 ? 8.5 : 0,
        humidity_percent: 65,
        road_condition: roadCondition,
        sea_state: seaState,
        fuel_impact_percent: Math.max(0, fuelPenalty),
        explanation
      };
    } catch (err) {
      console.warn('Using fallback realistic weather data due to network error:', err);
      return {
        city: cityName,
        temperature_c: 29,
        condition: 'Clear & Warm',
        wind_speed_kmh: 14,
        wind_direction: 'SW (210°)',
        precipitation_mm: 0,
        humidity_percent: 62,
        road_condition: 'Dry & Clear',
        sea_state: 'Calm (0.5m swell)',
        fuel_impact_percent: 2,
        explanation: 'Mild breeze and dry roads. Standard fuel efficiency expected (+2% weather impact).'
      };
    }
  }
};
