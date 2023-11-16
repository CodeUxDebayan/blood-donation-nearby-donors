import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const BecomeDonorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        bloodType: '',
        medicalHistory: '',
        distance: '',
        latitude: null,
        longitude: null,
      });
    
      const history = useHistory();
    const id = localStorage.getItem('token');
    console.log(id);
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            setFormData({ ...formData, latitude, longitude});
          });
        }
      }, []); // Run this effect only once when the component mounts
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleBecomeDonor = async (e) => {
        e.preventDefault();
    
        try {
          console.log(formData);
        const response = await axios.post(`http://localhost:3000/api/user/becomeDonor/${id}`, formData);
          console.log('Donor registration successful:', response.data);
          
          if(response.data){
            alert('Donor registration successful');
            history.push('/');
          }
        } catch (error) {
          console.error('Donor registration failed:', error);
        }
      };

  return (
    <form onSubmit={handleBecomeDonor}>
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

      <label>
        Blood Type:
        <input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Medical History:
        <textarea
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
        />
      </label>

      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>


      <button type="submit">Become a Donor</button>
    </form>
  );
};

export default BecomeDonorForm;
