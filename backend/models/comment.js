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
        foreignKey: {
          name: 'userId',
          allowNull: false }
      });
      models.User.hasMany(models.Comment)
      models.Comment.belongsTo(models.Product, {
        onDelete: 'cascade',
        foreignKey: {
          name: 'productId',
          allowNull: false}
          
      })
    }
  }
  Comment.init({
    username: {
      type: DataTypes.STRING,
      references : {
        model : 'User',
        key : 'firstName'
      }
    },
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};