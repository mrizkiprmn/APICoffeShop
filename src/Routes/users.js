const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/users");
const validate = require ("../middleware/validate")

routes.get('/', validate(["admin"]), ctrl.getAll);
routes.post("/",  ctrl.add);
routes.put("/", validate(["admin"]), ctrl.update);
routes.delete("/:id", validate(["admin"]), ctrl.del);

module.exports = routes;