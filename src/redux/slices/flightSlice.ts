import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Definición de interfaces
interface OriginDestination {
  city: string
  displayCode: string
}

interface Leg {
  id: string
  origin: OriginDestination
  destination: OriginDestination
  durationInMinutes: number
  departure: string
  arrival: string
}

interface Price {
  formatted: string
}

interface Itinerary {
  id: string
  price: Price
  legs: Leg[]
}

interface Context {
  status: string
  sessionId: string
  totalResults: number
}

interface FilterStats {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: {
    city: string;
    airports: {
      id: string;
      entityId: string;
      name: string;
    }[];
  }[];
  carriers: {
    id: number;
    alternateId: string;
    logoUrl: string;
    name: string;
  }[];
  stopPrices: {
    direct: {
      isPresent: boolean;
      formattedPrice: string;
    };
    one: {
      isPresent: boolean;
      formattedPrice: string;
    };
    twoOrMore: {
      isPresent: boolean;
      formattedPrice: string;
    };
  };
}

interface Data {
  context: Context
  itineraries: Itinerary[]
  messages: string[]
  filterStats: FilterStats
  flightsSessionId: string
  destinationImageUrl: string
}

export interface FlightResults {
  status: boolean
  timestamp: number
  sessionId: string
  data: Data
}


const initialState: FlightResults = {
  status: false,
  timestamp: 0,
  sessionId: '',
  data: {
    context: {
      status: '',
      sessionId: '',
      totalResults: 0
    },
    itineraries: [],
    messages: [],
    filterStats: {
      duration: {
        min: 0,
        max: 0,
        multiCityMin: 0,
        multiCityMax: 0
      },
      airports: [],
      carriers: [],
      stopPrices: {
        direct: {
          isPresent: false,
          formattedPrice: ''
        },
        one: {
          isPresent: false,
          formattedPrice: ''
        },
        twoOrMore: {
          isPresent: false,
          formattedPrice: ''
        }
      }
    },
    flightsSessionId: '',
    destinationImageUrl: ''
  }
}

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlightResults(_, action: PayloadAction<FlightResults>) {
      return action.payload
    },
  },
})

export const { setFlightResults } = flightSlice.actions
export default flightSlice.reducer
