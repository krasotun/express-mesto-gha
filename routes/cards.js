const cardsRouter = require('express').Router();
const { postCard } = require('../controllers/cards');

cardsRouter.post('/cards', postCard);
module.exports = cardsRouter;
