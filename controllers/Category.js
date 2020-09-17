'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.categoriesCategoryIdGET = function categoriesCategoryIdGET (req, res, next) {
  var categoryId = req.swagger.params['categoryId'].value;
  Category.categoriesCategoryIdGET(categoryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.categoriesCategoryIdServicesGET = function categoriesCategoryIdServicesGET (req, res, next) {
  var categoryId = req.swagger.params['categoryId'].value;
  Category.categoriesCategoryIdServicesGET(categoryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.categoriesGET = function categoriesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var name = req.swagger.params['name'].value;
  Category.categoriesGET(limit,offset,name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
