const { createUser, logIn } = require('./graphql');
const { mutate } = require('../server.spec');
const userFactory = require('../utils/factories/user');
const { User } = require('../../app/models');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(response => {
          const { id, name, email, password } = response.data.createUser;
          expect(id).toBeDefined();
          expect(name).toEqual(`${user.name} ${user.lastName}`);
          expect(email).toEqual(user.email);
          expect(password).toBeDefined();
        })
      ));

    it('should fail to create an user, due to user already exists', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(() =>
          mutate(createUser(user)).then(response => {
            expect(response).toHaveProperty('errors', expect.any(Array));
            expect(response.errors[0].message).toEqual('The provided email is already in use.');
          })
        )
      ));

    it('should fail to create an user, due to wrong input fields', () =>
      userFactory
        .attributes({ email: 'test_joe@notvalid.com', password: '1234x' })
        .then(user => mutate(createUser(user)))
        .then(response => {
          expect(response).toHaveProperty('errors', expect.any(Array));
          expect(response.errors[0].message).toEqual('Invalid input values');
        }));

    it('should fail to create an user, due to database failure', () => {
      const userCreateMock = jest.spyOn(User, 'create');
      userCreateMock.mockImplementation(() => {
        throw Error('PostgreSQL could not connect to server: Connection refused');
      });
      return userFactory
        .attributes()
        .then(user => mutate(createUser(user)))
        .then(response => {
          expect(response).toHaveProperty('errors', expect.any(Array));
          expect(response.errors[0].message).toEqual(
            'PostgreSQL could not connect to server: Connection refused'
          );
          return userCreateMock.mockRestore();
        });
    });

    it('should successfully authenticate the user', () =>
      userFactory
        .attributes()
        .then(user =>
          mutate(createUser(user)).then(() => mutate(logIn({ email: user.email, password: user.password })))
        )
        .then(response => {
          expect(response.data.logIn).toHaveProperty('accessToken', expect.any(String));
          expect(response.data.logIn).toHaveProperty('expiresIn', expect.any(Number));
        }));

    it('should fail to athenticate due to wrong email', () =>
      userFactory
        .attributes()
        .then(user =>
          mutate(createUser(user)).then(() =>
            mutate(logIn({ email: 'wrong@email.com', password: user.password }))
          )
        )
        .then(response => {
          expect(response).toHaveProperty('errors', expect.any(Array));
          expect(response.errors[0].message).toEqual('The email or password provided is incorrect');
        }));

    it('should fail to athenticate due to wrong password', () =>
      userFactory
        .attributes()
        .then(user =>
          mutate(createUser(user)).then(() =>
            mutate(logIn({ email: user.email, password: 'wrong_password' }))
          )
        )
        .then(response => {
          expect(response).toHaveProperty('errors', expect.any(Array));
          expect(response.errors[0].message).toEqual('The email or password provided is incorrect');
        }));
  });
});
