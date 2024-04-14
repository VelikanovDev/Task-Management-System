import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSession, login } from "../services/UserService";
import { useUser } from "../context/UserProvider";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser, isLoggedIn, setIsLoggedIn } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const initSessionCheck = async () => {
      const sessionInfo = await checkSession();
      setUser(sessionInfo.user);
      setIsLoggedIn(sessionInfo.isLoggedIn);
    };

    initSessionCheck().then();
  }, [isLoggedIn, setIsLoggedIn, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Username and password are required");
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      setError("");
      setUser(result.user);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className={"authForm"} onSubmit={handleSubmit}>
        {error && (
          <Alert
            severity="error"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {error}
          </Alert>
        )}
        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="login"
            label="Username"
            variant="outlined"
            autoComplete={"username"}
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
            autoComplete={"new-password"}
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
