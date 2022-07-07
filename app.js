const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});

app.use(express.json());
app.use('/', usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '62c5f0946261a6385a341bab',
  };
  next();
});
