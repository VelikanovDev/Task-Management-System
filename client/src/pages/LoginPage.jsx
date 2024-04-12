import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // This useEffect will run whenever isLoggedIn changes.
  useEffect(() => {
    console.log("isLoggedIn state updated to: ", isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      if (result.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className={"authForm"} onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="login"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{ display: "block", margin: "5px auto" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          style={{ display: "block", margin: "5px auto" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
