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
        path: 'movies/:category', //dynamic parameter -> useParams 활용
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId', //params.movidId  or   구조분해 할당으로 movieId 접근 
        element: <MovieDetailPage />,
      }
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;