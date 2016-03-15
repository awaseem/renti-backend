import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(500).json(err);
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).json({ message: "You need a token to access this route!"});
    }
};

export default auth;
