const express = require("express");
const routes = express.Router();
const product = require("./Routes/product");
const category = require("./Routes/category");
const history = require("./Routes/history");
const users = require("./Routes/users");
const auth = require("./Routes/auth")
const { cloudinaryConfig } = require("./Configs/cloudInary")
const logger = require("../utils/logger")

routes.use("*", cloudinaryConfig)
routes.use("/product", product);
routes.use("/category", category);
routes.use("/history", history);
routes.use("/users", users);
routes.use("/auth", auth);

routes.use("*", (req, res)=> {
    logger.error("Check URL")
    res.send("DATA NOT FOUND")  
})

module.exports = routes;

