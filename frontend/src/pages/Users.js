// src/components/Users.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setErr("");
      try {
        // Call backend API
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErr("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/"); // redirect to login
  };

  return (
    <div className="container mt-5">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">User Module</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Alerts */}
      {loading && <div className="alert alert-info">Loading users...</div>}
      {err && <div className="alert alert-danger">{err}</div>}
      {!loading && users.length === 0 && (
        <div className="alert alert-warning">No users found.</div>
      )}

      {/* Users Table */}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
