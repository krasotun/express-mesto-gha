const cardsRouter = require('express').Router();
const { postCard, findCards, deleteCard } = require('../controllers/cards');

cardsRouter.post('/cards', postCard);
cardsRouter.get('/cards', findCards);
cardsRouter.delete('/cards/:id', deleteCard);

module.exports = cardsRouter;
