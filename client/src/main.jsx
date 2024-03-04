import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './app';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";
import SinglePost from './pages/SinglePost';
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        // path: "/profiles/:username",
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/allusers",
        element: <AllUsers />,
      },
       {
        path: '/posts/:postId',
        element: <SinglePost />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
