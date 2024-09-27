import express from "express";
import cors from "cors";
import dashboard from "./routes/dashboard.js"; 
import notesRouter from "./routes/notesRouter.js";  
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


// استخدام الـ routes
app.use("/notes", notesRouter);  
app.use("/auth", authRouter); 
app.use("/dashboard", dashboard); 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
