'use strict';

let sqlDb;

exports.volunteersDbSetup = function(connection) {
  sqlDb = connection;
  console.log('Checking if the table volunteers exists');
  return sqlDb.schema.hasTable('volunteers').then( (exists) => {
    if(!exists) {
      console.log('Table volunteers doesn´t exists');
    } else {
      console.log('Table volunteers exists');
    };
  });
};


/**
 * Volunteers enroll in the association
 * Returns a list of volunteers
 *
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * surename String Text search between volunteers by surename (optional)
 * returns List
 **/
exports.volunteersGET = function(limit,offset,surename) {
  var query = sqlDb('persons');
  var query = query.join('volunteers', 'persons.id_person', 'volunteers.id_person');
  var query = query.select(
    'persons.id_person', 'persons.name', 'persons.surename', 'persons.email', 
    'persons.description', 'persons.photo', 'volunteers.volunteer_time');

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
 * Find a volunteer by ID
 * Returns a volunteer
 *
 * volunteerId Long ID of volunteer to return
 * returns Volunteer
 **/
exports.volunteersVolunteerIdGET = function(volunteerId) {
  var query = sqlDb('persons');
  var query = query.join('volunteers', 'persons.id_person', 'volunteers.id_person');
  var query = query.select(
    'persons.id_person', 'persons.name', 'persons.surename', 'persons.email', 
    'persons.description', 'persons.photo', 'volunteers.volunteer_time');
  var query = query.where('volunteers.id_person', volunteerId);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Events in which participates the volunteer with ID
 * Returns a list of events
 *
 * volunteerId Long ID of volunteer to return
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * returns List
 **/
exports.volunteersVolunteerIdEventsGET = function(volunteerId,limit,offset) {
  var query = sqlDb('activities');
  var query = query.join('events', 'activities.id_activity', 'events.id_activity');
  var query = query.join('volunteers_events', 'events.id_activity', 'volunteers_events.id_event');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'events.event_date', 'events.id_manager', 
    'events.id_service');
  var query = query.where('volunteers_events.id_volunteer', volunteerId);

  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Services in which participates the volunteer with ID
 * Returns a list of services
 *
 * volunteerId Long ID of volunteer to return
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * returns List
 **/
exports.volunteersVolunteerIdServicesGET = function(volunteerId,limit,offset) {
  var query = sqlDb('activities');
  var query = query.join('services', 'activities.id_activity', 'services.id_activity');
  var query = query.join('volunteers_services', 'services.id_activity', 'volunteers_services.id_service');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'services.service_day', 'services.capacity', 
    'services.age', 'services.id_category');
  var query = query.where('volunteers_services.id_volunteer', volunteerId);

  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};

