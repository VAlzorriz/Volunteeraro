'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.servicesGET = function servicesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var day = req.swagger.params['day'].value;
  var age = req.swagger.params['age'].value;
  var category = req.swagger.params['category'].value;
  Service.servicesGET(limit,offset,day,age,category)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesServiceIdGET = function servicesServiceIdGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.servicesServiceIdGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesServiceIdVolunteersGET = function servicesServiceIdVolunteersGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.servicesServiceIdVolunteersGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesServiceIdEventsGET = function servicesServiceIdEventsGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.servicesServiceIdEventsGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
