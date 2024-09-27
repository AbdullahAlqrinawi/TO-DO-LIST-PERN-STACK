import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];  
    
    if (!token) {
        return res.status(403).json({ msg: "Authorization token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;  
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(401).json({ msg: "Token is not valid" });
    }
};

export default checkToken;
