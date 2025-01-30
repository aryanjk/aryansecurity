import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { createUserApi } from "../../apis/Api";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showStrengthBar, setShowStrengthBar] = useState(false);

  const navigate = useNavigate();

  const changeFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastname = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Show strength bar when user starts typing
    setShowStrengthBar(newPassword.length > 0);

    // Check password strength
    const strength = zxcvbn(newPassword).score;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordStrength < 2) {
      toast.error("Password is too weak. Please use a stronger password.");
      return;
    }
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(
            "Registration successful. Please check your email for verification."
          );
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error("Server error");
        console.error(err.message);
      });
  };
  const renderPasswordStrength = () => {
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#27ae60",
    ];

    return (
      <div className="flex items-center mt-2">
        <div className="w-full bg-gray-300 rounded-lg h-2 mr-2">
          <div
            className="h-2 rounded-lg"
            style={{
              width: `${(passwordStrength + 1) * 20}%`,
              backgroundColor: strengthColors[passwordStrength],
            }}
          ></div>
        </div>
        <span style={{ color: strengthColors[passwordStrength] }}>
          {strengthLabels[passwordStrength]}
        </span>
      </div>
    );
  };

  return (
    <div className="container w-50 my-3 shadow">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>Shopify</h1>
      </div>
      <div className="w-100">
        <h5 className="w-100 text-decoration-underline text-center">Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              id="firstName"
              onChange={changeFirstname}
              type="text"
              className="form-control"
              placeholder="Enter your first name"
            />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              id="lastName"
              onChange={changeLastname}
              type="text"
              className="form-control"
              placeholder="Enter your last name"
            />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              onChange={changeEmail}
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              onChange={changePassword}
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          {showStrengthBar && renderPasswordStrength()}

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="w-100 text-center mt-2" style={{ color: "#333" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
