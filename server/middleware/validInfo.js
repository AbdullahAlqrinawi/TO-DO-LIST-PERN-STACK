const validInfo = (req, res, next) => {
    const { email, name, password } = req.body;

    const validEmail = (userEmail) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };

    if (!email || (req.path === "/register" && !name)) {
        return res.status(400).json({ error: "Missing Credentials" });
    }

    if (!password) {
        return res.status(400).json({ error: "Missing Password" });
    }

    if (!validEmail(email)) {
        return res.status(400).json({ error: "Invalid Email" });
    }

    next();
};

export default validInfo;
