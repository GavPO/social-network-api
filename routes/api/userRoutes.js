const router = require('express').Router();
const { 
    getAllUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');
const {
    addFriend,
    deleteFriend,
} = require('../../controllers/friendController');


// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;