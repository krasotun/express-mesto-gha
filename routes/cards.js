const cardsRouter = require('express').Router();
const { postCard, findCards } = require('../controllers/cards');

cardsRouter.post('/cards', postCard);
cardsRouter.get('/cards', findCards);

module.exports = cardsRouter;
