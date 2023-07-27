'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comic.hasMany(models.Favorite, {foreignKey: 'ComicId'})
    }
  }
  Comic.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    coverURL: DataTypes.STRING,
    genre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comic',
  });
  return Comic;
};