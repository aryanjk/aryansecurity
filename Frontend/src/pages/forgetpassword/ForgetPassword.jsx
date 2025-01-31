// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api';
// import { kname } from '../../common/utils';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [isSent, setIsSent] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');

//     const handleSendOtp = (e) => {
//         e.preventDefault();

//         forgotPasswordApi({ email }).then((res) => {
//             if (res.status === 200) {
//                 toast.success(res.data.message);
//                 setIsSent(true);
//             }
//         }).catch((error) => {
//             if (error.response.status === 400 || 500) {
//                 toast.error(error.response.data.message);
//             }
//         });
//     };

//     const handleVerifyOtp = (e) => {
//         e.preventDefault();

//         const data = {
//             'email': email,
//             'otp': otp,
//             'newPassword': newPassword,
//         };

//         verifyOtpApi(data).then((res) => {
//             if (res.status === 200) {
//                 toast.success(res.data.message);
//             }
//         }).catch((error) => {
//             if (error.response.status === 400 || 500) {
//                 toast.error(error.response.data.message);
//             }
//         });
//     };

//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100vh',
//             background: 'linear-gradient(to bottom, #ffa500, #fff)',
//             position: 'relative',
//             color: '#fff',
//         }}>
//             <div style={{
//                 position: 'absolute',
//                 top: '20px',
//                 left: '20px',
//                 textAlign: 'center',
//             }}>
//                 <h1 style={{ fontSize: '2rem', color: '#fff', margin: '0' }}>{kname}</h1>
//             </div>
//             <div style={{
//                 background: 'rgba(255, 255, 255, 0.9)',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 textAlign: 'center',
//                 maxWidth: '400px',
//                 width: '100%',
//                 color: '#333',
//             }}>
//                 <h2 style={{ marginBottom: '20px' }}>Forgot Password</h2>
//                 <form>
//                     <div style={{ marginBottom: '15px', textAlign: 'left' }}>
//                         <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                             <span style={{ marginRight: '10px', fontWeight: 'bold' }}>+977</span>
//                             <input
//                                 disabled={isSent}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type="email"
//                                 className="form-control"
//                                 placeholder="email"
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     border: '1px solid #ccc',
//                                     borderRadius: '4px',
//                                     background: '#f9f9f9',
//                                 }}
//                             />
//                         </div>
//                     </div>
//                     <button
//                         disabled={isSent}
//                         onClick={handleSendOtp}
//                         className="btn btn-danger mt-2 w-100"
//                         style={{
//                             backgroundColor: '#28a745',
//                             color: 'white',
//                             padding: '10px 20px',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: 'pointer',
//                             fontSize: '1rem',
//                             width: '100%',
//                         }}
//                     >
//                         Send OTP
//                     </button>

//                     {isSent && (
//                         <>
//                             <hr />
//                             <p>OTP has been sent to {email} ✅</p>
//                             <div style={{ marginBottom: '15px', textAlign: 'left' }}>
//                                 <label htmlFor="otp" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>OTP</label>
//                                 <input
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     type="number"
//                                     className="form-control"
//                                     placeholder="Enter valid OTP Code!"
//                                     style={{
//                                         width: '100%',
//                                         padding: '10px',
//                                         border: '1px solid #ccc',
//                                         borderRadius: '4px',
//                                         background: '#f9f9f9',
//                                     }}
//                                 />
//                             </div>
//                             <div style={{ marginBottom: '15px', textAlign: 'left' }}>
//                                 <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>New Password</label>
//                                 <input
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     type="password"
//                                     className="form-control mt-2"
//                                     placeholder="Set New Password!"
//                                     style={{
//                                         width: '100%',
//                                         padding: '10px',
//                                         border: '1px solid #ccc',
//                                         borderRadius: '4px',
//                                         background: '#f9f9f9',
//                                     }}
//                                 />
//                             </div>
//                             <button
//                                 onClick={handleVerifyOtp}
//                                 className="btn btn-primary w-100 mt-2"
//                                 style={{
//                                     backgroundColor: '#007bff',
//                                     color: 'white',
//                                     padding: '10px 20px',
//                                     border: 'none',
//                                     borderRadius: '4px',
//                                     cursor: 'pointer',
//                                     fontSize: '1rem',
//                                     width: '100%',
//                                 }}
//                             >
//                                 Verify OTP & Set Password
//                             </button>
//                         </>
//                     )}
//                 </form>
//             </div>
//             <nav style={{
//                 position: 'absolute',
//                 top: '20px',
//                 right: '20px',
//                 display: 'flex',
//                 gap: '15px',
//             }}>
//                 <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</a>
//                 <a href="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</a>
//                 <a href="/services" style={{ textDecoration: 'none', color: '#fff' }}>Services</a>
//                 <a href="/upcoming-packages" style={{ textDecoration: 'none', color: '#fff' }}>Upcoming Packages</a>
//             </nav>
//         </div>
//     );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../../apis/Api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [phone, setPhone] = useState("");
    // const [isSent, setIsSent] = useState(false);
    // const [otp, setOtp] = useState("");
    // const [newPassword, setNewPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        setIsLoading(true);

        forgotPasswordApi({ email })
            .then((res) => {
                setIsLoading(false);
                if (res.data.success) {
                    toast.success("Password reset link has been sent to your email.");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Error:", err); // Log the error details
                toast.error("Server Error");
            });
    };

    // const handleSendOtp = (e) => {
    //   e.preventDefault();

    //   forgotPasswordApi({ phone })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         toast.success(res.data.message);
    //         setIsSent(true);
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 400 || 500) {
    //         toast.error(error.response.data.message);
    //       }
    //     });
    // };

    // const handleVerifyOtp = (e) => {
    //   e.preventDefault();

    //   const data = {
    //     phone: phone,
    //     otp: otp,
    //     newPassword: newPassword,
    //   };

    // verifyOtpApi(data)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success(res.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 400 || 500) {
    //       toast.error(error.response.data.message);
    //     }
    //   });
    // };

    return (
        <div
            className="forgot-password-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                padding: "0px 25px",
            }}
        >
            <div
                className="form-container"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
                    backdropFilter: "blur(5px)", // Blur effect
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                    textAlign: "center",
                }}
            >
                <h2
                    className="title"
                    style={{
                        fontSize: "2rem",
                        fontWeight: "600",
                        color: "#060606",
                        marginBottom: "1.5rem",
                    }}
                >
                    Forgot Password
                </h2>
                <form>
                    <div
                        className="form-group"
                        style={{
                            marginBottom: "20px",
                            textAlign: "left",
                        }}
                    >
                        <label
                            htmlFor="email"
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "8px",
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="you@example.com"
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                color: "#1f2937",
                                background: "#f9f9f9",
                                transition: "border-color 0.3s",
                            }}
                        />
                    </div>
                    <button
                        onClick={handleForgotPassword}
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            backgroundColor: "#0b6e21",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                <p
                    style={{
                        marginTop: "20px",
                        color: "black",
                    }}
                >
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: "600",
                            transition: "color 0.3s",
                        }}
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>

        // <div
        //   style={{
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     height: "100vh",
        //     background: "linear-gradient(to bottom, #ffa500, #fff)",
        //     position: "relative",
        //     color: "#fff",
        //   }}
        // >
        //   <div
        //     style={{
        //       position: "absolute",
        //       top: "20px",
        //       left: "20px",
        //       textAlign: "center",
        //     }}
        //   >
        //     {/* <h1 style={{ fontSize: '2rem', color: '#fff', margin: '0' }}>Shopify</h1> */}
        //   </div>
        //   <div
        //     style={{
        //       background: "rgba(255, 255, 255, 0.9)",
        //       padding: "20px",
        //       borderRadius: "8px",
        //       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        //       textAlign: "center",
        //       maxWidth: "400px",
        //       width: "100%",
        //       color: "#333",
        //     }}
        //   >
        //     <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>
        //     <form>
        //       <div style={{ marginBottom: "15px", textAlign: "left" }}>
        //         <label
        //           htmlFor="phone"
        //           style={{
        //             display: "block",
        //             marginBottom: "5px",
        //             fontWeight: "bold",
        //           }}
        //         >
        //           Email
        //         </label>
        //         <div style={{ display: "flex", alignItems: "center" }}>
        //           {/* <span style={{ marginRight: "10px", fontWeight: "bold" }}>
        //             +977
        //           </span> */}
        //           {/* <input
        //             disabled={isSent}
        //             onChange={(e) => setPhone(e.target.value)}
        //             type="number"
        //             className="form-control"
        //             placeholder="Enter valid phone number"
        //             style={{
        //               width: "100%",
        //               padding: "10px",
        //               border: "1px solid #ccc",
        //               borderRadius: "4px",
        //               background: "#f9f9f9",
        //             }}
        //           /> */}
        //         </div>
        //       </div>
        //       <button
        //         disabled={isSent}
        //         onClick={handleSendOtp}
        //         className="btn btn-danger mt-2 w-100"
        //         style={{
        //           backgroundColor: "#28a745",
        //           color: "white",
        //           padding: "10px 20px",
        //           border: "none",
        //           borderRadius: "4px",
        //           cursor: "pointer",
        //           fontSize: "1rem",
        //           width: "100%",
        //         }}
        //       >
        //         Send OTP
        //       </button>

        //       {isSent && (
        //         <>
        //           <hr />
        //           <p>OTP has been sent to {phone} ✅</p>
        //           <div style={{ marginBottom: "15px", textAlign: "left" }}>
        //             <label
        //               htmlFor="otp"
        //               style={{
        //                 display: "block",
        //                 marginBottom: "5px",
        //                 fontWeight: "bold",
        //               }}
        //             >
        //               OTP
        //             </label>
        //             <input
        //               onChange={(e) => setOtp(e.target.value)}
        //               type="number"
        //               className="form-control"
        //               placeholder="Enter valid OTP Code!"
        //               style={{
        //                 width: "100%",
        //                 padding: "10px",
        //                 border: "1px solid #ccc",
        //                 borderRadius: "4px",
        //                 background: "#f9f9f9",
        //               }}
        //             />
        //           </div>
        //           <div style={{ marginBottom: "15px", textAlign: "left" }}>
        //             <label
        //               htmlFor="newPassword"
        //               style={{
        //                 display: "block",
        //                 marginBottom: "5px",
        //                 fontWeight: "bold",
        //               }}
        //             >
        //               New Password
        //             </label>
        //             <input
        //               onChange={(e) => setNewPassword(e.target.value)}
        //               type="password"
        //               className="form-control mt-2"
        //               placeholder="Set New Password!"
        //               style={{
        //                 width: "100%",
        //                 padding: "10px",
        //                 border: "1px solid #ccc",
        //                 borderRadius: "4px",
        //                 background: "#f9f9f9",
        //               }}
        //             />
        //           </div>
        //           <button
        //             onClick={handleVerifyOtp}
        //             className="btn btn-primary w-100 mt-2"
        //             style={{
        //               backgroundColor: "#007bff",
        //               color: "white",
        //               padding: "10px 20px",
        //               border: "none",
        //               borderRadius: "4px",
        //               cursor: "pointer",
        //               fontSize: "1rem",
        //               width: "100%",
        //             }}
        //           >
        //             Verify OTP & Set Password
        //           </button>
        //         </>
        //       )}
        //     </form>
        //   </div>
        //   {/* <nav style={{
        //             position: 'absolute',
        //             top: '20px',
        //             right: '20px',
        //             display: 'flex',
        //             gap: '15px',
        //         }}>
        //             <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</a>
        //             <a href="/about" style={{ textDecoration: 'none', color: '#fff' }}>About</a>
        //             <a href="/services" style={{ textDecoration: 'none', color: '#fff' }}>Services</a>
        //             <a href="/upcoming-packages" style={{ textDecoration: 'none', color: '#fff' }}>Upcoming Packages</a>
        //         </nav> */}
        // </div>
    );
};

export default ForgotPassword;