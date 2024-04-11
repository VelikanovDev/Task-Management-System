import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
      <form className={"authForm"}>
        <div style={{ marginBottom: "10px" }}>
          <TextField id="login" label="Username" variant="outlined" fullWidth />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="password"
            label="Password"
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
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
