import { Router } from "express";
import Address from "../models/Address.js";

const router = Router();

// Add address
router.post("/add", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    await newAddress.save();
    res.json({ message: "Address saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving address." });
  }
});

// Get all addresses
router.get("/all", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses." });
  }
});

// Update address
router.put("/update/:id", async (req, res) => {
  try {
    await Address.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Address updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating address." });
  }
});

// Delete address
router.delete("/delete/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address." });
  }
});

export default router;
