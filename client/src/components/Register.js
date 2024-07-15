import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState(null);

  const { register } = useContext(AuthContext);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');
      setCsrfToken(data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await register({ ...formData, csrfToken });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <PasswordStrengthIndicator password={password} />
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
