const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('./db/models');


router.get('/spot/:spot', asyncHandler( async (req, res) => {
    const {spot} = req.params;
    const state = await db.Spot.findAll({
        where: {
          name: {
            [Op.iLike]: `%${spot}%`,
          }}
        })
    return res.json(state);
}));

module.exports = router;