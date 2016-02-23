import express from "express";
import Cars from "../models/cars";
import auth from "../middlewares/auth";
import { userPublicFetch } from "./users";

const router = express.Router();

router.get("/", (req, res) => {
    Cars.fetchAll({ withRelated: {
        users: (query) => {
            query.columns(...userPublicFetch.columns);
        }
    }})
        .then((allCars) => {
            res.status(200).json(allCars);
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            });
        });
});

router.get("/:plate", (req, res) => {
    Cars.forge({ license_plate: req.params.plate }).fetch({
        withRelated: {
            users: (query) => {
                query.columns(...userPublicFetch.columns);
            }
        }
    })
        .then((car) => {
            if (!car) throw `No car found with the following plate: ${req.params.plate}`;
            res.status(200).json(car);
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            });
        });
});

// Private routes

router.use(auth);

router.post("/", (req, res) => {
    Cars.forge({
        license_plate: req.body.license_plate,
        model: req.body.model,
        make: req.body.make,
        year: req.body.year,
        number_of_seats: req.body.number_of_seats,
        colour: req.body.colour,
        image: req.body.image,
        user_id: req.user.uid
    }).save(undefined, { method: "insert" })
        .then((newCar) => {
            res.status(200).json({
                message: `Created car for ${req.user.username}`,
                data: newCar
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            });
        });
});

router.delete("/", (req, res) => {
    Cars.forge({ license_plate: req.body.license_plate }).destroy()
        .then(() => res.status(200).json({ message: "car destroyed!" }))
        .catch((err) => {
            res.status(400).json({
                error: err
            });
        });
});

export { router };
