const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

const authVerifyMiddleware = async (req, res, next) => {
    try {
        // Accept token from Authorization header or x-access-token
        let token = req.headers?.authorization || req.headers?.["x-access-token"];

        if (!token) {
            return res.status(401).json({
                message: "Authorization token required",
                success: false,
            });
        }

        // If header contains 'Bearer <token>', strip the prefix
        if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
            token = token.slice(7).trim();
        }

        // Verify token using configured private key
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;

        return next();
    } catch (error) {
        console.log("Auth middleware error:", error?.name, error?.message);

        if (error && error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired", success: false });
        }
        if (error && error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        return res.status(500).json({
            message: "Error in auth middleware",
            success: false,
            error: error?.message || error,
        });
    }
};

module.exports = {
    authVerifyMiddleware,
};