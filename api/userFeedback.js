import express from "express";
import auth from "../middlewares/auth";
import UserFeedback from "../models/userFeedback";

const router = express.Router();

// Private routes

router.use(auth);

router.post("/", (req, res) => {
    UserFeedback.forge({
        comment: req.body.comment,
        rating: req.body.rating,
        user_has: req.body.user_has,
        user_creator: req.user.uid
    }).save()
        .then((newUserFeedback) => {
            res.status(200).json({
                message: "Created user feedback!",
                data: newUserFeedback
            });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.delete("/", (req, res) => {
    UserFeedback.forge({ fid: req.body.fid }).fetch()
        .then((userFeedbackModel) => {
            if(!userFeedbackModel) throw "Cannot find user feed back with the id given!";
            if(userFeedbackModel.get("user_creator") !== req.user.uid) throw "You are not authorized to delete this user feedback!";
            return userFeedbackModel.destroy();
        })
        .then(() => res.status(200).json({ message: "Deleted comment!" }))
        .catch((err) => {
            res.status(200).json({
                err: err
            });
        });
});

export { router };
