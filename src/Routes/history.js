const express = require("express");

const routes = express.Router();
const ctrl = require("../Controllers/history");


routes.get('/', ctrl.get);
routes.post("/", ctrl.add);
routes.put("/", ctrl.update);
routes.delete("/:id", ctrl.del);

module.exports = routes;