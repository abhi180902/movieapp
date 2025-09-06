import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

const Signup = () => {
  let [state, setState] = useState({
    name: "",
    email: "",
    Mobile: "",
    DOB: "",
    gender: "",
    password: "",
    confpassword: "",
  });

  let [errors, setErrors] = useState({});

  let [submit, setSubmit] = useState(false);

  let navigate = useNavigate();

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submit) {
      console.log(state);
    }
  }, [errors]);

  let validate = (values) => {
    const errors = {};

    const nameRegex = /^[A-Za-z ]{4,20}$/; 
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "Name must be letters only and 4-20 characters long";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    const mobileRegex = /^[6-9]\d{9}$/; 

    if (!values.Mobile) {
      errors.Mobile = "Mobile number is required!";
    } else if (!mobileRegex.test(values.Mobile)) {
      errors.Mobile = "Mobile number must be 10 digits and start with 6-9";
    }

    if (!values.DOB) {
      errors.DOB = "DOB is required!";
    }

    if (!values.gender) {
      errors.gender = "select your gender";
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,20}$/;

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be 4-20 chars, with letters,numbers & special chars";
    }

    if (!values.confpassword) {
      errors.confpassword = "Confirm your password";
    } else if (values.confpassword !== values.password) {
      errors.confpassword = "Password does not match";
    }
    return errors;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(state);
    setErrors(validationErrors);
    setSubmit(true);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let payload = { ...state };

        await axios.post("http://localhost:4000/users", payload);

        alert("Signup Successful! Now go to Login page.");
        navigate("/login");
      } catch (err) {
        console.error("Error while signing up:", err);
        alert("Signup failed! Please try again.");
      }
    }
  };

  return (
    <div>
      <center>
        <div className="signup-container">
          <form action="" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="form-data">
              <div className="inputs">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  onChange={handleChange}
                />
                <p>{errors.name}</p>
              </div>
              <div className="inputs">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Mail ID"
                  onChange={handleChange}
                />
                <p>{errors.email}</p>
              </div>
              <div className="inputs">
                <label>mobile-number</label>
                <input
                  type="number"
                  name="Mobile"
                  placeholder="enter your number"
                  onChange={handleChange}
                />
                <p>{errors.Mobile}</p>
              </div>
              <div className="inputs">
                <label>DOB</label>
                <input
                  type="date"
                  name="DOB"
                  placeholder="enter your DOB"
                  onChange={handleChange}
                />
                <p>{errors.DOB}</p>
              </div>
              <div className="inputs">
                <label>Gender</label>
                <select name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <p>{errors.gender}</p>
              </div>
              <div className="inputs">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />
                <p>{errors.password}</p>
              </div>
              <div className="inputs">
                <label>Confirm-Password</label>
                <input
                  type="password"
                  name="confpassword"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />
                <p>{errors.confpassword}</p>
              </div>
            </div>
            <input type="submit" value="submit" />
            <p>
              <span>Already have an account?</span>{" "}
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </center>
      <Outlet></Outlet>
    </div>
  );
};

export default Signup;
