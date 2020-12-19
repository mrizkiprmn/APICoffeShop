const categories = {};
const model = require('../Models/category');
const response = require('../Helpers/response');

categories.get = async (req, res) => {
    try{
        const result = await model.get();
        return response(res, 200, result);
    }catch (error){
        return response(res, 500, error);

    };
  
};

categories.add = async (req, res) => {
    try {
        const result = await model.add(req.body);
        return response(res, 201, result);
    } catch (error){
        return response(res, 500, error);
    };
    
};

categories.update = async (req, res) => {
    try {
        const result = await model.update(req.body);
        return response(res, 200, result);
    } catch (error){
        return response(res, 400, error);
    }
};

categories.del = async (req, res) => {
   try {
       const result = await model.del(req.params.id);
        return response(res, 200, result);
   }catch (error) {
        return response(res, 400, error);
   }
}

module.exports = categories;