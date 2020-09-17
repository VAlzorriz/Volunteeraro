'use strict';

let sqlDb;

exports.categoriesDbSetup = function(connection) {
  sqlDb = connection;
  console.log('Checking if the table categories exists');
  return sqlDb.schema.hasTable('categories').then( (exists) => {
    if(!exists) {
      console.log('Table categories doesn´t exists');
    } else {
      console.log('Table categories exists');
    };
  });
};


/**
 * Categories of the services offered by the association
 * Returns a list of categories
 *
 * limit Integer This is de number of items retrived, by default is 10 (optional)
 * offset Integer Pagination offset, by default is 0 (optional)
 * name String Text search between categories by name (optional)
 * returns List
 **/
exports.categoriesGET = function(limit,offset,name) {
  var query = sqlDb('categories');
  
  if(limit) query = query.limit(limit);
  if(offset) query = query.offset(offset);
  if(name) query = query.where('name', name);
  
  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Find a category by ID
 * Returns a category
 *
 * categoryId Long ID of category to return
 * returns Category
 **/
exports.categoriesCategoryIdGET = function(categoryId) {
  return sqlDb('categories').where('id_category', categoryId).then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};


/**
 * Services of the category offered by the association
 * Returns a list of categories
 *
 * categoryId Long ID of category to return
 * returns List
 **/
exports.categoriesCategoryIdServicesGET = function(categoryId) {
  var query = sqlDb('activities');
  var query = query.join('services', 'activities.id_activity', 'services.id_activity');
  var query = query.select(
    'activities.id_activity', 'activities.location', 'activities.title', 'activities.description', 
    'activities.start_time', 'activities.end_time', 'activities.image', 'services.service_day', 'services.capacity', 
    'services.age', 'services.id_category');
  var query = query.where('services.id_category', categoryId);

  return query.then(data => {
    return data.map( e => {
      console.log(e);
      return e;
    });
  });
};

