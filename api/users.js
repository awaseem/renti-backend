import express from "express";
import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";
import auth from "../middlewares/auth";

const router = express.Router();

export const userPublicFetch = {
    columns: ["uid", "first_name", "last_name", "address", "username", "email", "image", "summary"],
    withRelated: ["userFeedback", "cars", "cars.carFeedback", "cars.carFeedback.userCreator", "userFeedback.userCreator"]
};

router.get("/", (req, res, next) => {
    if (req.query.token) {
        return next();
    }
    Users.fetchAll(userPublicFetch)
        .then((allUsers) => {
            res.status(200).json(allUsers);
        })
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    if (req.query.token) {
        return next();
    }
    Users.forge({ uid: req.params.id }).fetch(userPublicFetch)
        .then((model) => {
            if (!model) throw "User does not exist!";
            res.status(200).json(model);
        })
        .catch(next);
});

router.post("/signup", (req, res, next) => {
    Users.where({ username: req.body.username }).fetch()
        .then((model) => {
            if (model) throw "Username already exists!";
            return new Users(req.body).save();
        })
        .then((newUser) => {
            res.status(200).json({ message: `Successfully created user: ${newUser.toJSON().username}` });
        })
        .catch(next);
});

router.post("/signin", (req, res, next) => {
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
        .catch(next);
});

// Private routes

router.use(auth);

router.get("/", (req, res, next) => {
    Users.forge({ uid: req.user.uid }).fetch({ withRelated: userPublicFetch.withRelated.concat(["creditCard"]) })
        .then((userInfo) => {
            res.status(200).json(userInfo);
        })
        .catch(next);
});

router.put("/", (req, res, next) => {
    Users.forge({ uid: req.user.uid }).fetch()
        .then((model) => {
            if (!model) throw "User you are trying to update does not exist!";
            return model.save({
                address: req.body.address || model.get("address"),
                email: req.body.email || model.get("email"),
                image: req.body.image || model.get("image"),
                summary: req.body.summary || model.get("summary")
            }, { method: "update" });
        })
        .then((updatedModel) => {
            res.status(200).json({ message: "Updated user!", data: updatedModel });
        })
        .catch(next);
});

router.delete("/", (req, res, next) => {
    Users.forge({ uid: req.user.uid }).destroy()
        .then(() => {
            res.status(200).json({ message: "Deleted user!"});
        })
        .catch(next);
});

export default router;
