import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import User from './Pages/User.jsx'
import Calender from './Pages/Calender.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'
import StaredTask from './Pages/StaredTask.jsx'
import Category from './Pages/Category.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/user",
            element: <User />,
        },
        {
            path: "/calendar",
            element: <Calender />,
        },
        {
            path: "/staredtask",
            element: <StaredTask />,
        },
        {
            path: "/category/:type",
            element: <Category />,
        },
        
    ],
},
])


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
)
