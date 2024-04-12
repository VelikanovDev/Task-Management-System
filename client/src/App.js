import "./App.css";
import * as React from "react";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { checkSession } from "./services/UserService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initSessionCheck = async () => {
      const loggedIn = await checkSession();
      setIsLoggedIn(loggedIn);
    };

    initSessionCheck().then();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: (
        <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ),
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
