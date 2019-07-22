const nock = require('nock');

const { query } = require('../server.spec');
const { getAlbum, getAlbums } = require('./graphql');
const albumMocks = require('../utils/mocks/albums');
const albumsFactory = require('../utils/factories/albums');

describe('albums', () => {
  describe('queries', () => {
    it('should retrieve an album', () => {
      const id = 1;
      albumMocks.mockGetAlbumOK(id, albumsFactory.responseAlbumOK);
      albumMocks.mockGetPhotosOK(id);
      return query(getAlbum(id)).then(response => {
        expect(response.data).toHaveProperty('album', expect.any(Object));
        const { album } = response.data;
        expect(album.title).toEqual(albumsFactory.responseAlbumOK.title);
        expect(album.artist).toEqual(albumsFactory.responseAlbumOK.userId.toString());
        expect(album).toHaveProperty('photos', expect.any(Array));
      });
    });

    it('should fail to get album due to api error', () => {
      const id = 1;
      albumMocks.mockGetAlbumsApiError(id);
      return query(getAlbum(id)).then(response => {
        expect(response).toHaveProperty('errors', expect.any(Array));
        expect(response.errors[0]).toHaveProperty('message', 'Error: Connection refused, request time out');
      });
    });

    it('should get the list of albums', () => {
      nock.cleanAll();
      albumMocks.mockGetAlbumsOK();
      albumMocks.mockGetPhotos5Times();
      return query(getAlbums({})).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
        const { albums } = response.data;
        expect(albums.length).toBe(5);
      });
    });

    it('should get the list of albums: paginated and sorted', () => {
      nock.cleanAll();
      albumMocks.mockGetAlbumsOK();
      albumMocks.mockGetPhotos2Times();
      return query(getAlbums({ offset: 2, limit: 2, orderBy: 'TITLE' })).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
        const { albums } = response.data;
        expect(albums.length).toBe(2);
        expect(albums[0].title < albums[1].title).toEqual(true);
      });
    });

    it('should get the list of albums: filtered', () => {
      nock.cleanAll();
      albumMocks.mockGetAlbumsOK();
      albumMocks.mockGetPhotosOK(3);
      return query(getAlbums({ filter: 'laborum' })).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
        const { albums } = response.data;
        expect(albums[0]).toHaveProperty('title', expect.stringContaining('laborum'));
      });
    });
  });
});
