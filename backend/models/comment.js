'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        onDelete: 'cascade',
        hooks: true,
        foreignKey: {
          name: 'userId',
          allowNull: false }
      });
      models.Comment.belongsTo(models.Product, {
        onDelete: 'cascade',
        hooks: true,
        foreignKey: {
          name: 'productId',
          allowNull: false}
          
      })
    }
  }
  Comment.init({
    userName: {
      type: DataTypes.STRING,
      references : {
        model : 'User',
        key : 'firstName'
      }
    },
    content: DataTypes.STRING,
    one: DataTypes.BOOLEAN,
    two: DataTypes.BOOLEAN,
    three: DataTypes.BOOLEAN,
    four: DataTypes.BOOLEAN,
    five: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};