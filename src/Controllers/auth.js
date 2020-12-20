const bcr = require('bcrypt')
const model = require('../Models/users')
const response = require('../Helpers/response');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');

class Auth {
    login = async (req, res) =>{
        try {
        const passDBUserName = await model.getByUserName(req.body.username)
        const passDBEmail = await model.getByEmail(req.body.email)
        const passUser = req.body.password
            
        if(passDBUserName.length <= 0) {
            logger.info("username not registered")
            return response(res, 400, {msg: "username not registered"})
        } else if (passDBEmail.length <= 0) {
            logger.info("email not registered")
            return response(res, 400, {msg: "email not registered"})
        }
        
        const check = await bcr.compare(passUser, passDBUserName[0].password)

        if (check) { 
            const result = await this.setToken(req.body.email, passDBUserName[0].role)
            logger.info("login success")
            return response (res, 200, result)
        } else {
            logger.warn("check password")
            return response (res, 400, {msg: "Check Password"})
        }

        } catch (error) {
            logger.warn(error)
            return response (res, 500, error)

        }
    }
    setToken = async (email, role) => {
        try {

            const payload = {
                email : email,
                role : role,
            }

            const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn : "1d" })

            const result = {
                msg : "Token created",
                token : token
            }
            logger.info("set token succes")
            return result

        } catch (error) {
            throw error
        }
    }
}

module.exports = new Auth()