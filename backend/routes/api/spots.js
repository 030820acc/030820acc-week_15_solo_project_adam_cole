const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

//api/spots/
router.get('/', asyncHandler( async (req, res) => {
    const spots = await db.Spot.findAll()
    return res.json(spots);
}));

//api/spots/:id/delete
router.post('/:id/delete', asyncHandler( async (req, res) => {
    const {id} = req.params
    const response = await db.Spot.destroy({where: {
        id
    }
    })
    return res.json(response)
}))

//api/spots/${id}/edit
router.put('/:id/edit', asyncHandler(async (req, res) => {
    const {id} = req.params
    const {payload} = req.body
    console.log(payload)
    const spot = await db.Spot.findByPk(id)
    const response = await spot.update(payload)

    return res.json(response)
}))

module.exports = router;