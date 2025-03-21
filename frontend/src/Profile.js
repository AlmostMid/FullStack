//
import React, { useEffect, useState } from 'react';

function Profile() {
  // Local state for user data
  const [user, setUser] = useState({
    username: '',
    points: 0,
    level: 0,
    profilePicUrl: ''
  });

  // Local state to handle uploading a new profile pic
  const [selectedFile, setSelectedFile] = useState(null);

  // 1. Fetch user data on mount
  useEffect(() => {
    // Replace this with a real API call
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Example GET request (use your real endpoint)
      // const response = await fetch('/api/user/profile');
      // const data = await response.json();

      // Mock data to simulate the response
      const mockData = {
        username: 'Tobias Lugter MEGET',
        points: 120,
        level: 2,
        profilePicUrl: 'https://via.placeholder.com/100', // Example placeholder
      };

      // Update local state
      setUser(mockData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 2. Handle file input changes
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 3. Upload the new picture
  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // You'd typically send the file to your backend using FormData
      // For example:
      // const formData = new FormData();
      // formData.append('profilePic', selectedFile);
      //
      // const response = await fetch('/api/user/upload-profile', {
      //   method: 'POST',
      //   body: formData
      // });
      //
      // const updatedUserData = await response.json();
      // setUser(updatedUserData);

      // For now, let's just simulate an update:
      const newPicUrl = URL.createObjectURL(selectedFile);
      setUser((prev) => ({
        ...prev,
        profilePicUrl: newPicUrl
      }));

      // Clear the file input
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Account Information</h1>

      {/* Display user data */}
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Points:</strong> {user.points}</p>
        <p><strong>Level:</strong> {user.level}</p>
      </div>

      {/* Display profile picture */}
      <div style={{ margin: '20px 0' }}>
        {user.profilePicUrl ? (
          <img
            src={user.profilePicUrl}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        ) : (
          <p>No profile picture available.</p>
        )}
      </div>

      {/* Upload new profile picture */}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload New Picture
        </button>
      </div>
    </div>
  );
}

export default Profile;
