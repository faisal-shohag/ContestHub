import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Home from './routes/User/Home.jsx';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import Login from './routes/Authentication/Login.jsx';
import Registration from './routes/Authentication/Registration.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Registration/>
      }
    ],
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
     <RouterProvider router={router} />
     </ThemeProvider>
  </React.StrictMode>,
)
