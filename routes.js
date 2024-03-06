const express = require("express");
const route = express.Router();

module.exports = route;

require("./controller/auth")
require("./controller/user");
require("./controller/checklist")
require("./controller/checklistItem")