import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ width: "500px", borderRadius: "15px" }}
      >
        <h2 className="mb-3 text-primary">Dashboard</h2>
        <h4 className="text-dark">
          Welcome,{" "}
          <span className="fw-bold text-capitalize">
            {user.firstname} {user.lastname}
          </span>
        </h4>
        <p className="text-muted mt-3">
          You have successfully logged in to your account.
        </p>

        <div className="d-grid gap-2 mt-4">
          {/* <button className="btn btn-outline-primary">Profile</button>
          <button className="btn btn-outline-success">Settings</button> */}
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/users";
            }}
          >
            User Module
          </button>
        </div>
      </div>
    </div>
  );
}
