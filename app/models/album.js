'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      artist: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, field: 'user_id', primaryKey: true, allowNull: false }
    },
    {
      tableName: 'albums',
      underscored: true
    }
  );

  Album.associate = models => {
    Album.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Album;
};
