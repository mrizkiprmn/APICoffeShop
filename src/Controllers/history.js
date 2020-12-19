const history = {};
const model = require('../Models/history');
const response = require('../Helpers/response');

history.get = async (req, res) => {
    try{
      const result = await model.get();
      return response(res, 200, result);
    }catch (error) {
      return response(res, 500, error);
    };
  };

  history.add = async (req, res) => {
    try {
        const result = await model.add(req.body);
        return response(res, 201, result);
    } catch (error){
        return response(res, 400, error);
    };
    
};

history.update = async (req, res) => {
    try {
        const result = await model.update(req.body);
        return response(res, 200, result);
    } catch (error){
        return response(res, 400, error);
    };
};

history.del = async (req, res) => {
   try {
       const result = await model.del(req.params.id);
        return response(res, 200, result);
   }catch (error) {
        return response(res, 400, error);
   };
};


module.exports = history;