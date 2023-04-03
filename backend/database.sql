CREATE DATABASE shareroom;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE users(
--      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--      first_name VARCHAR(50),
--      last_name VARCHAR(50),
--      username VARCHAR(50),
--      create_at VARCHAR(50),
--      gender VARCHAR(50),
--      date_of_birth TIMESTAMP,
--      health VARCHAR(50),
--      occupation VARCHAR (150),
--      email VARCHAR (255)
-- );

CREATE TABLE users(
     id VARCHAR(150) PRIMARY KEY,
     first_name VARCHAR(50),
     last_name VARCHAR(50),
     username VARCHAR(50),
     create_at VARCHAR(50),
     gender VARCHAR(50),
     date_of_birth TIMESTAMP,
     health VARCHAR(50),
     occupation VARCHAR (150),
     email VARCHAR (255)
);

SELECT * FROM users WHERE id = dgwageawateagreawdgwgwaq;

CREATE TABLE trip(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_name VARCHAR(100) NOT NULL,
     user_id VARCHAR(100) NOT NULL,
     start_time TIMESTAMP NOT NULL,
     end_time TIMESTAMP NOT NULL,
     title TEXT NOT NULL,
     place TEXT NOT NULL,
     gender1 VARCHAR NOT NULL,
     gender2 VARCHAR NOT NULL,
     markdown TEXT NOT NULL,
     price VARCHAR(100) NOT NULL
);

CREATE TABLE hotel(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     hotel_name VARCHAR(100),
     hotel_address  VARCHAR(100),
     url_address VARCHAR(250),
     info TEXT
);

CREATE TABLE tag(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title TEXT
);

CREATE TABLE trip_tag(
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     trip_id VARCHAR(100),
     tag_id VARCHAR(100),
     info TEXT
);


