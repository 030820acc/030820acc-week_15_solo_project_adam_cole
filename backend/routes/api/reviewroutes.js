const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

//api/reviews/
router.get('/', asyncHandler( async (req, res) => {
    const reviews = await db.Review.findAll()
    return res.json(reviews);
}));

router.post('/new', asyncHandler(async (req, res) => {
    // console.log(req)
    const {title, content, spotId, userId} = req.body;
    // console.log("this is data", data)
    const newreview = await db.Review.create({title, content, spotId, userId});
    return res.json(newreview);
}))

//api/reviews/:id/delete
router.post('/:id/delete', asyncHandler( async (req, res) => {
    const {id} = req.params
    const response = await db.Review.destroy({where: {
        id
    }
    })
    return res.json(response)
}))

///api/reviews/${data.review.id}
router.put('/:id', asyncHandler(async (req, res) => {
   console.log(req)
   
   const { id } = req.body.review
   const {title, content, userId, spotId} = req.body;
    const review = await db.Review.findByPk(id)
   const response = await review.update(
    {title, content}
    )

    return res.json(response);
//    const spot = await db.Spot.findByPk(id)
//    const response = await spot.update()
    // const {payload} = req.body
    // console.log(payload)
    // const response = await spot.destroy

    // return res.json(response)
}))

module.exports = router;