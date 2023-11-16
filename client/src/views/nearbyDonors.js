import "./home.css";
import "./nearbyDonor.css"
import { Helmet } from 'react-helmet'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navheader from "../components/navheader";
import {Footer} from "../components/footer";
export default function NearbyDonors() {
  const [donors, setDonors] = useState([]);
 
  const [updatedDonors, setUpdatedDonors] = useState([]);
  // Get the user's location using the browser's geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        

       console.log(latitude, longitude)
        
        // Send the user's location to the server in the request body
        axios.get('http://localhost:3000/api/nearbyDonor', 
         {params:{
          latitude,
          longitude,
        }})
          .then((response) => {
            // Update the state with the received donors
            setDonors(response.data);
            console.log(donors)
            
          })
          .catch((error) => {
            console.error('Error fetching nearby donors:', error);
          });
      });
    }
  }, []);
  
  useEffect(() => {
    const fetchUserNames = async () => {
      const updatedDonors = [];
  
      for (let i = 0; i < donors.length; i++) {
        const userId = donors[i].user;
  
        try {
          const userResponse = await axios.get(`http://localhost:3000/api/user/dashboard/${userId}`);
          
          // Destructure user name from the response
          const { name } = userResponse.data.user;
  
          // Add the user name to the donor object
          const updatedDonor = {
            ...donors[i],  // Spread existing donor properties
            userName: name, // Add the userName property
          };
  
          updatedDonors.push(updatedDonor);
        } catch (error) {
          console.error('Error fetching user name:', error);
          // Handle the error as needed
        }
      }
  
      // Update the state with the modified donors array
      setUpdatedDonors(updatedDonors);
    };
  
    // Fetch user names only if there are donors
    if (donors.length > 0) {
      fetchUserNames();
    }
  }, [donors]);
  

        


  return (
  <div>
  <Helmet>
        <title>French Same Moose</title>
        <meta property="og:title" content="French Same Moose" />
      </Helmet>
      <Navheader />
      <div className="home-hero">
        <div className="home-hero1">
          <div className="home-container1">
            <h1 className="home-hero-heading heading1">
              Nearby Donors
            </h1>
          </div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} className="donorName">
        <a href="/request">
      <div className="home-button button">
        Request
      </div>
      </a>
      </div>
     
      {/* HERE */}
      {updatedDonors.map((donor) =>(<div className="home-details">
        <div className="home-details1">
          <div key={donor.id} className="donor-container2"> 
          <img
            alt="image"
    src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGJsb29kJTIwZG9uYXRpb258ZW58MHx8fHwxNjk5MzUzNTcyfDA&amp;ixlib=rb-4.0.3&amp;w=400"
            className="donor-details-image"
          />
           <div className="donor-details1"> 
           <div className="donor-details">
             
                <div className="donorName">
                  {donor.userName}
                  </div>
              
            
           <h2 className="home-details-heading heading2" >
              {donor.bloodType}
            </h2>
            <h2 className="home-details-heading heading2">{Math.round(donor.distance / 1000) }Km</h2>
            </div>
            <span className="donor-details-sub-heading">{donor.medicalHistory}</span>
            </div>
          </div>
        </div>
      </div>))}
      <Footer />
      </div> 
      )}