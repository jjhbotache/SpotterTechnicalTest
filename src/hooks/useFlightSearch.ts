import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFlightResults } from '../redux/slices/flightSlice';

interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: {
    entityId: string;
    entityType: string;
    localizedName: string;
  };
}

interface SearchAirportsResponse {
  status: boolean;
  timestamp: number;
  data: AirportData[];
}

export interface AirportData {
  presentation: Presentation;
  navigation: Navigation;
}

export const useFlightSearch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchFlights = async (
    fromDataItem: AirportData,
    toDataItem: AirportData,
    departureDate: string,
    returnDate: string
  ) => {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY as string,                
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    }

    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=${fromDataItem.navigation.relevantFlightParams.skyId}&destinationSkyId=${toDataItem.navigation.relevantFlightParams.skyId}&originEntityId=${fromDataItem.navigation.entityId}&destinationEntityId=${toDataItem.navigation.entityId}&date=${departureDate}&returnDate=${returnDate}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      dispatch(setFlightResults(result))
      navigate('/explore')
    } catch (error) {
      console.error(error)
    }
  }

  const searchAirports = async (query: string): Promise<SearchAirportsResponse> => {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY as string,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    }

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}&locale=en-US`

    try {
      const response = await fetch(url, options)
      const result: SearchAirportsResponse = await response.json()
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { searchFlights, searchAirports }
}
