import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      nav("/auth/login");
    } catch (error) {
      setErr(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary">Create Account</h2>

        {err && <div className="alert alert-danger text-center">{err}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              name="firstname"
              placeholder="Enter your first name"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              name="lastname"
              placeholder="Enter your last name"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              className="form-control"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={form.email}
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => nav("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}




// import React, { useState } from 'react';
// import API from '../api'; // make sure API has baseURL configured
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {
//   const [form, setForm] = useState({
//     firstname: '',
//     lastname: '',
//     mobileNumber: '',
//     email: '',
//     password: ''
//   });
//   const [err, setErr] = useState('');
//   const nav = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr('');
//     try {
//       const res = await API.post('/auth/signup', form); // backend route
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       nav('/'); // redirect to Home
//     } catch (error) {
//       setErr(error.response?.data?.message || 'Signup failed');
//     }
//   };

  

//   return (
//     <div className="container">
//       <h2>Signup</h2>
//       {err && <p style={{ color: 'red' }}>{err}</p>}
//       <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
//         <input
//           name="firstname"
//           placeholder="First name"
//           value={form.firstname}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="lastname"
//           placeholder="Last name"
//           value={form.lastname}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="mobileNumber"
//           placeholder="Mobile Number"
//           value={form.mobileNumber}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }
