// client\src\main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/SignInPage'
import { RouterProvider } from 'react-router'
import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/resume/[resumeId]/edit/EditResume'
import ViewResume from './myResume/[resumeId]/view'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: < App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />
      }
    ]
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />
  }
])

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
  </ClerkProvider>
)
