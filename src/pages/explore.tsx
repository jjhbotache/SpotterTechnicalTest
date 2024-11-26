import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import mock from "../mocks/searchFligthsSuccessResponse.json"
import FlightCard from './components/FlightCard'
import useAirportCoordinates from '../hooks/useAirportCoordinates'
import MapComponent from '../components/explore/MapComponent'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Loader from '../components/ui/Loader'

type Coordinates = {
  lat: number;
  lng: number;
};

export default function Explore() {
  const { flights:flightResults } = useSelector((state: RootState) => state)
  // const flightResults = mock
  const navigate = useNavigate()
  const { getCoordinatesByIATA } = useAirportCoordinates()
  const [departureCoordinates, setDepartureCoordinates] = useState< Coordinates | null >(null);
  const [arrivalCoordinates, setArrivalCoordinates] = useState< Coordinates | null >(null);

  useEffect(() => {
    if (flightResults && flightResults.data && flightResults.data.itineraries.length > 0) {
      const departureIATA = flightResults.data.itineraries[0].legs[0].origin.displayCode;
      const arrivalIATA = flightResults.data.itineraries[0].legs[0].destination?.displayCode;

      if (!departureIATA || !arrivalIATA) return;
      const fromCoords = getCoordinatesByIATA(departureIATA)
      const toCoords = getCoordinatesByIATA(arrivalIATA)
      if (fromCoords) setDepartureCoordinates(fromCoords);
      if (toCoords) setArrivalCoordinates(toCoords);
    }
  }, [flightResults, getCoordinatesByIATA]);

  useEffect(() => {
    if(!flightResults.status)navigate("/")
  }, [flightResults, navigate]);

  console.log("Departure: ", departureCoordinates);
  console.log("Arrival: ", arrivalCoordinates);

  return (
    <StyledExplore className="explore">
          <div className="left-container">
            <h1 className="explore-title">Explore Flights</h1>
            <div className="explore-results">
            {flightResults ? (
              flightResults.data.itineraries.map(itinerary => (
                <FlightCard key={itinerary.id} itinerary={itinerary} />
              ))
            ) : (
              <p className="explore__no-results">No se pudieron cargar los resultados de vuelos.</p>
            )}
            
            </div>
          </div>
          <div className="right-container">
            {departureCoordinates && arrivalCoordinates ? (
                <MapComponent departureCoordinates={departureCoordinates} arrivalCoordinates={arrivalCoordinates} />
            ) : (
              <Loader />
            )}
          </div>
    </StyledExplore>
  )
}

const StyledExplore = styled.div`
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  box-sizing: border-box;
  gap: 2em;
  display: flex;
  flex-direction: row;
  height: calc(100% - 75px);
  

  
  
  
  .left-container {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 30%;

    height: 100%;
    h1 {
      margin-bottom: .1em;
    }
    .explore-title {
      margin-bottom: .1em;
    }

    .explore-results {
      gap: 1em;
      overflow-y: auto;
      height: 100%;
    }

  }

  .right-container {
    flex: 1;
    display: grid;
    place-items: center;
  }

  .explore__no-results {
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .left-container {
      width: 100%;
      max-width: 500px;
      position: relative;
      z-index: 2;
      
      /* Mobile devices (no hover) */
      @media (hover: none) {
        opacity: 0.8;
      }

      /* Non-mobile devices (with hover) */
      @media (hover: hover) {
        opacity: 0.5;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .right-container {
      opacity: 0.4;
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
`
