import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (

    <div>
        <img id='logo'
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" 
          alt="Spotify Logo" 
          className="spotify-logo"
        />
 <div className="auth-container">
      <h1>Login</h1>
      
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    </div>
   
  );
}

export default Login;