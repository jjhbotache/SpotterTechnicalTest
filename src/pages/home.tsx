import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/slices/themeSlice'
import styled from 'styled-components'

export default function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const dispatch = useDispatch()

  const handleSearch = () => {
    alert(`Searching flights from ${from} to ${to} departing on ${departureDate} and returning on ${returnDate}`)
  }

  return (
    <HomeContainer>
      <h1 className="home__title">Google Flights</h1>
      <button className="home__toggle-button" onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
      <div className="home__flight-search">
        <div className="home__field">
          <label className="home__label">From:</label>
          <input className="home__input" type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="home__field">
          <label className="home__label">To:</label>
          <input className="home__input" type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="home__field">
          <label className="home__label">Departure Date:</label>
          <input className="home__input" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        </div>
        <div className="home__field">
          <label className="home__label">Return Date:</label>
          <input className="home__input" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <button className="home__search-button" onClick={handleSearch}>Search Flights</button>
      </div>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;

  .home__title {
    /* estilos para el título */
  }

  .home__toggle-button {
    /* estilos para el botón de toggle */
  }

  .home__flight-search {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home__field {
    margin: 5px 0;
  }

  .home__label {
    margin: 5px 0;
  }

  .home__input {
    margin: 5px 0;
  }

  .home__search-button {
    margin-top: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`
