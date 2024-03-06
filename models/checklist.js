"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class checklist extends Model {
    static associate(models) {}
  }
  checklist.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "checklist",
    }
  );
  return checklist;
};
