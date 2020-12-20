const product = {};
const model = require('../Models/product');
const response = require('../Helpers/response');
const cloudUpload = require("../Helpers/cloudUpload")
const {redisdb} = require('../Configs/redis')
const logger = require("../../utils/logger")


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
        console.log("from postgreSQL")
      };
      logger.info("get all product by postgreSQL success")
      return response(res, 200, result);
    } catch (error) {
      logger.warn("get all product failed")
      return response(res, 500, error);
    };
  };

product.get = async (req, res) => {
    try {
      const result = await model.get(req.params.id);
      logger.info("get product with id success")
      return response(res, 200, result);
    } catch (error) {
      logger.warn("get product with id failed")
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
        logger.info("add product success")
        return response(res, 201, result);
    } catch (error){
      logger.warn("add product failed")
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
        logger.info("update product success")
        return response(res, 200, result);
    } catch (error){
      logger.info("update product failed")
        return response(res, 400, error);
    };
};

product.del = async (req, res) => {
   try {
       const result = await model.del(req.params.id);
       logger.info("delete product with id success")
        return response(res, 200, result);
   }catch (error) {
        logger.warn("delete product with id failed")
        return response(res, 400, error);
   };
};


 
module.exports = product;