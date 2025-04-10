import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import SignupCompletePage from './pages/SignupCompletePage';


const router = createBrowserRouter( [
  {
    path: '/',
    element: <HomeLayout />, //공유하는 layout(navbar, footer)
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />}, //home경로일 때, 
      {path: '/login', element: <LoginPage />},
      {path: '/signup', element: <SignupPage />},
      {path: '/my', element: <MyPage />},
      {path: '/signup/complete', element: <SignupCompletePage />},
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}


export default App;
