const product = {};
const model = require('../Models/product');
const response = require('../Helpers/response');
const cloudUpload = require("../Helpers/cloudUpload")
const {redisdb} = require('../Configs/redis')


product.getAll = async (req, res) => {
    const { search } = req.query;
    const { orderBy, sort } = req.query;
    let result;
    try {
      if (search) {
        result = await model.getSearch(search);
      } else if (orderBy) {
        result = await model.getSort(orderBy, sort);
      } else {
        result = await model.getAll();
        const saveRedis = JSON.stringify(result)
        redisdb.setex("product", 60, saveRedis)
        console.log("dari postgreSQL")
      };
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    };
  };

product.get = async (req, res) => {
    try {
      const result = await model.get(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    };
  };


product.add = async (req, res) => {
    try {
      if (req.file === undefined) {
        return response(res, 500, {msg: "Image harus diisi"})
      }
        const image_url = await cloudUpload(req.file.path)
        const result = await model.add(req.body, image_url);
        redisdb.del("product")
        return response(res, 201, result);
    } catch (error){
        return response(res, 400, error);
    };
    
};

product.update = async (req, res) => {
    try {
      if (req.file === undefined) {
        return response(res, 500, {msg: "Image harus diisi"})
      }
        const image_url = await cloudUpload(req.file.path)
        const result = await model.update(req.body, image_url);
        redisdb.del("product")
        return response(res, 200, result);
    } catch (error){
        return response(res, 400, error);
    };
};

product.del = async (req, res) => {
   try {
       const result = await model.del(req.params.id);
        return response(res, 200, result);
   }catch (error) {
        return response(res, 400, error);
   };
};


 
module.exports = product;