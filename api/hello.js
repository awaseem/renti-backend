import express from "express";

let router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "hello world" });
});

export default router;
