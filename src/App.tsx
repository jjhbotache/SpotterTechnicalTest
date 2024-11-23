import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { RootState } from './redux/store'
import { theme } from './styles'
import router from './router'

function App() {
  const currentTheme = useSelector((state: RootState) => state.theme)

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
