import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function Signup({ onSignup }) {
  return (
    <main>
      <h1>Create Account</h1>

      <SignupForm onSignup={onSignup} />

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Signup;