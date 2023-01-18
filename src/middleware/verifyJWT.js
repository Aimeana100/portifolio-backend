import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({"message": res.message}); //invalid token
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            console.log(decoded)
            next();
        }
    );
}

module.exports = verifyJWT