import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Root from './pages/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

export default router
