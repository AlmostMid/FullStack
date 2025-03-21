// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css'; // <-- Make sure to import this new CSS file

function Profile() {
  const [user, setUser] = useState({
    username: '',
    points: 0,
    level: 0,
    profilePicUrl: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // In a real app, replace this with a call to your backend
      // Example: const res = await fetch('/api/user/profile');
      // const data = await res.json();
      // setUser(data);

      // Mock data
      const mockData = {
        username: 'Tobias Lugter MEGET',
        points: 120,
        level: 2,
        profilePicUrl: 'https://via.placeholder.com/100', 
      };

      setUser(mockData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      // Normally you'd send 'selectedFile' to your backend
      const newPicUrl = URL.createObjectURL(selectedFile);
      setUser(prev => ({
        ...prev,
        profilePicUrl: newPicUrl
      }));
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Din Profil</h1>
      </div>

      <div className="profile-content">
        {/* Display user data */}
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

      {/* Profile Picture */}
      <div className="profile-picture-section">
        {user.profilePicUrl ? (
          <img
            src={user.profilePicUrl}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <p>No profile picture available.</p>
        )}

        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!selectedFile}>
            Upload New Picture
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
