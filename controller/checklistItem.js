const route = require("../routes");
const sequelize = require("../models/index").sequelize;
const DataTypes = require("sequelize");
const ChecklistItem = require("../models/checklistitem")(sequelize, DataTypes);
const auth = require("../middleware/auth");

route.get("/checklist/:checklistId/item", auth, async (req, res) => {
  const { checklistId } = req.params;

  if (!checklistId) {
    return res.status(400).json({
      message: "checklistId is required",
    });
  }

  const data = await ChecklistItem.findAll({
    where: {
      checklistId: checklistId,
    },
  });

  res.status(200).json({
    message: "Success",
    data,
  });
});

route.get(
  "/checklist/:checklistId/item/:checklistItemId",
  auth,
  async (req, res) => {
    const { checklistId, checklistItemId } = req.params;

    if (!checklistId) {
      return res.status(400).json({
        message: "checklistId is required",
      });
    } else if (!checklistItemId) {
      return res.status(400).json({
        message: "checklistItemId is required",
      });
    }

    const data = await ChecklistItem.findOne({
      where: {
        id: checklistItemId,
        checklistId: checklistId,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Checklist not found!",
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  }
);

route.put(
  "/checklist/:checklistId/item/:checklistItemId",
  auth,
  async (req, res) => {
    const { checklistId, checklistItemId } = req.params;
    const { status } = req.body;

    if (!checklistId) {
      return res.status(400).json({
        message: "checklistId is required",
      });
    } else if (!checklistItemId) {
      return res.status(400).json({
        message: "checklistItemId is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "status is required",
      });
    }

    const data = await ChecklistItem.findOne({
      where: {
        id: checklistItemId,
        checklistId: checklistId,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Checklist not found!",
      });
    }

    data.status = status;
    await data.save();

    res.status(200).json({
      message: "Success",
      data,
    });
  }
);

route.put(
  "/checklist/:checklistId/item/rename/:checklistItemId",
  auth,
  async (req, res) => {
    const { checklistId, checklistItemId } = req.params;
    const { itemName } = req.body;

    if (!checklistId) {
      return res.status(400).json({
        message: "checklistId is required",
      });
    } else if (!checklistItemId) {
      return res.status(400).json({
        message: "checklistItemId is required",
      });
    }

    if (!itemName) {
      return res.status(400).json({
        message: "itemName is required",
      });
    }

    const data = await ChecklistItem.findOne({
      where: {
        id: checklistItemId,
        checklistId: checklistId,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Checklist not found!",
      });
    }

    data.itemName = itemName;
    await data.save();

    res.status(200).json({
      message: "Success",
      data,
    });
  }
);

route.post("/checklist/:checklistId/item", auth, async (req, res) => {
  const { checklistId } = req.params;

  if (!checklistId) {
    return res.status(400).json({
      message: "checklistId is required",
    });
  }

  const data = await ChecklistItem.create({
    itemName: req.body.itemName,
    checklistId: checklistId,
  });

  res.status(200).json({
    message: "Success",
    data,
  });
});

route.delete(
  "/checklist/:checklistId/item/:checklistItemId",
  auth,
  async (req, res) => {
    const { checklistId, checklistItemId } = req.params;

    if (!checklistId) {
      return res.status(400).json({
        message: "checklistId is required",
      });
    } else if (!checklistItemId) {
      return res.status(400).json({
        message: "checklistItemId is required",
      });
    }

    const data = await ChecklistItem.findOne({
      where: {
        id: checklistItemId,
        checklistId: checklistId,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Checklist not found!",
      });
    }

    await data.destroy();

    res.status(200).json({
      message: "Success",
    });
  }
);
