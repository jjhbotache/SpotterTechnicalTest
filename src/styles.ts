import styled from 'styled-components'

const darkGray = 'rgb(32, 33, 36)'
const pureWhite = 'rgb(255, 255, 255)'
const white = 'rgb(232, 234, 237)'
const blue = 'rgb(138, 180, 248)'
const darkBlue = 'rgb(57, 68, 87)'

export const theme = {
  light: {
    colors: {
      primary: blue,
      secondary: darkBlue,
      background: pureWhite,
      text: darkGray,
    }
  },
  dark: {
    colors: {
      primary: blue,
      secondary: darkBlue,
      background: darkGray,
      text: white,
    }
  },
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
