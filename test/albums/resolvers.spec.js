const { createUser } = require('../utils/common');
const albumMocks = require('../utils/mocks/albums');
const albumsFactory = require('../utils/factories/albums');
const { mutations } = require('../../app/graphql/albums/mutations');

describe('albums', () => {
  describe('resolvers', () => {
    describe('buyAlbum', () => {
      it('should successfully buy album for user', () => {
        const albumId = 1;
        albumMocks.mockGetAlbumOK(albumId, albumsFactory.responseAlbumOK);
        return createUser().then(({ data }) =>
          mutations.buyAlbum(undefined, { albumId, user: data.createUser }).then(response => {
            expect(response.id).toEqual(albumsFactory.responseAlbumOK.id);
            expect(response.artist).toEqual(albumsFactory.responseAlbumOK.userId);
            expect(response.userId).toEqual(parseInt(data.createUser.id));
          })
        );
      });

      it('should fail to add album due to user already bought it', () => {
        const albumId = 1;
        albumMocks.mockGetAlbumOK(albumId, albumsFactory.responseAlbumOK);
        albumMocks.mockGetAlbumOK(albumId, albumsFactory.responseAlbumOK);
        return createUser().then(({ data }) =>
          mutations.buyAlbum(undefined, { albumId, user: data.createUser }).then(() =>
            mutations.buyAlbum(undefined, { albumId, user: data.createUser }).catch(error => {
              expect(error.message).toEqual(
                `Failed to buy album. Error: The user has already bought album with id ${albumId}`
              );
            })
          )
        );
      });

      it('should fail to add album due album not found', () => {
        const albumId = 'abc';
        albumMocks.mockGetAlbumNotFound(albumId);
        return createUser().then(({ data }) =>
          mutations.buyAlbum(undefined, { albumId, user: data.createUser }).catch(error => {
            expect(error.message).toEqual('Failed to buy album. Error: Item not found in external api');
          })
        );
      });
    });
  });
});
