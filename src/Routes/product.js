const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/product");
const validate = require ("../middleware/validate")
const upload = require ("../middleware/multer")
const cache = require("../middleware/cache")

routes.get('/'
,validate(["admin","users"])
,cache,ctrl.getAll);
routes.get('/:id'
,validate(["admin","users"]),
ctrl.get);
routes.get('/search'
,validate(["admin","users"]),
ctrl.getSearch);
routes.get('/sort'
,validate(["admin","users"]),
ctrl.getSort);
routes.post("/",validate(["admin"]),
upload.single("image"),
validate(["admin"]), 
ctrl.add);
routes.put("/", upload.single("image")
,validate(["admin"]),
 ctrl.update);
routes.delete("/:id", ctrl.del);

module.exports = routes;

// validate(["admin", "users"]),
// validate (["admin"]),