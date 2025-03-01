import { Name } from "../models/Name.js";
import userModel from "../models/userModel.js";

// 🔹 CREATE A NEW NAME
export const createName = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: Please log in" });
  }

  const { name } = req.body;
  const userId = req.user._id; // ✅ This won't break if `req.user` is null

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }

  try {
    const newName = new Name({ name, user: userId });
    await newName.save();

    return res.status(201).json({ success: true, message: "Name saved successfully", name: newName });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// 🔹 GET A SINGLE NAME BY ID

export const getNameById = async (req, res) => {
  const { id } = req.params;

  try {
    const name = await Name.findById(id).populate("user", "firstName lastName email");
    if (!name) {
      return res.status(404).json({ success: false, message: "Name not found" });
    }

    return res.status(200).json({ success: true, name });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// 🔹 UPDATE A NAME

export const updateName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user._id; // 🔹 User from cookies authentication

  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required for update" });
  }

  try {
    const nameRecord = await Name.findById(id);
    if (!nameRecord) {
      return res.status(404).json({ success: false, message: "Name not found" });
    }

    if (nameRecord.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this name" });
    }

    nameRecord.name = name;
    await nameRecord.save();

    return res.status(200).json({ success: true, message: "Name updated successfully", name: nameRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




