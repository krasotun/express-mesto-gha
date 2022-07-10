const Card = require('../models/card');

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
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
const deleteCard = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({ message: `Карточка с id:${cardId} не найдена` });
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const findCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      if (error.name === 'CastName') {
        res.status(404).send({ message: 'Карточки не созданы' });
      }
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const addLike = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const removeLike = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

module.exports = {
  postCard, findCards, deleteCard, addLike, removeLike,
};
