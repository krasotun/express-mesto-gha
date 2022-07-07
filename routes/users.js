const usersRouter = require('express').Router();
const { createUser, getUsers, getUserById } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', getUserById);
module.exports = usersRouter;
