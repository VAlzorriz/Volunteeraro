CREATE TABLE IF NOT EXISTS Persons (
id_person SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
surename VARCHAR NOT NULL,
email VARCHAR NOT NULL,
description VARCHAR,
photo VARCHAR
);

CREATE TABLE IF NOT EXISTS Managers (
id_person INTEGER PRIMARY KEY REFERENCES Persons(id_person) ON DELETE CASCADE,
phone VARCHAR NOT NULL,
role VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS Volunteers (
id_person INTEGER PRIMARY KEY REFERENCES Persons(id_person) ON DELETE CASCADE,
volunteer_time DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Activities (
id_activity SERIAL PRIMARY KEY,
location VARCHAR NOT NULL,
title VARCHAR NOT NULL,
description VARCHAR,
start_time TIME NOT NULL,
end_time TIME NOT NULL,
image VARCHAR
);

CREATE TABLE IF NOT EXISTS Categories (
id_category SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
description VARCHAR
);

CREATE TYPE Days AS ENUM ('Mon','Tue','Wed','Thu','Fri','Sat','Sun');

CREATE TABLE IF NOT EXISTS Services (
id_activity SERIAL PRIMARY KEY REFERENCES Activities(id_activity) ON DELETE CASCADE,
service_day Days,
capacity INTEGER NOT NULL,
age INTEGER NOT NULL,
id_category INTEGER REFERENCES Categories(id_category) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Events (
id_activity SERIAL PRIMARY KEY REFERENCES Activities(id_activity) ON DELETE CASCADE,
event_date DATE NOT NULL,
id_manager INTEGER REFERENCES Managers(id_person) ON DELETE SET NULL,
id_service INTEGER REFERENCES Services(id_activity) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Volunteers_Events (
id_volunteer INTEGER REFERENCES Volunteers(id_person) ON DELETE CASCADE,
id_event INTEGER REFERENCES Events(id_activity) ON DELETE CASCADE,
PRIMARY KEY (id_volunteer, id_event)
);

CREATE TABLE IF NOT EXISTS Volunteers_Services (
id_volunteer INTEGER REFERENCES Volunteers(id_person) ON DELETE CASCADE,
id_service INTEGER REFERENCES Services(id_activity) ON DELETE CASCADE,
PRIMARY KEY (id_volunteer, id_service)
);