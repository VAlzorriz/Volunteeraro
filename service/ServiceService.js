'use strict';

let sqlDb;

exports.servicesDbSetup = function(connection) {
  sqlDb = connection;
  console.log('Checking if the table services exists');
  return sqlDb.schema.hasTable('services').then( (exists) => {
    if(!exists) {
      console.log('Table services doesn´t exists');
    } else {
      console.log('Table services exists');
    };
  });
};


/**
 * Services offered by the association
 * Returns a list of services
 *
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * day String Text search between events by day (optional)
 * age Integer Text search between services by age (optional)
 * category Integer Text search between events by id of category (optional)
 * returns List
 **/
exports.servicesGET = function(limit,offset,day,age,category) {
  var query = sqlDb('activities');
  var query = query.join('services', 'activities.id_activity', 'services.id_activity');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'services.service_day', 'services.capacity', 
    'services.age', 'services.id_category');

  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);
  if(day) query = query.where('event_day', day);
  if(age) query = query.where('age', '<=', age);
  if(category) query = query.where('id_category', category);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Find a service by ID
 * Returns a service
 *
 * serviceId Long ID of service to return
 * returns Service
 **/
exports.servicesServiceIdGET = function(serviceId) {
  var query = sqlDb('activities');
  var query = query.join('services', 'activities.id_activity', 'services.id_activity');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'services.service_day', 'services.capacity', 
    'services.age', 'services.id_category');
  var query = query.where('services.id_activity', serviceId);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Volunteers that participates in the service with ID
 * Returns a list of volunteers
 *
 * serviceId Long ID of service to return
 * returns List
 **/
exports.servicesServiceIdVolunteersGET = function(serviceId) {
  var query = sqlDb('persons');
  var query = query.join('volunteers', 'persons.id_person', 'volunteers.id_person');
  var query = query.join('volunteers_services', 'volunteers.id_person', 'volunteers_services.id_volunteer');
  var query = query.select(
    'persons.id_person', 'persons.name', 'persons.surename', 'persons.email', 
    'persons.description', 'persons.photo', 'volunteers.volunteer_time');
  var query = query.where('volunteers_services.id_service', serviceId);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Events realted to the service with ID
 * Returns a list of events
 *
 * serviceId Long ID of service to return
 * returns List
 **/
exports.servicesServiceIdEventsGET = function(serviceId) {
  var query = sqlDb('activities');
  var query = query.join('events', 'activities.id_activity', 'events.id_activity');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'events.event_date', 'events.id_manager', 
    'events.id_service');
  var query = query.where('events.id_service', serviceId);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};

