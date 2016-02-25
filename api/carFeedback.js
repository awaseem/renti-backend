import express from "express";
import auth from "../middlewares/auth";
import CarFeedback from "../models/carFeedback";

const router = express.Router();

// Private routes

router.use(auth);

router.post("/", (req, res) => {
    CarFeedback.forge({
        comment: req.body.comment,
        rating: req.body.rating,
        car_has: req.body.car_has,
        user_creator: req.user.uid
    }).save()
        .then((newCarFeedback) => {
            res.status(200).json({
                message: "Created car feedback!",
                data: newCarFeedback
            });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.delete("/", (req, res) => {
    CarFeedback.forge({ fid: req.body.fid }).fetch()
        .then((carFeedbackModel) => {
            if(!carFeedbackModel) throw "Cannot find car feed back with the id given!";
            if(carFeedbackModel.get("user_creator") !== req.user.uid) throw "You are not authorized to delete this car feedback!";
            return carFeedbackModel.destroy();
        })
        .then(() => res.status(200).json({ message: "Deleted comment!" }))
        .catch((err) => {
            res.status(200).json({
                error: err
            });
        });
});

export { router };
