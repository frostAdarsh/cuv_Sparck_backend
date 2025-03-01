import { Data } from "../models/Data.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
    }
  },
});

// Create new data entry
export const createData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized, no token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { links, bio, name } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : "";

    const data = new Data({
      links,
      bio,
      avatar,
      name,
      user: decoded.id,
    });

    await data.save();
    return res.json({ success: true, message: "Data created successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update data with image upload
export const updateData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized, no token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { links, bio, name } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : "";

    const data = await Data.findOne({ _id: req.params.id, user: decoded.id });
    if (!data) return res.status(404).json({ success: false, message: "Data not found" });

    data.links = links || data.links;
    data.bio = bio || data.bio;
    data.name = name || data.name;
    if (avatar) data.avatar = avatar;

    await data.save();
    return res.json({ success: true, message: "Data updated successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get data by ID
export const getDataById = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized, no token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await Data.findOne({ _id: req.params.id, user: decoded.id });
    if (!data) return res.status(404).json({ success: false, message: "Data not found" });

    return res.json({
      success: true,
      data: {
        _id: data._id,
        links: data.links,
        name: data.name,
        bio: data.bio,
        avatar: data.avatar ? `${req.protocol}://${req.get("host")}${data.avatar}` : "",
        user: data.user,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
