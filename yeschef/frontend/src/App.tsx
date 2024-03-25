import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { AddRecipe, Home, More, MyRecipes, UpdateEmail, UpdatePassword, UserProfile } from './pages/Dashboard';
import { DashboardLayout } from './layouts';
import { UILoader } from './components/loaders';
import { ErrorPage } from './pages/Error';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <Home />
      },
      {
        path: '/dashboard/addrecipe',
        element: <AddRecipe />
      }, 
      {
        path: '/dashboard/myrecipe',
        element: <MyRecipes />
      },
      {
        path: '/dashboard/userProfile',
        element: <UserProfile />
      },
      {
        path: '/dashboard/updateEmail',
        element: <UpdateEmail />
      },
      {
        path: '/dashboard/updatePassword',
        element: <UpdatePassword />
      },
      {
        path: '/dashboard/recipe/:id',
        element: <More />
      }
    ]
  },
]);
  return (
    <div className="container h-[100vh] w-[100vw] max-w-full">
    <Suspense fallback={<UILoader />}>
      <RouterProvider router={router} fallbackElement={<UILoader />} />
    </Suspense>
  </div>
  )
}

export default App
