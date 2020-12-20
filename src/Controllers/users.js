const model = require('../Models/users');
const response = require('../Helpers/response');
const hashPassword = require('../Helpers/hash');
const logger = require('../../utils/logger');

const users = {};

users.getAll = async (req, res) => {
    try{
        const result = await model.getAll();
        logger.info("Get all Users Success")
        return response(res, 200, result);
    } catch (error){
        logger.error("error")
        return response(res, 500, error);

    };
  
};

users.add = async (req, res) => {
    try {
        const checkUser = await model.getByUserName(req.body.username)
        const checkEmail = await model.getByEmail(req.body.email)

        if(checkUser.length > 0) {
            logger.error("Username has been registered")
            return response(res, 401, {msg: "username has been registered"})
        }

        if(checkEmail.length > 0) {
            logger.error("Email has been registered")
            return response(res, 401, {msg: "email has been registered"})
        }

        const newPassword = await hashPassword(req.body.password)
        const users = {
            username: req.body.username,
            email: req.body.email,
            password: newPassword,
            role: req.body.role,
        }

        const data = await model.add(users);

        logger.info("Add Users Success")
        return response(res, 201, data);
    } catch (error){
        logger.error("Add Users Failed")
        return response(res, 500, error);
    };

};

users.update = async (req, res) => {
    try {
        const newPassword = await hashPassword(req.body.password)
        const users = {
            id: req.body.id,
            username: req.body.username,
            email: req.body.email,
            password: newPassword,
        }

        const data = await model.update(users);
        logger.info("Update Users Success")
        return response(res, 200, data);
    } catch (error){
        logger.error("Update Users Failed")
        return response(res, 400, error);
    };
};

users.del = async (req, res) => {
    try {
        const result = await model.del(req.params.id);
        logger.info("Delete id Users Success")
         return response(res, 200, result);
    } catch (error) {
        logger.error("Delete id Users Failed")
         return response(res, 400, error);
    };
 };

module.exports = users;