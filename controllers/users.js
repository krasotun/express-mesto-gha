const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка сервера ${error}` });
    });
};

const getUsers = (req, res) => {
  res.send(`<html>
        <body>
            <p>Get-users works</p>
        </body>
        </html>`);
};

module.exports = {
  createUser, getUsers,
};
