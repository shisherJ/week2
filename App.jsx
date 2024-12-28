import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import './styles.css';

// import React from 'react';
import SpotifyDashboard from './SpotifyDashboard';

function App() {
  return (

    
    <Router>
      <SpotifyDashboard />
      <div className="app-container">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;