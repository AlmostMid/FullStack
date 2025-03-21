// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({
    username: '',
    points: 0,
    level: 0,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Mock data (replace with real API call)
      const mockData = {
        username: 'Tobias Lugter RIGTIG MEGET',
        points: 120,
        level: 2,
      };
      setUser(mockData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Return your JSX wrapped in parentheses
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Din Profil</h1>
      </div>

      <div className="profile-content">
        <div className="profile-row">
          <span className="label">Brugernavn:</span> {user.username}
        </div>
        <div className="profile-row">
          <span className="label">Point:</span> {user.points}
        </div>
        <div className="profile-row">
          <span className="label">Level:</span> {user.level}
        </div>
      </div>
    </div>
  );
}

export default Profile;
