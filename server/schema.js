import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model("User", userSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const donorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  bloodType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
  },
  // Additional fields for donor profiles
});
donorSchema.index({
  location: "2dsphere"
});

export const Donor = mongoose.model("Donor", donorSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RequestedDonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

export const RequestedDonation = mongoose.model(
  "RequestedDonation",
  RequestedDonationSchema
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  organizers: {
    type: String,
    required: true,
  },
  // Additional fields for donation events
});

export const Event = mongoose.model("Event", eventSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////