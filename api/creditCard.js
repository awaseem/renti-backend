import express from "express";
import CreditCard from "../models/creditCard";
import auth from "../middlewares/auth";

const router = express.Router();

// Private route

router.use(auth);

router.post("/", (req, res) => {
    CreditCard.forge({
        user_id: req.user.uid,
        credit_card_number: req.body.credit_card_number,
        cvv: req.body.cvv,
        expiry_date: req.body.expiry_date
    }).save()
        .then((newCard) => {
            res.status(200).json({ message: "Added credit card to user!", data: newCard });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

router.delete("/", (req, res) => {
    CreditCard.where({ user_id: req.user.uid }).destroy()
        .then(() => {
            res.status(200).json({ message: "Deleted credit card!"});
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

export { router };
