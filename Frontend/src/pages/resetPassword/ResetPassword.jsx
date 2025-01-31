import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../../apis/Api";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        resetPasswordApi({ token, password })
            .then((res) => {
                setIsLoading(false);
                if (res.data.success) {
                    toast.success(
                        "Password reset successful! Please login with your new password."
                    );
                    navigate("/login");
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

    return (
        <div
            className="reset-password-container"
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
                    Reset Password
                </h2>
                <form onSubmit={handleResetPassword}>
                    <div
                        className="form-group"
                        style={{
                            marginBottom: "20px",
                            textAlign: "left",
                        }}
                    >
                        <label
                            htmlFor="password"
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "8px",
                            }}
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            placeholder="Enter new password"
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
                    <div
                        className="form-group"
                        style={{
                            marginBottom: "20px",
                            textAlign: "left",
                        }}
                    >
                        <label
                            htmlFor="confirmPassword"
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "8px",
                            }}
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            placeholder="Confirm new password"
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
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            backgroundColor: "#0b6e21", // Reset password button color (green)
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
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
    );
};

export default ResetPassword;