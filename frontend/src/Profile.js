// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css'; // <-- Make sure to import this new CSS file

function Profile() {
  const [user, setUser] = useState({
    username: '',
    points: 0,
    level: 0,
   
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
        username: 'Tobias Lugter RIGTIG MEGET',
        points: 120,
        level: 2,
       
      };

      setUser(mockData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  return 
}

export default Profile;
