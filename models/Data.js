import mongoose from "mongoose";
import { type } from "os";

const dataSchema = new mongoose.Schema({
  name: { type: String,default:"" },
  links: [
    {
      url: { type: String, default: "" },
      title: { type: String, default: "" },
      icon: { type: String, default: "" },
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  avatar: { type: String, default: "" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Data = mongoose.model("Data", dataSchema);
