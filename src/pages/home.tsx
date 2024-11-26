import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import Button from '../components/ui/Button'
import { SearchIcon, ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import { useFlightSearch } from '../hooks/useFlightSearch'
import AirportSearchModal from '../components/ui/AirportSearchModal' // Nueva importación
import { AirportData } from '../hooks/useFlightSearch'



export default function Home() {
  const theme = useSelector((state:RootState) => state.theme)

  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [fromAirport, setFromAirport] = useState<AirportData | null>(null)
  const [toAirport, setToAirport] = useState<AirportData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'from' | 'to'>('from')

  const completeEnough = fromAirport && toAirport && departure 

  const landingSvg = theme === 'light' ? 'https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg' : 'https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg'
  
  const { searchFlights } = useFlightSearch()

  const handleExplore = () => {
    if (!completeEnough) return
    searchFlights(fromAirport, toAirport, departure, returnDate)
  }

  const handleInputClick = (type: 'from' | 'to') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleAirportSelect = (airport: AirportData) => {
    if (modalType === 'from') {
      setFromAirport(airport)
    } else {
      setToAirport(airport)
    }
    setIsModalOpen(false)
  }

  return (
    <HomeContainer>
      <img src={landingSvg} alt="landscape" />
      <h1 className="home__title">Flights</h1>

      <div className="search-section">


        <div className="search-section__inputs">
          <input
            type='text'
            readOnly
            className="search-section__location-input"
            placeholder="Where from?"
            value={fromAirport ? fromAirport.presentation.suggestionTitle : ''}
            onClick={() => handleInputClick('from')}
          />
          <div className='search-section__switch-icon'>
            <ArrowLeftRight />
          </div>
          <input
            type='text'
            readOnly
            className="search-section__location-input"
            placeholder="Where to?"
            value={toAirport ? toAirport.presentation.suggestionTitle : ''}
            onClick={() => handleInputClick('to')}
          />
        </div>
        <div className="search-section__date-inputs">
          <label>
            Departure
            <input type="date" className="search-section__date-input" value={departure} onChange={(e) => setDeparture(e.target.value)} />
          </label>
          <label>
            Return
            <input type="date" className="search-section__date-input" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </label>
        </div>
        <Button
          variation={completeEnough ? "primary" : "secondary"}
          className="search-section__explore-button"
          onClick={handleExplore}
        >
          <SearchIcon />
          Explore
        </Button>
      </div>
      {isModalOpen && (
        <AirportSearchModal
          onSelect={handleAirportSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;

  .home__title {
    font-size: 3.5em;
    font-weight: 400;
    margin-top: -1em;
    margin-bottom: 1em;
  }

  .search-section {
    position: relative;
    background-color: ${({theme})=>theme.colors.background == "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : 'rgb(32, 33, 36)'};
    color: ${({ theme }) => theme.colors.da};
    padding: .5em 2em 1em;
    border-radius: .5em;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 760px;
    box-sizing: border-box;
    margin: auto;
    margin-bottom: 5em;

    &__filters {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1em;

      &__dropdown {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.colors.hoverBackground};
        }
      }
    }

    &__inputs {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      margin-bottom: 1em;

      & .search-section__location-input {
        font-size: 20px;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text};
        padding: 0.5em 1em;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.border};

        &:hover {
          background-color: ${({ theme }) => theme.colors.hoverBackground};
        }

        span {
          color: ${({ theme }) => theme.colors.placeholder};
        }
      }

      & .search-section__switch-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({theme})=>theme.colors.background == "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : 'rgb(32, 33, 36)'};
        transform: translate(-50%, -50%);
        border: 1px solid ${({ theme }) => theme.colors.text};
        border-radius: 50%;
        width: 2em;
        height: 2em;
        box-sizing: border-box;
        padding: 0.2em;
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;

        & svg {
          position: relative;
          z-index: 1;
        }

        &::before {
          position: absolute;
          z-index: 1;
          background-color: ${({theme})=>theme.colors.background == "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : 'rgb(32, 33, 36)'};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 106%;
          width: .5em;
          content: '';
        }

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    &__date-inputs {
      display: flex;
      justify-content: center;
      gap: 1em;
      margin-bottom: 1em;

      &__date-input {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.colors.hoverBackground};
        }

        span {
          color: ${({ theme }) => theme.colors.placeholder};
        }
      }

      & .search-section__date-input {
        font-size: 20px;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text};
        padding: 0.5em 1em;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.border};

        &:hover {
          background-color: ${({ theme }) => theme.colors.hoverBackground};
        }

        &::placeholder {
          color: ${({ theme }) => theme.colors.placeholder};
        }
      }

      & label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1em;
        color: ${({ theme }) => theme.colors.text};
        gap: 0.5em;

        & input {
          margin-top: 0.5em;
        }
      }
    }

    &__explore-button {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
    }
  }
`

