import express from "express";
import Cars from "../models/cars";
import auth from "../middlewares/auth";
import { userPublicFetch } from "./users";

const carPublicFetch = {
    withRelated: [
        "carFeedback",
        "carFeedback.userCreator",
        "users.userFeedback",
        "users.userFeedback.userCreator",
        { users: (query) => query.columns(...userPublicFetch.columns) },
        { "users.userFeedback.userCreator": (query) => query.columns(...userPublicFetch.columns) },
        { "carFeedback.userCreator": (query) => query.columns(...userPublicFetch.columns) }
    ]
};

const router = express.Router();

router.get("/", (req, res, next) => {
    Cars.fetchAll(carPublicFetch)
        .then((allCars) => {
            res.status(200).json(allCars);
        })
        .catch(next);
});

router.get("/:plate", (req, res, next) => {
    Cars.forge({ license_plate: req.params.plate }).fetch(carPublicFetch)
        .then((car) => {
            if (!car) throw `No car found with the following plate: ${req.params.plate}`;
            res.status(200).json(car);
        })
        .catch(next);
});

// Private routes

router.use(auth);

router.post("/", (req, res, next) => {
    Cars.forge({
        license_plate: req.body.license_plate,
        model: req.body.model,
        make: req.body.make,
        year: req.body.year,
        number_of_seats: req.body.number_of_seats,
        price: req.body.price,
        colour: req.body.colour,
        image: req.body.image,
        summary: req.body.summary,
        user_id: req.user.uid
    }).save(undefined, { method: "insert" })
        .then((newCar) => {
            res.status(200).json({
                message: `Created car for ${req.user.username}`,
                data: newCar
            });
        })
        .catch(next);
});

router.put("/", (req, res, next) => {
    Cars.forge({ license_plate: req.body.license_plate }).fetch()
        .then((carModel) => {
            if (!carModel) throw "Car you are trying to update does not exist";
            if (carModel.get("user_id") !== req.user.uid) throw "You can not update this car, because you do not have access!";
            return carModel.save({
                model: req.body.model || carModel.get("model"),
                make: req.body.make || carModel.get("make"),
                year: req.body.year || carModel.get("year"),
                number_of_seats: req.body.number_of_seats || carModel.get("number_of_seats"),
                price: req.body.price || carModel.get("price"),
                colour: req.body.colour || carModel.get("colour"),
                image: req.body.image || carModel.get("image"),
                summary: req.body.summary || carModel.get("summary")
            }, { method: "update" });
        })
        .then((updatedCarModel) => {
            res.status(200).json({
                message: "Updated Car!",
                data: updatedCarModel
            });
        })
        .catch(next);
});

router.delete("/", (req, res, next) => {
    Cars.forge({ license_plate: req.body.license_plate }).fetch()
        .then((carToDelete) => {
            if (!carToDelete) throw "Car to delete does not exist";
            if (carToDelete.get("user_id") !== req.user.uid) throw "You do not have access to delete the car!";
            return carToDelete.destroy();
        })
        .then(() => res.status(200).json({ message: "car destroyed!" }))
        .catch(next);
});

export default router;
