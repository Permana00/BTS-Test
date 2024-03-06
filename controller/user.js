const route = require("../routes");
const sequelize = require("../models/index").sequelize;
const DataTypes = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

route.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findAll();

    res.json({ message: "Success", data: user });
  } catch (err) {
    console.log(err);
  }
});
