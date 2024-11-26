import { useFlightSearch } from '../../hooks/useFlightSearch'
import Modal from '../ui/Modal'
import styled from 'styled-components'
import { AirportData } from '../../hooks/useFlightSearch'
import { useState, useEffect, useRef, useCallback } from 'react'
import Loader from '../ui/Loader'

function AirportSearchModal({ onSelect, onClose }: { onSelect: (airport: AirportData) => void, onClose: () => void }) {
  const searchAirports = useCallback(useFlightSearch().searchAirports, [])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AirportData[]>([])
  const [loading, setLoading] = useState(false)
  const debounceTimeout = useRef<null | ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      if (query) {
        setLoading(true)
        searchAirports(query).then(response => {
          setResults(response.data)
          setLoading(false)
        }).catch(error => {
          console.error(error)
          setLoading(false)
        })
      }
    }, 400)
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [query, searchAirports])

  return (
    <Modal onClose={onClose}>
      <StyledInput
        type="text"
        placeholder="Search airports"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <StyledList>
          {results.map((airport) => (
            <StyledListItem key={airport.navigation.entityId} onClick={() => onSelect(airport)}>
              {airport.presentation.suggestionTitle}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </Modal>
  )
}

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`

const StyledListItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`

export default AirportSearchModal
