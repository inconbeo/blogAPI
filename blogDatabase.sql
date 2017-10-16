CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT NOT NULL,
    email_address text NOT NULL,
    username text NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    users_id integer REFERENCES users,
    title TEXT,
    content TEXT,
    date timestamp with time zone NOT NULL,
    comments_id integer REFERENCES comments,
    tags_id integer REFERENCES tags
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comments_id integer REFERENCES posts,
    comment TEXT 
);

CREATE TYPE tags AS ENUM (
    'open', 'close'
);

INSERT INTO users (first_name, last_name, email_address, username) 
    VALUES ('quang', 'nguyen', 'qtn2@njit.edu', 'inconbeo'),
           ('jesse', 'parrott', 'jesse@gmail.com', 'xyz');

INSERT INTO posts (title, content) 
    VALUES ('newTitle', 'newContent');

INSERT INTO comments (comment)
    VALUES ('newComment');


