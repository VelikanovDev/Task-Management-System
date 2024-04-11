import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Register</h2>
      <div>
        <form className={"authForm"}>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="login"
              label="Username"
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <TextField
              id="confirm"
              label="Confirm password"
              variant="outlined"
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
