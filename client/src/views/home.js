import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FeatureCard from '../components/feature-card'
import GalleryCard3 from '../components/gallery-card3'
import './home.css'
import Navheader from '../components/navheader'
import {Footer} from '../components/footer'
const Home = () => {
  
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events/request-donation")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  })

 const tk = localStorage.getItem("token");

  return (
    <div className="home-container">
      <Navheader />
      <div className="home-hero">
        <div className="home-hero1">
          <div className="home-container1">
            <h1 className="home-hero-heading heading1">
              Donate Blood, Save Lives
            </h1>
            <span className="home-hero-sub-heading">
              Join our community of blood donors
            </span>
            <div className="home-btn-group">
              <button onClick={() => window.location.href = "/become-donor"} className="home-hero-button1 button">Get Started</button>
              <button className="home-hero-button2 button">Learn More→</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container2">
            <span className="home-text04 sectionTitle">
              <span>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Become a Blood Donor
            </h2>
            <span className="home-details-sub-heading">
              By becoming a blood donor, you can make a difference in
              someone&apos;s life. Your donation can save lives and bring hope
              to those in need.
            </span>
          </div>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGJsb29kJTIwZG9uYXRpb258ZW58MHx8fHwxNjk5MzUzNTcyfDA&amp;ixlib=rb-4.0.3&amp;w=400"
            className="home-details-image"
          />
        </div>
      </div>
      <div className="home-details1">
          <div className="home-container2">
            <span className="home-text04 sectionTitle">
              <span>Donations</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Requested Donations
            </h2>
            {requests?.map((request) =>(
            <><span className="home-details-sub-heading">
              <h2>{request.name}</h2>
              <br/>
              {request.description}
              <br/>
              {request.date}
              <br/>
              {request.address}
              <br/>
              {request.quantity}
            </span>
            </>
            ))}
          </div>
        </div>
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-features1">
            <div className="home-container3">
              <span className="home-text07 sectionTitle">
                <span>features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">Key Features</h2>
              <span className="home-features-sub-heading">
                Discover the powerful features of our blood donation website
              </span>
            </div>
            <div className="home-container4">
              <FeatureCard
                Heading="Find Nearby Donors"
                SubHeading="Easily locate blood donors in your area"
              ></FeatureCard>
              <FeatureCard
                Heading="User Registration"
                SubHeading="Create an account to access additional features"
              ></FeatureCard>
              <FeatureCard
                Heading="Become a Donor"
                SubHeading="Register as a blood donor and help save lives"
              ></FeatureCard>
              <FeatureCard
                Heading="Lorem ipsum"
                SubHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum."
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-pricing"></div>
      <div className="home-gallery">
        <div className="home-gallery1">
          <h1 className="home-gallery-heading heading2">Gallery</h1>
          <span className="home-gallery-sub-heading">
            Explore some images related to blood donation
          </span>
          <div className="home-container5">
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1578496781481-cfbd89f9aca8?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1514416432279-50fac261c7dd?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName1"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1579684453377-48ec05c6b30a?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName3"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1599045118108-bf9954418b76?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName2"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1631507623104-aa66944677aa?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName4"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1604807787527-e7ad386cca6a?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName5"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName6"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName7"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1542868727-5b8fcd21495e?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName8"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName9"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1579154341058-50b75faf8e97?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName10"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MzM1MXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName11"
            ></GalleryCard3>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="home-banner1">
          <h1 className="home-banner-heading heading2">Find Nearby Donors</h1>
          <span className="home-banner-sub-heading">
            Discover blood donors in your area who are ready to help
          </span>
          <button onClick={() => window.location.href = "/nearby-donors"}  className="home-banner-button button">Search now</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
