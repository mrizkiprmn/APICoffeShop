const response = require('../Helpers/response')
const jwt = require('jsonwebtoken')
const logger = require('../../utils/logger')
const { error } = require('winston')

const checkToken = (roles) => {
    return function (req, res, next)  {
        const { authtoken } = req.headers
        let isAccess = false;

    if (!authtoken) {
        const result = {
            msg : "Login first"
        }
        logger.error("Login First")
        return response(res, 401, result)
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode)=> {
        if(err) {
            logger.error("Check token")
            return response(res, 401, {msg : "Check Token!"})
        }
        roles.map((role) => {
            console.log(decode.role)
            if(role == decode.role) {
                isAccess = true
            }
        })
            if(isAccess) {
                next()
            } else {
                logger.error("You not premitted")
                return response(res, 401, {msg: "you not premitted"})
            }
       })
    }
}

module.exports = checkToken