import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Reset.css';
import axios from 'axios';

const Reset = () => {
  let [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  let navigate = useNavigate();

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.email) {
      alert("Email is required!");
      return;
    }

    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      let res = await axios.get(`http://localhost:4000/users?email=${state.email}`);
      let users = res.data;

      if (users.length === 0) {
        alert("User not found!");
        return;
      }

      let user = users[0];

      await axios.patch(`http://localhost:4000/users/${user.id}`, {
        password: state.password,
        confpassword: state.confirmPassword
      });

      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-container">
        <h1>Reset Password</h1>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <label>New Password</label>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <button type="submit">Reset Password</button>
        <Link to="/login">
          <button type="button">Cancel</button>
        </Link>
        <p>
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Reset;
