import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

//Browser Router v5
//createBrowserRouter v6

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      }
    ],
  },
]);

//movies/upcoming
//movies/popular
//movies/now_playing
//movies/top_rated
//movies?category=upcoming
//movies?category=popular
//movies?category=now_playing
//movies/category/{movie_id}

function App() {
  return <RouterProvider router={router} />;
}

export default App;