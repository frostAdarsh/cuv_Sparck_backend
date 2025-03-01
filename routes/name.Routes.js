import express from "express";
import { createName, getNameById, updateName } from "../controller/name.controller.js";
import {isAuth} from "../middleware/isAuth.js"
const nameRouter = express.Router();

nameRouter.post("/createname", isAuth,createName);
nameRouter.get("/:id", isAuth,getNameById);
nameRouter.put("/:id", isAuth,updateName);

export default nameRouter