import { Suspense, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './pages/Landing';
import { AddRecipe, Home, MyRecipes } from './pages/Dashboard';
import { DashboardLayout } from './layouts';
import { UILoader } from './components/loaders';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <div>Error Page</div>,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <div>Error Page 2</div>,
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
