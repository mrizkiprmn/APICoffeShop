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
        return response(res, 401, result)
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode)=> {
        if(err) {
            logger.warn("Error", err)
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
                return response(res, 401, {msg: "you not premitted"})
            }
       })
    }
}

module.exports = checkToken

// let valid = false
// roles.map((role)=> {
//     if(user[0].role_users == role) {
//         valid = true
//     }
// })

//     if(valid) {
//         next()
//     } else {
//         return response (res, 401, "Access is not permitted", {})
//     }