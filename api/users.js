import express from "express";
import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";
import auth from "../middlewares/auth";

const router = express.Router();

const userPublicFetch = {
    columns: ["uid", "first_name", "last_name", "address", "username", "email", "image"],
    withRelated: "userFeedback"
};

router.get("/", (req, res, next) => {
    if (req.query.token) {
        return next();
    }
    Users.fetchAll(userPublicFetch)
        .then((allUsers) => {
            res.status(200).json(allUsers);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.get("/:id", (req, res, next) => {
    if (req.query.token) {
        return next();
    }
    Users.forge({ uid: req.params.id }).fetch(userPublicFetch)
        .then((model) => {
            res.status(200).json(model);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

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
            if (!model) {
                throw "No user found!";
            }
            if (bcrypt.compareSync(req.body.password, model.get("password"))) {
                const accessToken = jwt.sign({
                    uid: model.get("uid"),
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

// Private routes

router.use(auth);

router.get("/", (req, res) => {
    Users.forge({ uid: req.user.uid }).fetch({ withRelated: ["creditCard", "userFeedback"] })
        .then((userInfo) => {
            res.status(200).json(userInfo);
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.put("/", (req, res) => {
    Users.forge({ uid: req.user.uid }).fetch()
        .then((model) => {
            return model.save({
                address: req.body.address || model.get("address"),
                email: req.body.email || model.get("email"),
                image: req.body.image || model.get("image")
            }, { method: "update" });
        })
        .then((updatedModel) => {
            res.status(200).json({ message: "Updated user!", data: updatedModel });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.delete("/", (req, res) => {
    Users.forge({ uid: req.user.uid }).destroy()
        .then((deletedModel) => {
            res.status(200).json({ message: "Deleted user!", data: deletedModel});
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

export { router };
