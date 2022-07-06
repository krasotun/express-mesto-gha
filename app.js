const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App works at port ${PORT}`);
});

app.use(express.json());
app.use('/', usersRouter);
