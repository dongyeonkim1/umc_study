import './App.css';
import {createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import SignupCompletePage from './pages/SignupCompletePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

//publicRoutes
const publicRoutes: RouteObject[] = [ 
  {
    path: '/',
    element: <HomeLayout />, //공유하는 layout(navbar, footer)
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />}, //home경로일 때, 
      {path: '/login', element: <LoginPage />},
      {path: '/signup', element: <SignupPage />},
      {path: '/signup/complete', element: <SignupCompletePage />},
      {path: '/v1/auth/google/callback', element: <GoogleLoginRedirectPage />},
    ],
  },
];

//protectedRoutes
const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/my',
        element: <MyPage/>,
      },
    ],
  },
];


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);


function App() {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  );
}


export default App;
