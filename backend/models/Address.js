import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: String,
  house: String,
  area: String,
  category: String,
  coordinates: { lat: Number, lng: Number },
  favorite: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
