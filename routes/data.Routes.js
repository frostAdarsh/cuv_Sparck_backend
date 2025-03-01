import express from "express";
import {
  createData,
  getDataById,
  updateData,
  upload
} from "../controller/data.Controller.js";

const dataRouter = express.Router();

dataRouter.post("/", upload.single("avatar"), createData);
dataRouter.put("/:id", upload.single("avatar"), updateData);
dataRouter.get("/:id", getDataById);

export default dataRouter;
