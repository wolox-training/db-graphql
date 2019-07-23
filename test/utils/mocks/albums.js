const nock = require('nock');

const configAlbumsApi = require('../../../config').common.albumsApi;
const albumsFactory = require('../factories/albums');

exports.mockGetAlbumOK = (albumId, responseAlbum = albumsFactory.responseAlbumOK) => {
  nock(configAlbumsApi.endpoint)
    .get(`${configAlbumsApi.routes.albums}/${albumId}`)
    .reply(200, responseAlbum);
};

exports.mockGetAlbumsOK = (responseAlbums = albumsFactory.albumsArray) => {
  nock(configAlbumsApi.endpoint)
    .get(`${configAlbumsApi.routes.albums}`)
    .reply(200, responseAlbums);
};

exports.mockGetAlbumNotFound = albumId => {
  nock(configAlbumsApi.endpoint)
    .get(`${configAlbumsApi.routes.albums}/${albumId}`)
    .reply(404, '404 - {}');
};

exports.mockGetPhotosOK = (albumId, responsePhotos = albumsFactory.photosArray) => {
  nock(configAlbumsApi.endpoint)
    .get(`${configAlbumsApi.routes.photos}`)
    .query({ albumId })
    .reply(200, responsePhotos);
};

exports.mockGetAlbumsApiError = albumId => {
  nock(configAlbumsApi.endpoint)
    .get(`${configAlbumsApi.routes.albums}/${albumId}`)
    .replyWithError('Connection refused, request time out');
};

exports.mockGetPhotos5Times = () => {
  exports.mockGetPhotosOK(1);
  exports.mockGetPhotosOK(2);
  exports.mockGetPhotosOK(3);
  exports.mockGetPhotosOK(4);
  exports.mockGetPhotosOK(5);
};

exports.mockGetPhotos2Times = () => {
  exports.mockGetPhotosOK(2);
  exports.mockGetPhotosOK(3);
};
