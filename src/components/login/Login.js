import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";
import logo from "../../assets/Logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const { login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (username.length < 4 || password.length < 4) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [username, password]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.includes(" ")) {
      setError("Username cannot have white spaces!");
      setIsFormValid(false);
      return;
    }
    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.valid) {
        setLoading(false);
        history.push("/");
      } else {
        setError("Failed to login!");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="login">
      <div className="brand">
        <img src={logo} alt="" />
        <h1>Thrello</h1>
      </div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="error">{error}</Alert>}
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <Button
          type="submit"
          disabled={loading || !isFormValid}
          startIcon={loading && "fas fa-spinner"}
        >
          {loading ? "Logging in" : "Login"}
        </Button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Card>
  );
}
