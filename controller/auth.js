const route = require("../routes");
const { sequelize } = require("../models/index");
const DataTypes = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.post("/login", async (req, res) => {
  const checkUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!checkUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const compare = await bcrypt.compare(req.body.password, checkUser.password);
  if (!compare) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const payload = {
    username: req.body.username,
  };

  res.status(200).json({
    message: "Success",
    token: jwt.sign(payload, "secret key", { expiresIn: "24h" }),
    type: "Bearer",
  });
});

route.post("/register", async (req, res) => {
  const checkUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (checkUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  const data = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  const payload = {
    username: data.username,
  };

  res.status(200).json({
    message: "Success",
    token: jwt.sign(payload, "secret key", { expiresIn: "24h" }),
    type: "Bearer",
  });
});
