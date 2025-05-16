import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

        // ✅ attach user ID to request object, not body
        req.docId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authDoctor;
