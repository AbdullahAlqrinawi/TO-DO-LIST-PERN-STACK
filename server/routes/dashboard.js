import { Router } from "express";
import authorize from "../middleware/authorize.js"; 
import db from "../config/db.js"; 

const router = Router(); 

router.post("/", authorize, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT name FROM users WHERE id = $1", 
      [req.user] 
    );

    res.json(user.rows[0]); 
  } catch (err) {
    console.error("Error in /dashboard route:", err.message);
    res.status(500).send("Server error");
  }
});

export default router;
