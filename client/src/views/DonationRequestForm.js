import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./req.css"
const DonationRequestForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    duration: "",
    address: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Send donation request to the top 3 donors using Axios
      const response = await axios.post("http://localhost:3000/api/events/request-donation", formData);

      // Handle the response accordingly
      console.log("Donation requests sent:", response.data);
    } catch (error) {
      console.error("Error sending donation requests:", error);
    }
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Patient Name:
        <input style={{border : "1px solid black"}}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
        style={{border : "1px solid black"}}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Date:
        <input
        style={{border : "1px solid black"}}
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      
      <br />

      <label>
        Address:
        <input
        style={{border : "1px solid black"}}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Quantity:
        <input
        style={{border : "1px solid black"}}
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <br />

      <button style={{border : "1px solid black"}} type="submit">Send Request</button>
    </form>
  );
};

export default DonationRequestForm;
