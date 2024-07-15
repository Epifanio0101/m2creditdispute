import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get('/api/analytics', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setAnalytics(res.data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      <ul>
        {Object.keys(analytics).map(action => (
          <li key={action}>
            {action}: {analytics[action]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
