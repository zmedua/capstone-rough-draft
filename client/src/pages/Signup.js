import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import "../styles/Signup.css";
function Signup({ onSignup }) {
  return (
    <main>
      <h1 className="login-prompt">Create Account</h1>

      <SignupForm onSignup={onSignup} />

      <p className="signup-prompt">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Signup;