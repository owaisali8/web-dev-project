import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/app/App.jsx'
import AdminLogin from './routes/admin/login.jsx';
import AdminPortal from './routes/admin/portal.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './routes/error/error-page'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin/portal",
    element: <AdminPortal />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
