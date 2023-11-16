import React, { useState } from 'react';
import axios from 'axios';
import "./req.css"
import { useHistory } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace 'your_api_endpoint' with your actual API endpoint
      const response = await axios.post('http://localhost:3000/api/user/login', formData);

     
    const  token  = response.data.user._id;
    console.log(token);
     
    localStorage.setItem('token', token);
    history.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
