import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FrontPage() {
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "500px", borderRadius: "20px" }}
      >
        <h1 className="mb-3 text-primary fw-bold">🔥 Flare Minds App</h1>
        <p className="text-muted">Your MERN Stack User Authentication System</p>

        {!token ? (
          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg mx-2 px-4"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="btn btn-success btn-lg mx-2 px-4"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              className="btn btn-warning btn-lg mx-2 px-4"
              onClick={handleLogin}
            >
              Go to Login Page
            </button>
            <button
              className="btn btn-info btn-lg mx-2 px-4"
              onClick={handleSignup}
            >
              Go to Signup Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
