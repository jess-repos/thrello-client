import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";
import logo from "../../assets/Logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("error");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      username.length < 4 ||
      password.length < 4 ||
      verifyPassword.length < 4
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [username, password, verifyPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.includes(" ")) {
      setMessage("Username cannot have white spaces!");
      setIsFormValid(false);
      return;
    }
    if (password !== verifyPassword) {
      setMessage("Passwords do not match!");
      setIsFormValid(false);
      return;
    }
    setMessage("");
    setLoading(true);
    try {
      const response = await register(username, password);
      if (response.valid) {
        setLoading(false);
        setMessageStatus("success");
        setMessage("Register success, you can now login!");
        setUsername("");
        setPassword("");
        setVerifyPassword("");
      } else {
        setMessage(response.message || "Failed to register!");
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
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        {message && <Alert variant={messageStatus}>{message}</Alert>}
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
        <Input
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="Verify password"
          type="password"
        />

        <Button type="submit" disabled={loading || !isFormValid}>
          Register
        </Button>
      </form>
      <p>
        Alredy have an account? <Link to="/login">Login</Link>
      </p>
    </Card>
  );
}
