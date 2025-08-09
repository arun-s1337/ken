import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Validate both fields
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(newPassword);
    
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Password reset successful. Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        setStatus("error");
        setMessage(data.message || "Reset failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

      <form onSubmit={handleResetSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              emailError 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-[#FFA200]"
            }`}
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              passwordError 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-[#FFA200]"
            }`}
          />
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading" || emailError !== "" || passwordError !== ""}
          className="w-full bg-[#001040] text-white py-2 rounded font-semibold hover:bg-[#001060] transition duration-300"
        >
          {status === "loading" ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}