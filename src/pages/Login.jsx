import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";

const Login = () => {
  let [state, setState] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState({});

  let [submit, setSubmit] = useState(false);

  let navigate = useNavigate();

  let { email, password } = state;

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let validate = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //regex to validate email
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(state);
    setError(validationErrors);
    setSubmit(true);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Fetch users from JSON server
        let res = await axios.get("http://localhost:4000/users");
        let users = res.data;

        // Check credentials
        const matchedUser = users.find(
          (user) =>
            user.email === state.email && user.password === state.password
        );

        if (matchedUser) {
          alert("Login Successful!");
          navigate("/");
        } else {
          alert("Invalid credentials!");
        }
      } catch (err) {
        console.error("Error while logging in:", err);
        alert("Login failed! Please try again.");
      }
    }
  };

  // let handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const validationErrors = validate(state);
  //     setError(validationErrors);
  //     setSubmit(true);

  //     if (Object.keys(validationErrors).length === 0 && submit) {
  //       const savedUser = JSON.parse(localStorage.getItem("userProfile"));

  //       const users = JSON.parse(localStorage.getItem("users")) || [];

  //       const matchedUser = users.find(
  //         (user) =>
  //           user.email === state.email && user.password === state.password
  //       );

  //       if (matchedUser) {
  //         alert("Login Successful!");
  //         navigate("/shop");
  //       } else {
  //         alert("Login credentials do not match!");
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <center>
        <div className="auth-container">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Mail ID"
              onChange={handleChange}
            />
            <p>{error.email}</p>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleChange}
            />
            <p>{error.password}</p>
            <input type="submit" value="SUBMIT" />
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </p>
            <p>
              Forgot Password?{" "}
              <Link to="/reset" className="nav-link">
                Reset
              </Link>
            </p>
          </form>
          <Outlet></Outlet>
        </div>
      </center>
    </div>
  );
};

export default Login;
