const router = require('express').Router();
const { 
    getAllThoughts,
    getSingleThought,
    createThought,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getAllThoughts).post(createThought);

// /api/users/:userId
router.route('/:userId').get(getSingleThought);

module.exports = router;