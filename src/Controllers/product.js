const product = {};
const model = require('../Models/product');
const response = require('../Helpers/response');
const cloudUpload = require("../Helpers/cloudUpload")
const {redisdb} = require('../Configs/redis')
const logger = require("../../utils/logger")


product.getAll = async (req, res) => {
    try {
      const result = await model.getAll();
      const saveRedis = JSON.stringify(result)
      redisdb.setex("product", 60, saveRedis)
      console.log("from postgreSQL")
      logger.info("Get all Product by postgreSQL Success")
      return response(res, 200, result);
    } catch (error) {
      logger.error("Get all Product Failed")
      return response(res, 500, error);
    };
  };

product.get = async (req, res) => {
      const { search } = req.query;
      const { orderBy, sort } = req.query;
      let result;
    try {
      if (search) {
        result = await model.getSearch(search);
      } else if (orderBy) {
        result = await model.getSort(orderBy, sort);
      } else {
      result = await model.get(req.params.id);
      }
      logger.info("Get Product by id Success")
      return response(res, 200, result);
    } catch (error) {
      logger.error("Get Product by id Failed")
      return response(res, 500, error);
    };
  };


product.getSort = async (req, res) => {
    try {
      const result = await model.getSort(req.query.orderBy, req.query.sort)
      logger.info("Sort Product Success")
      return response(res, 200, result)
    } catch (error) {
      logger.error("Sort Product Failed")
      return response(res, 500, error)
    }
}

product.getSearch = async (req, res) => {
  try {
    const result = await model.getSearch(req.query)
    logger.info("Search Product Success")
    return response(res, 200, result)
  } catch (error) {
    logger.error("Search Product Failed")
    return response(res, 500, error)
  }
}

product.add = async (req, res) => {
    try {
      if (req.file === undefined) {
        return response(res, 500, {msg: "Image harus diisi"})
      }
        const image_url = await cloudUpload(req.file.path)
        const result = await model.add(req.body, image_url);
        redisdb.del("product")
        logger.info("Add Product Success")
        return response(res, 201, result);
    } catch (error){
      logger.error("Add Product Failed")
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
        logger.info("Update Product Success")
        return response(res, 200, result);
    } catch (error){
      logger.error("Update Product Failed")
        return response(res, 400, error);
    };
};

product.del = async (req, res) => {
   try {
       const result = await model.del(req.params.id);
       logger.info("Delete Product by id Success")
        return response(res, 200, result);
   }catch (error) {
        logger.error("Delete Product by id Failed")
        return response(res, 400, error);
   };
};


 
module.exports = product;