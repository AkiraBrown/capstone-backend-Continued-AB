DROP DATABASE IF EXISTS giftune_db;

CREATE DATABASE giftune_db;

\c giftune_db

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    user_picture TEXT,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);
DROP TABLE IF EXISTS verified_emails;


CREATE TABLE verified_emails (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    email TEXT,
    is_verified BOOLEAN,
    is_sent BOOLEAN
);
DROP TABLE IF EXISTS notifications;

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    messages TEXT,
    sender_id INTEGER REFERENCES users(id),
    sender_name TEXT,
    msg_type TEXT,
    is_read BOOLEAN,
    date_stamp DATE NOT NULL,
    time_stamp TIME NOT NULL
);

DROP TABLE IF EXISTS events;


CREATE TABLE events (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    google_location TEXT NOT NULL,
    guest_id INTEGER REFERENCES users(id)
);

DROP TABLE IF EXISTS friends_list;

CREATE TABLE friends_list (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    friend_id INTEGER REFERENCES users(id)
);

DROP TABLE IF EXISTS wishlist;

CREATE TABLE wishlist(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    link TEXT NOT NULL,
    product_link TEXT NOT NULL,
    product_id TEXT NOT NULL,
    source TEXT NOT NULL,
    price TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    delivery TEXT NOT NULL,
    is_bought BOOLEAN NOT NULL
);
