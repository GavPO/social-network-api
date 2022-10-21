const router = require('express').Router();
const { 
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getAllThoughts).post(createThought);

// /api/users/:userId
router.route('/:userId').get(getSingleThought);

// /api/users/thoughtId
router.route('/:thoughtId').put(updateThought).delete(deleteThought);

module.exports = router;