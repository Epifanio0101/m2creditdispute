import React, { useState } from 'react';
import axios from 'axios';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const { email, subject, message: userMessage } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/support/contact', formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setMessage('Support request sent successfully');
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Contact Support</h1>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={onChange}
          required
        />
        <textarea
          name="message"
          value={userMessage}
          onChange={onChange}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactSupport;
