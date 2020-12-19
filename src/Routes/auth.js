const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/auth");



routes.post("/", ctrl.login);
// routes.put("/", ctrl.update);
// routes.delete("/:id", ctrl.del);

module.exports = routes;