'use strict';

var utils = require('../utils/writer.js');
var Volunteer = require('../service/VolunteerService');

module.exports.volunteersGET = function volunteersGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  var surename = req.swagger.params['surename'].value;
  Volunteer.volunteersGET(limit,offset,surename)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.volunteersVolunteerIdEventsGET = function volunteersVolunteerIdEventsGET (req, res, next) {
  var volunteerId = req.swagger.params['volunteerId'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Volunteer.volunteersVolunteerIdEventsGET(volunteerId,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.volunteersVolunteerIdGET = function volunteersVolunteerIdGET (req, res, next) {
  var volunteerId = req.swagger.params['volunteerId'].value;
  Volunteer.volunteersVolunteerIdGET(volunteerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.volunteersVolunteerIdServicesGET = function volunteersVolunteerIdServicesGET (req, res, next) {
  var volunteerId = req.swagger.params['volunteerId'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Volunteer.volunteersVolunteerIdServicesGET(volunteerId,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
