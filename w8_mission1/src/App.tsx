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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/LpDetailPage';
import ThrottlePage from './pages/ThrottlePage';

//publicRoutes
const publicRoutes: RouteObject[] = [ 
  {
    path: '/',
    element: <HomeLayout />, //공유하는 layout(navbar, footer)
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />}, //home경로일 때, 
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
      {path: 'signup/complete', element: <SignupCompletePage />},
      {path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage />},
      {path: 'lp/:lpId', element: <LpDetailPage />},
      {path: '/throttle', element: <ThrottlePage />},
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}


export default App;
