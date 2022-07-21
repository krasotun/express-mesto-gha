const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ id: userId }, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию на сервере' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ id: userId }, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию на сервере' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const createUser = (req, res) => {
  const {
    email, name, about, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию на сервере' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};
const getUserById = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((data) => {
      if (!data) {
        console.log('No data found');
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('Before', error);
      if (error.name === 'CastError') {
        throw new BadRequestError('Неверно указан id');
      }
      console.log('after', error);
    })
    .catch(next);
};

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({ message: 'Пользователи  не созданы' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

module.exports = {
  createUser, getUserById, getUsers, updateUserInfo, updateUserAvatar, login, getCurrentUser,
};
