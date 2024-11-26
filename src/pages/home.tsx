import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import Button from '../components/ui/Button'
import { SearchIcon, ArrowLeftRight, Gem, User, Baby, PersonStanding } from 'lucide-react'
import { useState } from 'react'
import { useFlightSearch } from '../hooks/useFlightSearch'
import AirportSearchModal from '../components/home/AirportSearchModal' // Nueva importación
import { AirportData } from '../hooks/useFlightSearch'
import PageLoader from '../components/ui/PageLoader';
import SelectInput from '../components/ui/SelectInput' // New import
import NumberInput from '../components/ui/NumberInput' // New import

export default function Home() {
  const theme = useSelector((state:RootState) => state.theme)

  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [fromAirport, setFromAirport] = useState<AirportData | null>(null)
  const [toAirport, setToAirport] = useState<AirportData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'from' | 'to'>('from')
  const [loading, setLoading] = useState(false);
  const [cabinClass, setCabinClass] = useState('economy') // New state
  const [adults, setAdults] = useState(1) // New state
  const [children, setChildren] = useState(0) // New state
  const [infants, setInfants] = useState(0) // New state

  const completeEnough = fromAirport && toAirport && departure 

  const landingSvg = theme === 'light' ? 'https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg' : 'https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg'
  
  const { searchFlights } = useFlightSearch()

  const handleExplore = () => {
    if (!completeEnough) return
    setLoading(true)
    searchFlights({
        fromDataItem: fromAirport,
        toDataItem: toAirport,
        departureDate: departure,
        cabinClass,
        adults,
        childrens: children, // Pass children
        infants,
        returnDate
      })
      .finally(() => setLoading(false)) 
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
    <HomeContainer className='home'>
      {loading ? (
        <PageLoader />
      ) : (
        <>
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
            <details className="search-section__details">
              <summary className="search-section__summary">Additional Parameters</summary>
              <div className="search-section__additional-params">
                <label>
                <Gem />
                Cabin Class
                <SelectInput
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  options={[
                  { value: 'economy', label: 'Economy' },
                  { value: 'premium_economy', label: 'Premium Economy' },
                  { value: 'business', label: 'Business' },
                  { value: 'first', label: 'First' },
                  ]}
                  className="search-section__select-input"
                />
                </label>
                <label>
                <User />
                Adults
                <NumberInput
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  min={1}
                  className="search-section__number-input"
                />
                </label>
                <label>
                <PersonStanding />
                Children
                <NumberInput
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  min={0}
                  className="search-section__number-input"
                />
                </label>
                <label>
                <Baby />
                Infants
                <NumberInput
                  value={infants}
                  onChange={(e) => setInfants(Number(e.target.value))}
                  min={0}
                  className="search-section__number-input"
                />
                </label>
              </div>
            </details>
            <Button
              $variation={completeEnough ? "primary" : "secondary"}
              onClick={handleExplore}
              className="search-section__explore-button"
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
        </>
      )}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;

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
        width: 40%;
        max-width: 200px;

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
      flex-wrap: wrap;
      gap: 1em;
      margin-bottom: 1em;
      width: 100%;

      & label{
        width: 48%;
        max-width: 400px;
        min-width: 200px;

        &__date-input {
          padding: 0.5em;
          border: 1px solid ${({ theme }) => theme.colors.border};
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;          
          cursor: pointer;
  
          &:hover {
            background-color: ${({ theme }) => theme.colors.hoverBackground};
          }
  
          span {
            color: ${({ theme }) => theme.colors.placeholder};
          }
        }
      }

      @media screen and (width > 480px){        
        & label:first-child{
          display: flex;
          text-align: right;
          align-items: end;
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
    &__additional-params {
      display: flex;
      justify-content: center;
      gap: 1em;
      margin-bottom: 1em;
      flex-wrap: wrap;
      justify-items: center;

      & label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1em;
        color: ${({ theme }) => theme.colors.text};
        gap: 0.5em;
        width: 48%;
        max-width: 100px;

        & select,
        & .search-section__number-input {
          padding: 0.5em;
          border: 1px solid ${({ theme }) => theme.colors.border};
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;

          &:hover {
            background-color: ${({ theme }) => theme.colors.hoverBackground};
          }
        }
      }
    }
    &__details {
      margin-bottom: 1em;
    }

    &__summary {
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 0.5em;
    }
  }
`

