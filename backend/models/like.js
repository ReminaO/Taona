'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      models.Like.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      models.User.belongsToMany(models.Product, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'productId',
      });
      models.Product.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'productId',
        otherKey: 'userId',
      });
    }
  }
  Like.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};