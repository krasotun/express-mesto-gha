const errorRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

errorRouter.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
module.exports = errorRouter;
