const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
