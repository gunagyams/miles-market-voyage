
interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
  state?: string;
}

// Using a comprehensive list of major airports worldwide
const MAJOR_AIRPORTS: Airport[] = [
  // North America
  { iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  { iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  { iata: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
  { iata: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
  { iata: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
  { iata: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
  { iata: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
  { iata: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
  { iata: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
  { iata: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States' },
  { iata: 'LAS', name: 'McCarran International Airport', city: 'Las Vegas', country: 'United States' },
  { iata: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
  { iata: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada' },

  // Europe
  { iata: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { iata: 'MAD', name: 'Madrid-Barajas Airport', city: 'Madrid', country: 'Spain' },
  { iata: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
  { iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { iata: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { iata: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
  { iata: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark' },
  { iata: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden' },
  { iata: 'OSL', name: 'Oslo Airport', city: 'Oslo', country: 'Norway' },

  // Middle East
  { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  { iata: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
  { iata: 'AUH', name: 'Abu Dhabi International Airport', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { iata: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait' },
  { iata: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh', country: 'Saudi Arabia' },
  { iata: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah', country: 'Saudi Arabia' },

  // Asia Pacific
  { iata: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { iata: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { iata: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { iata: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
  { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { iata: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
  { iata: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia' },
  { iata: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { iata: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },

  // India
  { iata: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  { iata: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  { iata: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { iata: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
  { iata: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India' },
  { iata: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India' },

  // China
  { iata: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China' },
  { iata: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China' },
  { iata: 'CAN', name: 'Guangzhou Tianhe International Airport', city: 'Guangzhou', country: 'China' },
  { iata: 'SZX', name: 'Shenzhen Bao\'an International Airport', city: 'Shenzhen', country: 'China' },

  // Africa
  { iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
  { iata: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
  { iata: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa' },
  { iata: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria' },

  // South America
  { iata: 'GRU', name: 'São Paulo-Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
  { iata: 'GIG', name: 'Rio de Janeiro-Galeão International Airport', city: 'Rio de Janeiro', country: 'Brazil' },
  { iata: 'EZE', name: 'Ezeiza International Airport', city: 'Buenos Aires', country: 'Argentina' },
  { iata: 'BOG', name: 'El Dorado International Airport', city: 'Bogotá', country: 'Colombia' },
  { iata: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima', country: 'Peru' },
  { iata: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago', country: 'Chile' }
];

export const searchAirports = (query: string): Airport[] => {
  if (!query || query.length < 2) return MAJOR_AIRPORTS.slice(0, 10);
  
  const searchTerm = query.toLowerCase();
  
  return MAJOR_AIRPORTS.filter(airport => 
    airport.iata.toLowerCase().includes(searchTerm) ||
    airport.name.toLowerCase().includes(searchTerm) ||
    airport.city.toLowerCase().includes(searchTerm) ||
    airport.country.toLowerCase().includes(searchTerm)
  ).slice(0, 20);
};

export const getAirportByIata = (iata: string): Airport | undefined => {
  return MAJOR_AIRPORTS.find(airport => airport.iata === iata);
};

export { type Airport };
