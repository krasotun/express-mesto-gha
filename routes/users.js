const usersRouter = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUser);

module.exports = usersRouter;
