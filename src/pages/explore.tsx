import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import mock from "../mocks/searchFligthsSuccessResponse.json"
import FlightCard from './components/FlightCard'

export default function Explore() {
  const flightResults = mock
  const navigate = useNavigate()

  useEffect(() => {
    if(!flightResults) navigate('/')
  }, [flightResults, navigate]);

  console.log(flightResults);
  

  return (
    <StyledExplore>
      <h1 className="explore__title">Explore Flights</h1>
      {flightResults ? (
        flightResults.data.itineraries.map(itinerary => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))
      ) : (
        <p className="explore__no-results">No se pudieron cargar los resultados de vuelos.</p>
      )}
    </StyledExplore>
  )
}

const StyledExplore = styled.div`
  .explore {
    &__title {
      margin-bottom: .1em;
    }

    &__no-results {
      // styles for no results message
    }

    // ...existing styles...
  }

  padding: 1em;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  gap: 2em;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: .1em;
  }

  .card {
    background-color: ${({ theme }) => theme.colors.cardBackground || theme.colors.background};
    border-radius: 8px;
    padding: 1em;
    margin-bottom: 1em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.8);
    .price {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 0.5em;
    }
  
    .info {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
      color: ${({ theme }) => theme.colors.text};
      gap: 1em;

      .from, .to {
        display: flex;
        align-items: center;
        gap: 0.2em;
      }
    }
  
    .row {
      display: flex;
      align-items: center;
      gap: 0.5em;
      margin-top: .4em;
    }
  }

`
