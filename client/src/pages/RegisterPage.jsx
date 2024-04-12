import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/UserService";
import { Alert } from "@mui/lab";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from being submitted traditionally
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (username === "" || password === "" || confirmPassword === "") {
      setError("Username and password are required");
      return;
    }

    const result = await register(username, password, confirmPassword);
    if (result && result.success) {
      setSuccess(true);
      setError("");
      navigate("/login", { replace: true });
      window.location.reload();
    } else {
      setError(result.message || "Registration failed. Please try again.");
      setSuccess(false);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <div>
        <form className={"authForm"} onSubmit={handleSubmit}>
          {error && (
            <Alert
              severity="error"
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fullWidth
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Registration successful! Redirecting...
            </Alert>
          )}
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="username"
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
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="confirm"
              type="password"
              label="Confirm password"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
