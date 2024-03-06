// di model checklistItem.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class checklistItem extends Model {
    static associate(models) {}
  }
  checklistItem.init(
    {
      itemName: DataTypes.STRING,
      checklistId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "checklistItem",
    }
  );
  return checklistItem;
};
