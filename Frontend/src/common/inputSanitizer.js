export const sanitizeInput = (value, type = "text") => {
    let sanitizedValue = value;

    // Remove potential XSS payloads (HTML tags, script injections, etc.)
    sanitizedValue = sanitizedValue.replace(/[<>/'";]/g, "");

    // Apply specific sanitization based on type
    if (type === "text") {
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9\s]/g, ""); // Allow only letters, numbers, and spaces
    } else if (type === "email") {
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9@._-]/g, ""); // Allow @, ., -, _
    } else if (type === "number") {
        sanitizedValue = sanitizedValue.replace(/[^0-9]/g, ""); // Only numbers allowed
    } else if (type === "password") {
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=.\[\]{};':"|,.<>?/]/g, ""); // Allow common password characters
    }

    return sanitizedValue;
};
