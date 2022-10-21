const router = require('express').Router();
const friendRoutes = require('./friendRoutes');
const { 
    getAllUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

router.use('/:userId/friends', friendRoutes)

module.exports = router;