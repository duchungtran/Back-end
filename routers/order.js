const expess = require("express");
const router = expess.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
        var result = await Model.find.exec();
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});