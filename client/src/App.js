import "./App.css";
import * as React from "react";
import HomePage from "./components/pages/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
