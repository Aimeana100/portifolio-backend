import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT =  (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.headers.token;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided.'});
  const token = authHeader.split(' ')[1];
   jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    // eslint-disable-next-line consistent-return
    (err, decoded) => {
      if (err) return res.status(403).json({ message: res.message }); // invalid token
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
       next();
    }
  );
}
export default verifyJWT