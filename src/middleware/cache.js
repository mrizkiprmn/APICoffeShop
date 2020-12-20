const response = require("../Helpers/response")
const redis = require("../Configs/redis")
const respon = require("../Helpers/response")
const {redisdb} = require("../Configs/redis")
const logger = require("../../utils/logger")

const getAll = (req, res, next) => {

    redisdb.get("product", (err, data)=>{
        if(err) {
            logger.info("get all product by redis success")
            return respon(res, 500, err)
        }

        if(data !== null) {
            const result = JSON.parse(data)
            console.log("from redis")
            logger.info("get all product by redis success")
            return respon(res, 200, result)
            
        } else {
            next()
        }
    })
}

module.exports = getAll