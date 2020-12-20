const model = require('../Models/users');
const response = require('../Helpers/response');
const hashPassword = require('../Helpers/hash');
const logger = require('../../Utils/logger');

const users = {};

users.getAll = async (req, res) => {
    try{
        const result = await model.getAll();
        logger.info("get all users success")
        return response(res, 200, result);
    } catch (error){
        logger.warn("error")
        return response(res, 500, error);

    };
  
};

users.add = async (req, res) => {
    try {
        const checkUser = await model.getByUserName(req.body.username)
        const checkEmail = await model.getByEmail(req.body.email)

        if(checkUser.length > 0) {
            logger.warn("username has been registered")
            return response(res, 401, {msg: "username has been registered"})
        }

        if(checkEmail.length > 0) {
            logger.warn("email has been registered")
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

        logger.info("add users success")
        return response(res, 201, data);
    } catch (error){
        logger.warn("add users failed", error)
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
        logger.info("update users success")
        return response(res, 200, data);
    } catch (error){
        logger.warn("update users failed", error)
        return response(res, 400, error);
    };
};

users.del = async (req, res) => {
    try {
        const result = await model.del(req.params.id);
        logger.info("delete id users success")
         return response(res, 200, result);
    } catch (error) {
        logger.warn("delete id users failed", error)
         return response(res, 400, error);
    };
 };

module.exports = users;