const route = require("../routes");
const sequelize = require("../models/index").sequelize;
const DataTypes = require("sequelize");
const Checklist = require("../models/checklist")(sequelize, DataTypes);
const auth = require("../middleware/auth");

route.get("/checklist", auth, async (req, res) => {
  const data = await Checklist.findAll();

  res.status(200).json({
    message: "Success",
    data,
  });
});

route.post("/checklist", auth, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const data = await Checklist.create({
    name: name,
  });

  res.status(200).json({
    message: "Success",
    data,
  });
});

route.delete("/checklist/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  const data = await Checklist.findByPk(id);

  if (!data) {
    return res.status(404).json({
      message: "Checklist not found",
    });
  }

  await data.destroy();

  res.status(200).json({ message: "Success" });
});
