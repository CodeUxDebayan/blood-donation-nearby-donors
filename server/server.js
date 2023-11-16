import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import {
  Donor,
  User,
  Event,
  RequestedDonation
} from "./schema.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/Blood-Donation";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

connectToMongo();

app.use(cors());
app.use(express());
app.use(bodyParser.json());

app.post("/api/user/register", async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Email is already registered.",
      });
    }
    // Create a new donor
    const user = new User({
      name: name,
      email: email,
      password: password,
      
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Could not register user",
    });
    console.log(error);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/user/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    // Find the donor by email
    const user = await User.findOne({
      email,
    });
    // Check if the donor exists
    if (!user) {
      return res.status(404).json({
        error: "Donor not found",
      });
    }
    // Compare the provided password with the stored hash (you should use a password hashing library)
    if (password === user.password) {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    } else {
      res.status(401).json({
        error: "Incorrect password",
      });
    }
    console.log(user.id);
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/user/dashboard/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    const donor = await Donor.findOne({
      user: userId,
    });
    const response = {
      user: user,
      donor: donor ? true : false,
    };
    const upcomingEvents = await Event.find({
      date: {
        $gte: new Date(),
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Donor not found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve User profile",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/donor/dashboard/:id", async (req, res) => {
  try {
    const donorId = req.params.id;
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({
        error: "Donor not found",
      });
    }
    // Retrieve upcoming donation events
    const upcomingEvents = await Event.find({
      date: {
        $gte: new Date(),
      },
    });

    res.status(200).json({
      donor,
      upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve donor dashboard",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve donors",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/api/user/becomeDonor/:id", async (req, res) => {
  try {
    const userId = req.params.id; 
    
    const {
      bloodType,
      address,
      medicalHistory,
      latitude,
      longitude
    } = req.body;
    // Check if the user is already a donor
    const existingDonor = await Donor.findOne({
      user: userId,
    });
    
    if (existingDonor) {
      return res.status(400).json({
        error: "User is already a donor.",
      });
    }
    // Create a new donor record associated with the user
    const newDonor = new Donor({
      user: userId,
      bloodType: bloodType,
      address: address,
      medicalHistory: medicalHistory,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    console.log(newDonor);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({
      error: "Could not become a donor",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/events/request-donation", async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      duration,
      address,
      quantity
    } = req.body;
    // Create a new requested event
    const requestedEvent = new RequestedDonation({
      name: name,
      description: description,
      date: date,
      address: address,
      quantity: quantity,
    });
    await requestedEvent.save();
    res.status(201).json(requestedEvent);
  } catch (error) {
    res.status(500).json({
      error: "Could not request the event",
    });
  }
});

app.get("/api/events/request-donation", async (req, res) => {
  try {
    const requestedEvents = await RequestedDonation.find();
    res.status(200).json(requestedEvents);
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve requested events",
    });
  }
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/events/create", async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      address,
      organizers
    } = req.body;
    console.log(req.body);
    // Create a new event
    const event = new Event({
      name: name,
      description: description,
      date: date,
      address: address,
      organizers: organizers,
    });
    console.log(event);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      error: "Could not create the event",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve events",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/nearbyDonor", async (req, res) => {
  const { latitude, longitude } = req.query;
  console.log(req.query);
  if( latitude && longitude )
  {
    const donors = await Donor.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(latitude), parseFloat(longitude)],
        },
        distanceField: "distance",
        maxDistance: 2000000,
        spherical: true,
      },
    },
  ]);
  res.json(donors);
}
  else{
    console.log("error");
  }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});