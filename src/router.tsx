import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Root from './pages/root'
import Explore from './pages/explore'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
    ],
  },
])

export default router
