import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Token missing" });
    }

    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;

    next();
}
