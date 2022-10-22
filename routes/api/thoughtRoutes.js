const router = require('express').Router();
const { 
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionController')

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:userId
router.route('/:userId').get(getSingleThought);

// /api/thoughts/thoughtId
router.route('/:thoughtId').put(updateThought).delete(deleteThought);

// /api/thoughts/thoughtId/reactions/
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;