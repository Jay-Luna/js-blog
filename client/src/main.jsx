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
        // path: "/user/:id",
        path: "/user/:id",
        element: <Profile />,
      },
      {
        // path: "/profile/:username",
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
       {
        path: '/posts/:postId',
        element: <SinglePost />
      },
      {
        path: '/allusers',
        element: <AllUsers />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
