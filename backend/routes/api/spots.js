const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

//api/spots/
router.get('/', asyncHandler( async (req, res) => {
    const spots = await db.Spot.findAll()
    return res.json(spots);
}));

router.post('/new', asyncHandler(async (req, res) => {
    // console.log(req)
    const {name, photoUrl, description, userId} = req.body;
    // console.log("this is data", data)
    const newspot = await db.Spot.create({name, photoUrl, description, userId});
    return newspot;
}))

//api/spots/:id/delete
router.post('/:id/delete', asyncHandler( async (req, res) => {
    const {id} = req.params
    const response = await db.Spot.destroy({where: {
        id
    }
    })
    return res.json(response)
}))

///api/spots/${data.spot.id}
router.put('/:id', asyncHandler(async (req, res) => {
   console.log(req)
   
   const { id } = req.body.spot
   const {name, photoUrl, description, userId} = req.body;
    const spot = await db.Spot.findByPk(id)
   const response = await spot.update(
    {name, photoUrl, description}
    )

    return response;
//    const spot = await db.Spot.findByPk(id)
//    const response = await spot.update()
    // const {payload} = req.body
    // console.log(payload)
    // const response = await spot.destroy

    // return res.json(response)
}))

module.exports = router;