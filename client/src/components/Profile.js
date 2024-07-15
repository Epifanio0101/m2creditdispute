import React, { useState, useEffect, useContext, startTransition } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get('/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          startTransition(() => {
            setUserData(response.data);
            setLoading(false);
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default Profile;
