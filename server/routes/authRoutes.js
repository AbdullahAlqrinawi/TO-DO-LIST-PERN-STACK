import { Router } from "express";  
import { registerUser, loginUser, verifyUser } from "../controllers/authController.js";  
import validInfo from "../middleware/validInfo.js";
import authorize from "../middleware/authorize.js";

const router = Router();

router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUser);
router.post("/verify", authorize, verifyUser);

export default router;
