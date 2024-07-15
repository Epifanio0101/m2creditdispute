import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
