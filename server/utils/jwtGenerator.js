import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function jwtGenerator(userId) {
    const payload = {
        userId: userId  
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export default jwtGenerator;
