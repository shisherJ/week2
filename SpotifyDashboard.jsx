import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-read-private user-read-email playlist-read-private`;

// Utility function to extract token from URL
const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

const SpotifyDashboard = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Extract token from URL
    const hash = getTokenFromUrl();
    window.location.hash = ''; // Clear the hash
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      // Fetch user data
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${_token}` },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.error('Error fetching user data:', error));

      // Fetch playlists
      axios
        .get('https://api.spotify.com/v1/me/playlists', {
          headers: { Authorization: `Bearer ${_token}` },
        })
        .then((response) => setPlaylists(response.data.items))
        .catch((error) => console.error('Error fetching playlists:', error));
    }
  }, []);

  if (!token) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to Spotify Dashboard</h1>
        <a href={SPOTIFY_AUTH_URL}>
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Login with Spotify
          </button>
        </a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      {user && (
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1>Welcome, {user.display_name}</h1>
          {user.images?.[0]?.url && (
            <img
              src={user.images[0].url}
              alt="User Profile"
              style={{ borderRadius: '50%', width: '150px', height: '150px', margin: '20px' }}
            />
          )}
        </div>
      )}
      <h2>Your Playlists</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            style={{
              background: '#f4f4f4',
              margin: '10px 0',
              padding: '15px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {playlist.images?.[0]?.url && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '4px' }}
              />
            )}
            <span>{playlist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyDashboard;
