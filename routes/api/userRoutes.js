// Referencing code from Module 18 Activities

const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// /api/users/
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .update(updateUser)
    .delete(deleteUser)

// /api/users/userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

// BONUS: cascade stule delete in Mongoose: https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose

module.exports = router;
