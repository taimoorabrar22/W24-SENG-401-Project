import { Suspense, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './pages/Landing';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <div>Error Page</div>,
  },
]);
  return (
    <div className="container h-[100vh] w-[100vw] max-w-full">
    <Suspense fallback={<div>Loading</div>}>
      <RouterProvider router={router} fallbackElement={<div>Fallback</div>} />
    </Suspense>
  </div>
  )
}

export default App
