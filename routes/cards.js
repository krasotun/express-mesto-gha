const cardsRouter = require('express').Router();
const {
  postCard, findCards, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cardsRouter.post('/cards', postCard);
cardsRouter.get('/cards', findCards);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', addLike);
cardsRouter.delete('/cards/:id/likes', removeLike);

module.exports = cardsRouter;
