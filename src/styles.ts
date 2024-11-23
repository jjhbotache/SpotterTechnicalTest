import styled from 'styled-components'

export const theme = {
  light: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#f8f9fa',
      text: '#212529'
    }
  },
  dark: {
    colors: {
      primary: '#375a7f',
      secondary: '#444',
      background: '#343a40',
      text: '#f8f9fa'
    }
  }
}

export const MainContainer = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
`

export const FlightSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Label = styled.label`
  margin: 5px 0;
`

export const Input = styled.input`
  margin: 5px 0;
`

export const Button = styled.button`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
