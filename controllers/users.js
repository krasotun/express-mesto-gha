const User = require('../models/user');

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
const getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Пользователь с указанным id:${userId} не найден` });
        return;
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: `Неверно указан id:${userId}  ` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

module.exports = {
  createUser, getUserById, getUsers, updateUserInfo, updateUserAvatar,
};
