'use strict';

let sqlDb;

exports.managersDbSetup = function(connection) {
  sqlDb = connection;
  console.log('Checking if the table managers exists');
  return sqlDb.schema.hasTable('managers').then( (exists) => {
    if(!exists) {
      console.log('Table managers doesn´t exists');
    } else {
      console.log('Table managers exists');
    }
  });
};


/**
 * Managers enroll in the association
 * Returns a list of managers
 *
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * surename String Text search between managers by surename (optional)
 * returns List
 **/
exports.managersGET = function(limit,offset,surename) {
  var query = sqlDb('persons');
  var query = query.join('managers', 'persons.id_person', 'managers.id_person');
  var query = query.select(
    'persons.id_person', 'persons.name', 'persons.surename', 'persons.email', 
    'persons.description', 'persons.photo', 'managers.phone', 'managers.role');

  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);
  if(surename) query = query.where('persons.surename', surename);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Find a manager by ID
 * Returns a manager
 *
 * managerId Long ID of manager to return
 * returns Manager
 **/
exports.managersManagerIdGET = function(managerId) {
  var query = sqlDb('persons');
  var query = query.join('managers', 'persons.id_person', 'managers.id_person');
  var query = query.select(
    'persons.id_person', 'persons.name', 'persons.surename', 'persons.email', 
    'persons.description', 'persons.photo', 'managers.phone', 'managers.role');
  var query = query.where('managers.id_person', managerId);
  
  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Events organized by the manager with ID
 * Returns list of events
 *
 * managerId Long ID of manager to return
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * returns List
 **/
exports.managersManagerIdEventsGET = function(managerId,limit,offset) {
  var query = sqlDb('activities');
  var query = query.join('events', 'activities.id_activity', 'events.id_activity');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'events.event_date', 'events.id_manager', 
    'events.id_service');
  var query = query.where('events.id_manager', managerId);

  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);
  
  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};




