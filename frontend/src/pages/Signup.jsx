import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    image: null,
    name: "",
    email: "",
    dob: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setSignupInfo((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { image, name, email, password, dob } = signupInfo;

    if (!image || !name || !email || !password || !dob) {
      return handleError("🤬 All fields are required");
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dob", dob);

      const response = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        body: formData, // ❗ IMPORTANT
      });

      const data = await response.json();

      if (data.status !== "success") {
        return handleError(`🤬 ${data.message}`);
      }

      handleSuccess("🥳 Signup successful! Please login.");
      setTimeout(() => navigate("/login"), 3000);

    } catch (err) {
      handleError("😱 Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <form onSubmit={handleSignup} encType="multipart/form-data">
        <div>
          <label>Profile Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>User Name</label>
          <input
            type="text"
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={signupInfo.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <button type="submit">Signup</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
