import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import example1Routes from "./public/example1.js";
import example2Routes from "./protected/example2.js";

const mainRouter = express.Router();

// ----------- Public Routes (No auth needed) -----------
mainRouter.use("/example1", example1Routes);



// ----------- Protected Routes -----------
mainRouter.use("/example2", verifyToken, example2Routes);




export default mainRouter;
