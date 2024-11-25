import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import styled from 'styled-components'

export default function Explore() {
  const flightResults = useSelector((state: RootState) => state.flights.results)

  if (!flightResults) {
    return <div>No results found</div>
  }

  return (
    <ExploreContainer>
      <h1>Explore Flights</h1>
      <pre>{JSON.stringify(flightResults, null, 2)}</pre>
    </ExploreContainer>
  )
}

const ExploreContainer = styled.div`
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`
