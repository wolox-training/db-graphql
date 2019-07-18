const { gql } = require('apollo-server');

const getAlbum = id => gql`
  query {
    album(id: ${id}) {
      id
      title
      artist
      photos {
        id, title
      }
    }
  }
`;
const getAlbums = params => {
  const { offset, limit, orderBy, filter } = params;
  return gql`
  query {
    albums(
      offset: ${offset ? offset : 0}, 
      limit: ${limit ? limit : 0}, 
      orderBy: "${orderBy ? orderBy : ''}",
      filter: "${filter ? filter : ''}") {
      id
      title
      artist
      photos {
        id, title
      }
    }
  }
`;
};

module.exports = { getAlbum, getAlbums };
