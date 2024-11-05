const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateToken(...allowedRoles) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Access token required" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            const { role_id } = decoded;
            if (!allowedRoles.includes(role_id)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            console.log("Decoded Token:", decoded);
            req.user = decoded;
            next();
        });
    };
}

module.exports = authenticateToken;