import express from "express";
import { getUsernameById, login, logout, register, updateUser } from "../controller/auth.Controller.js";


const authRouter = express.Router();


authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update", updateUser)
authRouter.get("/me", getUsernameById)

export default authRouter;
