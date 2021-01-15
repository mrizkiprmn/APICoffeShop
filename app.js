require("dotenv/config");
const express = require("express");
const logger = require("./utils/logger")
const cors = require('cors');
const server = express();
const routes = require('./src/main');
const db = require('./src/Configs/db');
const bodyPars = require("body-parser");
const morgan = require("morgan");
const redis = require("./src/Configs/redis")



server.use(bodyPars.urlencoded({extended: false}));
server.use(cors());
server.use(bodyPars.json());
server.use(morgan("dev"));
server.use('/api',routes)
// server.use(routes)


db.connect()
    .then((res) => {
        logger.info("Database Connected");
})
    .catch((err)=> {
        logger.error("Database not Connected");
})


redis
    .redisCheck()
    .then((res)=>{
        logger.info(res)
    })
    .catch((err)=>{
        logger.error(err)
    })


server.listen(8888, () => {
    logger.info("Server running on port 8888");
});

