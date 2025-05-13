import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ attach user ID to request object, not body
        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authUser;
