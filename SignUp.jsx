import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;