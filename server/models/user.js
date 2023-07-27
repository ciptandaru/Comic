'use strict';
const {hashPassword} = require('../helpers/bcrypt.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Favorite, {foreignKey: 'UserId'})
      // define association here
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is Already!'
      },
      validate: {
        isEmail: {
          msg: 'Invalid format Email!'
        },
        notNull: {
          msg: 'Email cannot be empty!'
        }, 
        notEmpty: {
          msg: 'Email cannot be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty!'
        }, 
        notEmpty: {
          msg: 'Password cannot be empty!'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};