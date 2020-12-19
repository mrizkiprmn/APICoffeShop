const model = require('../Models/users');
const response = require('../Helpers/response');
const hashPassword = require('../Helpers/hash');
const users = {};

users.getAll = async (req, res) => {
    try{
        const result = await model.getAll();
        return response(res, 200, result);
    } catch (error){
        return response(res, 500, error);

    };
  
};

users.add = async (req, res) => {
    try {
        const checkUser = await model.getByUserName(req.body.username)
        const checkEmail = await model.getByEmail(req.body.email)

        if(checkUser.length > 0) {
            return response(res, 401, {msg: "username has been registered"})
        }

        if(checkEmail.length > 0) {
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
        return response(res, 201, data);
    } catch (error){
        console.log(error)
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
        return response(res, 200, data);
    } catch (error){
        return response(res, 400, error);
    };
};

users.del = async (req, res) => {
    try {
        const result = await model.del(req.params.id);
         return response(res, 200, result);
    } catch (error) {
         return response(res, 400, error);
    };
 };

module.exports = users;