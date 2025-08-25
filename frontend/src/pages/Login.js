import React, { useState } from "react";
import API from "../api"; // make sure API has baseURL configured
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" }); // identifier = email or mobile
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // simple validation function
  const validateForm = () => {
    if (!form.identifier || !form.password) {
      return "All fields are required!";
    }

    // check if identifier is email or 10-digit mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(form.identifier) && !mobileRegex.test(form.identifier)) {
      return "Enter a valid email or 10-digit mobile number.";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null; // no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // frontend validation
    const validationError = validateForm();
    if (validationError) {
      setErr(validationError);
      return;
    }

    try {
      const res = await API.post("/auth/login", form); // backend route
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/home"); // redirect to Home page
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary">Welcome Back</h2>

        {err && <div className="alert alert-danger text-center">{err}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email or Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="identifier"
              placeholder="Enter email or mobile"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don’t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => nav("/auth/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
