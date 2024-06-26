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
import Dashboard from "./routes/Admin/Dashboard/Dashboard.jsx";
import CreatorDashboardHome from "./routes/Creator/Dashboard/Dashboard.jsx";
import UserDashboardHome from "./routes/User/Dashboard/Dashboard.jsx";
import EditContest from "./routes/Creator/Dashboard/EditContest.jsx";
import ContestDetails from "./routes/User/ContestDetails.jsx";
import Payment from "./routes/User/Payment.jsx";
import Leaderboard from "./routes/User/Leaderboard.jsx";
import SuccessStories from "./routes/User/SuccessStories.jsx";
import Benefits from "./routes/User/Benefits.jsx";
import NotFound from "./routes/NotFound.jsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound/>,
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
        element: <AllContest/>,
      
      },
      {
        path: "contest-details/:id/:time",
        element: <PrivateRoute><ContestDetails/></PrivateRoute>,
      },
      {
        path: "payment/:id",
        element: <PrivateRoute><Payment/></PrivateRoute>,
      }, 
      {
        path: 'leaderboard',
        element: <Leaderboard/>
      },
      {
        path: 'success-stories',
        element: <SuccessStories/>
      },
      {
        path: 'benefits',
        element: <Benefits/>
      }
    ],
  },
  {
    path: "admin-dashboard",
    element: <PrivateRoute><AdminDashboard/></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>
      
      },
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
    element: <PrivateRoute><CreatorDashboard/></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <CreatorDashboardHome/>
      },
      
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
      },
      {
        path: "edit-contest/:id",
        element: <EditContest/>
      }
    ]
  },
  {
    path: "user-dashboard",
    element: <PrivateRoute><UserDashboard/></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <UserDashboardHome/>
      },
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
      }, 
      
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
