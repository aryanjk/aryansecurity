// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../../apis/Api";
// import { sanitizeInput } from "../../common/inputSanitizer";
// import { kname } from "../../common/utils";

// const Register = () => {
//   // Make a useState for 5 fields
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // UseState for error messages
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const navigate = useNavigate(); // Use useNavigate hook

//   // Make functions for each changing the values

//   const handleFirstname = (e) => {
//     setFirstName(sanitizeInput(e.target.value));
//   };

//   const handleLastname = (e) => {
//     setLastName(sanitizeInput(e.target.value));
//   };

//   const handleEmail = (e) => {
//     setEmail(sanitizeInput(e.target.value));
//   };
//   const handlePhone = (e) => {
//     setPhone(sanitizeInput(e.target.value));
//   };
//   const handlePassword = (e) => {
//     setPassword(sanitizeInput(e.target.value));
//   };
//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(sanitizeInput(e.target.value));
//   };

//   //validation
//   var validate = () => {
//     var isValid = true;

//     // validate the first name
//     if (firstname.trim() === "") {
//       setFirstNameError("First name is required");
//       isValid = false;
//     }

//     // validate the last name
//     if (lastname.trim() === "") {
//       setLastNameError("Last name is required");
//       isValid = false;
//     }

//     // validate the email
//     if (email.trim() === "") {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     // validate the phone
//     if (phone.trim() === "") {
//       setPhoneError("Phone number is required");
//       isValid = false;
//     }

//     // validate the password
//     if (password.trim() === "") {
//       setPasswordError("password is required");
//       isValid = false;
//     }

//     // validate the confirm password
//     if (confirmPassword.trim() === "") {
//       setConfirmPasswordError("Confirm password is required");
//       isValid = false;
//     }
//     if (confirmPassword.trim() !== password.trim()) {
//       setConfirmPasswordError("Password and confirm password doesnot match");
//       isValid = false;
//     }
//     return isValid;
//   };
//   //Submit button function
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // validate
//     var isValidated = validate();
//     if (!isValidated) {
//       return;
//     }

//     // sending request to the api

//     //Making json object
//     const data = {
//       firstName: firstname,
//       lastName: lastname,
//       email: email,
//       phone: phone,
//       password: password,
//     };

//     registerUserApi(data).then((res) => {
//       // Received Data: success, message

//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);

//         navigate("/login"); // Navigate to the homepage
//       }
//     });
//   };

//   return (
//     <div className='container w-50 my-3 shadow'>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname} </h1>
//         <p style={{ color: "#333" }}>
//           Where you can find all the amazing Pictures and painting{" "}
//         </p>
//       </div>
//       <div className='w-100'>
//         <h5 className='w-100 text-decoration-underline text-center'>Sign Up</h5>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label htmlFor='firstName' className='form-label'>
//               First Name :{firstname}
//             </label>
//             <input
//               onChange={handleFirstname}
//               type='text'
//               className='form-control'
//               placeholder='Enter your first name'
//             />
//             {firstNameError && <p className='text-danger'>{firstNameError}</p>}
//           </div>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label className='form-label'>Last Name : {lastname}</label>
//             <input
//               onChange={handleLastname}
//               type='text'
//               className='form-control'
//               placeholder='Enter your last name'
//             />
//             {lastNameError && <p className='text-danger'>{lastNameError}</p>}
//           </div>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label htmlFor='email' className='form-label'>
//               Email : {email}
//             </label>
//             <input
//               onChange={handleEmail}
//               type='text'
//               className='form-control'
//               placeholder='Enter your email'
//             />
//             {emailError && <p className='text-danger'>{emailError}</p>}
//           </div>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label htmlFor='email' className='form-label'>
//               Phone{" "}
//             </label>
//             <input
//               onChange={handlePhone}
//               type='text'
//               className='form-control'
//               placeholder='Enter your Phone Number'
//             />
//             {phone && <p className='text-danger'>{phoneError}</p>}
//           </div>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label htmlFor='password' className='form-label'>
//               Password :{password}
//             </label>
//             <input
//               onChange={handlePassword}
//               type='text'
//               className='form-control'
//               placeholder='Enter your password'
//             />
//             {passwordError && <p className='text-danger'>{passwordError}</p>}
//           </div>
//           <div style={{ marginBottom: "15px", textAlign: "left" }}>
//             <label htmlFor='confirmPassword' className='form-label'>
//               Confirm Password : {confirmPassword}
//             </label>
//             <input
//               onChange={handleConfirmPassword}
//               type='password'
//               className='form-control'
//               placeholder='Enter your confirm password'
//             />
//             {confirmPasswordError && (
//               <p className='text-danger'>{confirmPasswordError}</p>
//             )}
//           </div>
//           <button onClick={handleSubmit} className='btn btn-success w-100'>
//             Register
//           </button>
//         </form>
//         <p
//           className='w-100 text-center mt-2'
//           style={{ marginTop: "10px", color: "#333" }}
//         >
//           Already have an account?{" "}
//           <a
//             href='/login'
//             style={{
//               color: "#007bff",
//               textDecoration: "none",
//             }}
//           >
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";
import { sanitizeInput } from "../../common/inputSanitizer";
import { kname } from "../../common/utils";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  // Input Handlers
  const handleFirstname = (e) => setFirstName(sanitizeInput(e.target.value, "text"));
  const handleLastname = (e) => setLastName(sanitizeInput(e.target.value, "text"));
  const handleEmail = (e) => setEmail(sanitizeInput(e.target.value, "email"));
  const handlePhone = (e) => setPhone(sanitizeInput(e.target.value, "number"));

  // Validate Email Format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Strength Check
  const validatePasswordStrength = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@, $, !, %, *, ?, &)";
    return "strong";
  };

  const handlePassword = (e) => {
    const value = sanitizeInput(e.target.value, "password");
    setPassword(value);

    const strengthMessage = validatePasswordStrength(value);
    if (strengthMessage !== "strong") {
      setPasswordError(strengthMessage);
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Log latest confirmPassword value
  useEffect(() => {
    console.log("Updated Confirm Password:", confirmPassword);
  }, [confirmPassword]);

  // Form Validation
  const validate = () => {
    let isValid = true;

    if (!firstname.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastname.trim()) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format! Example: user@example.com");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else {
      setPhoneError("");
    }

    const strengthMessage = validatePasswordStrength(password);
    if (strengthMessage !== "strong") {
      setPasswordError(strengthMessage);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      firstName: firstname,
      lastName: lastname,
      email,
      phone,
      password,
    };

    console.log("Form Data:", data);

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        toast.success("Verify your email to login");
        navigate("/login");
      }
    });
  };

  return (
    <div className='container w-50 my-3 shadow'>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname} </h1>
        <p style={{ color: "#333" }}>
          Where you can find all the amazing Pictures and paintings{" "}
        </p>
      </div>
      <div className='w-100'>
        <h5 className='w-100 text-decoration-underline text-center'>Sign Up</h5>
        <form onSubmit={handleSubmit}>
          <label className='form-label'>First Name:</label>
          <input onChange={handleFirstname} type='text' className='form-control' placeholder='Enter your first name' />
          {firstNameError && <p className='text-danger'>{firstNameError}</p>}

          <label className='form-label'>Last Name:</label>
          <input onChange={handleLastname} type='text' className='form-control' placeholder='Enter your last name' />
          {lastNameError && <p className='text-danger'>{lastNameError}</p>}

          <label className='form-label'>Email:</label>
          <input onChange={handleEmail} type='email' className='form-control' placeholder='Enter your email' required />
          {emailError && <p className='text-danger'>{emailError}</p>}

          <label className='form-label'>Phone:</label>
          <input onChange={handlePhone} type='text' className='form-control' placeholder='Enter your Phone Number' />
          {phoneError && <p className='text-danger'>{phoneError}</p>}

          <label className='form-label'>Password:</label>
          <input onChange={handlePassword} type='password' className='form-control' placeholder='Enter your password' />
          {passwordError && <p className='text-danger'>{passwordError}</p>}

          <label className='form-label'>Confirm Password:</label>
          <input onChange={handleConfirmPassword} type='password' className='form-control' placeholder='Confirm password' />
          {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}

          <button className='btn btn-success w-100' type="submit">Register</button>
        </form>

        <p className='w-100 text-center mt-2'>
          Already have an account?{" "}
          <a href='/login' style={{ color: "#007bff", textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../../apis/Api";
// import { sanitizeInput } from "../../common/inputSanitizer";
// import { kname } from "../../common/utils";

// const Register = () => {
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Error Messages
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [passwordStrength, setPasswordStrength] = useState(""); // New state for password strength

//   const navigate = useNavigate();

//   // Input Handlers
//   const handleFirstname = (e) => setFirstName(sanitizeInput(e.target.value));
//   const handleLastname = (e) => setLastName(sanitizeInput(e.target.value));
//   const handleEmail = (e) => setEmail((e.target.value));
//   const handlePhone = (e) => setPhone(sanitizeInput(e.target.value));

//   // Password Strength Check
//   const validatePasswordStrength = (password) => {
//     if (password.length < 8) {
//       return "Password must be at least 8 characters long";
//     }
//     if (!/[A-Z]/.test(password)) {
//       return "Password must contain at least one uppercase letter";
//     }
//     if (!/[a-z]/.test(password)) {
//       return "Password must contain at least one lowercase letter";
//     }
//     if (!/[0-9]/.test(password)) {
//       return "Password must contain at least one number";
//     }
//     if (!/[@$!%*?&]/.test(password)) {
//       return "Password must contain at least one special character (@, $, !, %, *, ?, &)";
//     }
//     return "strong";
//   };

//   const handlePassword = (e) => {
//     const value = (e.target.value);
//     setPassword(value);

//     const strengthMessage = validatePasswordStrength(value);
//     if (strengthMessage !== "strong") {
//       setPasswordError(strengthMessage);
//     } else {
//       setPasswordError(""); // Clear error if strong
//     }
//   };

//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//     console.log(confirmPassword);
//   };

//   // Form Validation
//   const validate = () => {
//     let isValid = true;

//     if (firstname.trim() === "") {
//       setFirstNameError("First name is required");
//       isValid = false;
//     }

//     if (lastname.trim() === "") {
//       setLastNameError("Last name is required");
//       isValid = false;
//     }

//     if (email.trim() === "") {
//       setEmailError("Email is required");
//       isValid = false;
//     }
//     if (email.includes('@')) {
//       setEmailError("Email is @ required");
//       isValid = false;
//     }

//     if (phone.trim() === "") {
//       setPhoneError("Phone number is required");
//       isValid = false;
//     }

//     // Check password strength
//     const strengthMessage = validatePasswordStrength(password);
//     if (strengthMessage !== "strong") {
//       setPasswordError(strengthMessage);
//       isValid = false;
//     }

//     // Validate confirm password
//     if (confirmPassword.trim() === "") {
//       setConfirmPasswordError("Confirm password is required");
//       isValid = false;
//     } else if (confirmPassword.trim() !== password.trim()) {
//       setConfirmPasswordError("Password and confirm password do not match");
//       isValid = false;
//     }

//     return isValid;
//   };

//   // Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const data = {
//       firstName: firstname,
//       lastName: lastname,
//       email,
//       phone,
//       password,
//     };
//     console.log(data);

//     registerUserApi(data).then((res) => {
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         toast.success("Verify your email to login");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <div className='container w-50 my-3 shadow'>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname} </h1>
//         <p style={{ color: "#333" }}>
//           Where you can find all the amazing Pictures and paintings{" "}
//         </p>
//       </div>
//       <div className='w-100'>
//         <h5 className='w-100 text-decoration-underline text-center'>Sign Up</h5>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className='form-label'>First Name:</label>
//             <input onChange={handleFirstname} type='text' className='form-control' placeholder='Enter your first name' />
//             {firstNameError && <p className='text-danger'>{firstNameError}</p>}
//           </div>

//           <div>
//             <label className='form-label'>Last Name:</label>
//             <input onChange={handleLastname} type='text' className='form-control' placeholder='Enter your last name' />
//             {lastNameError && <p className='text-danger'>{lastNameError}</p>}
//           </div>

//           <div>
//             <label className='form-label'>Email:</label>
//             <input onChange={handleEmail} type='email' className='form-control' placeholder='Enter your email' />
//             {emailError && <p className='text-danger'>{emailError}</p>}
//           </div>

//           <div>
//             <label className='form-label'>Phone:</label>
//             <input onChange={handlePhone} type='text' className='form-control' placeholder='Enter your Phone Number' />
//             {phoneError && <p className='text-danger'>{phoneError}</p>}
//           </div>

//           <div>
//             <label className='form-label'>Password:{password}</label>
//             <input onChange={handlePassword} type='password' className='form-control' placeholder='Enter your password' />
//             {passwordError && <p className='text-danger'>{passwordError}</p>}
//           </div>

//           <div>
//             <label className='form-label'>Confirm Password:{confirmPassword}</label>
//             <input onChange={handleConfirmPassword} type='password' className='form-control' placeholder='Confirm password' />
//             {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}
//           </div>

//           <button className='btn btn-success w-100' type="submit">Register</button>
//         </form>

//         <p className='w-100 text-center mt-2'>
//           Already have an account?{" "}
//           <a href='/login' style={{ color: "#007bff", textDecoration: "none" }}>Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
