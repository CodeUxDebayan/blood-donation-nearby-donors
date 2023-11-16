import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Replace 'your_api_endpoint' with your actual API endpoint
      const response = await axios.post('http://localhost:3000/api/user/register', formData);

      // Assuming the API returns a success message
      console.log('Signup successful:', response.data);

      // Optionally, you can redirect the user to another page after successful signup
      history.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle signup failure, show error messages, etc.
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

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
      <br />

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
      <br />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
