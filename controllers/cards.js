const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');
const Card = require('../models/card');

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию на сервере');
      }
      next(error);
    })
    .catch(next);
};
const deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  const id = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`);
      }
      if (card.owner.toString() !== id) {
        throw new AccessError('Недостаточно прав для удаления карточки');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch(next);
      }
    })
    .catch(next);
};

const findCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new NotFoundError('Карточки не созданы');
      }
      next(error);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Карточка не найдена');
      }
      next(error);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError('Карточка не найдена');
      }
      next(error);
    })
    .catch(next);
};

module.exports = {
  postCard, findCards, deleteCard, addLike, removeLike,
};
