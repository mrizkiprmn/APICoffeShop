const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/product");
const validate = require ("../Middleware/validate")
const upload = require ("../Middleware/multer")
const cache = require("../Middleware/cache")

routes.get('/',validate(["admin", "users"]),cache,ctrl.getAll);
routes.get('/:id',validate(["admin", "users"]), ctrl.get);
routes.post("/",validate(["admin"]),upload.single("image"), ctrl.add);
routes.put("/",validate(["admin"]), upload.single("image"), ctrl.update);
routes.delete("/:id",validate(["admin"]), ctrl.del);

module.exports = routes;