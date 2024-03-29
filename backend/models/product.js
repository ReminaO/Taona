'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Comment),
      models.Product.hasMany(models.Comment, {
        foreignKey: {
          name: 'productId',
          allowNull: false,
        }
      }),
      models.Product.hasMany(models.Like),
      models.Product.belongsTo(models.User, {
        onDelete: 'cascade',
        hooks: true,
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    img: DataTypes.STRING,
    thumbImg1: DataTypes.STRING,
    thumbImg2: DataTypes.STRING,
    thumbImg3: DataTypes.STRING,
    thumbVideo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};