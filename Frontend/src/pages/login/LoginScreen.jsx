import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import { kname } from "../../common/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Save the reCAPTCHA token
  };

  const validation = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      isValid = false
    }
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //validation
    if (!validation()) {
      return;
    }

    //make a json object
    const data = {
      email: email,
      password: password,
    };
    //Make a api request
    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        // Success(bool), message(text), token(text) ,user data(json object)

        //Setting token and user data in local storage
        localStorage.setItem("token", res.data.token);

        //Setting user data
        const convertedData = JSON.stringify(res.data.user);

        //local storage set
        localStorage.setItem("user", convertedData);

        navigate("/"); // Navigate to the homepage
      }
    });

    // toast.success("Login button clicked!")
  };

  return (
    <div
      className='shadow w-25 bg-light container mt-5'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // background: 'linear-gradient(to bottom, #8f6743, #fff)', // Gradient background from orange to white
        position: "relative",
        // color: '#fff',
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname} </h1>
        <p style={{ color: "#333" }}>
          Where you can find all the amazing Pictures and painting{" "}
        </p>
      </div>
      <div className=''>
        <h5 className='my-3 w-100 text-center text-decoration-underline'>
          Login
        </h5>
        <form>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label
              htmlFor='email'
              style={{
                display: "block",
                marginBottom: "5px",
              }}
              className='form-label'
            >
              Email:{email}
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control w-100'
              placeholder='Enter your email'
            />
            {emailError && <p className='text-danger'>{emailError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label htmlFor='password' className='form-label'>
              Password:{password}
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
              placeholder='Enter your password'
            />
            {passwordError && <p className='text-danger'>{passwordError}</p>}
          </div>
          <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <ReCAPTCHA
              sitekey="6LdPvMgqAAAAAL6kt15rrPLGqgT90nyJvC8dFDyZ"
              onChange={handleCaptchaChange}
            />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "right" }}>
            <a
              href='/forgot-password'
              style={{
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>
          <button onClick={handleLogin} className='btn btn-success mt-2 w-100'>
            LOGIN
          </button>
        </form>
        <p style={{ marginTop: "10px", color: "#333" }}>
          Don't have an account?{" "}
          <a
            href='/register'
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
