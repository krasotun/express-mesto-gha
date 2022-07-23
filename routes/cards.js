const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  postCard, findCards, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', findCards);
cardsRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required()
        .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
    }),
  }),
  postCard,
);
cardsRouter.delete(
  '/cards/:id',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  deleteCard,
);
cardsRouter.put(
  '/cards/:id/likes',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  addLike,
);

cardsRouter.delete(
  '/cards/:id/likes',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  removeLike,
);

module.exports = cardsRouter;
