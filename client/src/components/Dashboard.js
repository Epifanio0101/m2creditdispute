import React, { useState, useEffect, startTransition } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/dashboard');
        startTransition(() => {
          setDashboardData(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
