const usersFactory = require('./factories/user');
const { mutate } = require('../server.spec');
const { createUser, logIn } = require('../users/graphql');

exports.createUserAndLogIn = () =>
  usersFactory
    .attributes()
    .then(user =>
      mutate(createUser(user)).then(() => mutate(logIn({ email: user.email, password: user.password })))
    );

exports.createUser = () => usersFactory.attributes().then(user => mutate(createUser(user)));
