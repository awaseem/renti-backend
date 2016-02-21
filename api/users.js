import express from "express";
import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";

const router = express.Router();

router.post("/signup", (req, res) => {
    Users.where({ username: req.body.username }).fetch()
        .then((model) => {
            if (model) throw "Username already exists!";
            return new Users(req.body).save();
        })
        .then((newUser) => {
            res.status(200).json({ message: `Successfully created user: ${newUser.toJSON().username}` });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.post("/signin", (req, res) => {
    Users.where({ username: req.body.username }).fetch()
        .then((model) => {
            if (bcrypt.compareSync(req.body.password, model.get("password"))) {
                const accessToken = jwt.sign({
                    userId: model.get("uid"),
                    first_name: model.get("first_name"),
                    last_name: model.get("last_name"),
                    address: model.get("address"),
                    username: model.get("username"),
                    email: model.get("email"),
                    date_of_birth: model.get("date_of_birth")
                }, jwtConfig.secret, {expiresIn: jwtConfig.expire} );
                res.status(200).json({ message: "Enjoy the token!", token: accessToken });
            }
            else {
                throw "Failed to validate password!";
            }
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

export { router };
