import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [disputeOptions, setDisputeOptions] = useState([]);
  const [letters, setLetters] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [disputeError, setDisputeError] = useState(null);

  const handleUpload = async event => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      setUploadStatus('Uploading...');
      await axios.post('/api/disputes/upload', formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setUploadStatus('Upload successful');
    } catch (err) {
      setUploadStatus('Upload failed');
    }
  };

  const handleDispute = async () => {
    try {
      const response = await axios.post(
        '/api/disputes/generate',
        { disputes: disputeOptions },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          }
        }
      );
      setLetters(response.data.letters);
    } catch (err) {
      setDisputeError(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {uploadStatus && <p>{uploadStatus}</p>}
      <input type="file" onChange={handleUpload} />
      {/* Add form for selecting dispute options */}
      <button onClick={handleDispute}>Generate Dispute</button>
      {disputeError && <p style={{ color: 'red' }}>{disputeError}</p>}
      <div>
        {letters.map((letter, index) => (
          <div key={index}>
            <h2>Dispute Letter {index + 1}</h2>
            <p>{letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
