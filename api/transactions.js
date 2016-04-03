import express from "express";
import auth from "../middlewares/auth";
import Transactions from "../models/transactions";

const router = express.Router();

router.get("/:plate", (req, res, next) => {
    Transactions.where({ "car_id": req.params.plate }).fetchAll()
        .then((transactions) => {
            if (!transactions) throw "No transaction found!";
            res.status(200).json(transactions);
        })
        .catch(next);
});

// Private Route

router.use(auth);

router.post("/", (req, res, next) => {
    Transactions.forge({
        "user_renter": req.user.uid,
        "date_in": req.body.date_in,
        "date_out": req.body.date_out,
        "price": req.body.price,
        // Always create transaction with a status of pending!
        "pending": 1,
        "car_id": req.body.car_id
    }).save(undefined, { method: "insert"})
        .then((newTransaction) => {
            res.status(200).json({
                message: "Created new transaction!",
                data: newTransaction
            });
        })
        .catch(next);
});

router.post("/approve", (req, res, next) => {
    Transactions.forge({ tid: req.body.tid }).fetch({ withRelated: "car"})
        .then((transaction) => {
            if (!transaction) throw "Transaction does not exist!";
            if (transaction.related("car").get("user_id") !== req.user.uid) throw "You cannot change the status of this transaction!";
            return transaction.save({
                pending: 0
            }, { method: "update"});
        })
        .then((updatedTransaction) => {
            res.status(200).json({
                message: "Updated transaction status!",
                data: updatedTransaction
            });
        })
        .catch(next);
});

export default router;
