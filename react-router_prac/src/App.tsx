import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Movies from './pages/movies.tsx';
import NotFound from './pages/not-found.tsx';
import RootLayer from './layout/root-layout.tsx';
import HomePage from './pages/home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayer />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'movies/:movieId', 
        element: <Movies />
      }
    ]
  },
])

function App () {
  return <RouterProvider router={router} />
}

export default App