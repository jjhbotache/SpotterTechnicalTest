import styled from 'styled-components'
import { Plane, MapPin, Clock } from 'lucide-react'

interface Itinerary {
  id: string
  price: { formatted: string }
  legs: {
    origin: { city: string; displayCode: string }
    destination: { city: string; displayCode: string }
    durationInMinutes: number
    departure: string
    arrival: string
  }[]
}

interface FlightCardProps {
  itinerary: Itinerary
}

export default function FlightCard({ itinerary }: FlightCardProps) {
  return (
    <StyledFlightCard>
      <div className="flight-card">
        <h2 className="flight-card__price">{itinerary.price.formatted}</h2>
        <div className="flight-card__info">
          <div className="flight-card__info-item flight-card__info-item--from">
            <MapPin size={16} /> <span>{itinerary.legs[0].origin.city} ({itinerary.legs[0].origin.displayCode})</span>
          </div>
          <div className="flight-card__info-item flight-card__info-item--to">
            <Plane size={16} /> <span>{itinerary.legs[0].destination.city} ({itinerary.legs[0].destination.displayCode})</span>
          </div>
        </div>

        <div className="flight-card__row">
          <Clock size={16} /> <span>Duración: {itinerary.legs[0].durationInMinutes} minutos</span>
        </div>
        
        <hr />
        <div className="flight-card__row">
          <span>Salida: {new Date(itinerary.legs[0].departure).toLocaleString()}</span>
        </div>
        <div className="flight-card__row">
          <span>Llegada: {new Date(itinerary.legs[0].arrival).toLocaleString()}</span>
        </div>
      </div>
    </StyledFlightCard>
  )
}

const StyledFlightCard = styled.div`
  .flight-card {
    background-color: ${({ theme }) => theme.colors.cardBackground || theme.colors.background};
    border-radius: 8px;
    padding: 1em;
    margin-bottom: 1em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.8);

    &__price {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 0.5em;
    }
  
    &__info {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
      color: ${({ theme }) => theme.colors.text};
      gap: 1em;

      &-item {
        display: flex;
        align-items: center;
        gap: 0.2em;
      }

      &-item--from, &-item--to {
        // Additional styles if needed
      }
    }
  
    &__row {
      display: flex;
      align-items: center;
      gap: 0.5em;
      margin-top: 0.4em;
    }
  }
`
