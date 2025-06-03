
interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
  state?: string;
}

// Cache for airport data to avoid repeated API calls
let airportsCache: Airport[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fallback airports in case API fails
const FALLBACK_AIRPORTS: Airport[] = [
  { iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  { iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  { iata: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { iata: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
];

const fetchAirportsFromAPI = async (): Promise<Airport[]> => {
  try {
    console.log('🛩️ Fetching airports from API...');
    
    // Using the Airport-codes API (free tier)
    const response = await fetch('https://api.airport-codes.org/v1/multi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          status: 'active',
          type: 'airport'
        },
        limit: 5000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.airports && Array.isArray(data.airports)) {
      const airports: Airport[] = data.airports
        .filter((airport: any) => airport.iata_code && airport.name && airport.city && airport.country)
        .map((airport: any) => ({
          iata: airport.iata_code,
          name: airport.name,
          city: airport.city,
          country: airport.country,
          state: airport.state
        }))
        .slice(0, 3000); // Limit to 3000 for performance

      console.log(`✅ Successfully fetched ${airports.length} airports from API`);
      return airports;
    }
    
    throw new Error('Invalid API response format');
  } catch (error) {
    console.error('❌ Failed to fetch airports from API:', error);
    
    // Try alternative free API
    try {
      console.log('🔄 Trying alternative API...');
      const altResponse = await fetch('https://raw.githubusercontent.com/hipo/university-domains-list/master/world_universities_and_domains.json');
      
      if (altResponse.ok) {
        // This is just a fallback - we'll use a comprehensive static list instead
        throw new Error('Alternative API not suitable');
      }
    } catch (altError) {
      console.error('❌ Alternative API also failed:', altError);
    }
    
    // Use comprehensive static list as final fallback
    return getComprehensiveAirportList();
  }
};

const getComprehensiveAirportList = (): Airport[] => {
  // Comprehensive list of major airports worldwide (expanded)
  return [
    // North America - Major Cities
    { iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
    { iata: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States' },
    { iata: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States' },
    { iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
    { iata: 'BUR', name: 'Hollywood Burbank Airport', city: 'Burbank', country: 'United States' },
    { iata: 'SNA', name: 'John Wayne Airport', city: 'Orange County', country: 'United States' },
    { iata: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
    { iata: 'MDW', name: 'Midway International Airport', city: 'Chicago', country: 'United States' },
    { iata: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
    { iata: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', city: 'Fort Lauderdale', country: 'United States' },
    { iata: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
    { iata: 'OAK', name: 'Oakland International Airport', city: 'Oakland', country: 'United States' },
    { iata: 'SJC', name: 'Norman Y. Mineta San José International Airport', city: 'San Jose', country: 'United States' },
    { iata: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
    { iata: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
    { iata: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
    { iata: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
    { iata: 'DAL', name: 'Dallas Love Field', city: 'Dallas', country: 'United States' },
    { iata: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States' },
    { iata: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States' },
    { iata: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States' },
    { iata: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States' },
    { iata: 'HOU', name: 'William P. Hobby Airport', city: 'Houston', country: 'United States' },
    { iata: 'MSP', name: 'Minneapolis-Saint Paul International Airport', city: 'Minneapolis', country: 'United States' },
    { iata: 'DTW', name: 'Detroit Metropolitan Wayne County Airport', city: 'Detroit', country: 'United States' },
    { iata: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States' },
    { iata: 'PHL', name: 'Philadelphia International Airport', city: 'Philadelphia', country: 'United States' },
    { iata: 'BWI', name: 'Baltimore/Washington International Airport', city: 'Baltimore', country: 'United States' },
    { iata: 'DCA', name: 'Ronald Reagan Washington National Airport', city: 'Washington DC', country: 'United States' },
    { iata: 'IAD', name: 'Washington Dulles International Airport', city: 'Washington DC', country: 'United States' },
    
    // Canada
    { iata: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
    { iata: 'YUL', name: 'Montréal-Pierre Elliott Trudeau International Airport', city: 'Montreal', country: 'Canada' },
    { iata: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada' },
    { iata: 'YYC', name: 'Calgary International Airport', city: 'Calgary', country: 'Canada' },
    { iata: 'YEG', name: 'Edmonton International Airport', city: 'Edmonton', country: 'Canada' },
    { iata: 'YOW', name: 'Ottawa Macdonald-Cartier International Airport', city: 'Ottawa', country: 'Canada' },
    
    // Mexico
    { iata: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico' },
    { iata: 'CUN', name: 'Cancún International Airport', city: 'Cancun', country: 'Mexico' },
    { iata: 'GDL', name: 'Miguel Hidalgo y Costilla Guadalajara International Airport', city: 'Guadalajara', country: 'Mexico' },
    
    // Europe - UK & Ireland
    { iata: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
    { iata: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom' },
    { iata: 'STN', name: 'London Stansted Airport', city: 'London', country: 'United Kingdom' },
    { iata: 'LTN', name: 'London Luton Airport', city: 'London', country: 'United Kingdom' },
    { iata: 'LCY', name: 'London City Airport', city: 'London', country: 'United Kingdom' },
    { iata: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom' },
    { iata: 'BHX', name: 'Birmingham Airport', city: 'Birmingham', country: 'United Kingdom' },
    { iata: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom' },
    { iata: 'GLA', name: 'Glasgow Airport', city: 'Glasgow', country: 'United Kingdom' },
    { iata: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland' },
    
    // France
    { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { iata: 'ORY', name: 'Orly Airport', city: 'Paris', country: 'France' },
    { iata: 'NCE', name: 'Nice Côte d\'Azur Airport', city: 'Nice', country: 'France' },
    { iata: 'LYS', name: 'Lyon-Saint Exupéry Airport', city: 'Lyon', country: 'France' },
    { iata: 'MRS', name: 'Marseille Provence Airport', city: 'Marseille', country: 'France' },
    
    // Germany
    { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    { iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
    { iata: 'DUS', name: 'Düsseldorf Airport', city: 'Düsseldorf', country: 'Germany' },
    { iata: 'TXL', name: 'Berlin Brandenburg Airport', city: 'Berlin', country: 'Germany' },
    { iata: 'HAM', name: 'Hamburg Airport', city: 'Hamburg', country: 'Germany' },
    { iata: 'CGN', name: 'Cologne Bonn Airport', city: 'Cologne', country: 'Germany' },
    
    // Netherlands
    { iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
    { iata: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Netherlands' },
    
    // Spain
    { iata: 'MAD', name: 'Madrid-Barajas Airport', city: 'Madrid', country: 'Spain' },
    { iata: 'BCN', name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain' },
    { iata: 'PMI', name: 'Palma de Mallorca Airport', city: 'Palma', country: 'Spain' },
    { iata: 'AGP', name: 'Málaga Airport', city: 'Malaga', country: 'Spain' },
    { iata: 'SVQ', name: 'Seville Airport', city: 'Seville', country: 'Spain' },
    
    // Italy
    { iata: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
    { iata: 'CIA', name: 'Ciampino Airport', city: 'Rome', country: 'Italy' },
    { iata: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy' },
    { iata: 'LIN', name: 'Milan Linate Airport', city: 'Milan', country: 'Italy' },
    { iata: 'NAP', name: 'Naples International Airport', city: 'Naples', country: 'Italy' },
    { iata: 'VCE', name: 'Venice Marco Polo Airport', city: 'Venice', country: 'Italy' },
    
    // Switzerland
    { iata: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
    { iata: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland' },
    { iata: 'BSL', name: 'EuroAirport Basel-Mulhouse-Freiburg', city: 'Basel', country: 'Switzerland' },
    
    // Austria
    { iata: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
    { iata: 'SZG', name: 'Salzburg Airport', city: 'Salzburg', country: 'Austria' },
    
    // Nordic Countries
    { iata: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark' },
    { iata: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden' },
    { iata: 'GOT', name: 'Gothenburg Landvetter Airport', city: 'Gothenburg', country: 'Sweden' },
    { iata: 'OSL', name: 'Oslo Airport', city: 'Oslo', country: 'Norway' },
    { iata: 'BGO', name: 'Bergen Airport', city: 'Bergen', country: 'Norway' },
    { iata: 'HEL', name: 'Helsinki Airport', city: 'Helsinki', country: 'Finland' },
    
    // Eastern Europe
    { iata: 'WAW', name: 'Warsaw Chopin Airport', city: 'Warsaw', country: 'Poland' },
    { iata: 'KRK', name: 'John Paul II International Airport Kraków-Balice', city: 'Krakow', country: 'Poland' },
    { iata: 'PRG', name: 'Václav Havel Airport Prague', city: 'Prague', country: 'Czech Republic' },
    { iata: 'BUD', name: 'Budapest Ferenc Liszt International Airport', city: 'Budapest', country: 'Hungary' },
    
    // Russia
    { iata: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow', country: 'Russia' },
    { iata: 'DME', name: 'Domodedovo International Airport', city: 'Moscow', country: 'Russia' },
    { iata: 'LED', name: 'Pulkovo Airport', city: 'St. Petersburg', country: 'Russia' },
    
    // Middle East
    { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
    { iata: 'AUH', name: 'Abu Dhabi International Airport', city: 'Abu Dhabi', country: 'United Arab Emirates' },
    { iata: 'SHJ', name: 'Sharjah International Airport', city: 'Sharjah', country: 'United Arab Emirates' },
    { iata: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
    { iata: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait' },
    { iata: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh', country: 'Saudi Arabia' },
    { iata: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah', country: 'Saudi Arabia' },
    { iata: 'DXX', name: 'King Fahd International Airport', city: 'Dammam', country: 'Saudi Arabia' },
    { iata: 'TLV', name: 'Ben Gurion Airport', city: 'Tel Aviv', country: 'Israel' },
    
    // Turkey
    { iata: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
    { iata: 'SAW', name: 'Sabiha Gökçen International Airport', city: 'Istanbul', country: 'Turkey' },
    { iata: 'ESB', name: 'Esenboğa International Airport', city: 'Ankara', country: 'Turkey' },
    { iata: 'AYT', name: 'Antalya Airport', city: 'Antalya', country: 'Turkey' },
    
    // Asia Pacific - Japan
    { iata: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
    { iata: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
    { iata: 'KIX', name: 'Kansai International Airport', city: 'Osaka', country: 'Japan' },
    { iata: 'ITM', name: 'Osaka International Airport', city: 'Osaka', country: 'Japan' },
    { iata: 'NGO', name: 'Chubu Centrair International Airport', city: 'Nagoya', country: 'Japan' },
    { iata: 'CTS', name: 'New Chitose Airport', city: 'Sapporo', country: 'Japan' },
    
    // South Korea
    { iata: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
    { iata: 'GMP', name: 'Gimpo International Airport', city: 'Seoul', country: 'South Korea' },
    { iata: 'PUS', name: 'Gimhae International Airport', city: 'Busan', country: 'South Korea' },
    
    // China
    { iata: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China' },
    { iata: 'PKX', name: 'Beijing Daxing International Airport', city: 'Beijing', country: 'China' },
    { iata: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China' },
    { iata: 'SHA', name: 'Shanghai Hongqiao International Airport', city: 'Shanghai', country: 'China' },
    { iata: 'CAN', name: 'Guangzhou Tianhe International Airport', city: 'Guangzhou', country: 'China' },
    { iata: 'SZX', name: 'Shenzhen Bao\'an International Airport', city: 'Shenzhen', country: 'China' },
    { iata: 'CTU', name: 'Chengdu Tianfu International Airport', city: 'Chengdu', country: 'China' },
    { iata: 'XIY', name: 'Xi\'an Xianyang International Airport', city: 'Xi\'an', country: 'China' },
    
    // Southeast Asia
    { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    { iata: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
    { iata: 'SZB', name: 'Sultan Abdul Aziz Shah Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
    { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
    { iata: 'DMK', name: 'Don Mueang International Airport', city: 'Bangkok', country: 'Thailand' },
    { iata: 'HKT', name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand' },
    { iata: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia' },
    { iata: 'DPS', name: 'Ngurah Rai International Airport', city: 'Denpasar', country: 'Indonesia' },
    { iata: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines' },
    { iata: 'CEB', name: 'Mactan-Cebu International Airport', city: 'Cebu', country: 'Philippines' },
    { iata: 'SGN', name: 'Tan Son Nhat International Airport', city: 'Ho Chi Minh City', country: 'Vietnam' },
    { iata: 'HAN', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam' },
    
    // Hong Kong & Taiwan
    { iata: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
    { iata: 'TPE', name: 'Taiwan Taoyuan International Airport', city: 'Taipei', country: 'Taiwan' },
    { iata: 'TSA', name: 'Taipei Songshan Airport', city: 'Taipei', country: 'Taiwan' },
    
    // India
    { iata: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
    { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
    { iata: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
    { iata: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
    { iata: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
    { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
    { iata: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India' },
    { iata: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India' },
    { iata: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India' },
    { iata: 'GOI', name: 'Goa International Airport', city: 'Goa', country: 'India' },
    
    // Australia & New Zealand
    { iata: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
    { iata: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
    { iata: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia' },
    { iata: 'PER', name: 'Perth Airport', city: 'Perth', country: 'Australia' },
    { iata: 'ADL', name: 'Adelaide Airport', city: 'Adelaide', country: 'Australia' },
    { iata: 'CBR', name: 'Canberra Airport', city: 'Canberra', country: 'Australia' },
    { iata: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },
    { iata: 'CHC', name: 'Christchurch Airport', city: 'Christchurch', country: 'New Zealand' },
    { iata: 'WLG', name: 'Wellington Airport', city: 'Wellington', country: 'New Zealand' },
    
    // Africa
    { iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
    { iata: 'SSH', name: 'Sharm el-Sheikh International Airport', city: 'Sharm el-Sheikh', country: 'Egypt' },
    { iata: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
    { iata: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa' },
    { iata: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa' },
    { iata: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria' },
    { iata: 'ABV', name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', country: 'Nigeria' },
    { iata: 'ADD', name: 'Addis Ababa Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia' },
    { iata: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya' },
    { iata: 'CMN', name: 'Mohammed V International Airport', city: 'Casablanca', country: 'Morocco' },
    
    // South America
    { iata: 'GRU', name: 'São Paulo-Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
    { iata: 'CGH', name: 'São Paulo-Congonhas Airport', city: 'São Paulo', country: 'Brazil' },
    { iata: 'GIG', name: 'Rio de Janeiro-Galeão International Airport', city: 'Rio de Janeiro', country: 'Brazil' },
    { iata: 'SDU', name: 'Santos Dumont Airport', city: 'Rio de Janeiro', country: 'Brazil' },
    { iata: 'BSB', name: 'Brasília International Airport', city: 'Brasília', country: 'Brazil' },
    { iata: 'EZE', name: 'Ezeiza International Airport', city: 'Buenos Aires', country: 'Argentina' },
    { iata: 'AEP', name: 'Jorge Newbery Airfield', city: 'Buenos Aires', country: 'Argentina' },
    { iata: 'BOG', name: 'El Dorado International Airport', city: 'Bogotá', country: 'Colombia' },
    { iata: 'MDE', name: 'José María Córdova International Airport', city: 'Medellín', country: 'Colombia' },
    { iata: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima', country: 'Peru' },
    { iata: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago', country: 'Chile' },
    { iata: 'MVD', name: 'Montevideo Airport', city: 'Montevideo', country: 'Uruguay' },
    { iata: 'ASU', name: 'Silvio Pettirossi International Airport', city: 'Asunción', country: 'Paraguay' },
    { iata: 'CCS', name: 'Simón Bolívar International Airport', city: 'Caracas', country: 'Venezuela' },
    { iata: 'UIO', name: 'Mariscal Sucre International Airport', city: 'Quito', country: 'Ecuador' },
    { iata: 'GYE', name: 'José Joaquín de Olmedo International Airport', city: 'Guayaquil', country: 'Ecuador' },
    { iata: 'LPB', name: 'El Alto International Airport', city: 'La Paz', country: 'Bolivia' },
  ];
};

export const searchAirports = async (query: string): Promise<Airport[]> => {
  try {
    // Check if we need to fetch fresh data
    const now = Date.now();
    if (airportsCache.length === 0 || (now - lastFetchTime) > CACHE_DURATION) {
      console.log('🔄 Cache expired or empty, fetching fresh airport data...');
      
      try {
        airportsCache = await fetchAirportsFromAPI();
        lastFetchTime = now;
      } catch (error) {
        console.error('📡 API fetch failed, using comprehensive static list');
        airportsCache = getComprehensiveAirportList();
        lastFetchTime = now;
      }
    }

    // If no query, return top airports
    if (!query || query.length < 2) {
      return airportsCache.slice(0, 15);
    }
    
    const searchTerm = query.toLowerCase();
    
    const filtered = airportsCache.filter(airport => 
      airport.iata.toLowerCase().includes(searchTerm) ||
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    );

    return filtered.slice(0, 30);
  } catch (error) {
    console.error('❌ Search failed, using fallback airports:', error);
    return FALLBACK_AIRPORTS;
  }
};

export const getAirportByIata = (iata: string): Airport | undefined => {
  // First check cache
  if (airportsCache.length > 0) {
    const found = airportsCache.find(airport => airport.iata === iata);
    if (found) return found;
  }

  // Then check comprehensive list
  const comprehensive = getComprehensiveAirportList();
  const found = comprehensive.find(airport => airport.iata === iata);
  if (found) return found;

  // Finally check fallback
  return FALLBACK_AIRPORTS.find(airport => airport.iata === iata);
};

export { type Airport };
