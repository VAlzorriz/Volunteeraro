'use strict';

var utils = require('../utils/writer.js');
var Manager = require('../service/ManagerService');

module.exports.managersGET = function managersGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var surename = req.swagger.params['surename'].value;
  Manager.managersGET(limit,offset,surename)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.managersManagerIdEventsGET = function managersManagerIdEventsGET (req, res, next) {
  var managerId = req.swagger.params['managerId'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Manager.managersManagerIdEventsGET(managerId,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.managersManagerIdGET = function managersManagerIdGET (req, res, next) {
  var managerId = req.swagger.params['managerId'].value;
  Manager.managersManagerIdGET(managerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
