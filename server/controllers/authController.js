import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        const token = jwtGenerator(newUser.rows[0].id);
        return res.json({ token });

    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Password or Email is incorrect" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwtGenerator(user.rows[0].id);
        return res.json({ token });

    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

export const verifyUser = (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error("Error in verifyUser:", err.message);
        res.status(500).send("Server error");
    }
};
