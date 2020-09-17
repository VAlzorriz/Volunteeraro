let { managersDbSetup } = require('./ManagerService');
let { volunteersDbSetup } = require('./VolunteerService');
let { servicesDbSetup } = require('./ServiceService');
let { eventsDbSetup } = require('./EventService');
let { categoriesDbSetup } = require('./CategoryService');

const sqlDbFactory = require('knex');

var types = require('pg').types;
// override parsing date column to Date()
types.setTypeParser(1082, val => val);

let sqlDb = sqlDbFactory({
    client: 'pg',
    debug: true,
    connection: {
        host : 'ec2-3-215-83-17.compute-1.amazonaws.com',
        user : 'qghvrokxcwzqab',
        password : 'b6f3bb0a9751b77fdfe7c97f6b18353e341fe12105a2edb8cd4990a81b94d801',
        database : 'd15a9qb5nd3lqe'
      }
    //connection: process.env.DATABASE_URL,
    //ssl: true
});

function setupDataLayerManagers() {
    console.log('Setting up managers data layer');
    return managersDbSetup(sqlDb);
};

function setupDataLayerVolunteers() {
    console.log('Setting up volunteers data layer');
    return volunteersDbSetup(sqlDb);
};

function setupDataLayerServices() {
    console.log('Setting up services data layer');
    return servicesDbSetup(sqlDb);
};

function setupDataLayerEvents() {
    console.log('Setting up events data layer');
    return eventsDbSetup(sqlDb);
};

function setupDataLayerCategories() {
    console.log('Setting up categories data layer');
    return categoriesDbSetup(sqlDb);
}

function setupDataLayer() {
    setupDataLayerManagers();
    setupDataLayerVolunteers();
    setupDataLayerServices();
    setupDataLayerEvents();
    return setupDataLayerCategories();
}

module.exports = { database: sqlDb, setupDataLayer };
