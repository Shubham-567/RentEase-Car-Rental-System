import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register); // register new user
router.post("/login", login); // user login

export default router;
