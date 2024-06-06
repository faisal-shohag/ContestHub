import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./index.css";
import Home from "./routes/User/Home.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import Login from "./routes/Authentication/Login.jsx";
import Registration from "./routes/Authentication/Registration.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/Authentication/PrivateRoute.jsx";
import AllContest from "./routes/User/AllContest.jsx";
import AdminDashboard from "./routes/Admin/AdminDashboard.jsx";
import CreatorDashboard from "./routes/Creator/CreatorDashboard.jsx";
import UserDashboard from "./routes/User/UserDashboard.jsx";
import ManageUser from "./routes/Admin/Dashboard/ManageUser.jsx";
import ManageContest from "./routes/Admin/Dashboard/ManageContest.jsx";
import MyCreatedContest from "./routes/Creator/Dashboard/MyCreatedContest.jsx";
import SubmittedContest from "./routes/Creator/Dashboard/SubmittedContest.jsx";
import AddContest from "./routes/Creator/Dashboard/AddContest.jsx";
import MyContest from "./routes/User/Dashboard/MyContest.jsx";
import MyWinningContest from "./routes/User/Dashboard/MyWinningContest.jsx";
import Profile from "./routes/User/Dashboard/Profile.jsx";

const queryClient = new QueryClient()

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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "all_contest",
        element: <PrivateRoute><AllContest/></PrivateRoute>,
      
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboard/>,
    children: [
      {
        path: "manage-user",
        element: <ManageUser/>
      },
      {
        path: "manage-contest",
        element: <ManageContest/>
      }
    ]
  },
  {
    path: "creator-dashboard",
    element:<CreatorDashboard/>,
    children: [
      {
        path: "created-contest",
        element: <MyCreatedContest/>
      }, 
      {
        path: "subimtted-contest",
        element: <SubmittedContest/>
      },
      {
        path: "add-contest",
        element: <AddContest/>
      }
    ]
  },
  {
    path: "user-dahboard",
    element: <UserDashboard/>,
    children: [
      {
        path: "my-contests",
        element: <MyContest/>
      }, 
      {
        path: "my-winning-contest",
        element: <MyWinningContest/>
      }, 
      {
        path: "profile",
        element: <Profile/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster/>
      </ThemeProvider>
    </HelmetProvider>
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
