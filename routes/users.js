const usersRouter = require('express').Router();
const {
  createUser, getUsers, getUserById, updateUserInfo, updateUserAvatar, login,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUser);
usersRouter.post('/signin', login);
usersRouter.get('/users/:id', getUserById);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
